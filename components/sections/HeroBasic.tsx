'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

type HeroBasicProps = {
  badge?: string
  title: string
  subtitle?: string
}

export function HeroBasic({ badge, title, subtitle }: HeroBasicProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-background py-24 px-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-3xl mx-auto text-center"
      >
        {badge && (
          <span className="inline-block mb-4 px-3 py-1 rounded-full bg-surface text-muted text-small font-semibold border border-border">
            {badge}
          </span>
        )}
        <h1 className="font-sans text-page font-bold text-foreground">{title}</h1>
        {subtitle && (
          <p className="mt-4 text-subtitle text-muted max-w-xl mx-auto">{subtitle}</p>
        )}
      </motion.div>
    </section>
  )
}
