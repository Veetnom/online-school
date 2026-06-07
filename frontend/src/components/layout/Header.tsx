import { Bell, ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Avatar } from '../ui/Avatar'

interface HeaderProps {
  showCart?: boolean
  userName?: string
}

export function Header({ showCart = true, userName = 'ЭМ' }: HeaderProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-end gap-3 border-b border-slate-200 bg-white px-4 sm:px-6 lg:px-8">
      <button
        type="button"
        className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
        aria-label="Уведомления"
      >
        <Bell className="h-5 w-5" />
      </button>
      {showCart && (
        <Link
          to="/cart"
          className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100"
          aria-label="Корзина"
        >
          <ShoppingCart className="h-5 w-5" />
        </Link>
      )}
      <Avatar name={userName} size="sm" />
    </header>
  )
}
