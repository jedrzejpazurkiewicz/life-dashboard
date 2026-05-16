import { prisma } from '@/lib/db'
import TradingClient from '@/components/Trading/TradingClient'

export default async function TradingPage() {
  const [trades, propFirms] = await Promise.all([
    prisma.trade.findMany({ orderBy: { date: 'desc' } }),
    prisma.propFirm.findMany({ orderBy: { startDate: 'desc' } }),
  ])

  return <TradingClient trades={trades} propFirms={propFirms} />
}
