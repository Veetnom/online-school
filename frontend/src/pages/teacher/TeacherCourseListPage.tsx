import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { teacherCourses } from '../../data/mockCoursesData'

export function TeacherCourseListPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Мои курсы</h1>
      <div className="grid gap-5 lg:grid-cols-2">
        {teacherCourses.map((course) => (
          <Link key={course.id} to={`/teacher/courses/${course.id}/structure`}>
            <Card className="group cursor-pointer transition hover:shadow-lg">
              <div className="flex items-start gap-4">
                {/* Цветной акцент */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-xl font-bold text-white shadow-sm">
                  {course.title.charAt(0)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {course.title}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {course.studentCount} {course.studentCount === 1 ? 'ученик' : 'учеников'}
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