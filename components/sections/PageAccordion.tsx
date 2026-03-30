'use client'
import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

type Faq = { question: string; answer: string }

type PageAccordionProps = {
  title?: string
  faqs?: Faq[]
}

const DEFAULT_FAQS: Faq[] = [
  { question: 'How does the free trial work?',       answer: 'You get 14 days of full access to the Pro plan with no credit card required. At the end of your trial you can upgrade or continue on the free plan.' },
  { question: 'Can I change my plan at any time?',   answer: 'Yes, you can upgrade or downgrade at any time. Changes take effect immediately and we pro-rate any billing differences.' },
  { question: 'What payment methods do you accept?', answer: 'We accept all major credit cards (Visa, Mastercard, Amex) and PayPal. Enterprise customers can also pay by invoice.' },
  { question: 'Is my data secure?',                  answer: 'Absolutely. We use AES-256 encryption at rest and TLS 1.3 in transit. We are SOC 2 Type II certified and GDPR compliant.' },
  { question: 'Do you offer refunds?',               answer: "We offer a 30-day money-back guarantee on all paid plans. Contact our support team and we'll process your refund within 5 business days." },
]

export function PageAccordion({ title = 'Frequently asked questions', faqs = DEFAULT_FAQS }: PageAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-surface py-24 px-6">
      <div ref={ref} className="max-w-3xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="font-sans text-page font-bold text-foreground text-center mb-12"
        >
          {title}
        </motion.h2>
        <div className="flex flex-col gap-2">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.4, delay: i * 0.07, ease: 'easeOut' }}
              className="border border-border rounded-lg overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex justify-between items-center px-6 py-4 text-left bg-background hover:bg-surface transition-colors"
              >
                <span className="font-semibold text-body text-foreground">{faq.question}</span>
                <motion.span
                  animate={{ rotate: openIndex === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="text-muted text-subheading flex-shrink-0 ml-4"
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-4 text-body text-muted">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
