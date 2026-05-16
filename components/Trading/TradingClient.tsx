'use client'

import { useState, useMemo, useEffect, useTransition } from 'react'
import { TrendingUp, TrendingDown, Plus, Trash2, Award, BarChart2, Flame, Target, DollarSign, Activity, ImageIcon, X, Building2, CheckCircle2, AlertCircle, Clock, Wallet } from 'lucide-react'
import { deleteTrade, addPropFirm, deletePropFirm, updatePropFirmStatus, updatePropFirmPnl } from '@/app/actions'
import TradeForm from './TradeForm'
import EquityCurve from './charts/EquityCurve'
import DayOfWeekChart from './charts/DayOfWeekChart'
import SessionChart from './charts/SessionChart'
import PnlCalendar from './charts/PnlCalendar'

type Trade = {
  id: number
  date: Date
  instrument: string
  session: string | null
  direction: string
  entry: number
  stopLoss: number
  takeProfit: number
  takeProfit2: number | null
  takeProfit3: number | null
  exit: number | null
  size: number | null
  pnl: number | null
  result: string | null
  emotion: number | null
  notes: string | null
  chartImage: string | null
  reasons: string | null
}

const REASON_LABELS: Record<string, string> = {
  LIQ_SWEEP: 'Liq Sweep',
  BOS_1M: 'BOS 1m',
  BOS_5M: 'BOS 5m',
  PREV_TREND: 'Prev Trend',
  SMT: 'SMT',
  FVG: 'FVG',
  IFVG: 'iFVG',
}

function parseReasons(json: string | null): string[] {
  if (!json) return []
  try {
    const arr = JSON.parse(json)
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

type PropFirmType = {
  id: number
  firm: string
  accountSize: number
  phase: string
  status: string
  currentPnl: number
  startDate: Date
  notes: string | null
}

type Props = { trades: Trade[]; propFirms: PropFirmType[] }

const GREEN = '#22C55E'
const RED = '#EF4444'
const TEXT = '#f0fdf4'
const TEXT_DIM = 'rgba(240,253,244,0.45)'
const BORDER = 'rgba(34,197,94,0.12)'

const POINT_VALUE: Record<string, number> = {
  NASDAQ: 20,
  SP500: 50,
}

function pointsToDollars(pnl: number, instrument: string, size = 1): number {
  return pnl * (POINT_VALUE[instrument] ?? 20) * size
}

function fmtPnl(pnl: number, instrument: string, size = 1) {
  const pts = (pnl >= 0 ? '+' : '') + pnl.toFixed(2)
  const usd = pointsToDollars(pnl, instrument, size)
  const usdStr = (usd >= 0 ? '+' : '') + '$' + Math.abs(usd).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })
  return { pts, usd: usdStr, usdRaw: usd }
}

function pnlColor(v: number) {
  if (v > 0) return GREEN
  if (v < 0) return RED
  return TEXT_DIM
}

function fmt(v: number) {
  return (v >= 0 ? '+' : '') + v.toFixed(2)
}

