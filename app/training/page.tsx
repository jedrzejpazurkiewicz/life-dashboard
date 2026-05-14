import { prisma } from '@/lib/db'
import TrainingClient from '@/components/Training/TrainingClient'

export default async function TrainingPage() {
  const today = new Date()
  const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay()
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)

  const [trainingPlan, recentSessions] = await Promise.all([
    prisma.trainingDay.findMany({
      orderBy: { dayOfWeek: 'asc' },
      include: { exercises: { orderBy: { order: 'asc' } } },
    }),
    prisma.trainingSession.findMany({
      where: { date: { gte: weekAgo } },
      orderBy: { date: 'desc' },
      take: 10,
      include: { sets: true },
    }),
  ])

  return (
    <TrainingClient
      trainingPlan={trainingPlan}
      recentSessions={recentSessions}
      todayDayOfWeek={dayOfWeek}
    />
  )
}
