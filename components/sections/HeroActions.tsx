'use client'
import { useRef } from 'react'
import { motion, useInView, type Transition } from 'framer-motion'
import { Button } from '../ui/Button'

type HeroActionsProps = {
  badge?: string
  title?: string
  subtitle?: string
  primaryCta?: string
  secondaryCta?: string
}

export function HeroActions({
  badge = '✦ Now in beta',
  title = 'The platform built\nfor your success',
  subtitle = 'Streamline your workflow, boost productivity, and ship results faster than ever before.',
  primaryCta = 'Get started for free',
  secondaryCta = 'See how it works',
}: HeroActionsProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const item = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.6, delay, ease: 'easeOut' } as Transition,
  })

  return (
    <section className="bg-background py-32 px-6">
      <div ref={ref} className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6">
        <motion.span
          {...item(0)}
          className="inline-block px-3 py-1 rounded-full bg-surface text-muted text-small font-semibold border border-border"
        >
          {badge}
        </motion.span>
        <motion.h1 {...item(0.1)} className="font-sans text-hero font-bold text-foreground whitespace-pre-line">
          {title}
        </motion.h1>
        <motion.p {...item(0.2)} className="text-subtitle text-muted max-w-xl">
          {subtitle}
        </motion.p>
        <motion.div {...item(0.3)} className="flex flex-col sm:flex-row gap-3">
          <Button size="lg">{primaryCta}</Button>
          <Button size="lg" variant="secondary">{secondaryCta}</Button>
        </motion.div>
      </div>
    </section>
  )
}
