import { PrismaLibSql } from '@prisma/adapter-libsql'
import { PrismaClient } from '../app/generated/prisma/client'
import path from 'path'

const dbPath = path.resolve(process.cwd(), 'prisma/dev.db')
const adapter = new PrismaLibSql({ url: `file:${dbPath}` })
const prisma = new PrismaClient({ adapter })

async function main() {
  await prisma.trainingDay.deleteMany()

  const plan = [
    {
      dayOfWeek: 1,
      name: 'Klatka + Triceps',
      exercises: [
        { name: 'Wyciskanie sztangi', targetSets: 4, targetReps: '6-10', order: 0 },
        { name: 'Wyciskanie hantli skos', targetSets: 3, targetReps: '10-12', order: 1 },
        { name: 'Rozpiętki', targetSets: 3, targetReps: '12-15', order: 2 },
        { name: 'Wyciskanie francuskiego', targetSets: 3, targetReps: '10-12', order: 3 },
        { name: 'Pompki wąski chwyt', targetSets: 3, targetReps: '12-15', order: 4 },
      ],
    },
    {
      dayOfWeek: 2,
      name: 'Plecy + Biceps',
      exercises: [
        { name: 'Martwy ciąg', targetSets: 4, targetReps: '5-8', order: 0 },
        { name: 'Podciąganie', targetSets: 4, targetReps: '6-10', order: 1 },
        { name: 'Wiosłowanie sztangą', targetSets: 3, targetReps: '8-12', order: 2 },
        { name: 'Uginanie hantli', targetSets: 3, targetReps: '10-12', order: 3 },
        { name: 'Uginanie młotek', targetSets: 3, targetReps: '10-12', order: 4 },
      ],
    },
    {
      dayOfWeek: 3,
      name: 'Nogi',
      exercises: [
        { name: 'Przysiady', targetSets: 4, targetReps: '6-10', order: 0 },
        { name: 'Leg press', targetSets: 3, targetReps: '10-12', order: 1 },
        { name: 'Wypady', targetSets: 3, targetReps: '10 każda', order: 2 },
        { name: 'Prostowanie nóg', targetSets: 3, targetReps: '12-15', order: 3 },
        { name: 'Łydki stojąc', targetSets: 4, targetReps: '15-20', order: 4 },
      ],
    },
    {
      dayOfWeek: 4,
      name: 'Cardio / Aktywny odpoczynek',
      exercises: [
        { name: 'Rower 30 min', targetSets: 1, targetReps: '30 min', order: 0 },
        { name: 'Rozciąganie', targetSets: 1, targetReps: '15 min', order: 1 },
      ],
    },
    {
      dayOfWeek: 5,
      name: 'Barki + Ramiona',
      exercises: [
        { name: 'Wyciskanie żołnierskie', targetSets: 4, targetReps: '6-10', order: 0 },
        { name: 'Unoszenie bokiem', targetSets: 3, targetReps: '12-15', order: 1 },
        { name: 'Arnoldki', targetSets: 3, targetReps: '10-12', order: 2 },
        { name: 'Face pull', targetSets: 3, targetReps: '15-20', order: 3 },
      ],
    },
    {
      dayOfWeek: 6,
      name: 'Full Body / Siłowy',
      exercises: [
        { name: 'Przysiady', targetSets: 3, targetReps: '8-10', order: 0 },
        { name: 'Wyciskanie', targetSets: 3, targetReps: '8-10', order: 1 },
        { name: 'Wiosłowanie', targetSets: 3, targetReps: '8-10', order: 2 },
        { name: 'Overhead press', targetSets: 3, targetReps: '8-10', order: 3 },
      ],
    },
  ]

  for (const day of plan) {
    await prisma.trainingDay.create({
      data: {
        dayOfWeek: day.dayOfWeek,
        name: day.name,
        exercises: {
          create: day.exercises,
        },
      },
    })
  }

  console.log('Seed completed — plan treningowy dodany')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
