'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card } from '../ui/Card'

type Testimonial = { quote: string; author: string; role: string; initials: string }

type CardGridTestimonialsProps = {
  title?: string
  testimonials?: Testimonial[]
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { quote: 'This platform transformed how our team works. We ship 3× faster than before.',    author: 'Sarah Chen',  role: 'CTO at Nexus',          initials: 'SC' },
  { quote: "The best investment we've made. The ROI was visible within the first week.",       author: 'Marc Dupont', role: 'CEO at Lumio',           initials: 'MD' },
  { quote: "Finally a tool that doesn't get in the way. It just works, every single time.",   author: 'Priya Patel', role: 'Lead Engineer at Orbit', initials: 'PP' },
]

export function CardGridTestimonials({
  title = 'Loved by teams worldwide',
  testimonials = DEFAULT_TESTIMONIALS,
}: CardGridTestimonialsProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-surface py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          ref={ref}
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-sans text-page font-bold text-foreground text-center mb-12"
        >
          {title}
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            >
              <Card hoverable className="h-full flex flex-col gap-4">
                <p className="text-body text-foreground flex-1">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand text-background flex items-center justify-center text-small font-bold flex-shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-body text-foreground">{t.author}</p>
                    <p className="text-small text-muted">{t.role}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
