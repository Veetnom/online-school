import { useState } from 'react'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { AIDetector } from './AIDetector'
import type { Task } from '../../types'

interface AnswerGradingFormProps {
  task: Task
  studentName: string
  studentAnswer?: string
  onAccept?: (points: number, comment: string) => void
  onReject?: (comment: string) => void
}

export function AnswerGradingForm({
  task,
  studentName,
  studentAnswer = 'Здесь будет ответ ученика на задание...',
  onAccept,
  onReject,
}: AnswerGradingFormProps) {
  const [points, setPoints] = useState('')
  const [comment, setComment] = useState('')

  const handleAccept = () => {
    onAccept?.(Number(points), comment)
  }

  const handleReject = () => {
    onReject?.(comment)
  }

  return (
    <Card>
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-slate-900">{task.title}</h2>
        <p className="mt-1 text-sm text-slate-500">
          {studentName} · {task.points} баллов
        </p>
      </div>

      <div className="mb-4 rounded-lg bg-slate-50 p-4">
        <p className="whitespace-pre-line text-sm leading-relaxed text-slate-600">
          {task.instruction}
        </p>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-slate-700">Ответ ученика</label>
        <textarea
          className="w-full rounded-lg border border-slate-300 p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          rows={6}
          value={studentAnswer}
          readOnly
        />
      </div>

      <div className="mb-4">
        <AIDetector />
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-slate-700">Оценка учителя</label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Баллы"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            className="w-24 rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          />
          <span className="text-sm text-slate-500">из {task.points}</span>
        </div>
      </div>

      <div className="mb-4">
        <label className="mb-2 block text-sm font-medium text-slate-700">Комментарий</label>
        <textarea
          className="w-full rounded-lg border border-slate-300 p-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
          rows={3}
          placeholder="Напишите комментарий к работе..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="danger" onClick={handleReject}>Отклонить</Button>
        <Button variant="blue" onClick={handleAccept}>Принять</Button>
      </div>
    </Card>
  )
}