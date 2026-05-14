'use client'

import { useState, useTransition, useEffect, useRef } from 'react'
import { createTask, toggleTask, deleteTask } from '@/app/actions'
import type { Task } from '@/app/generated/prisma/client'
import { Plus, CheckSquare, Square, Trash2, Zap, Calendar, Shuffle, X } from 'lucide-react'

type Filter = 'today' | 'week' | 'all' | 'spontaneous'

interface Props {
  tasks: Task[]
}

function getTodayStr() {
  return new Date().toISOString().split('T')[0]
}

function getEndOfWeekStr() {
  const d = new Date()
  d.setDate(d.getDate() + (7 - d.getDay()))
  return d.toISOString().split('T')[0]
}

export default function TasksClient({ tasks: initialTasks }: Props) {
  const [tasks, setTasks] = useState(initialTasks)
  const [filter, setFilter] = useState<Filter>('today')
  const [showModal, setShowModal] = useState(false)
  const [isPending, startTransition] = useTransition()

  // keyboard shortcut N to open modal
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'n' && !e.ctrlKey && !e.metaKey && !(e.target instanceof HTMLInputElement) && !(e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        setShowModal(true)
      }
      if (e.key === 'Escape') setShowModal(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  // sync server state
  useEffect(() => { setTasks(initialTasks) }, [initialTasks])

  const today = getTodayStr()
  const endOfWeek = getEndOfWeekStr()

  function filteredTasks() {
    return tasks.filter(t => {
      if (filter === 'spontaneous') return t.spontaneous
      if (filter === 'today') {
        if (t.spontaneous) return false
        if (!t.date) return false
        return t.date.toString().startsWith(today) || new Date(t.date).toISOString().startsWith(today)
      }
      if (filter === 'week') {
        if (t.spontaneous) return false
        if (!t.date) return false
        const d = new Date(t.date).toISOString().split('T')[0]
        return d >= today && d <= endOfWeek
      }
      return true
    })
  }

  function handleToggle(id: number) {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
    startTransition(async () => { await toggleTask(id) })
  }

  function handleDelete(id: number) {
    setTasks(prev => prev.filter(t => t.id !== id))
    startTransition(async () => { await deleteTask(id) })
  }

  const visible = filteredTasks().sort((a, b) => {
    if (a.done !== b.done) return a.done ? 1 : -1
    const po = { HIGH: 0, MEDIUM: 1, LOW: 2 }
    return (po[a.priority as keyof typeof po] ?? 1) - (po[b.priority as keyof typeof po] ?? 1)
  })

  const filters: { key: Filter; label: string; icon: React.ReactNode }[] = [
    { key: 'today', label: 'Dziś', icon: <Calendar size={14} /> },
    { key: 'week', label: 'Tydzień', icon: <Calendar size={14} /> },
    { key: 'all', label: 'Wszystkie', icon: <CheckSquare size={14} /> },
    { key: 'spontaneous', label: 'Spontaniczne', icon: <Shuffle size={14} /> },
  ]

  const counts = {
    today: tasks.filter(t => !t.spontaneous && t.date && new Date(t.date).toISOString().startsWith(today)).length,
    week: tasks.filter(t => { if (t.spontaneous || !t.date) return false; const d = new Date(t.date).toISOString().split('T')[0]; return d >= today && d <= endOfWeek }).length,
    all: tasks.length,
    spontaneous: tasks.filter(t => t.spontaneous).length,
  }

  return (
    <div className="space-y-5 animate-in">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#f0fdf4' }}>Zadania</h1>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(240,253,244,0.4)' }}>
            Press <kbd className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'rgba(34,197,94,0.15)', color: '#4ADE80', border: '1px solid rgba(34,197,94,0.3)' }}>N</kbd> aby dodać szybko
          </p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} />
          Nowe
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {filters.map(({ key, label, icon }) => (
          <button
            key={key}
            onClick={() => setFilter(key)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm transition-all duration-200"
            style={{
              background: filter === key ? 'rgba(34,197,94,0.15)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${filter === key ? 'rgba(34,197,94,0.4)' : 'rgba(255,255,255,0.08)'}`,
              color: filter === key ? '#4ADE80' : 'rgba(240,253,244,0.5)',
            }}
          >
            {icon}
            {label}
            <span
              className="ml-1 text-xs px-1.5 py-0.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(240,253,244,0.4)' }}
            >
              {counts[key]}
            </span>
          </button>
        ))}
      </div>

      {/* Task list */}
      <div className="space-y-2">
        {visible.length === 0 ? (
          <div className="card p-8 text-center space-y-3">
            <CheckSquare size={28} className="mx-auto" style={{ color: 'rgba(34,197,94,0.25)' }} />
            <p className="text-sm" style={{ color: 'rgba(240,253,244,0.35)' }}>
              {filter === 'today' ? 'Brak zadań na dziś' : 'Brak zadań'}
            </p>
            <button onClick={() => setShowModal(true)} className="text-sm" style={{ color: '#22C55E' }}>
              Dodaj pierwsze →
            </button>
          </div>
        ) : (
          visible.map(task => (
            <TaskRow
              key={task.id}
              task={task}
              onToggle={() => handleToggle(task.id)}
              onDelete={() => handleDelete(task.id)}
              disabled={isPending}
            />
          ))
        )}
      </div>

      {/* Add task modal */}
      {showModal && (
        <AddTaskModal
          onClose={() => setShowModal(false)}
          onAdd={(t) => setTasks(prev => [t, ...prev])}
        />
      )}
    </div>
  )
}

