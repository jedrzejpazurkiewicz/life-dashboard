'use client'

import { useState, useTransition } from 'react'
import { logTrainingSession } from '@/app/actions'
import type { TrainingDay, Exercise, TrainingSession, WorkoutSet } from '@/app/generated/prisma/client'
import { Dumbbell, Plus, Minus, ChevronDown, ChevronUp, CheckCircle2, Clock } from 'lucide-react'

type TrainingDayFull = TrainingDay & { exercises: Exercise[] }
type SessionFull = TrainingSession & { sets: WorkoutSet[] }

const DAY_NAMES = ['', 'Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz']
const DAY_FULL = ['', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota', 'Niedziela']

interface Props {
  trainingPlan: TrainingDayFull[]
  recentSessions: SessionFull[]
  todayDayOfWeek: number
}

export default function TrainingClient({ trainingPlan, recentSessions, todayDayOfWeek }: Props) {
  const [activeTab, setActiveTab] = useState<'plan' | 'log' | 'history'>('plan')
  const [selectedDay, setSelectedDay] = useState(todayDayOfWeek)

  const todayPlan = trainingPlan.find(d => d.dayOfWeek === selectedDay)

  return (
    <div className="space-y-5 animate-in">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#f0fdf4' }}>Trening</h1>
        <p className="text-sm mt-0.5" style={{ color: 'rgba(240,253,244,0.4)' }}>Plan + dziennik sesji</p>
      </div>

      {/* Day selector */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {trainingPlan.map(day => (
          <button
            key={day.dayOfWeek}
            onClick={() => setSelectedDay(day.dayOfWeek)}
            className="flex flex-col items-center px-3 py-2 rounded-xl transition-all duration-200 flex-shrink-0"
            style={{
              background: selectedDay === day.dayOfWeek
                ? 'rgba(139,92,246,0.15)'
                : day.dayOfWeek === todayDayOfWeek
                  ? 'rgba(34,197,94,0.08)'
                  : 'rgba(255,255,255,0.04)',
              border: `1px solid ${selectedDay === day.dayOfWeek
                ? 'rgba(139,92,246,0.4)'
                : day.dayOfWeek === todayDayOfWeek
                  ? 'rgba(34,197,94,0.25)'
                  : 'rgba(255,255,255,0.07)'}`,
            }}
          >
            <span className="text-xs font-medium" style={{ color: selectedDay === day.dayOfWeek ? '#a78bfa' : 'rgba(240,253,244,0.5)' }}>
              {DAY_NAMES[day.dayOfWeek]}
            </span>
            {day.dayOfWeek === todayDayOfWeek && (
              <div className="w-1 h-1 rounded-full mt-0.5" style={{ background: '#22C55E' }} />
            )}
          </button>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {([['plan', 'Plan'], ['log', 'Zaloguj sesję'], ['history', 'Historia']] as const).map(([tab, label]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className="px-4 py-2 rounded-xl text-sm transition-all duration-200"
            style={{
              background: activeTab === tab ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${activeTab === tab ? 'rgba(139,92,246,0.35)' : 'rgba(255,255,255,0.07)'}`,
              color: activeTab === tab ? '#a78bfa' : 'rgba(240,253,244,0.5)',
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'plan' && todayPlan && <PlanView day={todayPlan} />}
      {activeTab === 'log' && todayPlan && (
        <LogSession day={todayPlan} onDone={() => setActiveTab('history')} />
      )}
      {activeTab === 'history' && <SessionHistory sessions={recentSessions} />}
    </div>
  )
}

function PlanView({ day }: { day: TrainingDayFull }) {
  return (
    <div className="space-y-3">
      <div
        className="px-4 py-3 rounded-xl"
        style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.18)' }}
      >
        <h2 className="font-semibold" style={{ color: '#a78bfa' }}>{day.name}</h2>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(240,253,244,0.4)' }}>{day.exercises.length} ćwiczeń</p>
      </div>
      <div className="space-y-2">
        {day.exercises.map((ex, i) => (
          <div
            key={ex.id}
            className="flex items-center gap-4 px-4 py-3 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}
          >
            <span
              className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
              style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}
            >
              {i + 1}
            </span>
            <span className="flex-1 text-sm" style={{ color: 'rgba(240,253,244,0.85)' }}>{ex.name}</span>
            <span className="text-xs" style={{ color: 'rgba(240,253,244,0.35)' }}>
              {ex.targetSets} × {ex.targetReps}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function LogSession({ day, onDone }: { day: TrainingDayFull; onDone: () => void }) {
  const [sets, setSets] = useState<Array<{ exercise: string; setNumber: number; reps: number; weight: number }>>([])
  const [notes, setNotes] = useState('')
  const [expandedEx, setExpandedEx] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const exerciseGroups = day.exercises.map(ex => ({
    exercise: ex,
    sets: sets.filter(s => s.exercise === ex.name),
  }))

  function addSet(exerciseName: string) {
    const existing = sets.filter(s => s.exercise === exerciseName)
    setSets(prev => [...prev, { exercise: exerciseName, setNumber: existing.length + 1, reps: 10, weight: 0 }])
    setExpandedEx(exerciseName)
  }

  function removeSet(exerciseName: string) {
    setSets(prev => {
      const filtered = prev.filter(s => !(s.exercise === exerciseName && s.setNumber === Math.max(...prev.filter(x => x.exercise === exerciseName).map(x => x.setNumber))))
      return filtered
    })
  }

  function updateSet(exerciseName: string, setNumber: number, field: 'reps' | 'weight', value: number) {
    setSets(prev => prev.map(s =>
      s.exercise === exerciseName && s.setNumber === setNumber ? { ...s, [field]: value } : s
    ))
  }

  function handleSubmit() {
    if (sets.length === 0) return
    startTransition(async () => {
      const fd = new FormData()
      fd.set('dayOfWeek', String(day.dayOfWeek))
      fd.set('notes', notes)
      fd.set('sets', JSON.stringify(sets))
      await logTrainingSession(fd)
      onDone()
    })
  }

  return (
    <div className="space-y-3">
      <p className="text-sm" style={{ color: 'rgba(240,253,244,0.5)' }}>
        Kliknij <strong style={{ color: '#a78bfa' }}>+</strong> aby dodać serie do ćwiczenia
      </p>

      {exerciseGroups.map(({ exercise: ex, sets: exSets }) => (
        <div
          key={ex.id}
          className="card p-4 space-y-3"
          style={{ border: exSets.length > 0 ? '1px solid rgba(139,92,246,0.25)' : undefined }}
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium text-sm" style={{ color: '#f0fdf4' }}>{ex.name}</div>
              <div className="text-xs mt-0.5" style={{ color: 'rgba(240,253,244,0.35)' }}>
                Plan: {ex.targetSets}×{ex.targetReps}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {exSets.length > 0 && (
                <>
                  <button
                    onClick={() => removeSet(ex.name)}
                    className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                    style={{ background: 'rgba(239,68,68,0.1)', color: '#fca5a5' }}
                  >
                    <Minus size={14} />
                  </button>
                  <span className="text-xs font-mono" style={{ color: 'rgba(240,253,244,0.5)' }}>
                    {exSets.length}
                  </span>
                </>
              )}
              <button
                onClick={() => addSet(ex.name)}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-all"
                style={{ background: 'rgba(139,92,246,0.15)', color: '#a78bfa' }}
              >
                <Plus size={14} />
              </button>
              {exSets.length > 0 && (
                <button
                  onClick={() => setExpandedEx(expandedEx === ex.name ? null : ex.name)}
                  style={{ color: 'rgba(240,253,244,0.4)' }}
                >
                  {expandedEx === ex.name ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
              )}
            </div>
          </div>

          {expandedEx === ex.name && exSets.length > 0 && (
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2 text-xs px-1" style={{ color: 'rgba(240,253,244,0.4)' }}>
                <span>Seria</span><span>Powt.</span><span>Ciężar (kg)</span>
              </div>
              {exSets.map(s => (
                <div key={s.setNumber} className="grid grid-cols-3 gap-2 items-center">
                  <span
                    className="text-center text-sm font-medium"
                    style={{ color: '#a78bfa' }}
                  >
                    #{s.setNumber}
                  </span>
                  <input
                    type="number"
                    value={s.reps}
                    onChange={e => updateSet(ex.name, s.setNumber, 'reps', parseInt(e.target.value) || 0)}
                    className="text-center text-sm"
                    min="0"
                  />
                  <input
                    type="number"
                    value={s.weight}
                    onChange={e => updateSet(ex.name, s.setNumber, 'weight', parseFloat(e.target.value) || 0)}
                    className="text-center text-sm"
                    min="0"
                    step="0.5"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      <textarea
        value={notes}
        onChange={e => setNotes(e.target.value)}
        placeholder="Notatki z treningu (opcjonalnie)"
        rows={2}
      />

      <button
        onClick={handleSubmit}
        disabled={isPending || sets.length === 0}
        className="btn-primary w-full flex items-center justify-center gap-2"
        style={{ opacity: sets.length === 0 ? 0.5 : 1 }}
      >
        <CheckCircle2 size={18} />
        Zapisz sesję ({sets.length} serii)
      </button>
    </div>
  )
}

function SessionHistory({ sessions }: { sessions: SessionFull[] }) {
  if (sessions.length === 0) {
    return (
      <div className="card p-8 text-center space-y-2">
        <Dumbbell size={28} className="mx-auto" style={{ color: 'rgba(139,92,246,0.3)' }} />
        <p className="text-sm" style={{ color: 'rgba(240,253,244,0.35)' }}>Brak sesji z ostatnich 7 dni</p>
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {sessions.map(session => {
        const dateStr = new Date(session.date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short', weekday: 'short' })
        const uniqueExercises = [...new Set(session.sets.map(s => s.exercise))]
        return (
          <div key={session.id} className="card p-4 space-y-2">
            <div className="flex justify-between items-start">
              <div>
                <div className="font-medium text-sm" style={{ color: '#f0fdf4' }}>
                  {DAY_FULL[session.dayOfWeek] || 'Trening'}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs flex items-center gap-1" style={{ color: 'rgba(240,253,244,0.4)' }}>
                    <Clock size={10} /> {dateStr}
                  </span>
                  <span className="text-xs" style={{ color: 'rgba(139,92,246,0.7)' }}>
                    {session.sets.length} serii
                  </span>
                </div>
              </div>
              <CheckCircle2 size={18} style={{ color: '#22C55E' }} />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {uniqueExercises.map(ex => (
                <span
                  key={ex}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: 'rgba(139,92,246,0.1)', color: '#c4b5fd', border: '1px solid rgba(139,92,246,0.2)' }}
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}
