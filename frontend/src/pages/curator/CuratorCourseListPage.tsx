import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { methodistCourses } from '../../data/mockCoursesData'

export function CuratorCourseListPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Курсы</h1>
      <div className="grid gap-5 lg:grid-cols-2">
        {methodistCourses.filter((c) => c.status === 'published').map((course) => (
          <Link key={course.id} to={`/curator/courses/${course.id}`}>
            <Card className="group cursor-pointer transition hover:shadow-lg">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-500 to-cyan-600 text-xl font-bold text-white shadow-sm">
                  {course.title.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {course.studentCount} {course.studentCount === 1 ? 'ученик' : 'учеников'}
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-sky-500"
                        style={{ width: `${Math.min((course.studentCount / 30) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-400">
                      {Math.round(Math.min((course.studentCount / 30) * 100, 100))}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}