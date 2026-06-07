import { StoreCourseCard } from '../../components/store/StoreCourseCard'
import { storeCourses } from '../../data/mockData'

export function StorePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Магазин</h1>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {storeCourses.map((course) => (
          <StoreCourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}
