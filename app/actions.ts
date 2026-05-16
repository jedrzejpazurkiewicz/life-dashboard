'use server'

import { prisma } from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { writeFile, mkdir, unlink } from 'fs/promises'
import path from 'path'
import { randomBytes } from 'crypto'
import Anthropic from '@anthropic-ai/sdk'

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

function detectSession(date: Date): string | null {
  const minutes = date.getHours() * 60 + date.getMinutes()
  // London Open: 9:00 - 11:00
  if (minutes >= 9 * 60 && minutes <= 11 * 60) return 'LONDON'
  // New York Open: 15:30 - 17:30
  if (minutes >= 15 * 60 + 30 && minutes <= 17 * 60 + 30) return 'NEW_YORK'
  return null
}

async function saveChartImage(file: File | null): Promise<string | null> {
  if (!file || file.size === 0) return null
  const allowed = ['image/png', 'image/jpeg', 'image/webp', 'image/gif']
  if (!allowed.includes(file.type)) return null

  const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'trades')
  await mkdir(uploadDir, { recursive: true })

  const ext = file.type.split('/')[1].replace('jpeg', 'jpg')
  const filename = `${Date.now()}-${randomBytes(6).toString('hex')}.${ext}`
  const filepath = path.join(uploadDir, filename)
  const buffer = Buffer.from(await file.arrayBuffer())
  await writeFile(filepath, buffer)
  return `/uploads/trades/${filename}`
}

export async function createTrade(formData: FormData) {
  const direction = formData.get('direction') as string
  const entry = parseFloat(formData.get('entry') as string)
  const exitVal = formData.get('exit') ? parseFloat(formData.get('exit') as string) : null
  const size = formData.get('size') ? parseFloat(formData.get('size') as string) : 1
  const stopLoss = parseFloat(formData.get('stopLoss') as string)
  const takeProfit = parseFloat(formData.get('takeProfit') as string)
  const tp2 = formData.get('takeProfit2') ? parseFloat(formData.get('takeProfit2') as string) : null
  const tp3 = formData.get('takeProfit3') ? parseFloat(formData.get('takeProfit3') as string) : null

  let pnl: number | null = null
  let result: string | null = null

  if (exitVal !== null) {
    const sign = direction === 'LONG' ? 1 : -1
    pnl = Math.round((exitVal - entry) * sign * size * 100) / 100
    result = pnl > 0.01 ? 'WIN' : pnl < -0.01 ? 'LOSS' : 'BREAKEVEN'
  }

  const dateStr = formData.get('date') as string
  const date = dateStr ? new Date(dateStr) : new Date()

  const chartFile = formData.get('chartImage') as File | null
  const chartImage = await saveChartImage(chartFile)

  const reasonsArr = formData.getAll('reasons').map(r => r.toString()).filter(Boolean)
  const reasons = reasonsArr.length > 0 ? JSON.stringify(reasonsArr) : null

  await prisma.trade.create({
    data: {
      date,
      instrument: formData.get('instrument') as string,
      session: detectSession(date),
      direction,
      entry,
      stopLoss,
      takeProfit,
      takeProfit2: tp2,
      takeProfit3: tp3,
      exit: exitVal,
      size,
      pnl,
      result,
      emotion: formData.get('emotion') ? parseInt(formData.get('emotion') as string) : null,
      notes: formData.get('notes') as string || null,
      chartImage,
      reasons,
    },
  })
  revalidatePath('/trading')
}

export async function deleteTrade(id: number) {
  const trade = await prisma.trade.findUnique({ where: { id } })
  if (trade?.chartImage) {
    try {
      await unlink(path.join(process.cwd(), 'public', trade.chartImage))
    } catch {
      // file already missing — ignore
    }
  }
  await prisma.trade.delete({ where: { id } })
  revalidatePath('/trading')
}

// ── Vocabulary (Polski) ────────────────────────────