function calcStats(trades: Trade[]) {
  const closed = trades.filter(t => t.pnl !== null)
  const wins = closed.filter(t => t.result === 'WIN')
  const losses = closed.filter(t => t.result === 'LOSS')
  const totalPnl = closed.reduce((s, t) => s + (t.pnl ?? 0), 0)
  const winRate = closed.length > 0 ? (wins.length / closed.length) * 100 : 0
  const avgWin = wins.length > 0 ? wins.reduce((s, t) => s + (t.pnl ?? 0), 0) / wins.length : 0
  const avgLoss = losses.length > 0 ? Math.abs(losses.reduce((s, t) => s + (t.pnl ?? 0), 0) / losses.length) : 0
  const profitFactor = avgLoss > 0 ? avgWin / avgLoss : avgWin > 0 ? Infinity : 0
  const expectancy = closed.length > 0 ? totalPnl / closed.length : 0
  const bestTrade = closed.reduce((b, t) => (t.pnl ?? 0) > (b?.pnl ?? -Infinity) ? t : b, null as Trade | null)
  const worstTrade = closed.reduce((w, t) => (t.pnl ?? 0) < (w?.pnl ?? Infinity) ? t : w, null as Trade | null)

  // Streaks
  const sorted = [...closed].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  let maxWinStreak = 0
  let maxLossStreak = 0
  let currentWinStreak = 0
  let currentLossStreak = 0
  let currentStreak = 0
  let currentStreakType: 'WIN' | 'LOSS' | null = null

  for (const t of sorted) {
    if (t.result === 'WIN') {
      currentWinStreak++
      currentLossStreak = 0
      maxWinStreak = Math.max(maxWinStreak, currentWinStreak)
    } else if (t.result === 'LOSS') {
      currentLossStreak++
      currentWinStreak = 0
      maxLossStreak = Math.max(maxLossStreak, currentLossStreak)
    }
  }
  if (sorted.length > 0) {
    const last = sorted[sorted.length - 1]
    if (last.result === 'WIN') {
      currentStreak = currentWinStreak
      currentStreakType = 'WIN'
    } else if (last.result === 'LOSS') {
      currentStreak = currentLossStreak
      currentStreakType = 'LOSS'
    }
  }

  // Avg R:R planned
  const rrs = closed.map(t => Math.abs(t.takeProfit - t.entry) / Math.abs(t.entry - t.stopLoss)).filter(r => isFinite(r))
  const avgRR = rrs.length > 0 ? rrs.reduce((s, r) => s + r, 0) / rrs.length : 0

  // Max drawdown
  let peak = 0
  let cumulative = 0
  let maxDrawdown = 0
  for (const t of sorted) {
    cumulative += t.pnl ?? 0
    if (cumulative > peak) peak = cumulative
    const dd = peak - cumulative
    if (dd > maxDrawdown) maxDrawdown = dd
  }

  // Total USD (each trade has its own instrument point value)
  const totalPnlUsd = closed.reduce((s, t) => s + pointsToDollars(t.pnl ?? 0, t.instrument, t.size ?? 1), 0)
  const expectancyUsd = closed.length > 0 ? totalPnlUsd / closed.length : 0
  const maxDrawdownUsd = maxDrawdown * 20 // approximate with Nasdaq value

  // By instrument
  const byInstrument: Record<string, { pnl: number; pnlUsd: number; wins: number; losses: number; count: number }> = {}
  for (const t of closed) {
    if (!byInstrument[t.instrument]) byInstrument[t.instrument] = { pnl: 0, pnlUsd: 0, wins: 0, losses: 0, count: 0 }
    byInstrument[t.instrument].pnl += t.pnl ?? 0
    byInstrument[t.instrument].pnlUsd += pointsToDollars(t.pnl ?? 0, t.instrument, t.size ?? 1)
    byInstrument[t.instrument].count++
    if (t.result === 'WIN') byInstrument[t.instrument].wins++
    if (t.result === 'LOSS') byInstrument[t.instrument].losses++
  }

  // Zella-like score (0-100): combines win rate, profit factor and avg R:R
  const winRateScore = Math.min(winRate, 70) * (100 / 70) * 0.35
  const pfScore = Math.min(profitFactor, 3) * (100 / 3) * 0.35
  const rrScore = Math.min(avgRR, 3) * (100 / 3) * 0.30
  const zellaScore = Math.round(winRateScore + pfScore + rrScore)

  return {
    totalPnl, totalPnlUsd, winRate, wins: wins.length, losses: losses.length, total: closed.length,
    open: trades.length - closed.length, profitFactor, avgWin, avgLoss, expectancy, expectancyUsd,
    bestTrade, worstTrade, maxWinStreak, maxLossStreak, currentStreak, currentStreakType,
    avgRR, maxDrawdown, maxDrawdownUsd, byInstrument, zellaScore,
  }
}

function StatCard({ label, value, sub, color, icon }: { label: string; value: string; sub?: string; color?: string; icon?: React.ReactNode }) {
  return (
    <div className="card p-4 space-y-1">
      <div className="flex items-center justify-between">
        <p style={{ color: TEXT_DIM, fontSize: 11, textTransform: 'uppercase', letterSpacing: 0.5 }}>{label}</p>
        {icon}
      </div>
      <p className="text-xl font-bold" style={{ color: color ?? TEXT }}>{value}</p>
      {sub && <p style={{ color: TEXT_DIM, fontSize: 11 }}>{sub}</p>}
    </div>
  )
}

