'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'

function getTodayRange() {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
  return { start, end }
}

// ── Tasks ──────────────────────────────────────────

export async function createTask(formData: FormData) {
  const title = formData.get('title') as string
  const priority = (formData.get('priority') as string) || 'MEDIUM'
  const spontaneous = formData.get('spontaneous') === 'true'
  const dateStr = formData.get('date') as string

  if (!title?.trim()) return

  await prisma.task.create({
    data: {
      title: title.trim(),
      priority,
      spontaneous,
      date: spontaneous ? null : (dateStr ? new Date(dateStr) : new Date()),
    },
  })

  revalidatePath('/')
  revalidatePath('/tasks')
}

export async function toggleTask(id: number) {
  const task = await prisma.task.findUnique({ where: { id } })
  if (!task) return
  await prisma.task.update({ where: { id }, data: { done: !task.done } })
  revalidatePath('/')
  revalidatePath('/tasks')
}

export async function deleteTask(id: number) {
  await prisma.task.delete({ where: { id } })
  revalidatePath('/')
  revalidatePath('/tasks')
}

// ── Habits ────────────────────────────────────────

export async function toggleHabit(field: 'sport' | 'journaling' | 'tiktokOk') {
  const { start, end } = getTodayRange()
  const existing = await prisma.habitLog.findFirst({ where: { date: { gte: start, lte: end } } })

  if (existing) {
    await prisma.habitLog.update({
      where: { id: existing.id },
      data: { [field]: !existing[field] },
    })
  } else {
    await prisma.habitLog.create({
      data: { date: new Date(), [field]: true },
    })
  }

  revalidatePath('/')
}

// ── Meals ─────────────────────────────────────────

export async function createMeal(formData: FormData) {
  const name = formData.get('name') as string
  const description = formData.get('description') as string
  const calories = formData.get('calories') as string
  const mealTime = formData.get('mealTime') as string

  if (!name?.trim()) return

  await prisma.meal.create({
    data: {
      name: name.trim(),
      description: description?.trim() || null,
      calories: calories ? parseInt(calories) : null,
      mealTime: mealTime || null,
      date: new Date(),
    },
  })

  revalidatePath('/nutrition')
}

export async function deleteMeal(id: number) {
  await prisma.meal.delete({ where: { id } })
  revalidatePath('/nutrition')
}

// ── Training ──────────────────────────────────────

export async function logTrainingSession(formData: FormData) {
  const dayOfWeek = parseInt(formData.get('dayOfWeek') as string)
  const notes = formData.get('notes') as string
  const setsJson = formData.get('sets') as string

  const sets = JSON.parse(setsJson) as Array<{
    exercise: string
    setNumber: number
    reps: number
    weight: number
  }>

  await prisma.trainingSession.create({
    data: {
      date: new Date(),
      dayOfWeek,
      notes: notes?.trim() || null,
      sets: { create: sets },
    },
  })

  revalidatePath('/training')
}

export async function updateTrainingDay(dayOfWeek: number, name: string, exercises: Array<{
  name: string; targetSets: number; targetReps: string; order: number
}>) {
  const day = await prisma.trainingDay.findUnique({ where: { dayOfWeek } })
  if (!day) return

  await prisma.exercise.deleteMany({ where: { trainingDayId: day.id } })
  await prisma.trainingDay.update({
    where: { dayOfWeek },
    data: {
      name,
      exercises: { create: exercises },
    },
  })

  revalidatePath('/training')
}

// ── Review ────────────────────────────────────────

export async function saveReview(formData: FormData) {
  const wentWell = formData.get('wentWell') as string
  const improve = formData.get('improve') as string
  const energy = parseInt(formData.get('energy') as string)
  const tomorrowPlan = formData.get('tomorrowPlan') as string

  const { start, end } = getTodayRange()
  const today = new Date()

  const existing = await prisma.dailyReview.findFirst({ where: { date: { gte: start, lte: end } } })

  if (existing) {
    await prisma.dailyReview.update({
      where: { id: existing.id },
      data: { wentWell, improve, energy, tomorrowPlan },
    })
  } else {
    await prisma.dailyReview.create({
      data: { date: today, wentWell, improve, energy, tomorrowPlan },
    })
  }

  revalidatePath('/review')
}

// ── Trading ───────────────────────────────────────

export async function createTrade(formData: FormData) {
  await prisma.trade.create({
    data: {
      date: new Date(),
      instrument: formData.get('instrument') as string,
      direction: formData.get('direction') as string,
      entry: parseFloat(formData.get('entry') as string),
      stopLoss: parseFloat(formData.get('stopLoss') as string),
      takeProfit: parseFloat(formData.get('takeProfit') as string),
      exit: formData.get('exit') ? parseFloat(formData.get('exit') as string) : null,
      pnl: formData.get('pnl') ? parseFloat(formData.get('pnl') as string) : null,
      result: formData.get('result') as string || null,
      emotion: formData.get('emotion') ? parseInt(formData.get('emotion') as string) : null,
      notes: formData.get('notes') as string || null,
    },
  })
  revalidatePath('/trading')
}
