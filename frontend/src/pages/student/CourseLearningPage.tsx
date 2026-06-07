import { Link } from 'react-router-dom'
import { useState } from 'react'
import { HomeworkCard } from '../../components/homework/HomeworkCard'
import { Accordion } from '../../components/ui/Accordion'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { ProgressBar } from '../../components/ui/ProgressBar'
import { enrolledCourses, homeworkItems } from '../../data/mockData'
import type { HomeworkTab } from '../../types'

const homeworkTabs: { value: HomeworkTab; label: string }[] = [
  { value: 'todo', label: 'Надо сдать' },
  { value: 'submitted', label: 'Сданы' },
  { value: 'overdue', label: 'Просрочены' },
]

export function CourseLearningPage() {
  const course = enrolledCourses[0]
  const [hwTab, setHwTab] = useState<HomeworkTab>('todo')

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{course.title}</h1>
        <p className="mt-2 text-sm text-slate-500">{course.progress}% материалов пройдено</p>
        <ProgressBar value={course.progress} className="mt-2 max-w-md" />
        <p className="mt-2 text-sm text-slate-500">
          {course.pointsEarned}/{course.pointsTotal} баллов получено
        </p>
      </div>

      {course.currentTask && (
        <Card>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-medium text-slate-900">«{course.currentTask}»</p>
            <Link to="/my-courses/1/task/10">
              <Button variant="blue">Продолжить</Button>
            </Link>
          </div>
        </Card>
      )}

      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Домашние работы</h2>
        <div className="mb-4 flex flex-wrap gap-2">
          {homeworkTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setHwTab(tab.value)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                hwTab === tab.value
                  ? 'bg-indigo-600 text-white'
                  : 'border border-indigo-200 text-indigo-600 hover:bg-indigo-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {homeworkItems.slice(0, 2).map((hw) => (
            <HomeworkCard
              key={hw.id}
              title={hw.title}
              daysLeft={hw.daysLeft}
              points={hw.points}
              maxPoints={hw.maxPoints}
              showSubject={false}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-slate-900">Курс</h2>
        <Accordion
          items={[
            {
              id: '1',
              title: '1. Первая часть ЕГЭ',
              content: null,
            },
            {
              id: '2',
              title: '2. Сочинение',
              content: null,
            },
            {
              id: '3',
              title: '3. Повторение тем',
              defaultOpen: true,
              content: (
                <div className="space-y-3">
                  <div className="rounded-lg bg-slate-100 p-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-slate-900">Орфография</span>
                      <span className="text-sm text-slate-500">30/50</span>
                    </div>
                    <div className="mt-3 space-y-2">
                      <div className="flex flex-col gap-2 rounded-lg bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Задание №9. Правописание гласных
                          </p>
                          <p className="text-xs text-slate-500">30/30 · Пройдено</p>
                        </div>
                        <Button variant="secondary" size="sm">
                          Ещё раз
                        </Button>
                      </div>
                      <div className="flex flex-col gap-2 rounded-lg bg-white p-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-sm font-medium text-slate-900">
                            Задание №10. Правописание приставок
                          </p>
                          <p className="text-xs text-slate-500">0/20 · Не пройдено</p>
                        </div>
                        <Link to="/my-courses/1/task/10">
                          <Button variant="blue" size="sm">
                            Выполнить
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </section>
    </div>
  )
}
