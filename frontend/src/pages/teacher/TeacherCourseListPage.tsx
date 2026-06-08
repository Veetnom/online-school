import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { teacherCourses } from '../../data/mockCoursesData'

export function TeacherCourseListPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Мои курсы</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {teacherCourses.map((course) => (
          <Link key={course.id} to={`/teacher/courses/${course.id}/structure`}>
            <Card className="cursor-pointer transition hover:shadow-md">
              <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
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