import { useState } from 'react'
import { CartItemCard } from '../../components/cart/CartItemCard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { cartItems as initialItems, formatPrice } from '../../data/mockData'

export function CartPage() {
  const [items, setItems] = useState(initialItems)
  const total = items.reduce((sum, item) => sum + item.price, 0)

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">Корзина</h1>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          {items.length === 0 ? (
            <Card>
              <p className="text-center text-slate-500">Корзина пуста</p>
            </Card>
          ) : (
            items.map((item) => (
              <CartItemCard key={item.id} item={item} onRemove={() => removeItem(item.id)} />
            ))
          )}
        </div>

        <Card className="h-fit">
          <div className="mb-6 flex items-center justify-between">
            <span className="text-slate-600">К оплате</span>
            <span className="text-2xl font-bold text-slate-900">{formatPrice(total)}</span>
          </div>
          <Button variant="purple" fullWidth disabled={items.length === 0}>
            Перейти к оплате
          </Button>
        </Card>
      </div>
    </div>
  )
}
