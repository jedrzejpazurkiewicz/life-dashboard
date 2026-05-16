'use client'

import { useState } from 'react'
import type { HabitLog } from '@/app/generated/prisma/client'
import { CheckSquare, Dumbbell, BookOpen, Flame, TrendingUp } from 'lucide-react'

type RangeKey = '7d' | '30d' | '90d'
const RANGES: { key: RangeKey; label: string; days: number }[] = [
  { key: '7d', label: '7 dni', days: 7 },
  { key: '30d', label: '30 dni', days: 30 },
  { key: '90d', label: '90 dni', days: 90 },
]

interface Props {
  tasks: { done: boolean; createdAt: Date }[]
  trainingSessions: { date: Date }[]
  reviews: { date: Date; energy: number }[]
  habitLogs: HabitLog[]
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function daysAgo(n: number) {
  const d = new Date()
  d.setDate(d.getDate() - n)
  d.setHours(0, 0, 0, 0)
  return d
}

export default function StatsClient({ tasks, trainingSessions, reviews, habitLogs }: Props) {
  const [range, setRange] = useState<RangeKey>('7d')
  const days = RANGES.find(r => r.key === range)!.days
  const cutoff = daysAgo(days)

  const filteredTasks = tasks.filter(t => new Date(t.createdAt) >= cutoff)
  const doneTasks = filteredTasks.filter(t => t.done).length
  const totalTasks = filteredTasks.length
  const taskRate = totalTasks > 0 ? Math.round((doneTasks / totalTasks) * 100) : 0

  const filteredSessions = trainingSessions.filter(s => new Date(s.date) >= cutoff)
  const filteredReviews = reviews.filter(r => new Date(r.date) >= cutoff)

  const sportStreak = calcStreak(habitLogs, 'sport')
  const journalStreak = calcStreak(habitLogs, 'journaling')

  const last7 = getLast7Days()

  return (
    <div className="space-y-5 animate-in">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#f0fdf4' }}>Statystyki</h1>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(240,253,244,0.4)' }}>Ostatnie {days} dni</p>
        </div>
        {/* Range toggle */}
        <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(34,197,94,0.1)' }}>
          {RANGES.map(r => (
            <button
              key={r.key}
              onClick={() => setRange(r.key)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
              style={{
                background: range === r.key ? 'rgba(34,197,94,0.15)' : 'transparent',
                color: range === r.key ? '#4ADE80' : 'rgba(240,253,244,0.4)',
                border: range === r.key ? '1px solid rgba(34,197,94,0.25)' : '1px solid transparent',
              }}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={<CheckSquare size={18} />} label="Zadania" value={`${doneTasks}/${totalTasks}`} sub={`${taskRate}% done`} color="#22C55E" />
        <StatCard icon={<Dumbbell size={18} />} label="Treningi" value={filteredSessions.length.toString()} sub="sesji" color="#8b5cf6" />
        <StatCard icon={<BookOpen size={18} />} label="Reviewy" value={filteredReviews.length.toString()} sub={`z ${days} dni`} color="#f59e0b" />
        <StatCard icon={<TrendingUp size={18} />} label="Konsekwencja" value={`${taskRate}%`} sub="zadania" color="#ec4899" />
      </div>

      {/* Streaks */}
      <div className="card p-5 space-y-4">
        <h2 className="font-semibold text-sm" style={{ color: '#f0fdf4' }}>Streaki nawyków</h2>
        <div className="space-y-3">
          <StreakRow icon={<Dumbbell size={16} />} label="Sport" streak={sportStreak} color="#22C55E" />
          <StreakRow icon={<BookOpen size={16} />} label="Journaling" streak={journalStreak} color="#8b5cf6" />
        </div>
      </div>

      {/* 7-day habit grid (always last 7 days as snapshot) */}
      <div className="card p-5 space-y-4">
        <h2 className="font-semibold text-sm" style={{ color: '#f0fdf4' }}>Ostatnie 7 dni</h2>
        <div className="space-y-3">
          {[
            { key: 'sport' as const, label: 'Sport', color: '#22C55E' },
            { key: 'journaling' as const, label: 'Journal', color: '#8b5cf6' },
            { key: 'tiktokOk' as const, label: 'TikTok <30m', color: '#f59e0b' },
          ].map(({ key, label, color }) => (
            <div key={key} className="space-y-1.5">
              <div className="flex justify-between items-center">
                <span className="text-xs" style={{ color: 'rgba(240,253,244,0.5)' }}>{label}</span>
                <span className="text-xs" style={{ color }}>
                  {last7.filter(d => habitLogs.some(l => isSameDay(new Date(l.date), d) && l[key])).length}/7
                </span>
              </div>
              <div className="flex gap-1.5">
                {last7.map((d, i) => {
                  const log = habitLogs.find(l => isSameDay(new Date(l.date), d))
                  const done = log?.[key] ?? false
                  return (
                    <div
                      key={i}
                      className="flex-1 h-6 rounded transition-all"
                      title={d.toLocaleDateString('pl-PL', { weekday: 'short', day: 'numeric' })}
                      style={{
                        background: done ? color : 'rgba(255,255,255,0.05)',
                        boxShadow: done ? `0 0 6px ${color}50` : 'none',
                        opacity: isSameDay(d, new Date()) ? 1 : done ? 0.8 : 0.4,
                      }}
                    />
                  )
                })}
              </div>
              <div className="flex gap-1.5">
                {last7.map((d, i) => (
                  <div key={i} className="flex-1 text-center" style={{ fontSize: '9px', color: 'rgba(240,253,244,0.2)' }}>
                    {d.toLocaleDateString('pl-PL', { weekday: 'narrow' })}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Motivation */}
      <div
        className="p-5 rounded-xl space-y-2"
        style={{ background: 'linear-gradient(135deg, rgba(34,197,94,0.08), rgba(139,92,246,0.08))', border: '1px solid rgba(34,197,94,0.15)' }}
      >
        <div className="flex items-center gap-2">
          <Flame size={18} style={{ color: '#f59e0b' }} />
          <span className="font-semibold text-sm" style={{ color: '#f0fdf4' }}>Matematyka jest brutalna</span>
        </div>
        <p className="text-xs" style={{ color: 'rgba(240,253,244,0.5)' }}>
          Po roku konsekwentnej pracy będziesz w <strong style={{ color: '#4ADE80' }}>top 5%</strong> swojego pokolenia w Polsce.
          Po dwóch latach — w <strong style={{ color: '#4ADE80' }}>top 1%</strong>.
        </p>
      </div>
    </div>
  )
}

function StatCard({ icon, label, value, sub, color }: {
  icon: React.ReactNode; label: string; value: string; sub: string; color: string
}) {
  return (
    <div className="card p-4 space-y-2">
      <div style={{ color }}>{icon}</div>
      <div className="text-xs" style={{ color: 'rgba(240,253,244,0.4)' }}>{label}</div>
      <div className="text-2xl font-bold" style={{ color: '#f0fdf4' }}>{value}</div>
      <div className="text-xs" style={{ color: 'rgba(240,253,244,0.3)' }}>{sub}</div>
    </div>
  )
}

function StreakRow({ icon, label, streak, color }: {
  icon: React.ReactNode; label: string; streak: number; color: string
}) {
  return (
    <div className="flex items-center gap-3">
      <div style={{ color }}>{icon}</div>
      <span className="text-sm flex-1" style={{ color: 'rgba(240,253,244,0.7)' }}>{label}</span>
      <div className="flex items-center gap-2">
        <div
          className="h-2 rounded-full transition-all duration-700"
          style={{ width: `${Math.min(streak * 12, 80)}px`, background: `linear-gradient(90deg, ${color}, ${color}88)`, minWidth: streak > 0 ? '8px' : '0' }}
        />
        <span className="text-sm font-bold w-8 text-right" style={{ color }}>{streak}d</span>
      </div>
    </div>
  )
}

function calcStreak(logs: HabitLog[], field: 'sport' | 'journaling' | 'tiktokOk'): number {
  let streak = 0
  const today = new Date()
  for (let i = 0; i < 90; i++) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    const log = logs.find(l => isSameDay(new Date(l.date), d))
    if (log?.[field]) streak++
    else if (i > 0) break
  }
  return streak
}

function getLast7Days(): Date[] {
  const days = []
  const today = new Date()
  for (let i = 6; i >= 0; i--) {
    const d = new Date(today)
    d.setDate(d.getDate() - i)
    days.push(d)
  }
  return days
}
