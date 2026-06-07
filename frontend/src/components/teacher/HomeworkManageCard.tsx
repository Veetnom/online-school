import type { TeacherHomework } from '../../types'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

interface HomeworkManageCardProps {
  homework: TeacherHomework
}

export function HomeworkManageCard({ homework }: HomeworkManageCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-semibold text-slate-900">{homework.title}</h3>
          <Badge variant={homework.status === 'published' ? 'published' : 'draft'} className="mt-2">
            {homework.status === 'published' ? 'Опубликован' : 'Черновик'}
          </Badge>
        </div>
        <span className="shrink-0 text-sm text-slate-500">До {homework.deadline}</span>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-sm text-slate-500">{homework.points} баллов</span>
        <Button variant="secondary" size="sm">
          Редактировать
        </Button>
      </div>
    </Card>
  )
}
