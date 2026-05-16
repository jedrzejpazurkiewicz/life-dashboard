import { prisma } from '@/lib/db'
import StatsClient from '@/components/StatsClient'

export default async function StatsPage() {
  const today = new Date()
  const ninetyDaysAgo = new Date(today.getTime() - 90 * 24 * 60 * 60 * 1000)

  const [tasks, trainingSessions, reviews, habitLogs] = await Promise.all([
    prisma.task.findMany({
      where: { createdAt: { gte: ninetyDaysAgo } },
      select: { done: true, createdAt: true },
    }),
    prisma.trainingSession.findMany({
      where: { date: { gte: ninetyDaysAgo } },
      select: { date: true },
    }),
    prisma.dailyReview.findMany({
      where: { date: { gte: ninetyDaysAgo } },
      select: { date: true, energy: true },
    }),
    prisma.habitLog.findMany({
      where: { date: { gte: ninetyDaysAgo } },
      orderBy: { date: 'desc' },
    }),
  ])

  return (
    <StatsClient
      tasks={tasks}
      trainingSessions={trainingSessions}
      reviews={reviews}
      habitLogs={habitLogs}
    />
  )
}
