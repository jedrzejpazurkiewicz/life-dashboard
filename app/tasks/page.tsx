import { prisma } from '@/lib/db'
import TasksClient from '@/components/Tasks/TasksClient'

export default async function TasksPage() {
  const tasks = await prisma.task.findMany({
    orderBy: [{ done: 'asc' }, { createdAt: 'desc' }],
  })

  return <TasksClient tasks={tasks} />
}
