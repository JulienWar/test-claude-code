type BadgeProps = {
  children: React.ReactNode
  variant?: 'default' | 'brand'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const cls = {
    default: 'bg-surface text-muted border border-border',
    brand:   'bg-brand text-background',
  }
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-small font-semibold ${cls[variant]}`}>
      {children}
    </span>
  )
}
