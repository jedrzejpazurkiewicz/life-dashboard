import { PrismaLibSql } from '@prisma/adapter-libsql'
import { PrismaClient } from '@/app/generated/prisma/client'
import path from 'path'

const dbPath = path.resolve(process.cwd(), 'prisma/dev.db')

function createPrismaClient() {
  const adapter = new PrismaLibSql({ url: `file:${dbPath}` })
  return new PrismaClient({ adapter })
}

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma
