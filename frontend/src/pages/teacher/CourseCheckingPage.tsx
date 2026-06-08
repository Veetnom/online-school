import { useParams, Link } from 'react-router-dom'
import { CourseTabs } from '../../components/course/CourseTabs'
import { Card } from '../../components/ui/Card'
import { SearchInput } from '../../components/ui/SearchInput'
import { Select } from '../../components/ui/Select'
import { Button } from '../../components/ui/Button'
import { teacherAssignments, essayTask } from '../../data/mockData'

export function CourseCheckingPage() {
  const { id = '1', assignmentId } = useParams()

  // Если выбрано конкретное задание — показываем страницу проверки
  if (assignmentId) {
    const assignment = teacherAssignments.find((a) => a.id === assignmentId)
    return (
      <div>
        <h1 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">Название курса</h1>
        <div className="mb-6">
          <CourseTabs courseId={id} role="teacher" />
        </div>

        <div className="mb-4">
          <Link
            to={`/teacher/courses/${id}/checking`}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Назад к списку заданий
          </Link>
        </div>

        <Card>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">{assignment?.title || 'Задание'}</h2>
          <div className="mb-4 rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-600">{essayTask.instruction}</p>
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-slate-700">Ответ ученика</label>
            <textarea
              className="w-full rounded-lg border border-slate-300 p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              rows={6}
              defaultValue="Здесь будет ответ ученика на задание..."
              readOnly
            />
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-slate-700">Оценка учителя</label>
            <div className="flex gap-4">
              <input
                type="number"
                placeholder="Баллы"
                className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              />
              <span className="self-center text-sm text-slate-500">/ {assignment?.points}</span>
            </div>
          </div>

          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-slate-700">Комментарий</label>
            <textarea
              className="w-full rounded-lg border border-slate-300 p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              rows={3}
              placeholder="Напишите комментарий к работе..."
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button variant="danger">Отклонить</Button>
            <Button variant="blue">Принять</Button>
          </div>
        </Card>
      </div>
    )
  }

  // Список заданий для проверки
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">Название курса</h1>
      <div className="mb-6">
        <CourseTabs courseId={id} role="teacher" />
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Select
          options={[
            { value: 'all', label: 'Все типы' },
            { value: 'task', label: 'Задача' },
            { value: 'homework', label: 'Домашнее задание' },
          ]}
          className="w-full sm:w-48"
        />
        <SearchInput className="flex-1" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {teacherAssignments.map((assignment) => (
          <Link key={assignment.id} to={`/teacher/courses/${id}/checking/${assignment.id}`}>
            <Card className="cursor-pointer transition hover:shadow-lg">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-slate-900">{assignment.title}</h3>
                  <span className={`mt-2 inline-block rounded-full px-3 py-0.5 text-xs font-medium ${assignment.type === 'task' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                    {assignment.type === 'task' ? 'Задача' : 'Домашнее задание'}
                  </span>
                </div>
                <span className="shrink-0 text-sm text-slate-500">
                  Проверено {assignment.checked}/{assignment.total}
                </span>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="text-sm text-slate-500">{assignment.points} баллов</span>
                <Button variant="purple" size="sm">
                  Проверить
                </Button>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}