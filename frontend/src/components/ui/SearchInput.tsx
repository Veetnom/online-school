import { Search } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string
}

export function SearchInput({ className = '', ...props }: SearchInputProps) {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        placeholder="Поиск..."
        className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        {...props}
      />
    </div>
  )
}
