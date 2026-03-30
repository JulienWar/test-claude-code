'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card } from '../ui/Card'

type Feature = { icon: string; title: string; description: string }

type CardGridIconProps = {
  title?: string
  subtitle?: string
  features?: Feature[]
}

const DEFAULT_FEATURES: Feature[] = [
  { icon: '⚡', title: 'Lightning fast',       description: 'Optimized for speed at every layer of the stack, from database to UI.' },
  { icon: '🔒', title: 'Secure by default',    description: 'Enterprise-grade security with end-to-end encryption and SSO support.' },
  { icon: '🔄', title: 'Always in sync',       description: 'Real-time collaboration across your entire team without conflicts.' },
  { icon: '📊', title: 'Insightful analytics', description: 'Understand your data with beautiful dashboards and actionable insights.' },
  { icon: '🔌', title: 'Easy integrations',    description: 'Connect with 100+ tools you already use in just a few clicks.' },
  { icon: '🛠️', title: 'Developer friendly',   description: 'A powerful API and CLI tools to build exactly what you need.' },
]

export function CardGridIcon({
  title = 'Everything you need',
  subtitle = 'All the tools to ship your product faster and scale with confidence.',
  features = DEFAULT_FEATURES,
}: CardGridIconProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-surface py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center mb-12"
        >
          <h2 className="font-sans text-page font-bold text-foreground">{title}</h2>
          <p className="text-muted text-subtitle mt-3 max-w-xl mx-auto">{subtitle}</p>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
            >
              <Card hoverable className="h-full">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-semibold text-heading text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted text-body">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
