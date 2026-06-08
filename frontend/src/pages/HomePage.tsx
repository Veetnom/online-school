import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'

export function HomePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <Card className="max-w-md text-center">
        <h1 className="text-2xl font-bold text-slate-900">Онлайн-школа</h1>
        <p className="mt-2 text-slate-600">Выберите раздел для просмотра</p>
        <div className="mt-6 flex flex-col gap-3">
          <Link
            to="/store"
            className="rounded-lg bg-violet-600 px-4 py-3 font-medium text-white transition hover:bg-violet-700"
          >
            Ученик
          </Link>
          <Link
            to="/teacher/courses"
            className="rounded-lg bg-slate-900 px-4 py-3 font-medium text-white transition hover:bg-slate-800"
          >
            Преподаватель
          </Link>
          <Link
            to="/methodist/courses"
            className="rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Методист
          </Link>
          <Link
            to="/curator/chat"
            className="rounded-lg bg-green-700 px-4 py-3 font-medium text-white transition hover:bg-green-800"
          >
            Куратор
          </Link>
        </div>
      </Card>
    </div>
  )
}
