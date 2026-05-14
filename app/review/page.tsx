import { prisma } from '@/lib/db'
import ReviewClient from '@/components/ReviewClient'

export default async function ReviewPage() {
  const today = new Date()
  const start = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 0, 0, 0)
  const end = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59)

  const [todayReview, recentReviews] = await Promise.all([
    prisma.dailyReview.findFirst({ where: { date: { gte: start, lte: end } } }),
    prisma.dailyReview.findMany({
      orderBy: { date: 'desc' },
      take: 7,
    }),
  ])

  return <ReviewClient todayReview={todayReview} recentReviews={recentReviews} />
}