export default function TradingClient({ trades, propFirms }: Props) {
  const [tab, setTab] = useState<'journal' | 'propfirms'>('journal')
  const [showForm, setShowForm] = useState(false)
  const [filter, setFilter] = useState<'ALL' | 'NASDAQ' | 'SP500' | 'WIN' | 'LOSS'>('ALL')
  const [lightbox, setLightbox] = useState<string | null>(null)
  const [showUsd, setShowUsd] = useState(true)
  const stats = useMemo(() => calcStats(trades), [trades])

  function displayPnl(pnl: number, instrument: string, size = 1) {
    if (!showUsd) return { value: (pnl >= 0 ? '+' : '') + pnl.toFixed(2), unit: 'pkt' }
    const usd = pointsToDollars(pnl, instrument, size)
    return { value: (usd >= 0 ? '+' : '-') + '$' + Math.abs(usd).toLocaleString('en-US', { maximumFractionDigits: 0 }), unit: '' }
  }

  function displayTotal(pnlPts: number, pnlUsd: number) {
    if (!showUsd) return { value: (pnlPts >= 0 ? '+' : '') + pnlPts.toFixed(2), unit: 'pkt' }
    return { value: (pnlUsd >= 0 ? '+' : '-') + '$' + Math.abs(pnlUsd).toLocaleString('en-US', { maximumFractionDigits: 0 }), unit: '' }
  }

  useEffect(() => {
    if (!lightbox) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightbox(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox])

  const filtered = trades.filter(t => {
    if (filter === 'NASDAQ') return t.instrument === 'NASDAQ'
    if (filter === 'SP500') return t.instrument === 'SP500'
    if (filter === 'WIN') return t.result === 'WIN'
    if (filter === 'LOSS') return t.result === 'LOSS'
    return true
  })

  return (
    <div className="space-y-5 animate-in">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: TEXT }}>Trading</h1>
          <p className="text-sm mt-0.5" style={{ color: TEXT_DIM }}>Nasdaq & S&P 500</p>
        </div>
        <div className="flex items-center gap-2">
          {/* pkt / $ toggle */}
          <div
            className="flex rounded-xl overflow-hidden text-xs font-semibold"
            style={{ border: `1px solid ${BORDER}` }}
          >
            <button
              onClick={() => setShowUsd(false)}
              className="px-3 py-2 transition-all"
              style={{ background: !showUsd ? 'rgba(34,197,94,0.15)' : 'transparent', color: !showUsd ? GREEN : TEXT_DIM }}
            >
              pkt
            </button>
            <button
              onClick={() => setShowUsd(true)}
              className="px-3 py-2 transition-all"
              style={{ background: showUsd ? 'rgba(34,197,94,0.15)' : 'transparent', color: showUsd ? GREEN : TEXT_DIM }}
            >
              $
            </button>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all"
            style={{ background: showForm ? 'rgba(34,197,94,0.15)' : GREEN, color: showForm ? GREEN : '#000', border: showForm ? `1px solid ${GREEN}` : 'none' }}
          >
            <Plus size={16} />
            {showForm ? 'Anuluj' : 'Dodaj trade'}
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 p-1 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${BORDER}` }}>
        {([
          { key: 'journal', label: 'Journal', icon: <TrendingUp size={14} /> },
          { key: 'propfirms', label: `Prop Firms${propFirms.length > 0 ? ` (${propFirms.length})` : ''}`, icon: <Building2 size={14} /> },
        ] as const).map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
            style={{
              background: tab === t.key ? 'rgba(34,197,94,0.15)' : 'transparent',
              color: tab === t.key ? GREEN : TEXT_DIM,
              border: tab === t.key ? `1px solid ${BORDER}` : '1px solid transparent',
            }}
          >
            {t.icon}{t.label}
          </button>
        ))}
      </div>

      {tab === 'propfirms' && <PropFirmsSection propFirms={propFirms} />}

      {tab === 'journal' && <>

      {/* Form */}
      {showForm && (
        <div className="card p-5">
          <TradeForm onDone={() => setShowForm(false)} />
        </div>
      )}

      {/* Empty state */}
      {stats.total === 0 && !showForm && (
        <div className="card p-10 text-center">
          <TrendingUp size={32} style={{ color: 'rgba(34,197,94,0.3)', margin: '0 auto 12px' }} />
          <p style={{ color: TEXT_DIM }}>Brak trade'ów. Dodaj pierwszy trade aby zobaczyć statystyki!</p>
        </div>
      )}

      {stats.total > 0 && (
        <>
          {/* Hero — Performance Score */}
          <div className="card p-6 relative overflow-hidden">
            <div
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{ background: `radial-gradient(circle at 80% 20%, ${stats.totalPnl >= 0 ? 'rgba(34,197,94,0.15)' : 'rgba(239,68,68,0.1)'}, transparent 60%)` }}
            />
            <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p style={{ color: TEXT_DIM, fontSize: 12, textTransform: 'uppercase', letterSpacing: 1 }}>Net P&L</p>
                {(() => {
                  const { value, unit } = displayTotal(stats.totalPnl, stats.totalPnlUsd)
                  return (
                    <p className="text-4xl font-bold mt-1" style={{ color: pnlColor(stats.totalPnl) }}>
                      {value} {unit && <span className="text-lg" style={{ color: TEXT_DIM }}>{unit}</span>}
                    </p>
                  )
                })()}
                <p style={{ color: TEXT_DIM, fontSize: 12, marginTop: 6 }}>
                  Expectancy:{' '}
                  <span style={{ color: pnlColor(stats.expectancy) }}>
                    {showUsd
                      ? (stats.expectancyUsd >= 0 ? '+' : '-') + '$' + Math.abs(stats.expectancyUsd).toLocaleString('en-US', { maximumFractionDigits: 0 })
                      : (stats.expectancy >= 0 ? '+' : '') + stats.expectancy.toFixed(2) + ' pkt'
                    }
                  </span>{' '}/ trade
                </p>
              </div>
              {/* Zella score ring */}
              <div className="flex items-center gap-4">
                <ScoreRing value={stats.zellaScore} />
                <div>
                  <p style={{ color: TEXT_DIM, fontSize: 11, textTransform: 'uppercase' }}>Performance Score</p>
                  <p className="text-xs mt-1" style={{ color: TEXT_DIM }}>Win Rate + Profit Factor + R:R</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCard
              label="Win Rate"
              value={stats.winRate.toFixed(0) + '%'}
              sub={`${stats.wins}W / ${stats.losses}L`}
              color={stats.winRate >= 50 ? GREEN : RED}
              icon={<Target size={14} style={{ color: TEXT_DIM }} />}
            />
            <StatCard
              label="Profit Factor"
              value={isFinite(stats.profitFactor) ? stats.profitFactor.toFixed(2) : '∞'}
              sub={`avg W: ${stats.avgWin.toFixed(1)} / L: ${stats.avgLoss.toFixed(1)}`}
              color={stats.profitFactor >= 1 ? GREEN : RED}
              icon={<Activity size={14} style={{ color: TEXT_DIM }} />}
            />
            <StatCard
              label="Avg R:R"
              value={stats.avgRR.toFixed(2)}
              sub="planowany stosunek"
              icon={<BarChart2 size={14} style={{ color: TEXT_DIM }} />}
            />
            <StatCard
              label={stats.currentStreakType === 'WIN' ? 'Aktualna passa' : stats.currentStreakType === 'LOSS' ? 'Aktualna seria strat' : 'Streaki'}
              value={
                stats.currentStreakType
                  ? `${stats.currentStreak}${stats.currentStreakType === 'WIN' ? 'W' : 'L'}`
                  : '—'
              }
              sub={`max W: ${stats.maxWinStreak} / max L: ${stats.maxLossStreak}`}
              color={stats.currentStreakType === 'WIN' ? GREEN : stats.currentStreakType === 'LOSS' ? RED : TEXT}
              icon={<Flame size={14} style={{ color: stats.currentStreakType === 'WIN' ? GREEN : stats.currentStreakType === 'LOSS' ? RED : TEXT_DIM }} />}
            />
          </div>

          {/* Equity curve */}
          {stats.total >= 2 && (
            <div className="card p-5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-semibold text-sm" style={{ color: TEXT }}>Equity Curve</p>
                  <p style={{ color: TEXT_DIM, fontSize: 11 }}>Skumulowany P&L w czasie</p>
                </div>
                <div className="text-right">
                  <p style={{ color: TEXT_DIM, fontSize: 11 }}>Max Drawdown</p>
                  <p className="font-bold text-sm" style={{ color: RED }}>
                    {showUsd
                      ? '−$' + Math.abs(stats.maxDrawdownUsd).toLocaleString('en-US', { maximumFractionDigits: 0 })
                      : '−' + stats.maxDrawdown.toFixed(2) + ' pkt'
                    }
                  </p>
                </div>
              </div>
              <EquityCurve trades={trades} showUsd={showUsd} />
            </div>
          )}

          {/* Calendar */}
          <div className="card p-5">
            <p className="font-semibold text-sm mb-3" style={{ color: TEXT }}>Kalendarz P&L</p>
            <PnlCalendar trades={trades} showUsd={showUsd} />
          </div>

          {/* Two-column charts */}
          <div className="grid gap-4 lg:grid-cols-2">
            <div className="card p-5">
              <p className="font-semibold text-sm mb-3" style={{ color: TEXT }}>P&L wg dnia tygodnia</p>
              <DayOfWeekChart trades={trades} />
            </div>
            <div className="card p-5">
              <p className="font-semibold text-sm mb-3" style={{ color: TEXT }}>P&L wg sesji</p>
              <SessionChart trades={trades} />
            </div>
          </div>

          {/* Best/Worst + Instrument breakdown */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {stats.bestTrade && (
              <div className="card p-4 flex items-center gap-3">
                <Award size={18} style={{ color: GREEN }} />
                <div>
                  <p style={{ color: TEXT_DIM, fontSize: 11 }}>Najlepszy trade</p>
                  {(() => { const { value, unit } = displayPnl(stats.bestTrade.pnl!, stats.bestTrade.instrument, stats.bestTrade.size ?? 1); return <p className="font-bold" style={{ color: GREEN }}>{value} {unit}</p> })()}
                  <p style={{ color: TEXT_DIM, fontSize: 11 }}>{stats.bestTrade.instrument === 'SP500' ? 'S&P 500' : 'Nasdaq'} · {stats.bestTrade.direction}</p>
                </div>
              </div>
            )}
            {stats.worstTrade && (
              <div className="card p-4 flex items-center gap-3">
                <BarChart2 size={18} style={{ color: RED }} />
                <div>
                  <p style={{ color: TEXT_DIM, fontSize: 11 }}>Najgorszy trade</p>
                  {(() => { const { value, unit } = displayPnl(stats.worstTrade.pnl!, stats.worstTrade.instrument, stats.worstTrade.size ?? 1); return <p className="font-bold" style={{ color: RED }}>{value} {unit}</p> })()}
                  <p style={{ color: TEXT_DIM, fontSize: 11 }}>{stats.worstTrade.instrument === 'SP500' ? 'S&P 500' : 'Nasdaq'} · {stats.worstTrade.direction}</p>
                </div>
              </div>
            )}
            {Object.entries(stats.byInstrument).map(([ins, d]) => (
              <div key={ins} className="card p-4 flex items-center gap-3">
                <DollarSign size={18} style={{ color: pnlColor(d.pnl) }} />
                <div>
                  <p style={{ color: TEXT_DIM, fontSize: 11 }}>{ins === 'SP500' ? 'S&P 500' : 'Nasdaq'}</p>
                  <p className="font-bold" style={{ color: pnlColor(d.pnl) }}>
                    {showUsd
                      ? (d.pnlUsd >= 0 ? '+' : '-') + '$' + Math.abs(d.pnlUsd).toLocaleString('en-US', { maximumFractionDigits: 0 })
                      : (d.pnl >= 0 ? '+' : '') + d.pnl.toFixed(2) + ' pkt'
                    }
                  </p>
                  <p style={{ color: TEXT_DIM, fontSize: 11 }}>{d.count} trade'ów · {d.wins}W/{d.losses}L</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Filters */}
      {trades.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {(['ALL', 'NASDAQ', 'SP500', 'WIN', 'LOSS'] as const).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
              style={{
                background: filter === f ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${filter === f ? GREEN : BORDER}`,
                color: filter === f ? GREEN : TEXT_DIM,
              }}
            >
              {f === 'ALL' ? 'Wszystkie' : f === 'NASDAQ' ? 'Nasdaq' : f === 'SP500' ? 'S&P 500' : f === 'WIN' ? 'Wygrane' : 'Stratne'}
            </button>
          ))}
        </div>
      )}

      {/* Trade list */}
      {filtered.length > 0 && (
        <div className="space-y-2">
          {filtered.map(trade => (
            <TradeRow key={trade.id} trade={trade} onOpenImage={setLightbox} showUsd={showUsd} />
          ))}
        </div>
      )}

      </>}

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.92)',
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
            cursor: 'zoom-out',
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: 'absolute',
              top: 20,
              right: 20,
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: 12,
              padding: 8,
              color: '#fff',
              cursor: 'pointer',
            }}
            aria-label="Zamknij"
          >
            <X size={20} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox}
            alt="Chart"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '95%', maxHeight: '95%', borderRadius: 12, cursor: 'default' }}
          />
        </div>
      )}
    </div>
  )
}

