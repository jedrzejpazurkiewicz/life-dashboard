import { prisma } from '@/lib/db'
import DashboardClient from '@/components/Dashboard/DashboardClient'

function getTodayRange() {
  const now = new Date()
  const start = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
  const end = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)
  return { start, end }
}

export default async function HomePage() {
  const { start, end } = getTodayRange()
  const today = new Date()
  const dayOfWeek = today.getDay() === 0 ? 7 : today.getDay()

  const [todayTasks, todayMeals, trainingDay, habitLog] = await Promise.all([
    prisma.task.findMany({
      where: { date: { gte: start, lte: end } },
      orderBy: [{ done: 'asc' }, { priority: 'asc' }],
    }),
    prisma.meal.count({ where: { date: { gte: start, lte: end } } }),
    prisma.trainingDay.findUnique({
      where: { dayOfWeek },
      include: { exercises: { orderBy: { order: 'asc' } } },
    }),
    prisma.habitLog.findFirst({ where: { date: { gte: start, lte: end } } }),
  ])

  return (
    <DashboardClient
      tasks={todayTasks}
      mealsCount={todayMeals}
      trainingDay={trainingDay}
      habitLog={habitLog}
      today={today.toISOString()}
    />
  )
}
