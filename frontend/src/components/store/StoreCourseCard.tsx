import { Link } from 'react-router-dom'
import { formatPrice } from '../../data/mockData'
import type { Course } from '../../types'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

interface StoreCourseCardProps {
  course: Course
}

export function StoreCourseCard({ course }: StoreCourseCardProps) {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
      <div className="mt-2 flex items-center gap-2">
        <Avatar name={course.instructorName} size="sm" />
        <span className="text-sm text-slate-600">{course.instructorName}</span>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <span className="text-xl font-bold text-slate-900">{formatPrice(course.price)}</span>
        <div className="flex gap-2">
          <Link to={`/store/${course.id}`}>
            <Button variant="secondary" size="sm">
              Подробнее
            </Button>
          </Link>
          <Button variant="orange" size="sm">
            В корзину
          </Button>
        </div>
      </div>
    </Card>
  )
}
