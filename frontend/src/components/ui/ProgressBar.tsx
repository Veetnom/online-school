interface ProgressBarProps {
  value: number
  className?: string
}

const widthClasses: Record<number, string> = {
  0: 'w-0', 10: 'w-[10%]', 20: 'w-[20%]', 30: 'w-[30%]', 40: 'w-[40%]',
  50: 'w-[50%]', 60: 'w-[60%]', 70: 'w-[70%]', 80: 'w-[80%]', 90: 'w-[90%]', 100: 'w-full',
}

export function ProgressBar({ value, className = '' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, value))
  const rounded = Math.round(clamped / 10) * 10
  const widthClass = widthClasses[rounded] ?? 'w-0'

  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-slate-200 ${className}`}>
      <div className={`h-full rounded-full bg-blue-500 transition-all ${widthClass}`} />
    </div>
  )
}
