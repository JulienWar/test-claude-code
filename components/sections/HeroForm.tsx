'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

export function HeroForm() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-background py-24 px-6">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="max-w-2xl mx-auto"
      >
        <h1 className="font-sans text-page font-bold text-foreground mb-2">Get in touch</h1>
        <p className="text-muted text-body mb-8">
          We&apos;d love to hear from you. Fill out the form and we&apos;ll get back to you shortly.
        </p>
        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input id="firstName" name="firstName" label="First name" placeholder="Jane" />
            <Input id="lastName"  name="lastName"  label="Last name"  placeholder="Smith" />
          </div>
          <Input id="email"   name="email"   type="email" label="Email"             placeholder="jane@example.com" required />
          <Input id="company" name="company"             label="Company (optional)" placeholder="Acme Inc." />
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-small font-semibold text-foreground">Message</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="How can we help you?"
              className="px-4 py-2 rounded-md border border-border bg-surface text-foreground placeholder:text-muted text-body focus:outline-none focus:ring-2 focus:ring-brand/30 resize-none"
            />
          </div>
          <Button type="submit" size="lg" className="w-full">Send message</Button>
        </form>
      </motion.div>
    </section>
  )
}
