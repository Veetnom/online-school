import { ChevronDown } from 'lucide-react'
import type { SelectHTMLAttributes } from 'react'

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: { value: string; label: string }[]
}

export function Select({ options, className = '', ...props }: SelectProps) {
  return (
    <div className="relative">
      <select
        className={`w-full appearance-none rounded-lg border border-slate-300 bg-white px-3 py-2 pr-8 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${className}`}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
    </div>
  )
}
