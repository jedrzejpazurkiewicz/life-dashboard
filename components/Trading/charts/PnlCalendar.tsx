'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Trade = { date: Date; pnl: number | null; instrument: string; size: number | null }

const DAYS = ['Pn', 'Wt', 'Śr', 'Cz', 'Pt', 'Sb', 'Nd']
const MONTHS = ['Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec', 'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień']

const POINT_VALUE: Record<string, number> = { NASDAQ: 20, SP500: 50 }

function toUsd(pnl: number, instrument: string, size: number) {
  return pnl * (POINT_VALUE[instrument] ?? 20) * size
}

function ymd(d: Date) {
  return d.toISOString().slice(0, 10)
}

export default function PnlCalendar({ trades, showUsd }: { trades: Trade[]; showUsd: boolean }) {
  const now = new Date()
  const [view, setView] = useState({ year: now.getFullYear(), month: now.getMonth() })

  // Aggregate P&L per day (both pts and usd)
  const byDay = new Map<string, { pnl: number; pnlUsd: number; count: number }>()
  for (const t of trades) {
    if (t.pnl === null) continue
    const k = ymd(new Date(t.date))
    const cur = byDay.get(k) ?? { pnl: 0, pnlUsd: 0, count: 0 }
    cur.pnl += t.pnl
    cur.pnlUsd += toUsd(t.pnl, t.instrument, t.size ?? 1)
    cur.count++
    byDay.set(k, cur)
  }

  // Build month grid
  const firstOfMonth = new Date(view.year, view.month, 1)
  const lastOfMonth = new Date(view.year, view.month + 1, 0)
  const startWeekDay = firstOfMonth.getDay() === 0 ? 6 : firstOfMonth.getDay() - 1
  const daysInMonth = lastOfMonth.getDate()

  const cells: Array<{ date: Date | null; pnl: number; pnlUsd: number; count: number } | null> = []
  for (let i = 0; i < startWeekDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(view.year, view.month, d)
    const stats = byDay.get(ymd(date)) ?? { pnl: 0, pnlUsd: 0, count: 0 }
    cells.push({ date, ...stats })
  }
  while (cells.length % 7 !== 0) cells.push(null)

  // Weekly P&L
  const weeklyPnl: { idx: number; pnl: number; pnlUsd: number; tradeCount: number }[] = []
  for (let w = 0; w < cells.length / 7; w++) {
    let weekPnl = 0, weekPnlUsd = 0, weekTrades = 0
    for (let d = 0; d < 7; d++) {
      const c = cells[w * 7 + d]
      if (c) { weekPnl += c.pnl; weekPnlUsd += c.pnlUsd; weekTrades += c.count }
    }
    weeklyPnl.push({ idx: w, pnl: weekPnl, pnlUsd: weekPnlUsd, tradeCount: weekTrades })
  }

  // Monthly total
  const monthEntries = Array.from(byDay.entries())
    .filter(([k]) => k.startsWith(`${view.year}-${String(view.month + 1).padStart(2, '0')}`))
  const monthPnl = monthEntries.reduce((s, [, v]) => s + v.pnl, 0)
  const monthPnlUsd = monthEntries.reduce((s, [, v]) => s + v.pnlUsd, 0)

  function fmtVal(pts: number, usd: number) {
    if (!showUsd) return pts !== 0 ? `${pts >= 0 ? '+' : ''}${pts.toFixed(0)}` : null
    return usd !== 0 ? `${usd >= 0 ? '+' : '-'}$${Math.abs(usd).toLocaleString('en-US', { maximumFractionDigits: 0 })}` : null
  }

  function changeMonth(delta: number) {
    let m = view.month + delta
    let y = view.year
    if (m < 0) { m = 11; y -= 1 }
    if (m > 11) { m = 0; y += 1 }
    setView({ year: y, month: m })
  }

  function cellColor(pnl: number, count: number) {
    if (count === 0) return { bg: 'rgba(255,255,255,0.02)', text: 'rgba(240,253,244,0.25)' }
    if (pnl > 0) {
      const intensity = Math.min(0.35, 0.1 + pnl / 200)
      return { bg: `rgba(34,197,94,${intensity})`, text: '#22C55E', border: 'rgba(34,197,94,0.3)' }
    }
    if (pnl < 0) {
      const intensity = Math.min(0.35, 0.1 + Math.abs(pnl) / 200)
      return { bg: `rgba(239,68,68,${intensity})`, text: '#EF4444', border: 'rgba(239,68,68,0.3)' }
    }
    return { bg: 'rgba(255,255,255,0.04)', text: 'rgba(240,253,244,0.4)' }
  }

  return (
    <div>
    <style>{`
      @keyframes neon-trace { from { stroke-dashoffset: 392; } to { stroke-dashoffset: 0; } }
      .cal-trace { stroke-dasharray: 130 262; stroke-dashoffset: 392; opacity: 0; stroke-width: 3; fill: none; filter: drop-shadow(0 0 3px currentColor); }
      .cal-win  .cal-trace { stroke: #22C55E; }
      .cal-loss .cal-trace { stroke: #EF4444; }
      .cal-win:hover  .cal-trace { opacity: 1; animation: neon-trace 2.8s linear infinite; }
      .cal-loss:hover .cal-trace { opacity: 1; animation: neon-trace 2.8s linear infinite; }
    `}</style>
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => changeMonth(-1)} style={btnStyle}><ChevronLeft size={14} /></button>
        <div className="text-center">
          <p className="font-semibold text-sm" style={{ color: '#f0fdf4' }}>{MONTHS[view.month]} {view.year}</p>
          <p className="font-bold text-xs mt-0.5" style={{ color: monthPnl > 0 ? '#22C55E' : monthPnl < 0 ? '#EF4444' : 'rgba(240,253,244,0.4)' }}>
            {showUsd
              ? (monthPnlUsd !== 0 ? `${monthPnlUsd >= 0 ? '+' : '-'}$${Math.abs(monthPnlUsd).toLocaleString('en-US', { maximumFractionDigits: 0 })}` : '—')
              : (monthPnl !== 0 ? `${monthPnl >= 0 ? '+' : ''}${monthPnl.toFixed(2)} pkt` : '—')
            }
          </p>
        </div>
        <button onClick={() => changeMonth(1)} style={btnStyle}><ChevronRight size={14} /></button>
      </div>

      {/* Day headers */}
      <div className="grid gap-1 mb-1" style={{ gridTemplateColumns: 'repeat(7, 1fr) 60px' }}>
        {DAYS.map(d => (
          <div key={d} className="text-center text-xs py-1" style={{ color: 'rgba(240,253,244,0.35)' }}>{d}</div>
        ))}
        <div className="text-center text-xs py-1" style={{ color: 'rgba(240,253,244,0.35)' }}>Tydzień</div>
      </div>

      {/* Grid */}
      <div className="grid gap-1" style={{ gridTemplateColumns: 'repeat(7, 1fr) 60px' }}>
        {cells.map((c, i) => {
          if (i > 0 && i % 7 === 0) {
            const week = weeklyPnl[(i / 7) - 1]
            const wColor = week.pnl > 0 ? '#22C55E' : week.pnl < 0 ? '#EF4444' : 'rgba(240,253,244,0.3)'
            return [
              <WeekCell key={`w-${i}`} pnl={week.pnl} pnlUsd={week.pnlUsd} count={week.tradeCount} color={wColor} showUsd={showUsd} />,
              renderCell(c, i),
            ]
          }
          return renderCell(c, i)
        }).flat().filter(Boolean)}
        {/* Last week summary */}
        {(() => {
          const last = weeklyPnl[weeklyPnl.length - 1]
          const wColor = last.pnl > 0 ? '#22C55E' : last.pnl < 0 ? '#EF4444' : 'rgba(240,253,244,0.3)'
          return <WeekCell key="w-last" pnl={last.pnl} pnlUsd={last.pnlUsd} count={last.tradeCount} color={wColor} showUsd={showUsd} />
        })()}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-3 text-xs" style={{ color: 'rgba(240,253,244,0.4)' }}>
        <span>Mniej</span>
        <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(239,68,68,0.35)' }} />
        <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(239,68,68,0.15)' }} />
        <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(255,255,255,0.04)' }} />
        <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(34,197,94,0.15)' }} />
        <div className="w-3 h-3 rounded-sm" style={{ background: 'rgba(34,197,94,0.35)' }} />
        <span>Więcej</span>
      </div>
    </div>
  )

  function renderCell(c: typeof cells[0], i: number) {
    if (!c) return <div key={i} />
    const { bg, text, border } = cellColor(c.pnl, c.count)
    const isToday = ymd(c.date!) === ymd(new Date())
    const label = fmtVal(c.pnl, c.pnlUsd)
    const hoverClass = c.count > 0 ? (c.pnl > 0 ? 'cal-win' : 'cal-loss') : ''
    return (
      <div
        key={i}
        className={`aspect-square rounded-md ${hoverClass}`}
        style={{ position: 'relative', background: isToday ? '#22C55E' : bg, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: border ? `1px solid ${border}` : '1px solid transparent' }}
        title={c.count > 0 ? `${c.pnl >= 0 ? '+' : ''}${c.pnl.toFixed(2)} pkt · $${Math.abs(c.pnlUsd).toFixed(0)} · ${c.count} trade'ów` : ''}
      >
        {/* neon border trace SVG */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }}>
          <rect className="cal-trace" x="1.5" y="1.5" width="97" height="97" rx="5" ry="5" />
        </svg>
        <span style={{ color: isToday ? '#080F0A' : text, fontWeight: c.count > 0 ? 600 : 400, fontSize: 15, position: 'relative' }}>{c.date!.getDate()}</span>
        {c.count > 0 && label && (
          <span style={{ color: isToday ? '#080F0A' : text, fontSize: 13, marginTop: 1, fontWeight: 600, position: 'relative' }}>{label}</span>
        )}
      </div>
    )
  }
}

function WeekCell({ pnl, pnlUsd, count, color, showUsd }: { pnl: number; pnlUsd: number; count: number; color: string; showUsd: boolean }) {
  let label = '—'
  if (count > 0) {
    if (showUsd) {
      label = (pnlUsd >= 0 ? '+' : '-') + '$' + Math.abs(pnlUsd).toLocaleString('en-US', { maximumFractionDigits: 0 })
    } else {
      label = (pnl >= 0 ? '+' : '') + pnl.toFixed(0)
    }
  }
  return (
    <div
      className="aspect-square rounded-md flex flex-col items-center justify-center"
      style={{ background: 'rgba(255,255,255,0.02)', border: '1px dashed rgba(34,197,94,0.1)' }}
    >
      <span style={{ color, fontSize: 13, fontWeight: 700 }}>{label}</span>
      <span style={{ color: 'rgba(240,253,244,0.3)', fontSize: 11 }}>{count} tr.</span>
    </div>
  )
}

const btnStyle: React.CSSProperties = {
  background: 'rgba(34,197,94,0.06)',
  border: '1px solid rgba(34,197,94,0.15)',
  color: '#22C55E',
  width: 28,
  height: 28,
  borderRadius: 8,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}
