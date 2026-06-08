import { useParams, Link } from 'react-router-dom'
import { CourseTabs } from '../../components/course/CourseTabs'
import { Card } from '../../components/ui/Card'
import { courseModules } from '../../data/mockCoursesData'
import { moduleLessons } from '../../data/mockData'

export function CuratorCourseStructurePage() {
  const { id = '1', moduleId } = useParams()

  // Если выбран модуль — показываем его уроки (read-only)
  if (moduleId) {
    const module = courseModules.find((m) => m.id === moduleId)
    return (
      <div>
        <h1 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">Название курса</h1>
        <div className="mb-6">
          <CourseTabs courseId={id} role="curator" />
        </div>

        <div className="mb-4">
          <Link
            to={`/curator/courses/${id}/structure`}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Назад к модулям
          </Link>
        </div>

        <Card>
          <h3 className="mb-4 text-lg font-semibold text-slate-900">{module?.title || 'Модуль'}</h3>
          <div className="rounded-lg border border-slate-200">
            {moduleLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center gap-3 border-b border-slate-100 p-4 last:border-b-0"
              >
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-900">{lesson.title}</p>
                  <p className="text-sm text-slate-500">{lesson.points} баллов</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    )
  }

  // Список модулей
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">Название курса</h1>
      <div className="mb-6">
        <CourseTabs courseId={id} role="curator" />
      </div>

      <h2 className="text-lg font-semibold text-slate-900">Модули курса</h2>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {courseModules.map((mod) => (
          <Link
            key={mod.id}
            to={`/curator/courses/${id}/structure/${mod.id}`}
          >
            <Card className="cursor-pointer transition hover:shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-orange-500 to-amber-600 text-lg font-bold text-white">
                  {mod.id.slice(-1)}
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">{mod.title}</h3>
                  <p className="text-sm text-slate-500">
                    {mod.lessonCount} {mod.lessonCount === 1 ? 'урок' : 'уроков'}
                  </p>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}