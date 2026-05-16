'use client'

import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell, ReferenceLine } from 'recharts'

type Trade = { date: Date; pnl: number | null; session: string | null }

export default function SessionChart({ trades }: { trades: Trade[] }) {
  const closed = trades.filter(t => t.pnl !== null)

  const buckets: Record<string, { pnl: number; count: number }> = {
    LONDON: { pnl: 0, count: 0 },
    NEW_YORK: { pnl: 0, count: 0 },
    OTHER: { pnl: 0, count: 0 },
  }

  for (const t of closed) {
    const key = t.session ?? 'OTHER'
    if (!buckets[key]) buckets[key] = { pnl: 0, count: 0 }
    buckets[key].pnl += t.pnl ?? 0
    buckets[key].count++
  }

  const data = [
    { name: 'London Open', pnl: Math.round(buckets.LONDON.pnl * 100) / 100, count: buckets.LONDON.count },
    { name: 'New York Open', pnl: Math.round(buckets.NEW_YORK.pnl * 100) / 100, count: buckets.NEW_YORK.count },
    { name: 'Poza sesją', pnl: Math.round(buckets.OTHER.pnl * 100) / 100, count: buckets.OTHER.count },
  ]

  if (closed.length === 0) {
    return <p style={{ color: 'rgba(240,253,244,0.45)', fontSize: 12, padding: '40px 0', textAlign: 'center' }}>Brak danych</p>
  }

  return (
    <div style={{ width: '100%', height: 200 }}>
      <ResponsiveContainer>
        <BarChart data={data} margin={{ top: 10, right: 5, left: 0, bottom: 0 }}>
          <XAxis
            dataKey="name"
            stroke="rgba(240,253,244,0.3)"
            tick={{ fill: 'rgba(240,253,244,0.5)', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="rgba(240,253,244,0.3)"
            tick={{ fill: 'rgba(240,253,244,0.4)', fontSize: 11 }}
            tickLine={false}
            axisLine={false}
            width={40}
          />
          <ReferenceLine y={0} stroke="rgba(240,253,244,0.15)" />
          <Tooltip
            cursor={{ fill: 'rgba(34,197,94,0.05)' }}
            contentStyle={{
              background: 'rgba(8,15,10,0.95)',
              border: '1px solid rgba(34,197,94,0.2)',
              borderRadius: 10,
              color: '#f0fdf4',
              fontSize: 12,
            }}
            formatter={(v, _n, props) => {
              const num = Number(v)
              const count = (props as { payload?: { count?: number } })?.payload?.count ?? 0
              return [`${(num >= 0 ? '+' : '') + num.toFixed(2)} pkt (${count} trade'ów)`, 'P&L']
            }}
          />
          <Bar dataKey="pnl" radius={[6, 6, 0, 0]}>
            {data.map((entry, i) => (
              <Cell key={i} fill={entry.pnl >= 0 ? '#22C55E' : '#EF4444'} fillOpacity={entry.count === 0 ? 0.15 : 0.85} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
