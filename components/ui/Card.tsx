'use client'
import { motion } from 'framer-motion'

type CardProps = {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
}

export function Card({ children, className = '', hoverable = false }: CardProps) {
  if (hoverable) {
    return (
      <motion.div
        whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`bg-surface rounded-lg border border-border p-6 ${className}`}
      >
        {children}
      </motion.div>
    )
  }
  return (
    <div className={`bg-surface rounded-lg border border-border p-6 ${className}`}>
      {children}
    </div>
  )
}
