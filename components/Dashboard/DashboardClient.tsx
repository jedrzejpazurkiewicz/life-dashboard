'use client'

import { useState, useTransition } from 'react'
import { toggleTask, toggleHabit } from '@/app/actions'
import type { Task, TrainingDay, Exercise, HabitLog } from '@/app/generated/prisma/client'
import { CheckSquare, Square, Dumbbell, Utensils, BookOpen, Zap, Leaf, Clock } from 'lucide-react'
import Link from 'next/link'

type TrainingDayWithExercises = TrainingDay & { exercises: Exercise[] }

interface Props {
  tasks: Task[]
  mealsCount: number
  trainingDay: TrainingDayWithExercises | null
  habitLog: HabitLog | null
  today: string
}

const DAY_NAMES = ['', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela']
const MONTH_NAMES = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca',
  'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia']

export default function DashboardClient({ tasks, mealsCount, trainingDay, habitLog, today }: Props) {
  const todayDate = new Date(today)
  const dayOfWeek = todayDate.getDay() === 0 ? 7 : todayDate.getDay()
  const dayName = DAY_NAMES[dayOfWeek]
  const dateStr = `${todayDate.getDate()} ${MONTH_NAMES[todayDate.getMonth()]} ${todayDate.getFullYear()}`

  const doneTasks = tasks.filter(t => t.done).length
  const totalTasks = tasks.length
  const progress = totalTasks > 0 ? (doneTasks / totalTasks) * 100 : 0

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div className="space-y-1">
        <div className="text-sm font-medium" style={{ color: 'rgba(74,222,128,0.7)' }}>
          {dayName}
        </div>
        <h1 className="text-3xl font-bold" style={{ color: '#f0fdf4' }}>
          {dateStr}
        </h1>
        <p className="text-sm" style={{ color: 'rgba(240,253,244,0.4)' }}>
          Dobrego dnia. Działaj.
        </p>
      </div>

      {/* Habit tracker */}
      <HabitTracker habitLog={habitLog} />

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        <StatCard
          icon={<CheckSquare size={18} />}
          label="Zadania"
          value={`${doneTasks}/${totalTasks}`}
          color="#22C55E"
          href="/tasks"
        />
        <StatCard
          icon={<Utensils size={18} />}
          label="Posiłki"
          value={mealsCount.toString()}
          color="#f59e0b"
          href="/nutrition"
        />
        <StatCard
          icon={<Dumbbell size={18} />}
          label="Trening"
          value={trainingDay?.name || 'Wolne'}
          color="#8b5cf6"
          small
          href="/training"
        />
      </div>

      {/* Task progress */}
      {totalTasks > 0 && (
        <div className="card p-4 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium" style={{ color: '#f0fdf4' }}>Postęp zadań</span>
            <span className="text-sm" style={{ color: 'rgba(74,222,128,0.7)' }}>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
            <div
              className="h-2 rounded-full transition-all duration-700"
              style={{
                width: `${progress}%`,
                background: 'linear-gradient(90deg, #22C55E, #4ADE80)',
                boxShadow: '0 0 8px rgba(34,197,94,0.5)',
              }}
            />
          </div>
        </div>
      )}

      {/* Today's tasks */}
      <TodayTasks tasks={tasks} />

      {/* Training today */}
      {trainingDay && (
        <div className="card p-5 space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold flex items-center gap-2" style={{ color: '#f0fdf4' }}>
              <Dumbbell size={18} style={{ color: '#8b5cf6' }} />
              Trening: {trainingDay.name}
            </h2>
            <Link href="/training" className="text-xs" style={{ color: 'rgba(34,197,94,0.7)' }}>
              Log →
            </Link>
          </div>
          <div className="space-y-1.5">
            {trainingDay.exercises.slice(0, 4).map(ex => (
              <div key={ex.id} className="flex justify-between items-center py-1.5 px-3 rounded-lg" style={{ background: 'rgba(139,92,246,0.06)', border: '1px solid rgba(139,92,246,0.12)' }}>
                <span className="text-sm" style={{ color: 'rgba(240,253,244,0.8)' }}>{ex.name}</span>
                <span className="text-xs" style={{ color: 'rgba(240,253,244,0.4)' }}>{ex.targetSets}×{ex.targetReps}</span>
              </div>
            ))}
            {trainingDay.exercises.length > 4 && (
              <div className="text-xs text-center py-1" style={{ color: 'rgba(240,253,244,0.3)' }}>
                + {trainingDay.exercises.length - 4} więcej
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick links */}
      <div className="grid grid-cols-2 gap-3">
        <Link href="/review" className="card p-4 flex items-center gap-3 no-underline">
          <BookOpen size={20} style={{ color: '#22C55E' }} />
          <div>
            <div className="text-sm font-medium" style={{ color: '#f0fdf4' }}>Wieczorny review</div>
            <div className="text-xs" style={{ color: 'rgba(240,253,244,0.4)' }}>10 minut refleksji</div>
          </div>
        </Link>
        <Link href="/stats" className="card p-4 flex items-center gap-3 no-underline">
          <Zap size={20} style={{ color: '#f59e0b' }} />
          <div>
            <div className="text-sm font-medium" style={{ color: '#f0fdf4' }}>Statystyki</div>
            <div className="text-xs" style={{ color: 'rgba(240,253,244,0.4)' }}>Streaki i postęp</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

function HabitTracker({ habitLog }: { habitLog: HabitLog | null }) {
  const [isPending, startTransition] = useTransition()
  const [optimistic, setOptimistic] = useState({
    sport: habitLog?.sport ?? false,
    journaling: habitLog?.journaling ?? false,
    tiktokOk: habitLog?.tiktokOk ?? false,
  })

  const habits = [
    { key: 'sport' as const, label: 'Sport', icon: <Dumbbell size={16} />, color: '#22C55E' },
    { key: 'journaling' as const, label: 'Journal', icon: <BookOpen size={16} />, color: '#8b5cf6' },
    { key: 'tiktokOk' as const, label: 'TikTok <30m', icon: <Clock size={16} />, color: '#f59e0b' },
  ]

  function handleToggle(field: 'sport' | 'journaling' | 'tiktokOk') {
    setOptimistic(prev => ({ ...prev, [field]: !prev[field] }))
    startTransition(async () => {
      await toggleHabit(field)
    })
  }

  return (
    <div className="card p-4">
      <div className="flex items-center gap-2 mb-3">
        <Leaf size={16} style={{ color: '#22C55E' }} />
        <span className="text-sm font-semibold" style={{ color: '#f0fdf4' }}>Nawyki dnia</span>
      </div>
      <div className="flex gap-2">
        {habits.map(({ key, label, icon, color }) => {
          const done = optimistic[key]
          return (
            <button
              key={key}
              onClick={() => handleToggle(key)}
              disabled={isPending}
              className="flex-1 flex flex-col items-center gap-1.5 py-3 rounded-xl transition-all duration-200"
              style={{
                background: done ? `${color}18` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${done ? color + '40' : 'rgba(255,255,255,0.06)'}`,
                boxShadow: done ? `0 0 12px ${color}25` : 'none',
              }}
            >
              <div style={{ color: done ? color : 'rgba(240,253,244,0.3)' }}>{icon}</div>
              <span className="text-xs" style={{ color: done ? color : 'rgba(240,253,244,0.4)' }}>
                {label}
              </span>
              {done && <div className="w-1 h-1 rounded-full" style={{ background: color }} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function TodayTasks({ tasks }: { tasks: Task[] }) {
  const [isPending, startTransition] = useTransition()
  const [optimisticDone, setOptimisticDone] = useState<Record<number, boolean>>(
    Object.fromEntries(tasks.map(t => [t.id, t.done]))
  )

  if (tasks.length === 0) {
    return (
      <div className="card p-5 text-center space-y-2">
        <CheckSquare size={24} className="mx-auto" style={{ color: 'rgba(34,197,94,0.3)' }} />
        <p className="text-sm" style={{ color: 'rgba(240,253,244,0.4)' }}>Brak zadań na dziś</p>
        <Link href="/tasks" className="text-sm" style={{ color: '#22C55E' }}>
          Dodaj zadanie →
        </Link>
      </div>
    )
  }

  function handleToggle(id: number) {
    setOptimisticDone(prev => ({ ...prev, [id]: !prev[id] }))
    startTransition(async () => {
      await toggleTask(id)
    })
  }

  const priorityOrder = { HIGH: 0, MEDIUM: 1, LOW: 2 }
  const sorted = [...tasks].sort((a, b) => {
    if (optimisticDone[a.id] !== optimisticDone[b.id]) return optimisticDone[a.id] ? 1 : -1
    return (priorityOrder[a.priority as keyof typeof priorityOrder] ?? 1) - (priorityOrder[b.priority as keyof typeof priorityOrder] ?? 1)
  })

  return (
    <div className="card p-5 space-y-3">
      <div className="flex justify-between items-center">
        <h2 className="font-semibold flex items-center gap-2" style={{ color: '#f0fdf4' }}>
          <CheckSquare size={18} style={{ color: '#22C55E' }} />
          Zadania dzisiaj
        </h2>
        <Link href="/tasks" className="text-xs" style={{ color: 'rgba(34,197,94,0.7)' }}>
          Wszystkie →
        </Link>
      </div>
      <div className="space-y-2">
        {sorted.slice(0, 6).map(task => {
          const done = optimisticDone[task.id]
          return (
            <div
              key={task.id}
              className="flex items-center gap-3 py-2 px-3 rounded-lg transition-all duration-200"
              style={{
                background: done ? 'rgba(34,197,94,0.04)' : 'rgba(255,255,255,0.03)',
                opacity: done ? 0.5 : 1,
              }}
            >
              <button
                onClick={() => handleToggle(task.id)}
                disabled={isPending}
                className="flex-shrink-0 transition-all duration-200"
                style={{ color: done ? '#22C55E' : 'rgba(240,253,244,0.3)' }}
              >
                {done ? <CheckSquare size={18} /> : <Square size={18} />}
              </button>
              <span
                className="flex-1 text-sm"
                style={{
                  color: done ? 'rgba(240,253,244,0.35)' : 'rgba(240,253,244,0.85)',
                  textDecoration: done ? 'line-through' : 'none',
                }}
              >
                {task.title}
              </span>
              <PriorityBadge priority={task.priority} />
            </div>
          )
        })}
        {tasks.length > 6 && (
          <Link href="/tasks" className="block text-xs text-center py-1" style={{ color: 'rgba(240,253,244,0.3)' }}>
            + {tasks.length - 6} więcej
          </Link>
        )}
      </div>
    </div>
  )
}

function PriorityBadge({ priority }: { priority: string }) {
  const map = {
    HIGH: { label: 'Wysoki', cls: 'priority-high' },
    MEDIUM: { label: 'Średni', cls: 'priority-medium' },
    LOW: { label: 'Niski', cls: 'priority-low' },
  }
  const p = map[priority as keyof typeof map]
  if (!p) return null
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full ${p.cls}`} style={{ fontSize: '10px' }}>
      {p.label}
    </span>
  )
}

function StatCard({ icon, label, value, color, href, small = false }: {
  icon: React.ReactNode; label: string; value: string; color: string; href: string; small?: boolean
}) {
  return (
    <Link href={href} className="card p-4 space-y-2 no-underline block">
      <div style={{ color }}>{icon}</div>
      <div className="text-xs" style={{ color: 'rgba(240,253,244,0.4)' }}>{label}</div>
      <div
        className={`font-bold ${small ? 'text-sm' : 'text-xl'}`}
        style={{ color: '#f0fdf4' }}
      >
        {value}
      </div>
    </Link>
  )
}
