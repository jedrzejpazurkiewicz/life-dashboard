import { prisma } from '@/lib/db'
import StatsClient from '@/components/StatsClient'

export default async function StatsPage() {
  const today = new Date()
  const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000)
  const monthAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000)

  const [taskStats, trainingCount, reviewCount, habitLogs] = await Promise.all([
    prisma.task.groupBy({
      by: ['done'],
      _count: { id: true },
      where: { createdAt: { gte: weekAgo } },
    }),
    prisma.trainingSession.count({ where: { date: { gte: weekAgo } } }),
    prisma.dailyReview.count({ where: { date: { gte: weekAgo } } }),
    prisma.habitLog.findMany({
      where: { date: { gte: monthAgo } },
      orderBy: { date: 'desc' },
    }),
  ])

  const doneTasks = taskStats.find(s => s.done)?._count.id ?? 0
  const totalTasks = taskStats.reduce((s, g) => s + g._count.id, 0)

  return (
    <StatsClient
      weekDone={doneTasks}
      weekTotal={totalTasks}
      weekTraining={trainingCount}
      weekReviews={reviewCount}
      habitLogs={habitLogs}
    />
  )
}
