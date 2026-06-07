import { HomeworkCard } from '../../components/homework/HomeworkCard'
import { homeworkItems } from '../../data/mockData'

export function HomeworkPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Домашние работы</h1>
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-6">
        {homeworkItems.map((hw) => (
          <HomeworkCard
            key={hw.id}
            title={hw.title}
            subject={hw.subject}
            daysLeft={hw.daysLeft}
          />
        ))}
      </div>
    </div>
  )
}
