'use client'

import { useState, useTransition } from 'react'
import { saveReview, generateReviewSummary } from '@/app/actions'
import type { DailyReview } from '@/app/generated/prisma/client'
import { BookOpen, Zap, Heart, Sparkles, Archive, ChevronDown, ChevronUp } from 'lucide-react'

interface Props {
  todayReview: DailyReview | null
  allReviews: DailyReview[]
}

const MONTHS = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
  'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']

function energyColor(e: number) {
  return e >= 7 ? '#22C55E' : e >= 4 ? '#f59e0b' : '#ef4444'
}

function groupByMonth(reviews: DailyReview[]) {
  const map = new Map<string, DailyReview[]>()
  for (const r of reviews) {
    const d = new Date(r.date)
    const key = `${d.getFullYear()}-${d.getMonth()}`
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(r)
  }
  return Array.from(map.entries()).map(([key, reviews]) => {
    const [year, month] = key.split('-').map(Number)
    return { label: `${MONTHS[month]} ${year}`, reviews }
  })
}

export default function ReviewClient({ todayReview, allReviews }: Props) {
  const [tab, setTab] = useState<'dzis' | 'archiwum'>('dzis')

  const today = new Date()
  const todayStr = today.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' })
  const pastReviews = allReviews.filter(r => {
    const d = new Date(r.date)
    return !(d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate())
  })

  return (
    <div className="space-y-5 animate-in">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#f0fdf4' }}>Review</h1>
        <p className="text-sm mt-0.5 capitalize" style={{ color: 'rgba(240,253,244,0.4)' }}>{todayStr}</p>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(34,197,94,0.1)' }}>
        {([
          { key: 'dzis', label: 'Dziś', icon: <Zap size={14} /> },
          { key: 'archiwum', label: `Archiwum${pastReviews.length > 0 ? ` (${pastReviews.length})` : ''}`, icon: <Archive size={14} /> },
        ] as const).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              background: tab === t.key ? 'rgba(34,197,94,0.15)' : 'transparent',
              color: tab === t.key ? '#4ADE80' : 'rgba(240,253,244,0.4)',
              border: tab === t.key ? '1px solid rgba(34,197,94,0.25)' : '1px solid transparent',
            }}
          >
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {tab === 'dzis' ? (
        <TodayReview todayReview={todayReview} />
      ) : (
        <ArchiveView reviews={pastReviews} />
      )}
    </div>
  )
}

