import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/store', label: 'Магазин' },
  { to: '/my-courses', label: 'Моё обучение' },
  { to: '/homework', label: 'Домашние работы' },
  { to: '/schedule', label: 'Расписание' },
  { to: '/tutor', label: 'Онлайн-куратор' },
]

export function StudentSidebar() {
  return (
    <aside className="w-full shrink-0 border-r border-slate-200 bg-white lg:w-56 xl:w-64">
      <nav className="flex flex-row gap-1 overflow-x-auto p-3 lg:flex-col lg:gap-0 lg:p-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-colors lg:py-3 ${
                isActive
                  ? 'bg-slate-100 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
