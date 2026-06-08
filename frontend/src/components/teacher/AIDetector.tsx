import { useState } from 'react'
import { Sparkles } from 'lucide-react'
import { Button } from '../ui/Button'

interface AIDetectorProps {
  onResult?: (probability: number) => void
}

export function AIDetector({ onResult }: AIDetectorProps) {
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle')
  const [probability, setProbability] = useState(0)

  const handleCheck = () => {
    setState('loading')
    // Мок — симуляция проверки через 1.5 секунды
    const mockProbability = Math.round(Math.random() * 100)
    setTimeout(() => {
      setProbability(mockProbability)
      setState('done')
      onResult?.(mockProbability)
    }, 1500)
  }

  const getColor = (p: number) => {
    if (p <= 30) return {
      bg: 'bg-emerald-500',
      text: 'text-emerald-600',
      label: 'Написано человеком',
    }
    if (p <= 70) return {
      bg: 'bg-amber-500',
      text: 'text-amber-600',
      label: 'Возможное использование ИИ',
    }
    return {
      bg: 'bg-red-500',
      text: 'text-red-600',
      label: 'Высокая вероятность ИИ',
    }
  }

  const colors = getColor(probability)

  return (
    <div className="rounded-lg border border-slate-200 p-4">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-purple-500" />
          <span className="text-sm font-medium text-slate-700">Проверка на ИИ</span>
        </div>
        {state === 'idle' && (
          <Button variant="secondary" size="sm" onClick={handleCheck}>
            Проверить
          </Button>
        )}
      </div>

      {state === 'loading' && (
        <div className="space-y-2">
          <div className="h-2 overflow-hidden rounded-full bg-slate-100">
            <div className="h-full w-full origin-left animate-pulse rounded-full bg-gradient-to-r from-purple-400 to-purple-600" />
          </div>
          <p className="animate-pulse text-xs text-slate-400">Анализ текста...</p>
        </div>
      )}

      {state === 'done' && (
        <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center gap-3">
            <div className="relative h-2 flex-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className={`h-full rounded-full transition-all duration-700 ease-out ${colors.bg}`}
                style={{ width: `${probability}%` }}
              />
            </div>
            <span className={`text-sm font-bold ${colors.text}`}>{probability}%</span>
          </div>
          <div className={`flex items-center gap-1.5 text-sm font-medium ${colors.text}`}>
            <span className={`inline-block h-1.5 w-1.5 rounded-full ${colors.bg}`} />
            {colors.label}
          </div>
          <button
            onClick={handleCheck}
            className="text-xs text-slate-400 underline-offset-2 hover:underline hover:text-slate-600 transition-colors"
          >
            Проверить снова
          </button>
        </div>
      )}
    </div>
  )
}