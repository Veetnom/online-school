import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronRight, FileText } from 'lucide-react'
import { CourseTabs } from '../../components/course/CourseTabs'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Select } from '../../components/ui/Select'
import { SearchInput } from '../../components/ui/SearchInput'
import { AnswerGradingForm } from '../../components/teacher/AnswerGradingForm'
import { students, teacherAssignments, essayTask, teacherGroups } from '../../data/mockData'

// Мок-данные: какие ученики сдали задание
const assignmentSubmissions: Record<string, { studentId: string; submittedAt: string; status: 'checked' | 'pending'; points?: number; maxPoints?: number }[]> = {
  '1': [
    { studentId: '1', submittedAt: '12.04.2026', status: 'checked', points: 8, maxPoints: 10 },
    { studentId: '2', submittedAt: '11.04.2026', status: 'pending' },
    { studentId: '3', submittedAt: '10.04.2026', status: 'checked', points: 4, maxPoints: 5 },
  ],
  '2': [
    { studentId: '1', submittedAt: '12.04.2026', status: 'pending' },
    { studentId: '4', submittedAt: '11.04.2026', status: 'checked', points: 9, maxPoints: 10 },
  ],
}

export function CourseCheckingPage() {
  const { id = '1', assignmentId, submissionId } = useParams()
  const [selectedGroup, setSelectedGroup] = useState('all')

  const groupOptions = [
    { value: 'all', label: 'Все группы' },
    ...teacherGroups.map((g) => ({ value: g.id, label: g.title })),
  ]

  // Уровень 3: форма оценки конкретной работы
  if (assignmentId && submissionId) {
    const student = students.find((s) => s.id === submissionId)
    return (
      <div>
        <h1 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">Проверка ответов</h1>
        <div className="mb-6">
          <CourseTabs courseId={id} role="teacher" />
        </div>
        <div className="mb-4">
          <Link
            to={`/teacher/courses/${id}/checking/${assignmentId}`}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Назад к списку работ
          </Link>
        </div>
        <AnswerGradingForm
          task={essayTask}
          studentName={student?.name || 'Ученик'}
          studentAnswer={essayTask.content}
        />
      </div>
    )
  }

  // Уровень 2: список ответов учеников на конкретное задание
  if (assignmentId) {
    const assignment = teacherAssignments.find((a) => a.id === assignmentId)
    const submissions = assignmentSubmissions[assignmentId] || []

    const studentIdsInGroup = selectedGroup === 'all'
      ? null
      : new Set(teacherGroups
          .filter((g) => g.id === selectedGroup)
          .flatMap((g) => g.students.map((s) => s.id))
        )

    const filteredSubmissions = studentIdsInGroup
      ? submissions.filter((sub) => studentIdsInGroup.has(sub.studentId))
      : submissions

    return (
      <div>
        <h1 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">Проверка ответов</h1>
        <div className="mb-6">
          <CourseTabs courseId={id} role="teacher" />
        </div>
        <div className="mb-4">
          <Link
            to={`/teacher/courses/${id}/checking`}
            className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Назад к списку заданий
          </Link>
        </div>

        <Card>
          <div className="mb-4">
            <h2 className="text-lg font-semibold text-slate-900">{assignment?.title || 'Задание'}</h2>
            <p className="text-sm text-slate-500">
              Проверено: {assignment?.checked || 0} / {assignment?.total || 0}
            </p>
          </div>

          <div className="mb-4">
            <Select
              options={groupOptions}
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className="w-full sm:w-64"
            />
          </div>

          <div className="space-y-3">
            {filteredSubmissions.length === 0 ? (
              <p className="py-8 text-center text-sm text-slate-400">
                Нет работ для выбранной группы
              </p>
            ) : (
              filteredSubmissions.map((sub) => {
                const student = students.find((s) => s.id === sub.studentId)
                return (
                  <Link
                    key={sub.studentId}
                    to={`/teacher/courses/${id}/checking/${assignmentId}/${sub.studentId}`}
                  >
                    <div className="flex items-center justify-between rounded-lg border border-slate-100 p-4 transition hover:bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-sm font-bold text-white">
                          {student?.name.charAt(0) || '?'}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">{student?.name || 'Ученик'}</p>
                          <p className="text-sm text-slate-500">Сдано: {sub.submittedAt}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {sub.status === 'checked' ? (
                          <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-600">
                            {sub.points}/{sub.maxPoints}
                          </span>
                        ) : (
                          <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
                            Ожидает
                          </span>
                        )}
                        <Button variant="blue" size="sm">Оценить</Button>
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                      </div>
                    </div>
                  </Link>
                )
              })
            )}
          </div>
        </Card>
      </div>
    )
  }

  // Уровень 1: список заданий курса (как в TeacherCheckingPage)
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">Проверка ответов</h1>
      <div className="mb-6">
        <CourseTabs courseId={id} role="teacher" />
      </div>

      <Card>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select
            options={[
              { value: 'all', label: 'Все статусы' },
              { value: 'checked', label: 'Проверено' },
              { value: 'pending', label: 'Ожидает' },
            ]}
            className="w-full sm:w-48"
          />
          <Select
            options={[
              { value: 'all', label: 'Все типы' },
              { value: 'task', label: 'Задача' },
              { value: 'homework', label: 'Домашнее задание' },
            ]}
            className="w-full sm:w-48"
          />
          <SearchInput className="flex-1" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {teacherAssignments.map((assignment) => (
            <Link key={assignment.id} to={`/teacher/courses/${id}/checking/${assignment.id}`}>
              <Card className="cursor-pointer transition hover:shadow-md">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100">
                      <FileText className="h-5 w-5 text-slate-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{assignment.title}</h3>
                      <span className={`
                        mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium
                        ${assignment.type === 'task'
                          ? 'bg-blue-50 text-blue-600'
                          : 'bg-purple-50 text-purple-600'
                        }
                      `}>
                        {assignment.type === 'task' ? 'Задача' : 'Домашнее задание'}
                      </span>
                    </div>
                  </div>
                  <span className="shrink-0 text-sm text-slate-500">
                    Проверено {assignment.checked}/{assignment.total}
                  </span>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-slate-500">{assignment.points} баллов</span>
                  <Button variant="purple" size="sm">Проверить</Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  )
}