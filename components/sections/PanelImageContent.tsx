'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '../ui/Button'

type PanelImageContentProps = {
  badge?: string
  title?: string
  description?: string
  cta?: string
  reverse?: boolean
  imageUrl?: string
  imageAlt?: string
}

export function PanelImageContent({
  badge = 'How it works',
  title = 'Build faster with the right tools',
  description = 'Our platform gives you everything you need to design, build, and ship products your users love. No more context switching, no more lost work.',
  cta = 'Learn more',
  reverse = false,
  imageUrl = 'https://picsum.photos/600/400?grayscale',
  imageAlt = 'Product screenshot',
}: PanelImageContentProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-background py-24 px-6">
      <div
        ref={ref}
        className={`max-w-6xl mx-auto flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}
      >
        <motion.div
          initial={{ opacity: 0, x: reverse ? 32 : -32 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: reverse ? 32 : -32 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex-1"
        >
          {badge && (
            <span className="text-small font-semibold text-muted uppercase tracking-wider">{badge}</span>
          )}
          <h2 className="font-sans text-page font-bold text-foreground mt-2 mb-4">{title}</h2>
          <p className="text-body text-muted mb-6">{description}</p>
          <Button size="lg">{cta}</Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: reverse ? -32 : 32 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: reverse ? -32 : 32 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex-1 rounded-lg overflow-hidden border border-border"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={imageUrl} alt={imageAlt} className="w-full h-auto block" />
        </motion.div>
      </div>
    </section>
  )
}
