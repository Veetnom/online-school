import { useParams } from 'react-router-dom'
import { Accordion } from '../../components/ui/Accordion'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { formatPrice, storeCourses } from '../../data/mockData'

export function CourseDetailPage() {
  const { id } = useParams()
  const course = storeCourses.find((c) => c.id === id) ?? storeCourses[0]

  return (
    <div className="space-y-6">
      <Card>
        <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">{course.title}</h1>
        <p className="mt-3 text-slate-600">{course.subtitle}</p>
        <ul className="mt-4 list-inside list-disc space-y-1 text-sm text-slate-600">
          {course.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold text-slate-900">Описание</h2>
          <p className="text-sm leading-relaxed text-slate-600">{course.description}</p>
          <p className="mt-4 text-sm leading-relaxed text-slate-600">
            К концу курса вы будете знать все правила, уметь применять их на практике и
            уверенно писать сочинение.
          </p>
        </Card>

        <Card className="h-fit">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-slate-600">Стоимость курса</span>
            <span className="text-xl font-bold text-slate-900">{formatPrice(course.price)}</span>
          </div>
          <Button variant="orange" fullWidth>
            В корзину
          </Button>
        </Card>
      </div>

      <Card>
        <h2 className="mb-4 text-lg font-semibold text-slate-900">Программа курса</h2>
        <Accordion
          items={course.program.map((mod) => ({
            id: mod.id,
            title: mod.title,
            defaultOpen: mod.expanded,
            content: mod.lessons ? (
              <ol className="list-inside list-decimal space-y-1 text-sm text-slate-600">
                {mod.lessons.map((lesson, i) => (
                  <li key={i}>{lesson}</li>
                ))}
              </ol>
            ) : undefined,
          }))}
        />
      </Card>
    </div>
  )
}
