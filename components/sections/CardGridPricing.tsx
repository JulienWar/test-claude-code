'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '../ui/Button'

type Plan = {
  name: string
  price: string
  period: string
  description: string
  features: string[]
  cta: string
  popular: boolean
}

const DEFAULT_PLANS: Plan[] = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for individuals getting started.',
    features: ['Up to 3 projects', '1 GB storage', 'Basic analytics', 'Community support'],
    cta: 'Get started',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: 'per month',
    description: 'For growing teams that need more power.',
    features: ['Unlimited projects', '50 GB storage', 'Advanced analytics', 'Priority support', 'API access', 'Custom integrations'],
    cta: 'Start free trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'contact us',
    description: 'For large organizations with advanced needs.',
    features: ['Everything in Pro', 'Unlimited storage', 'Dedicated support', 'SLA guarantee', 'SSO & SAML', 'On-premise option'],
    cta: 'Contact sales',
    popular: false,
  },
]

export function CardGridPricing({ plans = DEFAULT_PLANS }: { plans?: Plan[] }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-background py-24 px-6">
      <div ref={ref} className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
            className={`rounded-lg border p-8 flex flex-col gap-6 ${
              plan.popular
                ? 'bg-brand border-brand text-background'
                : 'bg-surface border-border'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`font-semibold text-subheading ${plan.popular ? 'text-background' : 'text-foreground'}`}>
                  {plan.name}
                </span>
                {plan.popular && (
                  <span className="px-2 py-0.5 rounded-full bg-background/20 text-background text-small font-semibold">
                    Popular
                  </span>
                )}
              </div>
              <div className="flex items-baseline gap-1">
                <span className={`text-page font-bold ${plan.popular ? 'text-background' : 'text-foreground'}`}>
                  {plan.price}
                </span>
                <span className={`text-small ${plan.popular ? 'text-background/70' : 'text-muted'}`}>
                  / {plan.period}
                </span>
              </div>
              <p className={`text-body mt-2 ${plan.popular ? 'text-background/80' : 'text-muted'}`}>
                {plan.description}
              </p>
            </div>
            <ul className="flex flex-col gap-3 flex-1">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className={`text-body flex items-center gap-2 ${plan.popular ? 'text-background' : 'text-foreground'}`}
                >
                  <span className="text-small">✓</span> {feature}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.popular ? 'secondary' : 'primary'}
              size="lg"
              className="w-full"
            >
              {plan.cta}
            </Button>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
