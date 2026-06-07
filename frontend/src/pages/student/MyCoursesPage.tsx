import { EnrolledCourseCard } from '../../components/course/EnrolledCourseCard'
import { enrolledCourses } from '../../data/mockData'

export function MyCoursesPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Мои курсы</h1>
      <div className="space-y-4">
        {enrolledCourses.map((course) => (
          <EnrolledCourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
