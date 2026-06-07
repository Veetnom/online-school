import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import type { Task } from '../../types'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Input } from '../ui/Input'

interface EssayGradingPanelProps {
  task: Task
  showAiChecked?: boolean
}

export function EssayGradingPanel({ task, showAiChecked = false }: EssayGradingPanelProps) {
  const [grade, setGrade] = useState('')

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-4 flex justify-center">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-200 text-sm font-medium text-slate-600">
          1
        </span>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_200px]">
        <div className="space-y-6">
          <Card>
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-900">{task.title}</h2>
              <span className="shrink-0 text-sm text-slate-500">{task.points} баллов</span>
            </div>
            <p className="whitespace-pre-line text-sm leading-relaxed text-slate-700">
              {task.instruction}
            </p>
          </Card>

          <Card>
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <h3 className="font-semibold text-slate-900">Ответ ученика</h3>
              {showAiChecked ? (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">
                  Вероятность ИИ: 55%
                </span>
              ) : (
                <Button variant="purple" size="sm">
                  Проверить на ИИ
                </Button>
              )}
            </div>
            <p className="text-sm leading-relaxed text-slate-700">{task.content}</p>
            <div className="mt-6 flex flex-col items-end gap-3 sm:flex-row sm:justify-end">
              <Input
                placeholder="Введите оценку"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                className="w-full sm:w-40"
              />
              <Button variant="blue">Оценить</Button>
            </div>
          </Card>
        </div>

        <Card className="h-fit">
          <Link
            to="/teacher/checking"
            className="mb-4 flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            В меню
          </Link>
          <h3 className="font-semibold text-slate-900">Сочинение</h3>
          <p className="mt-2 text-sm text-slate-500">Решено за: 00:25:44</p>
        </Card>
      </div>
    </div>
  )
}
