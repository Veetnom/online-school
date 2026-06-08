import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CourseTabs } from '../../components/course/CourseTabs'
import { CuratorTable } from '../../components/teacher/CuratorTable'
import { StudentTable } from '../../components/teacher/StudentTable'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { SearchInput } from '../../components/ui/SearchInput'
import { ToggleButtons } from '../../components/ui/ToggleButtons'
import { curators, students } from '../../data/mockData'

export function MethodistCourseStatisticsPage() {
  const { id = '1' } = useParams()
  const [view, setView] = useState('students')

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold text-slate-900 sm:text-3xl">Название курса</h1>
      <div className="mb-6">
        <CourseTabs courseId={id} role="methodist" />
      </div>

      <Card>
        <ToggleButtons
          options={[
            { value: 'students', label: 'Ученики' },
            { value: 'teachers', label: 'Преподаватели' },
          ]}
          value={view}
          onChange={setView}
        />

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-slate-900">
            {view === 'students' ? 'Ученики курса' : 'Преподаватели курса'}
          </h2>
          <SearchInput className="w-full sm:max-w-xs" />
        </div>

        <div className="mt-4">
          {view === 'students' ? (
            <StudentTable students={students} />
          ) : (
            <CuratorTable curators={curators} />
          )}
        </div>

        {view === 'teachers' && (
          <div className="mt-6 flex justify-end">
            <Button variant="primary">Добавить преподавателя</Button>
          </div>
        )}
      </Card>
    </div>
  )
}