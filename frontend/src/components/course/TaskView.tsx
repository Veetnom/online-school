import { ArrowLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import type { Task } from '../../types'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'
import { Input } from '../ui/Input'

interface TaskViewProps {
  task: Task
  totalTasks?: number
  moduleTitle?: string
}

export function TaskView({ task, totalTasks = 22, moduleTitle = 'Правописание орфографических ошибок' }: TaskViewProps) {
  const [answer, setAnswer] = useState('')
  const [timer] = useState('00:01:04')

  return (
    <div>
      <div className="mb-6 flex items-center gap-1 overflow-x-auto pb-2">
        {Array.from({ length: Math.min(totalTasks, 10) }, (_, i) => i + 1).map((num) => (
          <button
            key={num}
            type="button"
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
              num === task.id
                ? 'bg-slate-700 text-white'
                : 'border border-slate-300 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {num}
          </button>
        ))}
        <span className="px-2 text-slate-400">...</span>
        <ChevronRight className="h-5 w-5 shrink-0 text-slate-400" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_240px]">
        <div className="space-y-6">
          <Card>
            <div className="mb-4 flex items-start justify-between gap-4">
              <h2 className="text-lg font-semibold text-slate-900">{task.title}</h2>
              <span className="shrink-0 text-sm text-slate-500">{task.points} балл</span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-slate-700">{task.instruction}</p>
            {task.content && (
              <p className="mb-6 whitespace-pre-line text-sm leading-relaxed text-slate-700">
                {task.content}
              </p>
            )}
            <Input
              placeholder="Введите ответ"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
            />
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="secondary">Пропустить</Button>
              <Button variant="blue">Ответить</Button>
            </div>
          </Card>
        </div>

        <Card className="h-fit">
          <Link
            to="/my-courses/1"
            className="mb-4 flex items-center gap-1 text-sm text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="h-4 w-4" />
            В меню
          </Link>
          <h3 className="font-semibold text-slate-900">{moduleTitle}</h3>
          <div className="mt-4 flex items-center justify-between gap-2">
            <span className="font-mono text-sm text-slate-600">{timer}</span>
            <Button variant="secondary" size="sm">
              Завершить
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
