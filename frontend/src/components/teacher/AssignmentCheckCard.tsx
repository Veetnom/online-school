import { Link } from 'react-router-dom'
import type { TeacherAssignment } from '../../types'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

interface AssignmentCheckCardProps {
  assignment: TeacherAssignment
}

export function AssignmentCheckCard({ assignment }: AssignmentCheckCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-slate-900">{assignment.title}</h3>
          <Badge
            variant={assignment.type === 'task' ? 'task' : 'homework'}
            className="mt-2"
          >
            {assignment.type === 'task' ? 'Задача' : 'Домашнее задание'}
          </Badge>
        </div>
        <span className="shrink-0 text-sm text-slate-500">
          Проверено {assignment.checked}/{assignment.total}
        </span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-slate-500">{assignment.points} баллов</span>
        <Link to="/teacher/checking/essay">
          <Button variant="purple" size="sm">
            Проверить
          </Button>
        </Link>
      </div>
    </Card>
  )
}
