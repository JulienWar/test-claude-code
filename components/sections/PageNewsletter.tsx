'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '../ui/Button'

type PageNewsletterProps = {
  title?: string
  subtitle?: string
  placeholder?: string
  cta?: string
}

export function PageNewsletter({
  title = 'Start building today',
  subtitle = 'Join thousands of teams already using our platform to ship faster.',
  placeholder = 'Enter your work email',
  cta = 'Get started free',
}: PageNewsletterProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-brand py-24 px-6">
      <div ref={ref} className="max-w-2xl mx-auto text-center flex flex-col items-center gap-6">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-sans text-page font-bold text-background"
        >
          {title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.1, ease: 'easeOut' }}
          className="text-subtitle text-background/70"
        >
          {subtitle}
        </motion.p>
        <motion.form
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, delay: 0.2, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-3 w-full max-w-md"
        >
          <input
            type="email"
            placeholder={placeholder}
            className="flex-1 px-4 py-3 rounded-md bg-background/10 border border-background/20 text-background placeholder:text-background/50 text-body focus:outline-none focus:ring-2 focus:ring-background/30"
          />
          <Button variant="secondary" size="lg">{cta}</Button>
        </motion.form>
      </div>
    </section>
  )
}
