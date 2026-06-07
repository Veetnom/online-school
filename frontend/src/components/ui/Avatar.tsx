const colors = [
  'bg-blue-500',
  'bg-violet-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-pink-500',
  'bg-emerald-500',
]

interface AvatarProps {
  name: string
  src?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
}

export function Avatar({ name, src, size = 'md' }: AvatarProps) {
  const initial = name.charAt(0).toUpperCase()
  const colorIndex = name.charCodeAt(0) % colors.length

  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className={`rounded-full object-cover ${sizes[size]}`}
      />
    )
  }

  return (
    <div
      className={`flex items-center justify-center rounded-full font-medium text-white ${colors[colorIndex]} ${sizes[size]}`}
    >
      {initial}
    </div>
  )
}
