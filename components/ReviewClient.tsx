'use client'

import { useState, useTransition } from 'react'
import { saveReview } from '@/app/actions'
import type { DailyReview } from '@/app/generated/prisma/client'
import { BookOpen, Zap, Heart, ChevronDown, ChevronUp } from 'lucide-react'

interface Props {
  todayReview: DailyReview | null
  recentReviews: DailyReview[]
}

export default function ReviewClient({ todayReview, recentReviews }: Props) {
  const [wentWell, setWentWell] = useState(todayReview?.wentWell ?? '')
  const [improve, setImprove] = useState(todayReview?.improve ?? '')
  const [energy, setEnergy] = useState(todayReview?.energy ?? 7)
  const [tomorrowPlan, setTomorrowPlan] = useState(todayReview?.tomorrowPlan ?? '')
  const [saved, setSaved] = useState(!!todayReview)
  const [isPending, startTransition] = useTransition()
  const [showHistory, setShowHistory] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const fd = new FormData()
    fd.set('wentWell', wentWell)
    fd.set('improve', improve)
    fd.set('energy', String(energy))
    fd.set('tomorrowPlan', tomorrowPlan)

    setSaved(true)
    startTransition(async () => { await saveReview(fd) })
  }

  const today = new Date()
  const todayStr = today.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' })

  return (
    <div className="space-y-5 animate-in">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#f0fdf4' }}>Wieczorny Review</h1>
        <p className="text-sm mt-0.5 capitalize" style={{ color: 'rgba(240,253,244,0.4)' }}>{todayStr}</p>
      </div>

      {saved && !isPending && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
        >
          <Zap size={16} style={{ color: '#22C55E' }} />
          <span className="text-sm" style={{ color: '#86efac' }}>Review zapisany na dziś ✓</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Energy slider */}
        <div className="card p-5 space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium" style={{ color: '#f0fdf4' }}>
            <Heart size={16} style={{ color: '#22C55E' }} />
            Energia / nastrój
          </label>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: 'rgba(240,253,244,0.4)' }}>Słaby</span>
              <span className="text-2xl font-bold" style={{ color: energy >= 7 ? '#22C55E' : energy >= 4 ? '#f59e0b' : '#ef4444' }}>
                {energy}/10
              </span>
              <span className="text-xs" style={{ color: 'rgba(240,253,244,0.4)' }}>Świetny</span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={energy}
              onChange={e => setEnergy(parseInt(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(90deg, ${energy >= 7 ? '#22C55E' : energy >= 4 ? '#f59e0b' : '#ef4444'} ${energy * 10}%, rgba(255,255,255,0.1) ${energy * 10}%)`,
                accentColor: '#22C55E',
              }}
            />
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setEnergy(n)}
                  className="w-6 h-6 rounded-full text-xs transition-all"
                  style={{
                    background: energy === n
                      ? (n >= 7 ? '#22C55E' : n >= 4 ? '#f59e0b' : '#ef4444')
                      : 'rgba(255,255,255,0.05)',
                    color: energy === n ? '#000' : 'rgba(240,253,244,0.4)',
                    fontWeight: energy === n ? 700 : 400,
                  }}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Questions */}
        <div className="card p-5 space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium" style={{ color: '#f0fdf4' }}>
            <BookOpen size={16} style={{ color: '#22C55E' }} />
            Co poszło dobrze dziś?
          </label>
          <textarea
            value={wentWell}
            onChange={e => setWentWell(e.target.value)}
            placeholder="3 rzeczy, które zrobiłem dobrze..."
            rows={3}
            required
          />
        </div>

        <div className="card p-5 space-y-3">
          <label className="text-sm font-medium" style={{ color: '#f0fdf4' }}>
            Co zrobiłbym inaczej?
          </label>
          <textarea
            value={improve}
            onChange={e => setImprove(e.target.value)}
            placeholder="1-2 rzeczy do poprawy jutro..."
            rows={3}
            required
          />
        </div>

        <div className="card p-5 space-y-3">
          <label className="text-sm font-medium" style={{ color: '#f0fdf4' }}>
            Plan na jutro — 3 priorytety
          </label>
          <textarea
            value={tomorrowPlan}
            onChange={e => setTomorrowPlan(e.target.value)}
            placeholder="1. ...\n2. ...\n3. ..."
            rows={3}
            required
          />
        </div>

        <button type="submit" disabled={isPending} className="btn-primary w-full flex items-center justify-center gap-2">
          <Zap size={18} />
          {isPending ? 'Zapisuję...' : saved ? 'Zaktualizuj review' : 'Zapisz review'}
        </button>
      </form>

      {/* History */}
      {recentReviews.length > 1 && (
        <div className="space-y-3">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-2 text-sm w-full"
            style={{ color: 'rgba(240,253,244,0.4)' }}
          >
            <BookOpen size={14} />
            Historia reviewów ({recentReviews.length - 1})
            {showHistory ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>

          {showHistory && recentReviews.slice(1).map(r => (
            <div key={r.id} className="card p-4 space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-xs font-medium" style={{ color: 'rgba(240,253,244,0.6)' }}>
                  {new Date(r.date).toLocaleDateString('pl-PL', { weekday: 'short', day: 'numeric', month: 'short' })}
                </span>
                <span
                  className="text-sm font-bold"
                  style={{ color: r.energy >= 7 ? '#22C55E' : r.energy >= 4 ? '#f59e0b' : '#ef4444' }}
                >
                  {r.energy}/10
                </span>
              </div>
              <p className="text-xs" style={{ color: 'rgba(240,253,244,0.5)' }}>{r.wentWell}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
