import { AssignmentCheckCard } from '../../components/teacher/AssignmentCheckCard'
import { Card } from '../../components/ui/Card'
import { SearchInput } from '../../components/ui/SearchInput'
import { Select } from '../../components/ui/Select'
import { teacherAssignments, teacherGroups } from '../../data/mockData'

export function TeacherCheckingPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Проверка ответов</h1>
      <Card>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Select
            options={[
              { value: 'all', label: 'Все группы' },
              ...teacherGroups.map((g) => ({ value: g.id, label: g.title })),
            ]}
            className="w-full sm:w-48"
          />
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
            <AssignmentCheckCard key={assignment.id} assignment={assignment} />
          ))}
        </div>
      </Card>
    </div>
  )
}
