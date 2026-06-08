import { useParams } from 'react-router-dom'
import { CourseTabs } from '../../components/course/CourseTabs'
import { Card } from '../../components/ui/Card'
import { moduleLessons } from '../../data/mockData'

export function CourseStructurePage() {
  const { id = '1' } = useParams()

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">Название курса</h1>
      <div className="mb-6">
        <CourseTabs courseId={id} role="teacher" />
      </div>

      <Card>
        <h3 className="mb-4 text-lg font-semibold text-slate-900">Структура модуля</h3>
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