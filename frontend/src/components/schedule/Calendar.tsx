import { ChevronLeft, ChevronRight, Check } from 'lucide-react'
import { useState } from 'react'
import type { ScheduleEvent } from '../../types'
import { Badge } from '../ui/Badge'

interface CalendarProps {
  events: ScheduleEvent[]
  month?: number
  year?: number
  onEventClick?: (event: ScheduleEvent) => void
}

const WEEKDAYS = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
const MONTHS = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь',
]

const badgeVariantMap = {
  orange: 'orange' as const,
  blue: 'blue' as const,
  purple: 'purple' as const,
  gray: 'gray' as const,
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

export function Calendar({ events, month = 3, year = 2026, onEventClick }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(month)
  const [currentYear, setCurrentYear] = useState(year)

  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
  const daysInPrevMonth = getDaysInMonth(currentYear, currentMonth - 1)

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear((y) => y - 1)
    } else {
      setCurrentMonth((m) => m - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear((y) => y + 1)
    } else {
      setCurrentMonth((m) => m + 1)
    }
  }

  const cells: { day: number; isCurrentMonth: boolean; dateStr: string }[] = []

  for (let i = firstDay - 1; i >= 0; i--) {
    const day = daysInPrevMonth - i
    const m = currentMonth === 0 ? 11 : currentMonth - 1
    const y = currentMonth === 0 ? currentYear - 1 : currentYear
    cells.push({
      day,
      isCurrentMonth: false,
      dateStr: `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({
      day,
      isCurrentMonth: true,
      dateStr: `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    })
  }

  const remaining = 42 - cells.length
  for (let day = 1; day <= remaining; day++) {
    const m = currentMonth === 11 ? 0 : currentMonth + 1
    const y = currentMonth === 11 ? currentYear + 1 : currentYear
    cells.push({
      day,
      isCurrentMonth: false,
      dateStr: `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    })
  }

  const eventsByDate = events.reduce<Record<string, ScheduleEvent[]>>((acc, ev) => {
    if (!acc[ev.date]) acc[ev.date] = []
    acc[ev.date].push(ev)
    return acc
  }, {})

  return (
    <div>
      <div className="mb-6 flex items-center justify-center gap-4">
        <button
          type="button"
          onClick={prevMonth}
          className="rounded p-1 text-slate-500 hover:bg-slate-100"
          aria-label="Предыдущий месяц"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <span className="text-lg font-medium">
          {MONTHS[currentMonth]} {currentYear}
        </span>
        <button
          type="button"
          onClick={nextMonth}
          className="rounded p-1 text-slate-500 hover:bg-slate-100"
          aria-label="Следующий месяц"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="grid grid-cols-7 border-l border-t border-slate-200">
            {WEEKDAYS.map((day) => (
              <div
                key={day}
                className="border-b border-r border-slate-200 py-2 text-center text-xs font-medium text-slate-500"
              >
                {day}
              </div>
            ))}
            {cells.map((cell, idx) => {
              const dayEvents = eventsByDate[cell.dateStr] || []
              const isSelected = cell.dateStr === '2026-04-01'
              const isToday = cell.dateStr === '2026-04-01'
              return (
                <div
                  key={idx}
                  className={`min-h-24 border-b border-r border-slate-200 p-1 sm:min-h-28 sm:p-2 ${
                    cell.isCurrentMonth ? 'bg-white' : 'bg-slate-50'
                  } ${isSelected ? 'ring-1 ring-inset ring-slate-400' : ''}`}
                >
                  <div className={`mb-1 text-center text-sm ${
                    isToday ? 'font-bold text-blue-600' : 'text-slate-600'
                  }`}>
                    {cell.day}
                  </div>
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        className={`flex items-center gap-1 ${onEventClick ? 'cursor-pointer' : ''}`}
                        onClick={() => onEventClick?.(ev)}
                      >
                        <Badge variant={badgeVariantMap[ev.color]}>
                          <span className="flex items-center gap-1 truncate max-w-[120px]">
                            • {ev.title}
                            {ev.completed && <Check className="h-3 w-3 shrink-0" />}
                          </span>
                        </Badge>
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <span className="text-xs text-slate-500">еще {dayEvents.length - 2}</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}