const PHASE_LABELS: Record<string, string> = {
  CHALLENGE_1: 'Faza 1',
  CHALLENGE_2: 'Faza 2',
  FUNDED: 'Funded',
}

const STATUS_CONFIG: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  ACTIVE:  { label: 'Aktywne',  color: GREEN,     icon: <Clock size={12} /> },
  PASSED:  { label: 'Zdane',    color: '#60a5fa', icon: <CheckCircle2 size={12} /> },
  FAILED:  { label: 'Oblane',   color: RED,       icon: <AlertCircle size={12} /> },
  PAYOUT:  { label: 'Wypłata',  color: '#f59e0b', icon: <Wallet size={12} /> },
}

const COMMON_FIRMS = ['FTMO', 'TopStep', 'True Forex Funds', 'E8 Funding', 'Alpha Capital', 'Funder Trading', 'Inne']

function PropFirmsSection({ propFirms }: { propFirms: PropFirmType[] }) {
  const [showForm, setShowForm] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [formRef, setFormRef] = useState(0)

  function handleAdd(fd: FormData) {
    startTransition(async () => {
      await addPropFirm(fd)
      setShowForm(false)
      setFormRef(r => r + 1)
    })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="font-semibold" style={{ color: TEXT }}>Prop Firms</p>
          <p className="text-xs mt-0.5" style={{ color: TEXT_DIM }}>Śledzenie kont i faz</p>
        </div>
        <button
          onClick={() => setShowForm(s => !s)}
          className="flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-semibold transition-all"
          style={{ background: showForm ? 'rgba(34,197,94,0.12)' : GREEN, color: showForm ? GREEN : '#000', border: showForm ? `1px solid ${GREEN}` : 'none' }}
        >
          <Plus size={15} />{showForm ? 'Anuluj' : 'Dodaj konto'}
        </button>
      </div>

      {showForm && (
        <div className="card p-5 space-y-3" key={formRef}>
          <p className="text-sm font-semibold" style={{ color: TEXT }}>Nowe konto prop firm</p>
          <form action={handleAdd} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <label className="text-xs" style={{ color: TEXT_DIM }}>Firma</label>
                <select name="firm" required className="w-full px-3 py-2 rounded-xl text-sm"
                  style={{ background: 'rgba(34,197,94,0.06)', border: `1px solid ${BORDER}`, color: TEXT }}>
                  {COMMON_FIRMS.map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs" style={{ color: TEXT_DIM }}>Rozmiar konta ($)</label>
                <input name="accountSize" type="number" required placeholder="100000" min="1000"
                  className="w-full px-3 py-2 rounded-xl text-sm"
                  style={{ background: 'rgba(34,197,94,0.06)', border: `1px solid ${BORDER}`, color: TEXT }} />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-xs" style={{ color: TEXT_DIM }}>Faza</label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(PHASE_LABELS).map(([val, label]) => (
                  <label key={val} className="flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all"
                    style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${BORDER}` }}>
                    <input type="radio" name="phase" value={val} required className="accent-green-500" />
                    <span className="text-sm" style={{ color: TEXT }}>{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <input name="notes" placeholder="Notatki (opcjonalnie)" className="w-full px-3 py-2 rounded-xl text-sm"
              style={{ background: 'rgba(34,197,94,0.06)', border: `1px solid ${BORDER}`, color: TEXT }} />
            <button type="submit" disabled={isPending}
              className="w-full py-2.5 rounded-xl text-sm font-semibold"
              style={{ background: `linear-gradient(135deg, #22C55E, #4ADE80)`, color: '#080F0A' }}>
              {isPending ? 'Dodawanie...' : 'Dodaj konto'}
            </button>
          </form>
        </div>
      )}

      {propFirms.length === 0 && !showForm && (
        <div className="card p-10 text-center">
          <Building2 size={32} style={{ color: 'rgba(34,197,94,0.2)', margin: '0 auto 12px' }} />
          <p style={{ color: TEXT_DIM }}>Brak kont prop firm. Dodaj pierwsze!</p>
        </div>
      )}

      <div className="space-y-3">
        {propFirms.map(pf => <PropFirmCard key={pf.id} pf={pf} />)}
      </div>
    </div>
  )
}

function PropFirmCard({ pf }: { pf: PropFirmType }) {
  const [isPending, startTransition] = useTransition()
  const [editingPnl, setEditingPnl] = useState(false)
  const [pnlInput, setPnlInput] = useState(String(pf.currentPnl))
  const statusCfg = STATUS_CONFIG[pf.status] ?? STATUS_CONFIG.ACTIVE
  const pnlColor = pf.currentPnl > 0 ? GREEN : pf.currentPnl < 0 ? RED : TEXT_DIM
  const pnlPct = pf.accountSize > 0 ? (pf.currentPnl / pf.accountSize) * 100 : 0

  function handleStatusChange(status: string) {
    startTransition(async () => { await updatePropFirmStatus(pf.id, status) })
  }

  function handlePnlSave() {
    const val = parseFloat(pnlInput)
    if (isNaN(val)) return
    startTransition(async () => { await updatePropFirmPnl(pf.id, val) })
    setEditingPnl(false)
  }

  function handleDelete() {
    startTransition(async () => { await deletePropFirm(pf.id) })
  }

  return (
    <div className="card p-5 space-y-4" style={{ borderLeft: `3px solid ${statusCfg.color}` }}>
      {/* Top row */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(34,197,94,0.08)', border: `1px solid ${BORDER}` }}>
            <Building2 size={18} style={{ color: GREEN }} />
          </div>
          <div>
            <p className="font-bold text-sm" style={{ color: TEXT }}>{pf.firm}</p>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(139,92,246,0.12)', color: '#a78bfa', border: '1px solid rgba(139,92,246,0.2)' }}>
                {PHASE_LABELS[pf.phase] ?? pf.phase}
              </span>
              <span className="text-xs" style={{ color: TEXT_DIM }}>
                ${pf.accountSize.toLocaleString('en-US')}
              </span>
            </div>
          </div>
        </div>
        <button onClick={handleDelete} disabled={isPending} style={{ color: 'rgba(239,68,68,0.4)', background: 'none', border: 'none', padding: 4, cursor: 'pointer' }}>
          <Trash2 size={14} />
        </button>
      </div>

      {/* P&L */}
      <div className="flex items-center justify-between px-4 py-3 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)' }}>
        <div>
          <p className="text-xs" style={{ color: TEXT_DIM }}>Aktualny P&L</p>
          {editingPnl ? (
            <div className="flex items-center gap-2 mt-1">
              <input
                type="number" value={pnlInput} step="0.01"
                onChange={e => setPnlInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handlePnlSave()}
                autoFocus
                className="w-28 px-2 py-1 rounded-lg text-sm"
                style={{ background: 'rgba(34,197,94,0.08)', border: `1px solid ${BORDER}`, color: TEXT }}
              />
              <button onClick={handlePnlSave} className="text-xs px-2 py-1 rounded-lg" style={{ background: GREEN, color: '#000' }}>OK</button>
              <button onClick={() => setEditingPnl(false)} className="text-xs" style={{ color: TEXT_DIM }}>✕</button>
            </div>
          ) : (
            <button onClick={() => setEditingPnl(true)} className="text-left">
              <p className="font-bold text-lg" style={{ color: pnlColor }}>
                {pf.currentPnl >= 0 ? '+' : ''}${pf.currentPnl.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </p>
              <p className="text-xs" style={{ color: pnlColor }}>
                {pnlPct >= 0 ? '+' : ''}{pnlPct.toFixed(2)}%
              </p>
            </button>
          )}
        </div>
        {/* Progress bar */}
        {!editingPnl && (
          <div className="w-24">
            <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
              <div className="h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(Math.abs(pnlPct) * 5, 100)}%`, background: pnlColor }} />
            </div>
          </div>
        )}
      </div>

      {/* Status selector */}
      <div className="flex gap-2 flex-wrap">
        {Object.entries(STATUS_CONFIG).map(([val, cfg]) => (
          <button
            key={val}
            onClick={() => handleStatusChange(val)}
            disabled={isPending}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
            style={{
              background: pf.status === val ? `${cfg.color}18` : 'rgba(255,255,255,0.03)',
              border: `1px solid ${pf.status === val ? cfg.color + '50' : BORDER}`,
              color: pf.status === val ? cfg.color : TEXT_DIM,
            }}
          >
            {cfg.icon}{cfg.label}
          </button>
        ))}
      </div>

      {pf.notes && <p className="text-xs" style={{ color: TEXT_DIM }}>{pf.notes}</p>}
      <p className="text-xs" style={{ color: 'rgba(240,253,244,0.2)' }}>
        Dodano: {new Date(pf.startDate).toLocaleDateString('pl-PL', { day: 'numeric', month: 'long', year: 'numeric' })}
      </p>
    </div>
  )
}

function ScoreRing({ value }: { value: number }) {
  const radius = 32
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (value / 100) * circumference
  const color = value >= 70 ? GREEN : value >= 40 ? '#FBBF24' : RED

  return (
    <div style={{ position: 'relative', width: 80, height: 80 }}>
      <svg width="80" height="80" style={{ transform: 'rotate(-90deg)' }}>
        <circle cx="40" cy="40" r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <span className="font-bold text-xl" style={{ color }}>{value}</span>
        <span style={{ color: TEXT_DIM, fontSize: 9 }}>/100</span>
      </div>
    </div>
  )
}

function TradeRow({ trade, onOpenImage, showUsd }: { trade: Trade; onOpenImage: (url: string) => void; showUsd: boolean }) {
  const isLong = trade.direction === 'LONG'
  const rr = trade.stopLoss && trade.takeProfit
    ? Math.abs(trade.takeProfit - trade.entry) / Math.abs(trade.entry - trade.stopLoss)
    : null

  return (
    <div className="card p-4" style={{ borderLeft: `3px solid ${trade.result === 'WIN' ? GREEN : trade.result === 'LOSS' ? RED : 'rgba(34,197,94,0.2)'}` }}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 min-w-0 flex-1">
          {trade.chartImage ? (
            <button
              type="button"
              onClick={() => onOpenImage(trade.chartImage!)}
              className="shrink-0 rounded-lg overflow-hidden transition-all hover:opacity-80"
              style={{ width: 88, height: 56, background: '#000', border: '1px solid rgba(34,197,94,0.15)', cursor: 'zoom-in' }}
              aria-label="Pokaż wykres"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={trade.chartImage} alt="Chart" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ) : (
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
              style={{ background: isLong ? 'rgba(34,197,94,0.1)' : 'rgba(239,68,68,0.1)' }}
            >
              {isLong
                ? <TrendingUp size={14} style={{ color: GREEN }} />
                : <TrendingDown size={14} style={{ color: RED }} />
              }
            </div>
          )}
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold text-sm" style={{ color: TEXT }}>{trade.instrument === 'SP500' ? 'S&P 500' : 'Nasdaq'}</span>
              <span className="text-xs px-2 py-0.5 rounded-md flex items-center gap-1" style={{ background: isLong ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)', color: isLong ? GREEN : RED }}>
                {isLong ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                {isLong ? 'Long' : 'Short'}
              </span>
              {trade.session && (
                <span className="text-xs" style={{ color: 'rgba(240,253,244,0.35)' }}>{trade.session === 'LONDON' ? 'London' : 'New York'}</span>
              )}
              {trade.result && (
                <span className="text-xs font-bold" style={{ color: trade.result === 'WIN' ? GREEN : trade.result === 'LOSS' ? RED : TEXT_DIM }}>{trade.result === 'WIN' ? 'WIN' : trade.result === 'LOSS' ? 'LOSS' : 'BE'}</span>
              )}
              {trade.chartImage && <ImageIcon size={11} style={{ color: GREEN }} />}
            </div>
            <div className="flex gap-3 mt-1 flex-wrap">
              <span style={{ color: TEXT_DIM, fontSize: 11 }}>Wejście: {trade.entry}</span>
              <span style={{ color: TEXT_DIM, fontSize: 11 }}>SL: {trade.stopLoss}</span>
              <span style={{ color: TEXT_DIM, fontSize: 11 }}>
                TP1: {trade.takeProfit}
                {trade.takeProfit2 ? ` · TP2: ${trade.takeProfit2}` : ''}
                {trade.takeProfit3 ? ` · TP3: ${trade.takeProfit3}` : ''}
              </span>
              {trade.exit && <span style={{ color: TEXT_DIM, fontSize: 11 }}>Wyjście: {trade.exit}</span>}
              {rr && <span style={{ color: TEXT_DIM, fontSize: 11 }}>R:R {rr.toFixed(1)}</span>}
              {trade.size && trade.size !== 1 && <span style={{ color: TEXT_DIM, fontSize: 11 }}>{trade.size} kontraktów</span>}
            </div>
            {(() => {
              const reasonsList = parseReasons(trade.reasons)
              if (reasonsList.length === 0) return null
              return (
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                  {reasonsList.map(r => (
                    <span
                      key={r}
                      className="px-2 py-0.5 rounded-md text-xs"
                      style={{
                        background: 'rgba(34,197,94,0.08)',
                        border: '1px solid rgba(34,197,94,0.2)',
                        color: GREEN,
                        fontSize: 10,
                      }}
                    >
                      {REASON_LABELS[r] ?? r}
                    </span>
                  ))}
                </div>
              )
            })()}
            {trade.notes && <p className="mt-1 text-xs" style={{ color: 'rgba(240,253,244,0.3)' }}>{trade.notes}</p>}
          </div>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {trade.pnl !== null && (() => {
            const usd = pointsToDollars(trade.pnl, trade.instrument, trade.size ?? 1)
            return (
              <span className="font-bold text-sm" style={{ color: pnlColor(trade.pnl) }}>
                {showUsd
                  ? (usd >= 0 ? '+' : '-') + '$' + Math.abs(usd).toLocaleString('en-US', { maximumFractionDigits: 0 })
                  : (trade.pnl >= 0 ? '+' : '') + trade.pnl.toFixed(2) + ' pkt'
                }
              </span>
            )
          })()}
          <span style={{ color: TEXT_DIM, fontSize: 11 }}>{new Date(trade.date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' })}</span>
          <form action={deleteTrade.bind(null, trade.id)}>
            <button type="submit" style={{ color: 'rgba(239,68,68,0.4)', cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
              <Trash2 size={14} />
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
