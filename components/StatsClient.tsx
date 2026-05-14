'use client'

import type { HabitLog } from '@/app/generated/prisma/client'
import { CheckSquare, Dumbbell, BookOpen, Flame, TrendingUp } from 'lucide-react'

interface Props {
  weekDone: number
  weekTotal: number
  weekTraining: number
  weekReviews: number
  habitLogs: HabitLog[]
}

export default function StatsClient({ weekDone, weekTotal, weekTraining, weekReviews, habitLogs }: Props) {
  const taskRate = weekTotal > 0 ? Math.round((weekDone / weekTotal) * 100) : 0

  const sportStreak = calcStreak(habitLogs, 'sport')
  const journalStreak = calcStreak(habitLogs, 'journaling')

  const last7 = getLast7Days()

  return (
    <div className="space-y-5 animate-in">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#f0fdf4' }}>Statystyki</h1>
        <p className="text-sm mt-0.5" style={{ color: 'rgba(240,253,244,0.4)' }}>Ostatnie 7 dni</p>
      </div>

      {/* Week stats */}
      <div className="grid grid-cols-2 gap-3">
        <StatCard icon={<CheckSquare size={18} />} label="Zadania" value={`${weekDone}/${weekTotal}`} sub={`${taskRate}% done`} color="#22C55E" />
        <StatCard icon={<Dumbbell size={18} />} label="Treningi" value={weekTraining.toString()} sub="sesji" color="#8b5cf6" />
        <StatCard icon={<BookOpen size={18} />} label="Reviewy" value={weekReviews.toString()} sub="z 7 dni" color="#f59e0b" />
        <StatCard icon={<TrendingUp size={18} />} label="Konsekwencja" value={`${Math.round(((sportStreak + journalStreak) / 14) * 100)}%`} sub="sport + journal" color="#ec4899" />
      </div>

      {/* Streaks */}
      <div className="card p-5 space-y-4">
        <h2 className="font-semibold text-sm" style={{ color: '#f0fdf4' }}>Streaki nawyków</h2>
        <div className="space-y-3">
          <StreakRow icon={<Dumbbell size={16} />} label="Sport" streak={sportStreak} color="#22C55E" />
          <StreakRow icon={<BookOpen size={16} />} label="Journaling" streak={journalStreak} color="#8b5cf6" />
        </div>
      </div>

      {/* 7-day habit grid */}
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
          style={{
            width: `${Math.min(streak * 12, 80)}px`,
            background: `linear-gradient(90deg, ${color}, ${color}88)`,
            minWidth: streak > 0 ? '8px' : '0',
          }}
        />
        <span className="text-sm font-bold w-8 text-right" style={{ color }}>
          {streak}d
        </span>
      </div>
    </div>
  )
}

function calcStreak(logs: HabitLog[], field: 'sport' | 'journaling' | 'tiktokOk'): number {
  let streak = 0
  const today = new Date()
  for (let i = 0; i < 30; i++) {
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

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
}
