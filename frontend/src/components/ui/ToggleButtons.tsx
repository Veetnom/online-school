interface ToggleOption {
  value: string
  label: string
}

interface ToggleButtonsProps {
  options: ToggleOption[]
  value: string
  onChange: (value: string) => void
}

export function ToggleButtons({ options, value, onChange }: ToggleButtonsProps) {
  return (
    <div className="inline-flex rounded-lg border border-slate-200 p-1">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            value === opt.value
              ? 'bg-slate-900 text-white'
              : 'text-slate-700 hover:bg-slate-50'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
