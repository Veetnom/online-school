import type { ReactNode } from 'react'

type BadgeVariant =
  | 'published'
  | 'draft'
  | 'task'
  | 'homework'
  | 'orange'
  | 'blue'
  | 'purple'
  | 'gray'

interface BadgeProps {
  variant: BadgeVariant
  children: ReactNode
  className?: string
}

const variants: Record<BadgeVariant, string> = {
  published: 'bg-violet-100 text-violet-700',
  draft: 'bg-slate-100 text-slate-600',
  task: 'bg-blue-100 text-blue-700',
  homework: 'bg-orange-100 text-orange-700',
  orange: 'bg-orange-100 text-orange-700',
  blue: 'bg-blue-100 text-blue-700',
  purple: 'bg-violet-100 text-violet-700',
  gray: 'bg-slate-100 text-slate-500',
}

export function Badge({ variant, children, className = '' }: BadgeProps) {
  return (
    <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}>
      {children}
    </span>
  )
}
