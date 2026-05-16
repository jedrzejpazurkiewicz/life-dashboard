'use client'

import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, ReferenceLine } from 'recharts'

type Trade = { date: Date; pnl: number | null; instrument: string; size: number | null }

const POINT_VALUE: Record<string, number> = { NASDAQ: 20, SP500: 50 }

export default function EquityCurve({ trades, showUsd }: { trades: Trade[]; showUsd: boolean }) {
  const closed = trades
    .filter(t => t.pnl !== null)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  let cumPts = 0
  let cumUsd = 0
  const data = closed.map((t, i) => {
    cumPts += t.pnl ?? 0
    cumUsd += (t.pnl ?? 0) * (POINT_VALUE[t.instrument] ?? 20) * (t.size ?? 1)
    return {
      idx: i + 1,
      pnl: Math.round((showUsd ? cumUsd : cumPts) * 100) / 100,
      date: new Date(t.date).toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' }),
    }
  })

  if (data.length < 2) {
    return <p style={{ color: 'rgba(240,253,244,0.45)', fontSize: 12, padding: '40px 0', textAlign: 'center' }}>Za mało danych do wykresu (min. 2 trade'y)</p>
  }

  const finalVal = data[data.length - 1].pnl
  const color = finalVal >= 0 ? '#22C55E' : '#EF4444'

  return (
    <div style={{ width: '100%', height: 220 }}>
      <ResponsiveContainer>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: showUsd ? 10 : 0, bottom: 0 }}>
          <defs>
            <linearGradient id="equityGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.4} />
              <stop offset="100%" stopColor={color} stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="idx"
            stroke="rgba(240,253,244,0.3)"
            tick={{ fill: 'rgba(240,253,244,0.4)', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="rgba(240,253,244,0.3)"
            tick={{ fill: 'rgba(240,253,244,0.4)', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={showUsd ? 55 : 40}
            tickFormatter={v => showUsd ? '$' + Number(v).toLocaleString('en-US', { maximumFractionDigits: 0 }) : String(v)}
          />
          <ReferenceLine y={0} stroke="rgba(240,253,244,0.15)" strokeDasharray="3 3" />
          <Tooltip
            contentStyle={{
              background: 'rgba(8,15,10,0.95)',
              border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: 10,
              color: '#f0fdf4',
              fontSize: 12,
            }}
            labelFormatter={(v) => `Trade #${v}`}
            formatter={(v) => {
              const num = Number(v)
              const label = showUsd
                ? (num >= 0 ? '+' : '-') + '$' + Math.abs(num).toLocaleString('en-US', { maximumFractionDigits: 0 })
                : (num >= 0 ? '+' : '') + num.toFixed(2) + ' pkt'
              return [label, 'P&L']
            }}
          />
          <Area
            type="monotone"
            dataKey="pnl"
            stroke={color}
            strokeWidth={2}
            fill="url(#equityGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
