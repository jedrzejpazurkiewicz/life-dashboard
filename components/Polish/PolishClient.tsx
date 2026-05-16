'use client'

import { useState, useRef } from 'react'
import { addVocabularyWord, toggleWordMastered, deleteVocabularyWord, fetchWordSuggestions, type WordSuggestion } from '@/app/actions'
import { Languages, Plus, Check, Trash2, BookOpen, Flame, Trophy, RefreshCw, Sparkles, Brain, X, ThumbsUp, ThumbsDown } from 'lucide-react'

type Word = {
  id: number
  word: string
  definition: string
  example: string | null
  addedAt: Date
  mastered: boolean
}

type Props = {
  todayWords: Word[]
  allWords: Word[]
  initialSuggestions: WordSuggestion[]
}

const DAILY_GOAL = 5

function groupByDay(words: Word[]): { label: string; words: Word[] }[] {
  const map = new Map<string, Word[]>()
  for (const w of words) {
    const d = new Date(w.addedAt)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    if (!map.has(key)) map.set(key, [])
    map.get(key)!.push(w)
  }
  const today = new Date()
  const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`

  return Array.from(map.entries())
    .filter(([key]) => key !== todayKey)
    .slice(0, 7)
    .map(([key, words]) => {
      const [y, m, d] = key.split('-').map(Number)
      const date = new Date(y, m - 1, d)
      const diff = Math.round((today.getTime() - date.getTime()) / 86400000)
      const label = diff === 1 ? 'Wczoraj' : diff === 2 ? 'Przedwczoraj' : date.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' })
      return { label, words }
    })
}

function calcStreak(allWords: Word[]): number {
  if (!allWords.length) return 0
  const dayMap = new Map<string, number>()
  for (const w of allWords) {
    const d = new Date(w.addedAt)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    dayMap.set(key, (dayMap.get(key) || 0) + 1)
  }

  let streak = 0
  const today = new Date()
  for (let i = 0; i < 365; i++) {
    const d = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
    if ((dayMap.get(key) || 0) >= DAILY_GOAL) streak++
    else if (i > 0) break
  }
  return streak
}

export default function PolishClient({ todayWords, allWords, initialSuggestions }: Props) {
  const [pending, setPending] = useState(false)
  const [suggestions, setSuggestions] = useState<WordSuggestion[]>(initialSuggestions)
  const [refreshing, setRefreshing] = useState(false)
  const [addingId, setAddingId] = useState<number | null>(null)
  const [quizMode, setQuizMode] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  const progress = Math.min(todayWords.length, DAILY_GOAL)
  const totalMastered = allWords.filter(w => w.mastered).length
  const streak = calcStreak(allWords)
  const history = groupByDay(allWords)

  async function handleAdd(fd: FormData) {
    setPending(true)
    await addVocabularyWord(fd)
    formRef.current?.reset()
    setPending(false)
  }

  async function handleRefreshSuggestions() {
    setRefreshing(true)
    const known = allWords.map(w => w.word)
    const fresh = await fetchWordSuggestions(known)
    setSuggestions(fresh)
    setRefreshing(false)
  }

  async function handleAddSuggestion(s: WordSuggestion, idx: number) {
    setAddingId(idx)
    const fd = new FormData()
    fd.append('word', s.word)
    fd.append('definition', s.definition)
    fd.append('example', s.example)
    await addVocabularyWord(fd)
    setAddingId(null)
  }

  if (quizMode) {
    return <QuizMode words={allWords} onClose={() => setQuizMode(false)} />
  }

  return (
    <div className="min-h-screen p-6 lg:p-8" style={{ background: '#080F0A' }}>
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #22C55E22, #4ADE8011)', border: '1px solid rgba(34,197,94,0.3)' }}
          >
            <Languages size={24} style={{ color: '#4ADE80' }} />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold" style={{ color: '#f0fdf4' }}>Słownik dnia</h1>
            <p className="text-sm" style={{ color: 'rgba(240,253,244,0.4)' }}>
              Rozwijaj słownictwo jak Andrew Tate
            </p>
          </div>
          {allWords.length > 0 && (
            <button
              onClick={() => setQuizMode(true)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-200"
              style={{ background: 'rgba(139,92,246,0.12)', border: '1px solid rgba(139,92,246,0.25)', color: '#a78bfa' }}
            >
              <Brain size={16} />
              Quiz
            </button>
          )}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { icon: Flame, label: 'Streak', value: `${streak} dni`, color: streak > 0 ? '#f97316' : 'rgba(240,253,244,0.3)' },
            { icon: Trophy, label: 'Opanowane', value: totalMastered, color: '#eab308' },
            { icon: BookOpen, label: 'Łącznie', value: allWords.length, color: '#4ADE80' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div
              key={label}
              className="rounded-2xl p-4 flex flex-col items-center gap-2"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(34,197,94,0.1)' }}
            >
              <Icon size={20} style={{ color }} />
              <div className="text-xl font-bold" style={{ color: '#f0fdf4' }}>{value}</div>
              <div className="text-xs" style={{ color: 'rgba(240,253,244,0.4)' }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Daily progress */}
        <div
          className="rounded-2xl p-5"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(34,197,94,0.12)' }}
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-semibold" style={{ color: '#f0fdf4' }}>Dziś</span>
            <span className="text-sm font-bold" style={{ color: progress >= DAILY_GOAL ? '#4ADE80' : 'rgba(240,253,244,0.5)' }}>
              {progress}/{DAILY_GOAL} słów
            </span>
          </div>
          <div className="flex gap-2">
            {Array.from({ length: DAILY_GOAL }).map((_, i) => (
              <div
                key={i}
                className="h-2 flex-1 rounded-full transition-all duration-500"
                style={{ background: i < progress ? 'linear-gradient(90deg, #22C55E, #4ADE80)' : 'rgba(34,197,94,0.1)' }}
              />
            ))}
          </div>
          {progress >= DAILY_GOAL && (
            <p className="text-xs mt-2 text-center" style={{ color: '#4ADE80' }}>
              Cel dnia osiągnięty! 🔥
            </p>
          )}
        </div>

        {/* Today's words */}
        {todayWords.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'rgba(74,222,128,0.7)' }}>
              Słowa z dziś
            </h2>
            {todayWords.map((w) => (
              <WordCard key={w.id} word={w} />
            ))}
          </div>
        )}

        {/* Propozycje Claude */}
        <div
          className="rounded-2xl p-6"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(74,222,128,0.15)' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles size={16} style={{ color: '#4ADE80' }} />
              <span className="text-sm font-semibold" style={{ color: '#f0fdf4' }}>Propozycje Claude</span>
            </div>
            <button
              onClick={handleRefreshSuggestions}
              disabled={refreshing}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-200"
              style={{
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
                color: refreshing ? 'rgba(74,222,128,0.4)' : '#4ADE80',
              }}
            >
              <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
              {refreshing ? 'Generuję...' : 'Nowe słówka'}
            </button>
          </div>

          <div className="space-y-2">
            {suggestions.map((s, idx) => (
              <div
                key={`${s.word}-${idx}`}
                className="flex items-start gap-3 p-3 rounded-xl transition-all duration-200"
                style={{ background: 'rgba(34,197,94,0.04)', border: '1px solid rgba(34,197,94,0.08)' }}
              >
                <div className="flex-1 min-w-0">
                  <span className="font-bold text-sm" style={{ color: '#4ADE80' }}>{s.word}</span>
                  <span className="text-sm mx-2" style={{ color: 'rgba(240,253,244,0.4)' }}>—</span>
                  <span className="text-sm" style={{ color: 'rgba(240,253,244,0.7)' }}>{s.definition}</span>
                  {s.example && (
                    <p className="text-xs mt-1 italic" style={{ color: 'rgba(240,253,244,0.35)' }}>„{s.example}"</p>
                  )}
                </div>
                <button
                  onClick={() => handleAddSuggestion(s, idx)}
                  disabled={addingId === idx}
                  className="flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{
                    background: addingId === idx ? 'rgba(34,197,94,0.2)' : 'rgba(34,197,94,0.1)',
                    border: '1px solid rgba(34,197,94,0.25)',
                  }}
                  title="Dodaj do słownika"
                >
                  <Plus size={13} style={{ color: '#4ADE80' }} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Add word form */}
        <div
          className="rounded-2xl p-6"
          style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(34,197,94,0.12)' }}
        >
          <h2 className="text-sm font-semibold mb-4" style={{ color: '#f0fdf4' }}>
            Dodaj nowe słowo
          </h2>
          <form ref={formRef} action={handleAdd} className="space-y-3">
            <input
              name="word"
              required
              placeholder="Słowo"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                background: 'rgba(34,197,94,0.06)',
                border: '1px solid rgba(34,197,94,0.15)',
                color: '#f0fdf4',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(74,222,128,0.4)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(34,197,94,0.15)')}
            />
            <textarea
              name="definition"
              required
              rows={2}
              placeholder="Definicja / znaczenie"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
              style={{
                background: 'rgba(34,197,94,0.06)',
                border: '1px solid rgba(34,197,94,0.15)',
                color: '#f0fdf4',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(74,222,128,0.4)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(34,197,94,0.15)')}
            />
            <input
              name="example"
              placeholder="Przykładowe zdanie (opcjonalne)"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
              style={{
                background: 'rgba(34,197,94,0.06)',
                border: '1px solid rgba(34,197,94,0.15)',
                color: '#f0fdf4',
              }}
              onFocus={e => (e.target.style.borderColor = 'rgba(74,222,128,0.4)')}
              onBlur={e => (e.target.style.borderColor = 'rgba(34,197,94,0.15)')}
            />
            <button
              type="submit"
              disabled={pending}
              className="w-full py-3 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200"
              style={{
                background: pending ? 'rgba(34,197,94,0.15)' : 'linear-gradient(135deg, #22C55E, #4ADE80)',
                color: pending ? 'rgba(240,253,244,0.5)' : '#080F0A',
              }}
            >
              <Plus size={16} />
              {pending ? 'Dodawanie...' : 'Dodaj słowo'}
            </button>
          </form>
        </div>

        {/* History */}
        {history.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider" style={{ color: 'rgba(74,222,128,0.7)' }}>
              Historia
            </h2>
            {history.map(({ label, words }) => (
              <div key={label} className="space-y-2">
                <div className="text-xs font-medium" style={{ color: 'rgba(240,253,244,0.35)' }}>{label}</div>
                {words.map(w => (
                  <WordCard key={w.id} word={w} compact />
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function QuizMode({ words, onClose }: { words: Word[]; onClose: () => void }) {
  const shuffled = [...words].sort(() => Math.random() - 0.5)
  const [idx, setIdx] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [score, setScore] = useState({ knew: 0, didnt: 0 })
  const [done, setDone] = useState(false)

  const current = shuffled[idx]
  const total = shuffled.length

  function answer(knew: boolean) {
    setScore(prev => ({ ...prev, [knew ? 'knew' : 'didnt']: prev[knew ? 'knew' : 'didnt'] + 1 }))
    if (idx + 1 >= total) {
      setDone(true)
    } else {
      setIdx(i => i + 1)
      setRevealed(false)
    }
  }

  if (done) {
    const pct = Math.round((score.knew / total) * 100)
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8" style={{ background: '#080F0A' }}>
        <div className="max-w-sm w-full text-center space-y-6">
          <div className="text-6xl font-black" style={{ color: pct >= 80 ? '#4ADE80' : pct >= 50 ? '#f59e0b' : '#ef4444' }}>
            {pct}%
          </div>
          <div>
            <p className="text-xl font-bold" style={{ color: '#f0fdf4' }}>Quiz ukończony!</p>
            <p className="text-sm mt-1" style={{ color: 'rgba(240,253,244,0.5)' }}>
              {score.knew}/{total} słów znanych
            </p>
          </div>
          <div className="flex gap-3 justify-center">
            <div className="px-4 py-3 rounded-xl text-center" style={{ background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <div className="text-2xl font-bold" style={{ color: '#4ADE80' }}>{score.knew}</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(240,253,244,0.4)' }}>Znałem</div>
            </div>
            <div className="px-4 py-3 rounded-xl text-center" style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.15)' }}>
              <div className="text-2xl font-bold" style={{ color: '#ef4444' }}>{score.didnt}</div>
              <div className="text-xs mt-1" style={{ color: 'rgba(240,253,244,0.4)' }}>Nie znałem</div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl font-semibold text-sm"
            style={{ background: 'linear-gradient(135deg, #22C55E, #4ADE80)', color: '#080F0A' }}
          >
            Wróć do słownika
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col p-6 lg:p-8" style={{ background: '#080F0A' }}>
      <div className="max-w-lg mx-auto w-full flex flex-col flex-1 space-y-6">
        {/* Top bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain size={18} style={{ color: '#a78bfa' }} />
            <span className="text-sm font-semibold" style={{ color: '#a78bfa' }}>Quiz</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm" style={{ color: 'rgba(240,253,244,0.4)' }}>{idx + 1}/{total}</span>
            <button onClick={onClose} className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <X size={15} style={{ color: 'rgba(240,253,244,0.5)' }} />
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div
            className="h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${(idx / total) * 100}%`, background: 'linear-gradient(90deg, #a78bfa, #7c3aed)' }}
          />
        </div>

        {/* Card */}
        <div className="flex-1 flex flex-col items-center justify-center space-y-6">
          <div
            className="w-full rounded-3xl p-8 text-center space-y-4"
            style={{ background: 'rgba(139,92,246,0.07)', border: '1px solid rgba(139,92,246,0.2)', minHeight: 220 }}
          >
            <p className="text-3xl font-black" style={{ color: '#f0fdf4' }}>{current.word}</p>

            {!revealed ? (
              <button
                onClick={() => setRevealed(true)}
                className="mt-4 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all"
                style={{ background: 'rgba(139,92,246,0.15)', border: '1px solid rgba(139,92,246,0.3)', color: '#a78bfa' }}
              >
                Pokaż definicję
              </button>
            ) : (
              <div className="space-y-2 mt-2">
                <p className="text-base" style={{ color: 'rgba(240,253,244,0.85)' }}>{current.definition}</p>
                {current.example && (
                  <p className="text-sm italic" style={{ color: 'rgba(240,253,244,0.45)' }}>„{current.example}"</p>
                )}
              </div>
            )}
          </div>

          {revealed && (
            <div className="flex gap-4 w-full">
              <button
                onClick={() => answer(false)}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold transition-all"
                style={{ background: 'rgba(239,68,68,0.1)', border: '2px solid rgba(239,68,68,0.3)', color: '#ef4444' }}
              >
                <ThumbsDown size={18} /> Nie znałem
              </button>
              <button
                onClick={() => answer(true)}
                className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-sm font-bold transition-all"
                style={{ background: 'rgba(34,197,94,0.1)', border: '2px solid rgba(34,197,94,0.3)', color: '#4ADE80' }}
              >
                <ThumbsUp size={18} /> Znałem!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function WordCard({ word, compact = false }: { word: Word; compact?: boolean }) {
  const [busy, setBusy] = useState(false)

  async function handleMastered() {
    setBusy(true)
    await toggleWordMastered(word.id)
    setBusy(false)
  }

  async function handleDelete() {
    setBusy(true)
    await deleteVocabularyWord(word.id)
    setBusy(false)
  }

  return (
    <div
      className="rounded-2xl p-4 transition-all duration-200"
      style={{
        background: word.mastered ? 'rgba(34,197,94,0.07)' : 'rgba(255,255,255,0.03)',
        border: word.mastered ? '1px solid rgba(34,197,94,0.25)' : '1px solid rgba(34,197,94,0.1)',
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span
              className="font-bold"
              style={{ color: word.mastered ? '#4ADE80' : '#f0fdf4', fontSize: compact ? '0.95rem' : '1.1rem' }}
            >
              {word.word}
            </span>
            {word.mastered && (
              <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(34,197,94,0.15)', color: '#4ADE80' }}>
                opanowane
              </span>
            )}
          </div>
          <p className="text-sm" style={{ color: 'rgba(240,253,244,0.7)' }}>{word.definition}</p>
          {word.example && (
            <p className="text-xs mt-1 italic" style={{ color: 'rgba(240,253,244,0.4)' }}>
              „{word.example}"
            </p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleMastered}
            disabled={busy}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{
              background: word.mastered ? 'rgba(34,197,94,0.2)' : 'rgba(34,197,94,0.06)',
              border: '1px solid rgba(34,197,94,0.2)',
            }}
            title={word.mastered ? 'Oznacz jako nieopanowane' : 'Oznacz jako opanowane'}
          >
            <Check size={14} style={{ color: word.mastered ? '#4ADE80' : 'rgba(240,253,244,0.3)' }} />
          </button>
          <button
            onClick={handleDelete}
            disabled={busy}
            className="w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{ background: 'rgba(239,68,68,0.06)', border: '1px solid rgba(239,68,68,0.15)' }}
            title="Usuń słowo"
          >
            <Trash2 size={14} style={{ color: 'rgba(239,68,68,0.6)' }} />
          </button>
        </div>
      </div>
    </div>
  )
}
