import { TaskView } from '../../components/course/TaskView'
import { sampleTask } from '../../data/mockData'

export function TaskPage() {
  return <TaskView task={sampleTask} />
}
