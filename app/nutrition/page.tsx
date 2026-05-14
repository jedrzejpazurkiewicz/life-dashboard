import { prisma } from '@/lib/db'
import NutritionClient from '@/components/Nutrition/NutritionClient'

export default async function NutritionPage() {
  const today = new Date()
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)

  const meals = await prisma.meal.findMany({
    where: { date: { gte: start, lte: end } },
    orderBy: { date: 'asc' },
  })

  return <NutritionClient meals={meals} today={today.toISOString()} />
}
