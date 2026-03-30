'use client'
import { motion } from 'framer-motion'

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

const variants = {
  primary:   'bg-brand text-background hover:opacity-90',
  secondary: 'bg-surface text-foreground border border-border hover:opacity-80',
  ghost:     'bg-transparent text-foreground hover:bg-surface',
}

const sizes = {
  sm: 'px-3 py-1.5 text-small rounded-md',
  md: 'px-4 py-2 text-body rounded-md',
  lg: 'px-6 py-3 text-body rounded-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center font-semibold transition-colors cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  )
}
