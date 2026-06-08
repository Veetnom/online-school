import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { methodistCourses } from '../../data/mockCoursesData'

export function MethodistCourseListPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Курсы</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {methodistCourses.map((course) => (
          <Link key={course.id} to={`/methodist/courses/${course.id}`}>
            <Card className="cursor-pointer transition hover:shadow-md">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
                <span
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    course.status === 'published'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {course.status === 'published' ? 'Опубликован' : 'Черновик'}
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-500">
                {course.studentCount} {course.studentCount === 1 ? 'ученик' : 'учеников'}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}