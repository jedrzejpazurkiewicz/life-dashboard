'use client'

import { useState, useTransition } from 'react'
import { createMeal, deleteMeal } from '@/app/actions'
import type { Meal } from '@/app/generated/prisma/client'
import { Plus, Trash2, Utensils, Flame, Clock } from 'lucide-react'

const MEAL_TIMES = [
  { value: 'breakfast', label: '🌅 Śniadanie' },
  { value: 'lunch', label: '☀️ Obiad' },
  { value: 'snack', label: '🍎 Przekąska' },
  { value: 'dinner', label: '🌙 Kolacja' },
]

interface Props {
  meals: Meal[]
  today: string
}

export default function NutritionClient({ meals: initial, today }: Props) {
  const [meals, setMeals] = useState(initial)
  const [showForm, setShowForm] = useState(false)
  const [isPending, startTransition] = useTransition()

  const todayDate = new Date(today)
  const dateStr = todayDate.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long' })
  const totalCals = meals.reduce((s, m) => s + (m.calories ?? 0), 0)

  function handleDelete(id: number) {
    setMeals(prev => prev.filter(m => m.id !== id))
    startTransition(async () => { await deleteMeal(id) })
  }

  return (
    <div className="space-y-5 animate-in">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#f0fdf4' }}>Żywienie</h1>
          <p className="text-sm mt-0.5 capitalize" style={{ color: 'rgba(240,253,244,0.4)' }}>{dateStr}</p>
        </div>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary flex items-center gap-2 text-sm">
          <Plus size={16} />
          Dodaj posiłek
        </button>
      </div>

      {/* Stats */}
      {meals.length > 0 && (
        <div className="grid grid-cols-2 gap-3">
          <div className="card p-4 space-y-1">
            <div className="flex items-center gap-2" style={{ color: '#f59e0b' }}>
              <Flame size={16} />
              <span className="text-xs">Kalorie</span>
            </div>
            <div className="text-2xl font-bold" style={{ color: '#f0fdf4' }}>
              {totalCals > 0 ? totalCals : '—'}
            </div>
            {totalCals > 0 && <div className="text-xs" style={{ color: 'rgba(240,253,244,0.35)' }}>kcal dzisiaj</div>}
          </div>
          <div className="card p-4 space-y-1">
            <div className="flex items-center gap-2" style={{ color: '#22C55E' }}>
              <Utensils size={16} />
              <span className="text-xs">Posiłki</span>
            </div>
            <div className="text-2xl font-bold" style={{ color: '#f0fdf4' }}>{meals.length}</div>
            <div className="text-xs" style={{ color: 'rgba(240,253,244,0.35)' }}>dzisiaj</div>
          </div>
        </div>
      )}

      {/* Add form */}
      {showForm && (
        <AddMealForm
          onAdd={(m) => { setMeals(prev => [...prev, m]); setShowForm(false) }}
          onCancel={() => setShowForm(false)}
        />
      )}

      {/* Meals list */}
      <div className="space-y-3">
        {meals.length === 0 && !showForm ? (
          <div className="card p-8 text-center space-y-3">
            <Utensils size={28} className="mx-auto" style={{ color: 'rgba(245,158,11,0.3)' }} />
            <p className="text-sm" style={{ color: 'rgba(240,253,244,0.35)' }}>Brak posiłków dzisiaj</p>
            <button onClick={() => setShowForm(true)} className="text-sm" style={{ color: '#f59e0b' }}>
              Dodaj pierwszy →
            </button>
          </div>
        ) : (
          meals.map(meal => (
            <MealCard key={meal.id} meal={meal} onDelete={() => handleDelete(meal.id)} disabled={isPending} />
          ))
        )}
      </div>
    </div>
  )
}

function MealCard({ meal, onDelete, disabled }: { meal: Meal; onDelete: () => void; disabled: boolean }) {
  const [showDel, setShowDel] = useState(false)
  const timeLabel = MEAL_TIMES.find(t => t.value === meal.mealTime)?.label

  return (
    <div
      className="card p-4 flex items-center gap-4"
      onMouseEnter={() => setShowDel(true)}
      onMouseLeave={() => setShowDel(false)}
    >
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
        style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.2)' }}
      >
        {timeLabel?.split(' ')[0] || '🍽️'}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm" style={{ color: '#f0fdf4' }}>{meal.name}</div>
        {meal.description && (
          <div className="text-xs mt-0.5 truncate" style={{ color: 'rgba(240,253,244,0.4)' }}>{meal.description}</div>
        )}
        <div className="flex items-center gap-3 mt-1">
          {timeLabel && (
            <span className="text-xs flex items-center gap-1" style={{ color: 'rgba(240,253,244,0.3)' }}>
              <Clock size={10} /> {timeLabel.split(' ').slice(1).join(' ')}
            </span>
          )}
          {meal.calories && (
            <span className="text-xs flex items-center gap-1" style={{ color: 'rgba(245,158,11,0.6)' }}>
              <Flame size={10} /> {meal.calories} kcal
            </span>
          )}
        </div>
      </div>
      <button
        onClick={onDelete}
        disabled={disabled}
        className="transition-opacity"
        style={{ color: 'rgba(239,68,68,0.5)', opacity: showDel ? 1 : 0 }}
      >
        <Trash2 size={15} />
      </button>
    </div>
  )
}

function AddMealForm({ onAdd, onCancel }: { onAdd: (m: Meal) => void; onCancel: () => void }) {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [calories, setCalories] = useState('')
  const [mealTime, setMealTime] = useState('lunch')
  const [isPending, startTransition] = useTransition()

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return

    const fd = new FormData()
    fd.set('name', name)
    fd.set('description', description)
    fd.set('calories', calories)
    fd.set('mealTime', mealTime)

    const optimistic: Meal = {
      id: Date.now(),
      name,
      description: description || null,
      calories: calories ? parseInt(calories) : null,
      mealTime,
      date: new Date(),
    }
    onAdd(optimistic)
    startTransition(async () => { await createMeal(fd) })
  }

  return (
    <div className="card p-5 space-y-4" style={{ border: '1px solid rgba(245,158,11,0.2)', boxShadow: '0 0 20px rgba(245,158,11,0.05)' }}>
      <h3 className="font-medium text-sm" style={{ color: '#f0fdf4' }}>Nowy posiłek</h3>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Nazwa posiłku" required autoFocus />
        <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Opis (opcjonalnie)" />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <select value={mealTime} onChange={e => setMealTime(e.target.value)}>
              {MEAL_TIMES.map(t => <option key={t.value} value={t.value}>{t.label}</option>)}
            </select>
          </div>
          <div>
            <input
              type="number"
              value={calories}
              onChange={e => setCalories(e.target.value)}
              placeholder="Kalorie (kcal)"
              min="0"
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={onCancel} className="btn-ghost flex-1 text-sm">Anuluj</button>
          <button type="submit" disabled={isPending || !name.trim()} className="btn-primary flex-1 text-sm">Dodaj</button>
        </div>
      </form>
    </div>
  )
}
