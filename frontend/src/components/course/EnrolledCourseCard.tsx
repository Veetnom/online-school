import { Link } from 'react-router-dom'
import type { EnrolledCourse } from '../../types'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { ProgressBar } from '../ui/ProgressBar'

interface EnrolledCourseCardProps {
  course: EnrolledCourse
}

export function EnrolledCourseCard({ course }: EnrolledCourseCardProps) {
  return (
    <Card>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">{course.title}</h3>
          <p className="mt-2 text-sm text-slate-500">
            {course.progress}% материалов пройдено
          </p>
          <ProgressBar value={course.progress} className="mt-2" />
        </div>
        <Link to={`/my-courses/${course.id}`} className="shrink-0">
          <Button variant="purple">Продолжить</Button>
        </Link>
      </div>
    </Card>
  )
}