function TaskRow({ task, onToggle, onDelete, disabled }: {
  task: Task; onToggle: () => void; onDelete: () => void; disabled: boolean
}) {
  const [showDelete, setShowDelete] = useState(false)
  const dateStr = task.date ? new Date(task.date).toLocaleDateString('pl-PL', { day: 'numeric', month: 'short' }) : null

  return (
    <div
      className="flex items-center gap-3 py-3 px-4 rounded-xl transition-all duration-200 group"
      style={{
        background: task.done ? 'rgba(34,197,94,0.03)' : 'rgba(255,255,255,0.03)',
        border: `1px solid ${task.done ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.07)'}`,
        opacity: task.done ? 0.55 : 1,
      }}
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <button onClick={onToggle} disabled={disabled} style={{ color: task.done ? '#22C55E' : 'rgba(240,253,244,0.3)' }}>
        {task.done ? <CheckSquare size={18} /> : <Square size={18} />}
      </button>

      <div className="flex-1 min-w-0">
        <span
          className="text-sm"
          style={{
            color: task.done ? 'rgba(240,253,244,0.35)' : 'rgba(240,253,244,0.9)',
            textDecoration: task.done ? 'line-through' : 'none',
          }}
        >
          {task.title}
        </span>
        <div className="flex items-center gap-2 mt-0.5">
          {task.spontaneous && (
            <span className="text-xs flex items-center gap-1" style={{ color: 'rgba(240,253,244,0.3)' }}>
              <Shuffle size={10} /> spontaniczne
            </span>
          )}
          {dateStr && !task.spontaneous && (
            <span className="text-xs" style={{ color: 'rgba(240,253,244,0.25)' }}>{dateStr}</span>
          )}
        </div>
      </div>

      <PriorityBadge priority={task.priority} />

      <button
        onClick={onDelete}
        disabled={disabled}
        className="transition-all duration-200 ml-1"
        style={{
          color: 'rgba(239,68,68,0.5)',
          opacity: showDelete ? 1 : 0,
        }}
      >
        <Trash2 size={15} />
      </button>
    </div>
  )
}

function AddTaskModal({ onClose, onAdd }: {
  onClose: () => void
  onAdd: (task: Task) => void
}) {
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState('MEDIUM')
  const [spontaneous, setSpontaneous] = useState(false)
  const [date, setDate] = useState(getTodayStr())
  const [isPending, startTransition] = useTransition()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => { inputRef.current?.focus() }, [])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return

    const fd = new FormData()
    fd.set('title', title)
    fd.set('priority', priority)
    fd.set('spontaneous', String(spontaneous))
    if (!spontaneous) fd.set('date', date)

    const optimisticTask: Task = {
      id: Date.now(),
      title,
      priority,
      spontaneous,
      date: spontaneous ? null : new Date(date),
      done: false,
      createdAt: new Date(),
    }
    onAdd(optimisticTask)
    onClose()

    startTransition(async () => { await createTask(fd) })
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        className="w-full max-w-md rounded-2xl p-6 space-y-4 animate-in"
        style={{ background: '#0d1a10', border: '1px solid rgba(34,197,94,0.25)', boxShadow: '0 0 40px rgba(34,197,94,0.15)' }}
      >
        <div className="flex justify-between items-center">
          <h2 className="font-semibold" style={{ color: '#f0fdf4' }}>Nowe zadanie</h2>
          <button onClick={onClose} style={{ color: 'rgba(240,253,244,0.4)' }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            ref={inputRef}
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Co chcesz zrobić?"
            required
          />

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs" style={{ color: 'rgba(240,253,244,0.5)' }}>Priorytet</label>
              <select value={priority} onChange={e => setPriority(e.target.value)}>
                <option value="HIGH">🔴 Wysoki</option>
                <option value="MEDIUM">🟡 Średni</option>
                <option value="LOW">🟢 Niski</option>
              </select>
            </div>

            {!spontaneous && (
              <div className="space-y-1.5">
                <label className="text-xs" style={{ color: 'rgba(240,253,244,0.5)' }}>Data</label>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} />
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={() => setSpontaneous(!spontaneous)}
            className="flex items-center gap-2 text-sm w-full px-3 py-2.5 rounded-xl transition-all duration-200"
            style={{
              background: spontaneous ? 'rgba(34,197,94,0.1)' : 'rgba(255,255,255,0.04)',
              border: `1px solid ${spontaneous ? 'rgba(34,197,94,0.3)' : 'rgba(255,255,255,0.08)'}`,
              color: spontaneous ? '#4ADE80' : 'rgba(240,253,244,0.5)',
            }}
          >
            <Shuffle size={15} />
            Spontaniczne (bez daty)
            {spontaneous && <span className="ml-auto text-xs">✓</span>}
          </button>

          <div className="flex gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-ghost flex-1">
              Anuluj
            </button>
            <button type="submit" disabled={isPending || !title.trim()} className="btn-primary flex-1 flex items-center justify-center gap-2">
              <Zap size={15} />
              Dodaj
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function PriorityBadge({ priority }: { priority: string }) {
  const map = {
    HIGH: { label: 'Wysoki', cls: 'priority-high' },
    MEDIUM: { label: 'Średni', cls: 'priority-medium' },
    LOW: { label: 'Niski', cls: 'priority-low' },
  }
  const p = map[priority as keyof typeof map]
  if (!p) return null
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full whitespace-nowrap ${p.cls}`} style={{ fontSize: '10px' }}>
      {p.label}
    </span>
  )
}
