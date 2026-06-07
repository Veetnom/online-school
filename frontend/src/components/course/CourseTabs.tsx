import { Tabs } from '../ui/Tabs'

interface CourseTabsProps {
  courseId: string
}

export function CourseTabs({ courseId }: CourseTabsProps) {
  const base = `/teacher/courses/${courseId}`
  const tabs = [
    { label: 'Информация о курсе', to: base },
    { label: 'Структура курса', to: `${base}/structure` },
    { label: 'Домашние работы', to: `${base}/homework` },
    { label: 'Статистика', to: `${base}/statistics` },
    { label: 'Проверка ответов', to: `${base}/checking` },
  ]

  return <Tabs tabs={tabs} />
}
