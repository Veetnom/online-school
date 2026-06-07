import { ChevronDown, ChevronUp } from 'lucide-react'
import { useState, type ReactNode } from 'react'

interface AccordionItem {
  id: string
  title: string
  content?: ReactNode
  defaultOpen?: boolean
}

interface AccordionProps {
  items: AccordionItem[]
}

export function Accordion({ items }: AccordionProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(
    new Set(items.filter((i) => i.defaultOpen).map((i) => i.id))
  )

  const toggle = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div className="divide-y divide-slate-200">
      {items.map((item) => {
        const isOpen = openIds.has(item.id)
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => toggle(item.id)}
              className="flex w-full items-center justify-between py-4 text-left"
            >
              <span className="font-medium text-slate-900">{item.title}</span>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 shrink-0 text-slate-400" />
              ) : (
                <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />
              )}
            </button>
            {isOpen && item.content && (
              <div className="pb-4 pl-4">{item.content}</div>
            )}
          </div>
        )
      })}
    </div>
  )
}
