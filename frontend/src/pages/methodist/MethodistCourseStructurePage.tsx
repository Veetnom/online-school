import { GripVertical, X } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { CourseTabs } from '../../components/course/CourseTabs'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { moduleLessons } from '../../data/mockData'

export function MethodistCourseStructurePage() {
  const { id = '1' } = useParams()

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">Название курса</h1>
      <div className="mb-6">
        <CourseTabs courseId={id} role="methodist" />
      </div>

      <Card>
        <div className="grid gap-4 sm:grid-cols-3">
          <Input label="Модуль" placeholder="Название модуля" />
          <Input label="Начало модуля" type="date" />
          <Input label="Необходимо баллов" defaultValue="200" />
        </div>

        <div className="mt-6">
          <h3 className="mb-3 text-sm font-medium text-slate-700">Структура модуля</h3>
          <div className="rounded-lg border border-slate-200">
            {moduleLessons.map((lesson) => (
              <div
                key={lesson.id}
                className="flex items-center gap-3 border-b border-slate-100 p-4 last:border-b-0"
              >
                <GripVertical className="h-5 w-5 shrink-0 cursor-grab text-slate-400" />
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-900">{lesson.title}</p>
                  <p className="text-sm text-slate-500">{lesson.points} баллов</p>
                </div>
                <Button variant="secondary" size="sm">
                  Редактировать
                </Button>
                <button
                  type="button"
                  className="rounded p-1 text-slate-400 hover:bg-slate-100"
                  aria-label="Удалить урок"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            ))}
            <div className="p-4">
              <Button variant="ghost" className="w-full border border-slate-300">
                Добавить урок
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <Button variant="danger">Удалить модуль</Button>
          <div className="flex gap-3">
            <Button variant="secondary">Назад</Button>
            <Button variant="blue">Сохранить</Button>
          </div>
        </div>
      </Card>
    </div>
  )
}