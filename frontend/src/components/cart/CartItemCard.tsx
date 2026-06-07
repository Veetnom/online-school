import { X } from 'lucide-react'
import { formatPrice } from '../../data/mockData'
import type { CartItem } from '../../types'
import { Avatar } from '../ui/Avatar'
import { Button } from '../ui/Button'
import { Card } from '../ui/Card'

interface CartItemCardProps {
  item: CartItem
  onRemove?: () => void
}

export function CartItemCard({ item, onRemove }: CartItemCardProps) {
  return (
    <Card>
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
        <button
          type="button"
          onClick={onRemove}
          className="rounded p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          aria-label="Удалить"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Avatar name={item.instructorName} size="sm" />
          <span className="text-sm text-slate-600">{item.instructorName}</span>
        </div>
        <span className="text-xl font-bold text-slate-900">{formatPrice(item.price)}</span>
      </div>
      <div className="mt-4 flex justify-end">
        <Button variant="secondary" size="sm">
          Подробнее
        </Button>
      </div>
    </Card>
  )
}
