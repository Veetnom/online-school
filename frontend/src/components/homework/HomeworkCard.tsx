import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

interface HomeworkCardProps {
  title: string
  subject?: string
  daysLeft: number
  points?: number
  maxPoints?: number
  showSubject?: boolean
}

export function HomeworkCard({
  title,
  subject,
  daysLeft,
  points,
  maxPoints,
  showSubject = true,
}: HomeworkCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <span className="shrink-0 text-sm text-slate-500">
          Осталось {daysLeft} {daysLeft === 1 ? 'день' : daysLeft < 5 ? 'дня' : 'дней'}
        </span>
      </div>
      {showSubject && subject && (
        <p className="mt-2 text-sm text-slate-600">{subject}</p>
      )}
      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {points !== undefined && maxPoints !== undefined ? (
          <span className="text-sm text-slate-500">
            {points}/{maxPoints} баллов
          </span>
        ) : (
          <span />
        )}
        <Button variant="orange" size="sm" className="self-end sm:self-auto">
          Сдать ДЗ
        </Button>
      </div>
    </Card>
  )
}
