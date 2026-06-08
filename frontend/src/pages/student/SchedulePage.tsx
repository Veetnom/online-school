import { useState } from 'react'
import { Calendar } from '../../components/schedule/Calendar'
import { Button } from '../../components/ui/Button'
import { scheduleEvents } from '../../data/mockData'
import { X, CalendarDays, Clock } from 'lucide-react'
import { Badge } from '../../components/ui/Badge'
import type { ScheduleEvent } from '../../types'

const badgeVariantMap = {
  orange: 'orange' as const,
  blue: 'blue' as const,
  purple: 'purple' as const,
  gray: 'gray' as const,
}

function EventModal({ event, onClose }: { event: ScheduleEvent; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">{event.title}</h3>
            <p className="mt-1 text-sm text-slate-500">
              <CalendarDays className="mr-1 inline h-4 w-4" />
              {event.date}
              <Clock className="ml-3 mr-1 inline h-4 w-4" />
              {event.time}
            </p>
          </div>
          <button type="button" onClick={onClose} className="rounded p-1 text-slate-400 hover:bg-slate-100">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mb-4">
          <Badge variant={badgeVariantMap[event.color]}>{event.type === 'homework' ? 'Домашнее задание' : event.type === 'exam' ? 'Экзамен' : 'Событие'}</Badge>
        </div>

        {event.description && (
          <div className="mb-4">
            <p className="text-sm text-slate-600">{event.description}</p>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>Закрыть</Button>
        </div>
      </div>
    </div>
  )
}

export function SchedulePage() {
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null)

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Расписание</h1>
      <Calendar events={scheduleEvents} onEventClick={(event) => setSelectedEvent(event)} />

      {selectedEvent && (
        <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  )
}