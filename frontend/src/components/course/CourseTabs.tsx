import { Tabs } from '../ui/Tabs'

interface CourseTabsProps {
  courseId: string
  role: 'teacher' | 'methodist'
}

export function CourseTabs({ courseId, role }: CourseTabsProps) {
  const base = `/${role}/courses/${courseId}`

  if (role === 'teacher') {
    const tabs = [
      { label: 'Структура курса', to: `${base}/structure` },
      { label: 'Домашние работы', to: `${base}/homework` },
      { label: 'Статистика', to: `${base}/statistics` },
      { label: 'Проверка ответов', to: `${base}/checking` },
    ]
    return <Tabs tabs={tabs} />
  }

  const tabs = [
    { label: 'Информация о курсе', to: base },
    { label: 'Структура курса', to: `${base}/structure` },
    { label: 'Домашние работы', to: `${base}/homework` },
    { label: 'Статистика', to: `${base}/statistics` },
  ]
  return <Tabs tabs={tabs} />
}
