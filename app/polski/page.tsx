import { prisma } from '@/lib/db'
import PolishClient from '@/components/Polish/PolishClient'
import { fetchWordSuggestions } from '@/app/actions'

export default async function PolishPage() {
  const now = new Date()
  const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0)
  const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59)

  const [todayWords, allWords] = await Promise.all([
    prisma.vocabulary.findMany({
      where: { addedAt: { gte: startOfDay, lte: endOfDay } },
      orderBy: { addedAt: 'asc' },
    }),
    prisma.vocabulary.findMany({
      orderBy: { addedAt: 'desc' },
      take: 100,
    }),
  ])

  const allWordNames = allWords.map(w => w.word)
  const suggestions = await fetchWordSuggestions(allWordNames)

  return <PolishClient todayWords={todayWords} allWords={allWords} initialSuggestions={suggestions} />
}