export async function addVocabularyWord(formData: FormData) {
  const word = (formData.get('word') as string)?.trim()
  const definition = (formData.get('definition') as string)?.trim()
  const example = (formData.get('example') as string)?.trim()

  if (!word || !definition) return

  await prisma.vocabulary.create({
    data: { word, definition, example: example || null },
  })

  revalidatePath('/polski')
}

export async function toggleWordMastered(id: number) {
  const entry = await prisma.vocabulary.findUnique({ where: { id } })
  if (!entry) return
  await prisma.vocabulary.update({ where: { id }, data: { mastered: !entry.mastered } })
  revalidatePath('/polski')
}

export async function deleteVocabularyWord(id: number) {
  await prisma.vocabulary.delete({ where: { id } })
  revalidatePath('/polski')
}

// ── Prop Firms ────────────────────────────────────

export async function addPropFirm(formData: FormData) {
  const firm = (formData.get('firm') as string)?.trim()
  const accountSize = parseFloat(formData.get('accountSize') as string)
  const phase = formData.get('phase') as string
  const notes = (formData.get('notes') as string)?.trim()

  if (!firm || !phase || isNaN(accountSize)) return

  await prisma.propFirm.create({
    data: { firm, accountSize, phase, notes: notes || null },
  })
  revalidatePath('/trading')
}

export async function deletePropFirm(id: number) {
  await prisma.propFirm.delete({ where: { id } })
  revalidatePath('/trading')
}

export async function updatePropFirmStatus(id: number, status: string) {
  await prisma.propFirm.update({ where: { id }, data: { status } })
  revalidatePath('/trading')
}

export async function updatePropFirmPnl(id: number, pnl: number) {
  await prisma.propFirm.update({ where: { id }, data: { currentPnl: pnl } })
  revalidatePath('/trading')
}

// ── Review AI ─────────────────────────────────────

export async function generateReviewSummary(data: {
  wentWell: string
  improve: string
  energy: number
  tomorrowPlan: string
}): Promise<string> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 250,
    messages: [{
      role: 'user',
      content: `Jesteś mentorem który mówi prawdę w oczy. Przeanalizuj ten dzienny review 19-latka który chce być elitą i napisz dokładnie 3 zdania: 2 zdania podsumowania dnia + 1 konkretna twarda rada na jutro. Zero ściemy, zero ogólników.

Energia: ${data.energy}/10
Co poszło dobrze: ${data.wentWell}
Do poprawy: ${data.improve}
Plan na jutro: ${data.tomorrowPlan}

Odpowiedz tylko tymi 3 zdaniami, po polsku.`,
    }],
  })
  return (msg.content[0] as { type: string; text: string }).text.trim()
}

export type WordSuggestion = {
  word: string
  definition: string
  example: string
}

export async function fetchWordSuggestions(alreadyKnown: string[]): Promise<WordSuggestion[]> {
  const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

  const avoid = alreadyKnown.length > 0
    ? `Nie proponuj tych słów, które użytkownik już zna: ${alreadyKnown.slice(0, 30).join(', ')}.`
    : ''

  const msg = await client.messages.create({
    model: 'claude-haiku-4-5-20251001',
    max_tokens: 600,
    messages: [{
      role: 'user',
      content: `Jesteś trenerem języka polskiego. Zaproponuj dokładnie 5 zaawansowanych, rzadkich lub wyszukanych słów polskich, które brzmią imponująco w codziennej rozmowie — takich, których używają elokwentni ludzie. ${avoid}

Odpowiedz WYŁĄCZNIE jako JSON array, bez żadnego tekstu przed ani po:
[
  {"word": "...", "definition": "...", "example": "..."},
  ...
]

Zasady:
- słowo: jedno polskie słowo (może być przymiotnik, czasownik, rzeczownik)
- definition: zwięzłe znaczenie (max 10 słów)
- example: naturalne zdanie używające tego słowa w rozmowie (max 15 słów)`,
    }],
  })

  const text = (msg.content[0] as { type: string; text: string }).text.trim()
  const json = text.slice(text.indexOf('['), text.lastIndexOf(']') + 1)
  return JSON.parse(json) as WordSuggestion[]
}
