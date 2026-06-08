import { useParams } from 'react-router-dom'
import { CourseTabs } from '../../components/course/CourseTabs'
import { HomeworkManageCard } from '../../components/teacher/HomeworkManageCard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { SearchInput } from '../../components/ui/SearchInput'
import { Select } from '../../components/ui/Select'
import { teacherHomework } from '../../data/mockData'

export function CourseHomeworkPage() {
  const { id = '1' } = useParams()

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">Название курса</h1>
      <div className="mb-6">
        <CourseTabs courseId={id} role="teacher" />
      </div>

      <Card>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Select
            options={[
              { value: 'all', label: 'Все статусы' },
              { value: 'published', label: 'Опубликован' },
              { value: 'draft', label: 'Черновик' },
            ]}
            className="w-full sm:w-48"
          />
          <SearchInput className="w-full sm:max-w-xs" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {teacherHomework.map((hw) => (
            <HomeworkManageCard key={hw.id} homework={hw} />
          ))}
        </div>

      </Card>
    </div>
  )
}
