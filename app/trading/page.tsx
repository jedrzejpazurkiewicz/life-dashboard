import { TrendingUp, Clock } from 'lucide-react'

export default function TradingPage() {
  return (
    <div className="space-y-5 animate-in">
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#f0fdf4' }}>Trading Journal</h1>
        <p className="text-sm mt-0.5" style={{ color: 'rgba(240,253,244,0.4)' }}>Dziennik trade'ów</p>
      </div>

      <div className="card p-10 text-center space-y-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto"
          style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}
        >
          <TrendingUp size={28} style={{ color: '#22C55E' }} />
        </div>
        <div>
          <h2 className="font-semibold text-lg" style={{ color: '#f0fdf4' }}>Faza 2</h2>
          <p className="text-sm mt-2" style={{ color: 'rgba(240,253,244,0.45)' }}>
            Trading journal będzie dostępny po ukończeniu podstawowych modułów.<br />
            Najpierw zbuduj fundament — AI automation, content, kapitał.
          </p>
        </div>
        <div
          className="flex items-center justify-center gap-2 text-sm px-4 py-3 rounded-xl mx-auto max-w-xs"
          style={{ background: 'rgba(34,197,94,0.06)', border: '1px solid rgba(34,197,94,0.12)', color: 'rgba(34,197,94,0.7)' }}
        >
          <Clock size={14} />
          Polecany start: po 6 miesiącach + demo trading
        </div>
      </div>
    </div>
  )
}
