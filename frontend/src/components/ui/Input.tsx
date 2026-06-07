import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
}

export function Input({ label, className = '', id, ...props }: InputProps) {
  const inputId = id || label?.toLowerCase().replace(/\s/g, '-')

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={inputId} className="text-sm text-slate-500">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={`w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 ${className}`}
        {...props}
      />
    </div>
  )
}
