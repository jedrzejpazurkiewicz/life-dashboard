export const revalidate = 3600

const BIRTH = new Date(2006, 7, 30) // 30 sierpień 2006
const END = new Date(2056, 7, 30)   // 30 sierpień 2056

function isLeap(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

export default function CalendarPage() {
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const MS = 1000 * 60 * 60 * 24
  const daysLived = Math.floor((today.getTime() - BIRTH.getTime()) / MS)
  const totalDays = Math.floor((END.getTime() - BIRTH.getTime()) / MS)
  const daysLeft = totalDays - daysLived
  const pct = ((daysLived / totalDays) * 100).toFixed(2)
  const age = today.getFullYear() - 2006 - (
    today < new Date(today.getFullYear(), 7, 30) ? 1 : 0
  )

  const EIGHTEEN = new Date(2024, 7, 30) // 30 sierpień 2024

  // precompute grid: 51 years × 366 days
  type Cell = 'minor' | 'past' | 'today' | 'future' | 'out'
  const grid: { year: number; cells: Cell[] }[] = []

  for (let year = 2006; year <= 2056; year++) {
    const numDays = isLeap(year) ? 366 : 365
    const cells: Cell[] = []

    for (let doy = 1; doy <= 366; doy++) {
      if (doy > numDays) { cells.push('out'); continue }

      const d = new Date(year, 0, doy)
      if (d < BIRTH || d > END) { cells.push('out'); continue }

      if (d.getTime() === today.getTime()) cells.push('today')
      else if (d < EIGHTEEN) cells.push('minor')
      else if (d < today) cells.push('past')
      else cells.push('future')
    }

    grid.push({ year, cells })
  }

  return (
    <div className="space-y-6 animate-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#f0fdf4' }}>Twoje życie w dniach</h1>
        <p className="text-sm mt-0.5" style={{ color: 'rgba(240,253,244,0.4)' }}>
          30 sierpień 2006 → 30 sierpień 2056 &middot; każda kratka = 1 dzień
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card p-4">
          <div className="text-xs mb-1" style={{ color: 'rgba(239,68,68,0.7)' }}>Przeżyte</div>
          <div className="text-xl font-bold" style={{ color: '#fca5a5' }}>
            {daysLived.toLocaleString('pl')}
          </div>
          <div className="text-xs mt-0.5" style={{ color: 'rgba(240,253,244,0.3)' }}>dni · {age} lat</div>
        </div>
        <div className="card p-4">
          <div className="text-xs mb-1" style={{ color: 'rgba(34,197,94,0.7)' }}>Pozostało</div>
          <div className="text-xl font-bold" style={{ color: '#86efac' }}>
            {daysLeft.toLocaleString('pl')}
          </div>
          <div className="text-xs mt-0.5" style={{ color: 'rgba(240,253,244,0.3)' }}>
            dni · {(50 - age - 1)} lat
          </div>
        </div>
        <div className="card p-4">
          <div className="text-xs mb-1" style={{ color: 'rgba(245,158,11,0.7)' }}>Ukończono</div>
          <div className="text-xl font-bold" style={{ color: '#fcd34d' }}>{pct}%</div>
          <div className="text-xs mt-0.5" style={{ color: 'rgba(240,253,244,0.3)' }}>
            z 50 lat
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-2 rounded-full"
            style={{
              width: `${pct}%`,
              background: 'linear-gradient(90deg, #dc2626, #f59e0b)',
              boxShadow: '0 0 8px rgba(239,68,68,0.4)',
              transition: 'width 1s ease',
            }}
          />
        </div>
        <div className="flex justify-between text-xs" style={{ color: 'rgba(240,253,244,0.3)' }}>
          <span>urodziny</span>
          <span>50 lat</span>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 flex-wrap text-xs" style={{ color: 'rgba(240,253,244,0.45)' }}>
        <div className="flex items-center gap-1.5">
          <span className="lc-minor" style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 1 }} />
          <span>0–18 lat</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="lc-past" style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 1 }} />
          <span>18 lat – dziś</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="lc-today" style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 2 }} />
          <span>dziś</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="lc-future" style={{ display: 'inline-block', width: 10, height: 10, borderRadius: 1 }} />
          <span>przyszłość</span>
        </div>
      </div>

      {/* Grid */}
      <div className="overflow-x-auto pb-2" style={{ WebkitOverflowScrolling: 'touch' }}>
        <div style={{ display: 'inline-block', minWidth: 'max-content' }}>
          {/* Month markers */}
          <div style={{ display: 'flex', paddingLeft: 36, marginBottom: 3, gap: '1px' }}>
            {['Sty','Lut','Mar','Kwi','Maj','Cze','Lip','Sie','Wrz','Paź','Lis','Gru'].map((m, i) => {
              const doy = [1,32,60,91,121,152,182,213,244,274,305,335][i]
              return (
                <span
                  key={m}
                  style={{
                    position: 'absolute',
                    left: 36 + (doy - 1) * 6,
                    fontSize: 7,
                    color: 'rgba(240,253,244,0.2)',
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                  }}
                >
                  {m}
                </span>
              )
            })}
          </div>

          {/* Year rows */}
          <div style={{ position: 'relative' }}>
            {grid.map(({ year, cells }) => (
              <div
                key={year}
                style={{ display: 'flex', alignItems: 'center', gap: 2, marginBottom: '1px' }}
              >
                <span
                  style={{
                    width: 32,
                    textAlign: 'right',
                    fontSize: 8,
                    color: 'rgba(240,253,244,0.22)',
                    flexShrink: 0,
                    fontVariantNumeric: 'tabular-nums',
                    paddingRight: 4,
                  }}
                >
                  {year}
                </span>
                <div style={{ display: 'flex', gap: '1px' }}>
                  {cells.map((type, i) =>
                    type === 'out' ? (
                      <span key={i} style={{ display: 'inline-block', width: 5, height: 5 }} />
                    ) : (
                      <span
                        key={i}
                        className={`lc-${type}`}
                        title={new Date(year, 0, i + 1).toLocaleDateString('pl-PL', {
                          day: 'numeric', month: 'long', year: 'numeric',
                        })}
                        style={{ display: 'inline-block', width: 5, height: 5, borderRadius: '0.5px', cursor: 'default' }}
                      />
                    )
                  )}
                </div>
                <span
                  style={{
                    width: 18,
                    fontSize: 8,
                    color: year - 2006 === age ? 'rgba(74,222,128,0.5)' : 'rgba(240,253,244,0.12)',
                    flexShrink: 0,
                    paddingLeft: 4,
                  }}
                >
                  {year - 2006}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer note */}
      <p className="text-xs text-center" style={{ color: 'rgba(240,253,244,0.2)' }}>
        Każdy dzień który mija nie wraca. Działaj.
      </p>
    </div>
  )
}
