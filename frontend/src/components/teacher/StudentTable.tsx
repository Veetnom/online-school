import type { Student } from '../../types'
import { Avatar } from '../ui/Avatar'

interface StudentTableProps {
  students: Student[]
}

export function StudentTable({ students }: StudentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 bg-slate-50">
            <th className="px-4 py-3 font-medium text-slate-600">#</th>
            <th className="px-4 py-3 font-medium text-slate-600">Ученик</th>
            <th className="px-4 py-3 font-medium text-slate-600">Email</th>
            <th className="px-4 py-3 font-medium text-slate-600">Прогресс</th>
            <th className="px-4 py-3 font-medium text-slate-600">Баллы</th>
            <th className="px-4 py-3 font-medium text-slate-600">Начал обучение</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, idx) => (
            <tr key={student.id} className="border-b border-slate-100">
              <td className="px-4 py-3 text-slate-500">{idx + 1}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                  <Avatar name={student.name} size="sm" />
                  <span className="font-medium text-slate-900">{student.name}</span>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-600">{student.email}</td>
              <td className="px-4 py-3 text-slate-600">{student.progress}%</td>
              <td className="px-4 py-3 text-slate-600">{student.points}</td>
              <td className="px-4 py-3 text-slate-600">{student.startedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
