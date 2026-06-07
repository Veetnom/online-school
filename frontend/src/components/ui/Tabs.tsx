import { NavLink } from 'react-router-dom'

interface Tab {
  label: string
  to: string
}

interface TabsProps {
  tabs: Tab[]
}

export function Tabs({ tabs }: TabsProps) {
  return (
    <nav className="-mb-px flex flex-wrap gap-4 border-b border-slate-200 sm:gap-6">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end
          className={({ isActive }) =>
            `border-b-2 pb-3 text-sm font-medium transition-colors ${
              isActive
                ? 'border-violet-600 text-slate-900'
                : 'border-transparent text-slate-500 hover:text-slate-700'
            }`
          }
        >
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}
