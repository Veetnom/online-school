import { NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/curator/courses', label: 'Курсы', prefix: '/curator/courses' },
  { to: '/curator/chat', label: 'Чат с учениками', prefix: '/curator/chat' },
]

export function CuratorSidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="w-full shrink-0 border-r border-slate-200 bg-white lg:w-56 xl:w-64">
      <nav className="flex flex-row gap-1 overflow-x-auto p-2 lg:flex-col lg:gap-0 lg:p-3">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.prefix)
          return (
            <NavLink
              key={item.to}
              to={item.to}
              className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-sm font-medium transition-colors lg:py-3 ${
                isActive
                  ? 'bg-slate-200 text-slate-900'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              {item.label}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}