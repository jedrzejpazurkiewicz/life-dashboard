'use client'

import { useEffect, useRef, useState, useTransition } from 'react'
import { ImagePlus, X } from 'lucide-react'
import { createTrade } from '@/app/actions'

const GREEN = '#22C55E'
const TEXT = '#f0fdf4'
const TEXT_DIM = 'rgba(240,253,244,0.45)'
const BORDER = 'rgba(34,197,94,0.2)'

const inputStyle = {
  background: 'rgba(255,255,255,0.04)',
  border: `1px solid ${BORDER}`,
  borderRadius: 10,
  color: TEXT,
  padding: '8px 12px',
  fontSize: 14,
  width: '100%',
  outline: 'none',
}

const labelStyle = { color: TEXT_DIM, fontSize: 12, marginBottom: 4, display: 'block' as const }

type Props = { onDone: () => void }

export default function TradeForm({ onDone }: Props) {
  const formRef = useRef<HTMLFormElement>(null)
  const [isPending, startTransition] = useTransition()
  const [direction, setDirection] = useState<'LONG' | 'SHORT'>('LONG')
  const [instrument, setInstrument] = useState<'NASDAQ' | 'SP500'>('NASDAQ')
  const [emotion, setEmotion] = useState(3)
  const [dateValue, setDateValue] = useState(new Date().toISOString().slice(0, 16))
  const [chartPreview, setChartPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [reasons, setReasons] = useState<string[]>([])

  function toggleReason(r: string) {
    setReasons(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r])
  }

  function handleFileChange(file: File | null) {
    if (!file) {
      setChartPreview(null)
      return
    }
    const reader = new FileReader()
    reader.onload = () => setChartPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  function clearImage() {
    setChartPreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  // Paste screenshot from clipboard (Ctrl+V / Cmd+V) anywhere in the form
  useEffect(() => {
    function onPaste(e: ClipboardEvent) {
      const items = e.clipboardData?.items
      if (!items) return
      for (const item of items) {
        if (item.type.startsWith('image/')) {
          const file = item.getAsFile()
          if (!file || !fileInputRef.current) return
          const dt = new DataTransfer()
          dt.items.add(file)
          fileInputRef.current.files = dt.files
          handleFileChange(file)
          e.preventDefault()
          return
        }
      }
    }
    window.addEventListener('paste', onPaste)
    return () => window.removeEventListener('paste', onPaste)
  }, [])

  function detectedSession(): string | null {
    if (!dateValue) return null
    const d = new Date(dateValue)
    const minutes = d.getHours() * 60 + d.getMinutes()
    if (minutes >= 9 * 60 && minutes <= 11 * 60) return 'London Open'
    if (minutes >= 15 * 60 + 30 && minutes <= 17 * 60 + 30) return 'New York Open'
    return null
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const fd = new FormData(formRef.current!)
    startTransition(async () => {
      await createTrade(fd)
      formRef.current?.reset()
      setDirection('LONG')
      setInstrument('NASDAQ')
      setEmotion(3)
      setChartPreview(null)
      setReasons([])
      onDone()
    })
  }

  const emotionLabels = ['', '😫', '😕', '😐', '😊', '🔥']

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      <p className="font-semibold text-sm" style={{ color: TEXT }}>Nowy trade</p>

      {/* Instrument */}
      <div>
        <label style={labelStyle}>Instrument</label>
        <input type="hidden" name="instrument" value={instrument} />
        <div className="flex rounded-xl overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
          {(['NASDAQ', 'SP500'] as const).map(ins => (
            <button
              key={ins}
              type="button"
              onClick={() => setInstrument(ins)}
              className="flex-1 py-2 text-sm font-medium transition-all"
              style={{
                background: instrument === ins ? 'rgba(34,197,94,0.15)' : 'transparent',
                color: instrument === ins ? GREEN : TEXT_DIM,
              }}
            >
              {ins === 'NASDAQ' ? 'Nasdaq' : 'S&P 500'}
            </button>
          ))}
        </div>
      </div>

      {/* Direction */}
      <div>
        <label style={labelStyle}>Kierunek</label>
        <input type="hidden" name="direction" value={direction} />
        <div className="flex rounded-xl overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
          <button
            type="button"
            onClick={() => setDirection('LONG')}
            className="flex-1 py-2 text-sm font-semibold transition-all"
            style={{
              background: direction === 'LONG' ? 'rgba(34,197,94,0.15)' : 'transparent',
              color: direction === 'LONG' ? GREEN : TEXT_DIM,
            }}
          >
            Long ↑
          </button>
          <button
            type="button"
            onClick={() => setDirection('SHORT')}
            className="flex-1 py-2 text-sm font-semibold transition-all"
            style={{
              background: direction === 'SHORT' ? 'rgba(239,68,68,0.12)' : 'transparent',
              color: direction === 'SHORT' ? '#EF4444' : TEXT_DIM,
            }}
          >
            Short ↓
          </button>
        </div>
      </div>

      {/* Prices */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div>
          <label style={labelStyle}>Wejście</label>
          <input type="number" name="entry" step="0.01" required placeholder="np. 21500" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Stop Loss</label>
          <input type="number" name="stopLoss" step="0.01" required placeholder="np. 21450" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Wyjście (opcjonalne)</label>
          <input type="number" name="exit" step="0.01" placeholder="jeśli zamknięty" style={inputStyle} />
        </div>
      </div>

      {/* Take Profit levels */}
      <div className="grid grid-cols-3 gap-3">
        <div>
          <label style={labelStyle}>TP1</label>
          <input type="number" name="takeProfit" step="0.01" required placeholder="np. 21600" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>TP2 (opc.)</label>
          <input type="number" name="takeProfit2" step="0.01" placeholder="np. 21700" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>TP3 (opc.)</label>
          <input type="number" name="takeProfit3" step="0.01" placeholder="np. 21800" style={inputStyle} />
        </div>
      </div>

      {/* Size + Date */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label style={labelStyle}>Kontrakty / loty</label>
          <input type="number" name="size" step="0.01" defaultValue="1" min="0.01" style={inputStyle} />
        </div>
        <div>
          <label style={labelStyle}>Data i czas</label>
          <input
            type="datetime-local"
            name="date"
            value={dateValue}
            onChange={(e) => setDateValue(e.target.value)}
            style={{ ...inputStyle, colorScheme: 'dark' }}
          />
          {detectedSession() && (
            <p className="mt-1" style={{ color: GREEN, fontSize: 11 }}>✓ Sesja: {detectedSession()}</p>
          )}
        </div>
      </div>

      {/* Reasons */}
      <div>
        <label style={labelStyle}>Powody wejścia (zaznacz co pasowało)</label>
        {reasons.map(r => <input key={r} type="hidden" name="reasons" value={r} />)}
        <div className="flex flex-wrap gap-2">
          {([
            { id: 'LIQ_SWEEP', label: 'Liquidity Sweep' },
            { id: 'BOS_1M', label: 'BOS 1m' },
            { id: 'BOS_5M', label: 'BOS 5m' },
            { id: 'PREV_TREND', label: 'Trend poprzedniej sesji' },
            { id: 'SMT', label: 'SMT' },
            { id: 'FVG', label: 'FVG' },
            { id: 'IFVG', label: 'iFVG' },
          ] as const).map(r => {
            const active = reasons.includes(r.id)
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => toggleReason(r.id)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5"
                style={{
                  background: active ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${active ? GREEN : BORDER}`,
                  color: active ? GREEN : TEXT_DIM,
                }}
              >
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 14,
                  height: 14,
                  borderRadius: 4,
                  border: `1px solid ${active ? GREEN : 'rgba(240,253,244,0.3)'}`,
                  background: active ? GREEN : 'transparent',
                  color: '#000',
                  fontSize: 10,
                  fontWeight: 700,
                }}>{active ? '✓' : ''}</span>
                {r.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* Emotion */}
      <div>
        <label style={labelStyle}>Samopoczucie podczas trade'a</label>
        <input type="hidden" name="emotion" value={emotion} />
        <div className="flex gap-2 mt-1">
          {[1, 2, 3, 4, 5].map(v => (
            <button
              key={v}
              type="button"
              onClick={() => setEmotion(v)}
              className="w-10 h-10 rounded-xl text-lg transition-all"
              style={{
                background: emotion === v ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${emotion === v ? GREEN : BORDER}`,
              }}
            >
              {emotionLabels[v]}
            </button>
          ))}
        </div>
      </div>

      {/* Chart screenshot */}
      <div>
        <label style={labelStyle}>Zrzut ekranu z TradingView</label>
        <input
          ref={fileInputRef}
          type="file"
          name="chartImage"
          accept="image/*"
          onChange={(e) => handleFileChange(e.target.files?.[0] ?? null)}
          style={{ display: 'none' }}
        />
        {chartPreview ? (
          <div className="relative rounded-xl overflow-hidden" style={{ border: `1px solid ${BORDER}` }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={chartPreview} alt="Chart preview" style={{ width: '100%', maxHeight: 320, objectFit: 'contain', background: '#000' }} />
            <button
              type="button"
              onClick={clearImage}
              className="absolute top-2 right-2 rounded-lg p-1.5 transition-all"
              style={{ background: 'rgba(0,0,0,0.6)', color: '#fff' }}
              aria-label="Usuń zrzut"
            >
              <X size={14} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex flex-col items-center justify-center gap-2 py-8 rounded-xl transition-all hover:bg-white/5"
            style={{
              background: 'rgba(255,255,255,0.02)',
              border: `1px dashed ${BORDER}`,
              color: TEXT_DIM,
            }}
          >
            <ImagePlus size={22} style={{ color: GREEN }} />
            <span className="text-sm">Kliknij aby dodać zrzut</span>
            <span className="text-xs">albo wklej ze schowka (Ctrl/⌘ + V)</span>
          </button>
        )}
      </div>

      {/* Notes */}
      <div>
        <label style={labelStyle}>Notatki / setup</label>
        <textarea
          name="notes"
          rows={2}
          placeholder="Opisz setup, dlaczego wziąłeś trade'a..."
          style={{ ...inputStyle, resize: 'vertical' }}
        />
      </div>

      {/* Submit */}
      <div className="flex gap-3">
        <button
          type="submit"
          disabled={isPending}
          className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
          style={{ background: GREEN, color: '#000', opacity: isPending ? 0.6 : 1 }}
        >
          {isPending ? 'Zapisuję...' : 'Zapisz trade'}
        </button>
      </div>
    </form>
  )
}