function TodayReview({ todayReview }: { todayReview: DailyReview | null }) {
  const [wentWell, setWentWell] = useState(todayReview?.wentWell ?? '')
  const [improve, setImprove] = useState(todayReview?.improve ?? '')
  const [energy, setEnergy] = useState(todayReview?.energy ?? 7)
  const [tomorrowPlan, setTomorrowPlan] = useState(todayReview?.tomorrowPlan ?? '')
  const [saved, setSaved] = useState(!!todayReview)
  const [isPending, startTransition] = useTransition()
  const [aiSummary, setAiSummary] = useState<string | null>(null)
  const [aiLoading, setAiLoading] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const fd = new FormData()
    fd.set('wentWell', wentWell)
    fd.set('improve', improve)
    fd.set('energy', String(energy))
    fd.set('tomorrowPlan', tomorrowPlan)

    setSaved(true)
    setAiSummary(null)
    setAiLoading(true)
    startTransition(async () => {
      await saveReview(fd)
      const summary = await generateReviewSummary({ wentWell, improve, energy, tomorrowPlan })
      setAiSummary(summary)
      setAiLoading(false)
    })
  }

  return (
    <div className="space-y-4">
      {saved && !isPending && (
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
        >
          <Zap size={16} style={{ color: '#22C55E' }} />
          <span className="text-sm" style={{ color: '#86efac' }}>Review zapisany na dziś ✓</span>
        </div>
      )}

      {(aiLoading || aiSummary) && (
        <div
          className="p-4 rounded-xl space-y-2"
          style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}
        >
          <div className="flex items-center gap-2">
            <Sparkles size={15} style={{ color: '#a78bfa' }} />
            <span className="text-xs font-semibold" style={{ color: '#a78bfa' }}>Analiza Claude</span>
          </div>
          {aiLoading ? (
            <div className="flex gap-1.5 py-1">
              {[0, 1, 2].map(i => (
                <div key={i} className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: '#a78bfa', animationDelay: `${i * 0.15}s` }} />
              ))}
            </div>
          ) : (
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(240,253,244,0.8)' }}>{aiSummary}</p>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="card p-5 space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium" style={{ color: '#f0fdf4' }}>
            <Heart size={16} style={{ color: '#22C55E' }} />
            Energia / nastrój
          </label>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs" style={{ color: 'rgba(240,253,244,0.4)' }}>Słaby</span>
              <span className="text-2xl font-bold" style={{ color: energyColor(energy) }}>{energy}/10</span>
              <span className="text-xs" style={{ color: 'rgba(240,253,244,0.4)' }}>Świetny</span>
            </div>
            <input
              type="range" min="1" max="10" value={energy}
              onChange={e => setEnergy(parseInt(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(90deg, ${energyColor(energy)} ${energy * 10}%, rgba(255,255,255,0.1) ${energy * 10}%)`,
                accentColor: '#22C55E',
              }}
            />
            <div className="flex justify-between">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(n => (
                <button
                  key={n} type="button" onClick={() => setEnergy(n)}
                  className="w-6 h-6 rounded-full text-xs transition-all"
                  style={{
                    background: energy === n ? energyColor(n) : 'rgba(255,255,255,0.05)',
                    color: energy === n ? '#000' : 'rgba(240,253,244,0.4)',
                    fontWeight: energy === n ? 700 : 400,
                  }}
                >{n}</button>
              ))}
            </div>
          </div>
        </div>

        <div className="card p-5 space-y-3">
          <label className="flex items-center gap-2 text-sm font-medium" style={{ color: '#f0fdf4' }}>
            <BookOpen size={16} style={{ color: '#22C55E' }} />
            Co poszło dobrze dziś?
          </label>
          <textarea value={wentWell} onChange={e => setWentWell(e.target.value)} placeholder="3 rzeczy, które zrobiłem dobrze..." rows={3} required />
        </div>

        <div className="card p-5 space-y-3">
          <label className="text-sm font-medium" style={{ color: '#f0fdf4' }}>Co zrobiłbym inaczej?</label>
          <textarea value={improve} onChange={e => setImprove(e.target.value)} placeholder="1-2 rzeczy do poprawy jutro..." rows={3} required />
        </div>

        <div className="card p-5 space-y-3">
          <label className="text-sm font-medium" style={{ color: '#f0fdf4' }}>Plan na jutro — 3 priorytety</label>
          <textarea value={tomorrowPlan} onChange={e => setTomorrowPlan(e.target.value)} placeholder={'1. ...\n2. ...\n3. ...'} rows={3} required />
        </div>

        <button type="submit" disabled={isPending} className="btn-primary w-full flex items-center justify-center gap-2">
          <Zap size={18} />
          {isPending ? 'Zapisuję...' : saved ? 'Zaktualizuj review' : 'Zapisz review'}
        </button>
      </form>
    </div>
  )
}

function ArchiveView({ reviews }: { reviews: DailyReview[] }) {
  if (reviews.length === 0) {
    return (
      <div className="text-center py-16 space-y-3">
        <Archive size={32} className="mx-auto" style={{ color: 'rgba(34,197,94,0.2)' }} />
        <p className="text-sm" style={{ color: 'rgba(240,253,244,0.35)' }}>Brak zapisanych reviewów</p>
        <p className="text-xs" style={{ color: 'rgba(240,253,244,0.2)' }}>Zacznij pisać wieczorne review — pojawią się tutaj</p>
      </div>
    )
  }

  const grouped = groupByMonth(reviews)

  return (
    <div className="space-y-6">
      {grouped.map(({ label, reviews: monthReviews }) => (
        <div key={label} className="space-y-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'rgba(74,222,128,0.6)' }}>{label}</span>
            <div className="flex-1 h-px" style={{ background: 'rgba(34,197,94,0.1)' }} />
            <span className="text-xs" style={{ color: 'rgba(240,253,244,0.25)' }}>{monthReviews.length} dni</span>
          </div>
          <div className="space-y-2">
            {monthReviews.map(r => <ReviewCard key={r.id} review={r} />)}
          </div>
        </div>
      ))}
    </div>
  )
}

function ReviewCard({ review }: { review: DailyReview }) {
  const [expanded, setExpanded] = useState(false)
  const date = new Date(review.date)
  const dateStr = date.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' })
  const color = energyColor(review.energy)

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(34,197,94,0.08)' }}
    >
      {/* Header — always visible, clickable */}
      <button
        onClick={() => setExpanded(e => !e)}
        className="w-full flex items-center gap-3 p-4 text-left"
      >
        {/* Energy dot */}
        <div
          className="w-2.5 h-2.5 rounded-full flex-shrink-0"
          style={{ background: color, boxShadow: `0 0 6px ${color}80` }}
        />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium capitalize" style={{ color: '#f0fdf4' }}>{dateStr}</p>
          {!expanded && (
            <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(240,253,244,0.4)' }}>
              {review.wentWell}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-sm font-bold" style={{ color }}>{review.energy}/10</span>
          {expanded ? <ChevronUp size={14} style={{ color: 'rgba(240,253,244,0.3)' }} /> : <ChevronDown size={14} style={{ color: 'rgba(240,253,244,0.3)' }} />}
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 space-y-3" style={{ borderTop: '1px solid rgba(34,197,94,0.08)' }}>
          <div className="pt-3 space-y-3">
            <Section label="Co poszło dobrze" value={review.wentWell} color="#22C55E" />
            <Section label="Co zrobiłbym inaczej" value={review.improve} color="#f59e0b" />
            <Section label="Plan na jutro" value={review.tomorrowPlan} color="#8b5cf6" />
          </div>
        </div>
      )}
    </div>
  )
}

function Section({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold" style={{ color: `${color}99` }}>{label}</p>
      <p className="text-sm whitespace-pre-wrap" style={{ color: 'rgba(240,253,244,0.75)' }}>{value}</p>
    </div>
  )
}
