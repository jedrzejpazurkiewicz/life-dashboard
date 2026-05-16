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
      name: 'Push — Klatka / Triceps / Barki',
      exercises: [
        { name: 'Pompki szerokie', targetSets: 4, targetReps: '8-15', order: 0 },
        { name: 'Pompki diamentowe', targetSets: 3, targetReps: '10-15', order: 1 },
        { name: 'Dipy (krzesło / drążek)', targetSets: 3, targetReps: 'max', order: 2 },
        { name: 'Pike Push-up', targetSets: 3, targetReps: '8-12', order: 3 },
        { name: 'Pompki odwrócone', targetSets: 3, targetReps: '10-15', order: 4 },
      ],
    },
    {
      dayOfWeek: 2,
      name: 'Pull — Plecy / Biceps',
      exercises: [
        { name: 'Podciągania szerokie', targetSets: 4, targetReps: 'max', order: 0 },
        { name: 'Podciągania wąskie (supinacja)', targetSets: 3, targetReps: 'max', order: 1 },
        { name: 'Australijskie podciągania', targetSets: 3, targetReps: '10-15', order: 2 },
        { name: 'Face pull (gumka)', targetSets: 3, targetReps: '15-20', order: 3 },
        { name: 'Zawiśnięcie — zwis aktywny', targetSets: 3, targetReps: '30-60s', order: 4 },
      ],
    },
    {
      dayOfWeek: 3,
      name: 'Nogi — Maszyny',
      exercises: [
        { name: 'Leg Press', targetSets: 4, targetReps: '12-15', order: 0 },
        { name: 'Prostowanie nóg (maszyna)', targetSets: 3, targetReps: '12-15', order: 1 },
        { name: 'Zginanie nóg (maszyna)', targetSets: 3, targetReps: '12-15', order: 2 },
        { name: 'Łydki na maszynie', targetSets: 4, targetReps: '15-20', order: 3 },
        { name: 'Przysiady bułgarskie', targetSets: 3, targetReps: '10 każda', order: 4 },
      ],
    },
    {
      dayOfWeek: 4,
      name: 'Core + Mobilność',
      exercises: [
        { name: 'Plank', targetSets: 3, targetReps: '60s', order: 0 },
        { name: 'Hollow Body Hold', targetSets: 3, targetReps: '30s', order: 1 },
        { name: 'Wznosy nóg w zwisie', targetSets: 3, targetReps: '10-12', order: 2 },
        { name: 'Deska boczna', targetSets: 3, targetReps: '30s każda', order: 3 },
        { name: 'Rozciąganie / Mobilność', targetSets: 1, targetReps: '15 min', order: 4 },
      ],
    },
    {
      dayOfWeek: 5,
      name: 'Push — Zaawansowany',
      exercises: [
        { name: 'Pompki z nogami wyżej', targetSets: 4, targetReps: '8-12', order: 0 },
        { name: 'Dipy (drążek)', targetSets: 4, targetReps: 'max', order: 1 },
        { name: 'Pike Push-up (progresja)', targetSets: 3, targetReps: '8-10', order: 2 },
        { name: 'Pompki z klaśnięciem', targetSets: 3, targetReps: '5-8', order: 3 },
        { name: 'Planche Lean (izometria)', targetSets: 3, targetReps: '20-30s', order: 4 },
      ],
    },
    {
      dayOfWeek: 6,
      name: 'Full Body Kalistenika',
      exercises: [
        { name: 'Burpees', targetSets: 3, targetReps: '10', order: 0 },
        { name: 'Podciągania szerokie', targetSets: 3, targetReps: 'max', order: 1 },
        { name: 'Pompki szerokie', targetSets: 3, targetReps: '15', order: 2 },
        { name: 'Jump Squats', targetSets: 3, targetReps: '15', order: 3 },
        { name: 'Hollow Body Hold', targetSets: 3, targetReps: '30s', order: 4 },
      ],
    },
  ]

  for (const day of plan) {
    await prisma.trainingDay.create({
      data: {
        dayOfWeek: day.dayOfWeek,
        name: day.name,
        exercises: { create: day.exercises },
      },
    })
  }

  console.log('Seed — plan kalisteniki zapisany')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
