import { Calendar } from '../../components/schedule/Calendar'
import { scheduleEvents } from '../../data/mockData'

export function SchedulePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Расписание</h1>
      <Calendar events={scheduleEvents} />
    </div>
  )
}
