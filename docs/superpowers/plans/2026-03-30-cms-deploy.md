# CMS + Deployment Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Extract all hardcoded content into JSON files, connect Decap CMS for client editing, deploy the site to Netlify via GitHub, and verify the full publish flow works end-to-end.

**Architecture:** Next.js static export (`output: 'export'`) generates `out/`. Content lives in `content/*.json` files imported at build time — no API calls, no server needed. Decap CMS writes to those JSON files via GitHub commits; Netlify rebuilds on each commit. Client edits content at `/admin` using Netlify Identity (no GitHub account required).

**Tech Stack:** Next.js 16.2.1, Tailwind CSS v4, Framer Motion 12, Decap CMS 3.x (CDN), Netlify (static hosting + Identity + Git Gateway), GitHub

---

### Task 1: Configure static export and Netlify build

**Files:**
- Modify: `next.config.ts`
- Create: `netlify.toml`

- [ ] **Step 1: Update next.config.ts for static export**

Replace the entire file with:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
};

export default nextConfig;
```

- [ ] **Step 2: Create netlify.toml**

```toml
[build]
  command = "node node_modules/next/dist/bin/next build"
  publish = "out"

[build.environment]
  NODE_VERSION = "20"
```

Note: Using `node node_modules/next/dist/bin/next build` instead of `npm run build` because the `&` in the repo path can cause issues with npm scripts on some environments. Netlify runs this in its own clean environment so `npm run build` will work there — but if testing locally use the node command.

- [ ] **Step 3: Test the static build locally**

Run:
```bash
node "C:/Users/warin/Desktop/testcc&webflow/node_modules/next/dist/bin/next" build
```

Expected: Build completes. An `out/` directory is created containing `index.html`, `pricing/index.html`, `about/index.html`, `contact/index.html`.

If you see `Error: next/image` related errors, confirm `images: { unoptimized: true }` is in next.config.ts.

- [ ] **Step 4: Commit**

```bash
cd "C:/Users/warin/Desktop/testcc&webflow"
git add next.config.ts netlify.toml
git commit -m "feat: configure Next.js static export and Netlify build"
```

---

### Task 2: Create content JSON files

**Files:**
- Create: `content/global.json`
- Create: `content/home.json`
- Create: `content/pricing.json`
- Create: `content/about.json`
- Create: `content/contact.json`

> `resolveJsonModule: true` is already set in `tsconfig.json` — JSON imports work out of the box.

- [ ] **Step 1: Create content/global.json**

```json
{
  "logo": "YourBrand",
  "cta": { "label": "Get started", "href": "/contact" },
  "nav": [
    { "label": "Home",    "href": "/" },
    { "label": "Pricing", "href": "/pricing" },
    { "label": "About",   "href": "/about" },
    { "label": "Contact", "href": "/contact" }
  ],
  "footer": {
    "tagline": "The platform that helps you build faster, smarter, and with more confidence.",
    "columns": [
      {
        "title": "Product",
        "links": [
          { "label": "Home",    "href": "/" },
          { "label": "Pricing", "href": "/pricing" }
        ]
      },
      {
        "title": "Company",
        "links": [
          { "label": "About",   "href": "/about" },
          { "label": "Contact", "href": "/contact" }
        ]
      }
    ],
    "legal": [
      { "label": "Privacy", "href": "#" },
      { "label": "Terms",   "href": "#" }
    ]
  }
}
```

- [ ] **Step 2: Create content/home.json**

```json
{
  "hero": {
    "badge": "✦ Now in beta",
    "title": "The platform built\nfor your success",
    "subtitle": "Streamline your workflow, boost productivity, and ship results faster than ever before.",
    "cta_primary":   { "label": "Get started for free", "href": "/contact" },
    "cta_secondary": { "label": "See how it works",     "href": "/about" }
  },
  "features": {
    "title":    "Everything you need",
    "subtitle": "All the tools to ship your product faster and scale with confidence.",
    "items": [
      { "icon": "⚡",  "title": "Lightning fast",       "description": "Optimized for speed at every layer of the stack, from database to UI." },
      { "icon": "🔒",  "title": "Secure by default",    "description": "Enterprise-grade security with end-to-end encryption and SSO support." },
      { "icon": "🔄",  "title": "Always in sync",       "description": "Real-time collaboration across your entire team without conflicts." },
      { "icon": "📊",  "title": "Insightful analytics", "description": "Understand your data with beautiful dashboards and actionable insights." },
      { "icon": "🔌",  "title": "Easy integrations",    "description": "Connect with 100+ tools you already use in just a few clicks." },
      { "icon": "🛠️", "title": "Developer friendly",   "description": "A powerful API and CLI tools to build exactly what you need." }
    ]
  },
  "panel": {
    "badge":       "How it works",
    "title":       "Build faster with the right tools",
    "description": "Our platform gives you everything you need to design, build, and ship products your users love. No more context switching, no more lost work.",
    "cta":         { "label": "Learn more", "href": "/about" },
    "imageUrl":    "/images/panel-home.jpg",
    "imageAlt":    "Product screenshot",
    "reverse":     false
  },
  "testimonials": {
    "title": "Loved by teams worldwide",
    "items": [
      { "quote": "This platform transformed how our team works. We ship 3× faster than before.",    "author": "Sarah Chen",  "role": "CTO at Nexus" },
      { "quote": "The best investment we've made. The ROI was visible within the first week.",       "author": "Marc Dupont", "role": "CEO at Lumio" },
      { "quote": "Finally a tool that doesn't get in the way. It just works, every single time.",   "author": "Priya Patel", "role": "Lead Engineer at Orbit" }
    ]
  },
  "newsletter": {
    "title":       "Start building today",
    "subtitle":    "Join thousands of teams already using our platform to ship faster.",
    "placeholder": "Enter your work email",
    "cta":         "Get started free"
  }
}
```

- [ ] **Step 3: Create content/pricing.json**

```json
{
  "hero": {
    "badge":    "Pricing",
    "title":    "Simple, transparent pricing",
    "subtitle": "Choose the plan that fits your needs. Upgrade or downgrade at any time."
  },
  "plans": [
    {
      "name":        "Free",
      "price":       "$0",
      "period":      "forever",
      "description": "Perfect for individuals getting started.",
      "features":    ["Up to 3 projects", "1 GB storage", "Basic analytics", "Community support"],
      "cta":         "Get started",
      "popular":     false
    },
    {
      "name":        "Pro",
      "price":       "$29",
      "period":      "per month",
      "description": "For growing teams that need more power.",
      "features":    ["Unlimited projects", "50 GB storage", "Advanced analytics", "Priority support", "API access", "Custom integrations"],
      "cta":         "Start free trial",
      "popular":     true
    },
    {
      "name":        "Enterprise",
      "price":       "Custom",
      "period":      "contact us",
      "description": "For large organizations with advanced needs.",
      "features":    ["Everything in Pro", "Unlimited storage", "Dedicated support", "SLA guarantee", "SSO & SAML", "On-premise option"],
      "cta":         "Contact sales",
      "popular":     false
    }
  ],
  "faq": {
    "title": "Frequently asked questions",
    "items": [
      { "question": "How does the free trial work?",       "answer": "You get 14 days of full access to the Pro plan with no credit card required. At the end of your trial you can upgrade or continue on the free plan." },
      { "question": "Can I change my plan at any time?",   "answer": "Yes, you can upgrade or downgrade at any time. Changes take effect immediately and we pro-rate any billing differences." },
      { "question": "What payment methods do you accept?", "answer": "We accept all major credit cards (Visa, Mastercard, Amex) and PayPal. Enterprise customers can also pay by invoice." },
      { "question": "Is my data secure?",                  "answer": "Absolutely. We use AES-256 encryption at rest and TLS 1.3 in transit. We are SOC 2 Type II certified and GDPR compliant." },
      { "question": "Do you offer refunds?",               "answer": "We offer a 30-day money-back guarantee on all paid plans. Contact our support team and we'll process your refund within 5 business days." }
    ]
  }
}
```

- [ ] **Step 4: Create content/about.json**

```json
{
  "hero": {
    "badge":    "About us",
    "title":    "Built by builders, for builders",
    "subtitle": "We're a small, focused team on a mission to make software development more human."
  },
  "panel": {
    "badge":       "Our story",
    "title":       "We started because we were frustrated",
    "description": "After years of using fragmented tools that didn't talk to each other, we decided to build the platform we always wished existed. Three years later, thousands of teams rely on us daily.",
    "cta":         { "label": "Join our team", "href": "/contact" },
    "imageUrl":    "/images/panel-about.jpg",
    "imageAlt":    "Team at work",
    "reverse":     true
  },
  "values": {
    "title":    "What we stand for",
    "subtitle": "Three core values that guide every decision we make.",
    "items": [
      { "icon": "🎯", "title": "Mission first",     "description": "We exist to help teams ship better products faster. Everything we build serves that mission." },
      { "icon": "🤝", "title": "Customer obsessed", "description": "We talk to our users every day and build what they actually need, not what we assume they need." },
      { "icon": "🚀", "title": "Move fast",         "description": "We ship weekly and iterate based on real feedback. Perfect is the enemy of shipped." }
    ]
  }
}
```

- [ ] **Step 5: Create content/contact.json**

```json
{
  "hero": {
    "title":    "Get in touch",
    "subtitle": "We'd love to hear from you. Fill out the form and we'll get back to you shortly."
  },
  "form": {
    "firstNameLabel": "First name",
    "lastNameLabel":  "Last name",
    "emailLabel":     "Email",
    "companyLabel":   "Company (optional)",
    "messageLabel":   "Message",
    "submitLabel":    "Send message"
  }
}
```

- [ ] **Step 6: Commit**

```bash
cd "C:/Users/warin/Desktop/testcc&webflow"
git add content/
git commit -m "feat: add content JSON files for all pages"
```

---

### Task 3: Update layout components (Header, Footer)

**Files:**
- Modify: `components/layout/Header.tsx`
- Modify: `components/layout/Footer.tsx`

- [ ] **Step 1: Update Header to accept nav, logo, and cta props**

Replace the entire `components/layout/Header.tsx`:

```tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '../ui/Button'

type NavLink = { href: string; label: string }

type HeaderProps = {
  logo: string
  nav: NavLink[]
  cta: { label: string; href: string }
}

export function Header({ logo, nav, cta }: HeaderProps) {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <Link href="/" className="font-bold text-heading text-foreground">
          {logo}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {nav.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-body transition-colors hover:text-foreground ${
                pathname === link.href ? 'text-foreground font-semibold' : 'text-muted'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href={cta.href} className="hidden md:inline-flex">
            <Button size="sm">{cta.label}</Button>
          </Link>
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open
                ? <><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>
                : <><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>
              }
            </svg>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-border bg-background"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {nav.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-body ${pathname === link.href ? 'text-foreground font-semibold' : 'text-muted'}`}
                >
                  {link.label}
                </Link>
              ))}
              <Link href={cta.href} onClick={() => setOpen(false)}>
                <Button size="sm" className="w-full">{cta.label}</Button>
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
```

- [ ] **Step 2: Update Footer to accept logo, tagline, columns, legal props**

Replace the entire `components/layout/Footer.tsx`:

```tsx
import Link from 'next/link'

type FooterLink   = { label: string; href: string }
type FooterColumn = { title: string; links: FooterLink[] }

type FooterProps = {
  logo:    string
  tagline: string
  columns: FooterColumn[]
  legal:   FooterLink[]
}

export function Footer({ logo, tagline, columns, legal }: FooterProps) {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <p className="font-bold text-heading text-foreground">{logo}</p>
            <p className="text-muted text-body mt-2 max-w-xs">{tagline}</p>
          </div>
          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-semibold text-small text-foreground uppercase tracking-wider mb-4">{col.title}</p>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="text-muted text-body hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-small">© 2026 {logo}. All rights reserved.</p>
          <div className="flex gap-6">
            {legal.map((link) => (
              <Link key={link.href} href={link.href} className="text-muted text-small hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: Commit**

```bash
cd "C:/Users/warin/Desktop/testcc&webflow"
git add components/layout/Header.tsx components/layout/Footer.tsx
git commit -m "feat: make Header and Footer accept content props"
```

---

### Task 4: Update section components

**Files:**
- Modify: `components/sections/HeroActions.tsx`
- Modify: `components/sections/HeroForm.tsx`
- Modify: `components/sections/PanelImageContent.tsx`
- Modify: `components/sections/CardGridTestimonials.tsx`

> `HeroBasic`, `CardGridIcon`, `CardGridPricing`, `PageAccordion`, `PageNewsletter` already accept all needed props — no changes required.

- [ ] **Step 1: Update HeroActions — add CTA href support**

Replace the entire `components/sections/HeroActions.tsx`:

```tsx
'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView, type Transition } from 'framer-motion'
import { Button } from '../ui/Button'

type Cta = { label: string; href: string }

type HeroActionsProps = {
  badge?:         string
  title?:         string
  subtitle?:      string
  cta_primary?:   Cta
  cta_secondary?: Cta
}

export function HeroActions({
  badge         = '✦ Now in beta',
  title         = 'The platform built\nfor your success',
  subtitle      = 'Streamline your workflow, boost productivity, and ship results faster than ever before.',
  cta_primary   = { label: 'Get started for free', href: '/contact' },
  cta_secondary = { label: 'See how it works',     href: '/about'   },
}: HeroActionsProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const item = (delay: number) => ({
    initial:    { opacity: 0, y: 24 },
    animate:    inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
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
          <Link href={cta_primary.href}>
            <Button size="lg">{cta_primary.label}</Button>
          </Link>
          <Link href={cta_secondary.href}>
            <Button size="lg" variant="secondary">{cta_secondary.label}</Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Update HeroForm — add props for title, subtitle, and form labels**

Replace the entire `components/sections/HeroForm.tsx`:

```tsx
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

type HeroFormProps = {
  title?:          string
  subtitle?:       string
  firstNameLabel?: string
  lastNameLabel?:  string
  emailLabel?:     string
  companyLabel?:   string
  messageLabel?:   string
  submitLabel?:    string
}

export function HeroForm({
  title          = 'Get in touch',
  subtitle       = "We'd love to hear from you. Fill out the form and we'll get back to you shortly.",
  firstNameLabel = 'First name',
  lastNameLabel  = 'Last name',
  emailLabel     = 'Email',
  companyLabel   = 'Company (optional)',
  messageLabel   = 'Message',
  submitLabel    = 'Send message',
}: HeroFormProps) {
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
        <h1 className="font-sans text-page font-bold text-foreground mb-2">{title}</h1>
        <p className="text-muted text-body mb-8">{subtitle}</p>
        <form className="flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input id="firstName" name="firstName" label={firstNameLabel} placeholder="Jane" />
            <Input id="lastName"  name="lastName"  label={lastNameLabel}  placeholder="Smith" />
          </div>
          <Input id="email"   name="email"   type="email" label={emailLabel}   placeholder="jane@example.com" required />
          <Input id="company" name="company"             label={companyLabel} placeholder="Acme Inc." />
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-small font-semibold text-foreground">{messageLabel}</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="How can we help you?"
              className="px-4 py-2 rounded-md border border-border bg-surface text-foreground placeholder:text-muted text-body focus:outline-none focus:ring-2 focus:ring-brand/30 resize-none"
            />
          </div>
          <Button type="submit" size="lg" className="w-full">{submitLabel}</Button>
        </form>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 3: Update PanelImageContent — change cta prop from string to object**

Replace the entire `components/sections/PanelImageContent.tsx`:

```tsx
'use client'
import Link from 'next/link'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Button } from '../ui/Button'

type PanelImageContentProps = {
  badge?:       string
  title?:       string
  description?: string
  cta?:         { label: string; href: string }
  reverse?:     boolean
  imageUrl?:    string
  imageAlt?:    string
}

export function PanelImageContent({
  badge       = 'How it works',
  title       = 'Build faster with the right tools',
  description = 'Our platform gives you everything you need to design, build, and ship products your users love. No more context switching, no more lost work.',
  cta         = { label: 'Learn more', href: '/about' },
  reverse     = false,
  imageUrl    = '/images/panel-home.jpg',
  imageAlt    = 'Product screenshot',
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
          <Link href={cta.href}>
            <Button size="lg">{cta.label}</Button>
          </Link>
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
```

- [ ] **Step 4: Update CardGridTestimonials — remove initials from type, compute from author**

Replace the entire `components/sections/CardGridTestimonials.tsx`:

```tsx
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Card } from '../ui/Card'

type Testimonial = { quote: string; author: string; role: string }

type CardGridTestimonialsProps = {
  title?:         string
  testimonials?:  Testimonial[]
}

const DEFAULT_TESTIMONIALS: Testimonial[] = [
  { quote: 'This platform transformed how our team works. We ship 3× faster than before.',    author: 'Sarah Chen',  role: 'CTO at Nexus' },
  { quote: "The best investment we've made. The ROI was visible within the first week.",       author: 'Marc Dupont', role: 'CEO at Lumio' },
  { quote: "Finally a tool that doesn't get in the way. It just works, every single time.",   author: 'Priya Patel', role: 'Lead Engineer at Orbit' },
]

function getInitials(name: string): string {
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}

export function CardGridTestimonials({
  title        = 'Loved by teams worldwide',
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
                    {getInitials(t.author)}
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
```

- [ ] **Step 5: Commit**

```bash
cd "C:/Users/warin/Desktop/testcc&webflow"
git add components/sections/HeroActions.tsx components/sections/HeroForm.tsx components/sections/PanelImageContent.tsx components/sections/CardGridTestimonials.tsx
git commit -m "feat: update section components to accept content props"
```

---

### Task 5: Update pages to import from JSON

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/pricing/page.tsx`
- Modify: `app/about/page.tsx`
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Update app/page.tsx (Home)**

Replace the entire file:

```tsx
import { Header }               from '@/components/layout/Header'
import { Footer }               from '@/components/layout/Footer'
import { HeroActions }          from '@/components/sections/HeroActions'
import { CardGridIcon }         from '@/components/sections/CardGridIcon'
import { PanelImageContent }    from '@/components/sections/PanelImageContent'
import { CardGridTestimonials } from '@/components/sections/CardGridTestimonials'
import { PageNewsletter }       from '@/components/sections/PageNewsletter'
import globalContent from '@/content/global.json'
import homeContent   from '@/content/home.json'

export default function HomePage() {
  return (
    <>
      <Header
        logo={globalContent.logo}
        nav={globalContent.nav}
        cta={globalContent.cta}
      />
      <main>
        <HeroActions {...homeContent.hero} />
        <CardGridIcon
          title={homeContent.features.title}
          subtitle={homeContent.features.subtitle}
          features={homeContent.features.items}
        />
        <PanelImageContent {...homeContent.panel} />
        <CardGridTestimonials
          title={homeContent.testimonials.title}
          testimonials={homeContent.testimonials.items}
        />
        <PageNewsletter {...homeContent.newsletter} />
      </main>
      <Footer
        logo={globalContent.logo}
        tagline={globalContent.footer.tagline}
        columns={globalContent.footer.columns}
        legal={globalContent.footer.legal}
      />
    </>
  )
}
```

- [ ] **Step 2: Update app/pricing/page.tsx**

Replace the entire file:

```tsx
import { Header }          from '@/components/layout/Header'
import { Footer }          from '@/components/layout/Footer'
import { HeroBasic }       from '@/components/sections/HeroBasic'
import { CardGridPricing } from '@/components/sections/CardGridPricing'
import { PageAccordion }   from '@/components/sections/PageAccordion'
import globalContent  from '@/content/global.json'
import pricingContent from '@/content/pricing.json'

export default function PricingPage() {
  return (
    <>
      <Header
        logo={globalContent.logo}
        nav={globalContent.nav}
        cta={globalContent.cta}
      />
      <main>
        <HeroBasic
          badge={pricingContent.hero.badge}
          title={pricingContent.hero.title}
          subtitle={pricingContent.hero.subtitle}
        />
        <CardGridPricing plans={pricingContent.plans} />
        <PageAccordion
          title={pricingContent.faq.title}
          faqs={pricingContent.faq.items}
        />
      </main>
      <Footer
        logo={globalContent.logo}
        tagline={globalContent.footer.tagline}
        columns={globalContent.footer.columns}
        legal={globalContent.footer.legal}
      />
    </>
  )
}
```

- [ ] **Step 3: Update app/about/page.tsx**

Replace the entire file:

```tsx
import { Header }            from '@/components/layout/Header'
import { Footer }            from '@/components/layout/Footer'
import { HeroBasic }         from '@/components/sections/HeroBasic'
import { PanelImageContent } from '@/components/sections/PanelImageContent'
import { CardGridIcon }      from '@/components/sections/CardGridIcon'
import globalContent from '@/content/global.json'
import aboutContent  from '@/content/about.json'

export default function AboutPage() {
  return (
    <>
      <Header
        logo={globalContent.logo}
        nav={globalContent.nav}
        cta={globalContent.cta}
      />
      <main>
        <HeroBasic
          badge={aboutContent.hero.badge}
          title={aboutContent.hero.title}
          subtitle={aboutContent.hero.subtitle}
        />
        <PanelImageContent {...aboutContent.panel} />
        <CardGridIcon
          title={aboutContent.values.title}
          subtitle={aboutContent.values.subtitle}
          features={aboutContent.values.items}
        />
      </main>
      <Footer
        logo={globalContent.logo}
        tagline={globalContent.footer.tagline}
        columns={globalContent.footer.columns}
        legal={globalContent.footer.legal}
      />
    </>
  )
}
```

- [ ] **Step 4: Update app/contact/page.tsx**

Replace the entire file:

```tsx
import { Header }   from '@/components/layout/Header'
import { Footer }   from '@/components/layout/Footer'
import { HeroForm } from '@/components/sections/HeroForm'
import globalContent  from '@/content/global.json'
import contactContent from '@/content/contact.json'

export default function ContactPage() {
  return (
    <>
      <Header
        logo={globalContent.logo}
        nav={globalContent.nav}
        cta={globalContent.cta}
      />
      <main>
        <HeroForm
          title={contactContent.hero.title}
          subtitle={contactContent.hero.subtitle}
          firstNameLabel={contactContent.form.firstNameLabel}
          lastNameLabel={contactContent.form.lastNameLabel}
          emailLabel={contactContent.form.emailLabel}
          companyLabel={contactContent.form.companyLabel}
          messageLabel={contactContent.form.messageLabel}
          submitLabel={contactContent.form.submitLabel}
        />
      </main>
      <Footer
        logo={globalContent.logo}
        tagline={globalContent.footer.tagline}
        columns={globalContent.footer.columns}
        legal={globalContent.footer.legal}
      />
    </>
  )
}
```

- [ ] **Step 5: Run TypeScript check**

```bash
node "C:/Users/warin/Desktop/testcc&webflow/node_modules/typescript/bin/tsc" --noEmit --project "C:/Users/warin/Desktop/testcc&webflow/tsconfig.json"
```

Expected: No errors. If you see type errors, check that the prop names in the page files exactly match the prop types in the component files.

- [ ] **Step 6: Run the build**

```bash
node "C:/Users/warin/Desktop/testcc&webflow/node_modules/next/dist/bin/next" build
```

Expected: Build completes successfully. The `out/` directory is regenerated.

- [ ] **Step 7: Commit**

```bash
cd "C:/Users/warin/Desktop/testcc&webflow"
git add app/page.tsx app/pricing/page.tsx app/about/page.tsx app/contact/page.tsx
git commit -m "feat: wire all pages to content JSON files"
```

---

### Task 6: Add placeholder images and set up Decap CMS

**Files:**
- Create: `public/images/panel-home.jpg`
- Create: `public/images/panel-about.jpg`
- Create: `public/admin/index.html`
- Create: `public/admin/config.yml`

- [ ] **Step 1: Download placeholder images**

```bash
cd "C:/Users/warin/Desktop/testcc&webflow"
mkdir -p public/images
curl -L "https://picsum.photos/600/400?grayscale" -o public/images/panel-home.jpg
curl -L "https://picsum.photos/600/400?grayscale&random=2" -o public/images/panel-about.jpg
```

Expected: Two JPEG files appear in `public/images/`.

- [ ] **Step 2: Create public/admin/index.html**

```html
<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="robots" content="noindex" />
  <title>Content Manager</title>
  <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
</head>
<body>
  <script src="https://unpkg.com/decap-cms@^3.0.0/dist/decap-cms.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create public/admin/config.yml**

```yaml
backend:
  name: git-gateway
  branch: main

media_folder: public/images
public_folder: /images

collections:

  - name: "global"
    label: "Global (Nav & Footer)"
    files:
      - name: "global"
        label: "Navigation & Footer"
        file: "content/global.json"
        fields:
          - { label: "Logo Text", name: "logo", widget: "string" }
          - label: "Header CTA Button"
            name: "cta"
            widget: "object"
            fields:
              - { label: "Button Label", name: "label", widget: "string" }
              - { label: "Button URL",   name: "href",  widget: "string" }
          - label: "Navigation Links"
            name: "nav"
            widget: "list"
            fields:
              - { label: "Label", name: "label", widget: "string" }
              - { label: "URL",   name: "href",  widget: "string" }
          - label: "Footer"
            name: "footer"
            widget: "object"
            fields:
              - { label: "Tagline", name: "tagline", widget: "string" }
              - label: "Link Columns"
                name: "columns"
                widget: "list"
                fields:
                  - { label: "Column Title", name: "title", widget: "string" }
                  - label: "Links"
                    name: "links"
                    widget: "list"
                    fields:
                      - { label: "Label", name: "label", widget: "string" }
                      - { label: "URL",   name: "href",  widget: "string" }
              - label: "Legal Links (Privacy, Terms)"
                name: "legal"
                widget: "list"
                fields:
                  - { label: "Label", name: "label", widget: "string" }
                  - { label: "URL",   name: "href",  widget: "string" }

  - name: "home"
    label: "Home Page"
    files:
      - name: "home"
        label: "Home Page Content"
        file: "content/home.json"
        fields:
          - label: "Hero Section"
            name: "hero"
            widget: "object"
            fields:
              - { label: "Badge Text",    name: "badge",    widget: "string" }
              - { label: "Title",         name: "title",    widget: "string" }
              - { label: "Subtitle",      name: "subtitle", widget: "string" }
              - label: "Primary CTA"
                name: "cta_primary"
                widget: "object"
                fields:
                  - { label: "Button Label", name: "label", widget: "string" }
                  - { label: "Button URL",   name: "href",  widget: "string" }
              - label: "Secondary CTA"
                name: "cta_secondary"
                widget: "object"
                fields:
                  - { label: "Button Label", name: "label", widget: "string" }
                  - { label: "Button URL",   name: "href",  widget: "string" }
          - label: "Features Section"
            name: "features"
            widget: "object"
            fields:
              - { label: "Section Title",    name: "title",    widget: "string" }
              - { label: "Section Subtitle", name: "subtitle", widget: "string" }
              - label: "Feature Cards"
                name: "items"
                widget: "list"
                fields:
                  - { label: "Icon (emoji)", name: "icon",        widget: "string" }
                  - { label: "Title",        name: "title",       widget: "string" }
                  - { label: "Description",  name: "description", widget: "text" }
          - label: "Panel Section"
            name: "panel"
            widget: "object"
            fields:
              - { label: "Badge Text",   name: "badge",       widget: "string", required: false }
              - { label: "Title",        name: "title",       widget: "string" }
              - { label: "Description",  name: "description", widget: "text" }
              - label: "CTA Button"
                name: "cta"
                widget: "object"
                fields:
                  - { label: "Button Label", name: "label", widget: "string" }
                  - { label: "Button URL",   name: "href",  widget: "string" }
              - { label: "Image", name: "imageUrl", widget: "image" }
              - { label: "Image Alt Text", name: "imageAlt", widget: "string" }
              - { label: "Reverse Layout", name: "reverse", widget: "boolean", default: false }
          - label: "Testimonials Section"
            name: "testimonials"
            widget: "object"
            fields:
              - { label: "Section Title", name: "title", widget: "string" }
              - label: "Testimonials"
                name: "items"
                widget: "list"
                fields:
                  - { label: "Quote",       name: "quote",  widget: "text" }
                  - { label: "Author Name", name: "author", widget: "string" }
                  - { label: "Role",        name: "role",   widget: "string" }
          - label: "Newsletter Section"
            name: "newsletter"
            widget: "object"
            fields:
              - { label: "Title",            name: "title",       widget: "string" }
              - { label: "Subtitle",         name: "subtitle",    widget: "string" }
              - { label: "Input Placeholder",name: "placeholder", widget: "string" }
              - { label: "Button Label",     name: "cta",         widget: "string" }

  - name: "pricing"
    label: "Pricing Page"
    files:
      - name: "pricing"
        label: "Pricing Page Content"
        file: "content/pricing.json"
        fields:
          - label: "Hero Section"
            name: "hero"
            widget: "object"
            fields:
              - { label: "Badge Text", name: "badge",    widget: "string" }
              - { label: "Title",      name: "title",    widget: "string" }
              - { label: "Subtitle",   name: "subtitle", widget: "string" }
          - label: "Pricing Plans"
            name: "plans"
            widget: "list"
            fields:
              - { label: "Plan Name",   name: "name",        widget: "string" }
              - { label: "Price",       name: "price",       widget: "string" }
              - { label: "Period",      name: "period",      widget: "string" }
              - { label: "Description", name: "description", widget: "string" }
              - { label: "Features",    name: "features",    widget: "list", field: { label: "Feature", name: "item", widget: "string" } }
              - { label: "CTA Label",   name: "cta",         widget: "string" }
              - { label: "Mark as Popular", name: "popular", widget: "boolean", default: false }
          - label: "FAQ Section"
            name: "faq"
            widget: "object"
            fields:
              - { label: "Section Title", name: "title", widget: "string" }
              - label: "FAQ Items"
                name: "items"
                widget: "list"
                fields:
                  - { label: "Question", name: "question", widget: "string" }
                  - { label: "Answer",   name: "answer",   widget: "text" }

  - name: "about"
    label: "About Page"
    files:
      - name: "about"
        label: "About Page Content"
        file: "content/about.json"
        fields:
          - label: "Hero Section"
            name: "hero"
            widget: "object"
            fields:
              - { label: "Badge Text", name: "badge",    widget: "string" }
              - { label: "Title",      name: "title",    widget: "string" }
              - { label: "Subtitle",   name: "subtitle", widget: "string" }
          - label: "Panel Section"
            name: "panel"
            widget: "object"
            fields:
              - { label: "Badge Text",   name: "badge",       widget: "string", required: false }
              - { label: "Title",        name: "title",       widget: "string" }
              - { label: "Description",  name: "description", widget: "text" }
              - label: "CTA Button"
                name: "cta"
                widget: "object"
                fields:
                  - { label: "Button Label", name: "label", widget: "string" }
                  - { label: "Button URL",   name: "href",  widget: "string" }
              - { label: "Image",          name: "imageUrl", widget: "image" }
              - { label: "Image Alt Text", name: "imageAlt", widget: "string" }
              - { label: "Reverse Layout", name: "reverse",  widget: "boolean", default: false }
          - label: "Values Section"
            name: "values"
            widget: "object"
            fields:
              - { label: "Section Title",    name: "title",    widget: "string" }
              - { label: "Section Subtitle", name: "subtitle", widget: "string" }
              - label: "Value Cards"
                name: "items"
                widget: "list"
                fields:
                  - { label: "Icon (emoji)", name: "icon",        widget: "string" }
                  - { label: "Title",        name: "title",       widget: "string" }
                  - { label: "Description",  name: "description", widget: "text" }

  - name: "contact"
    label: "Contact Page"
    files:
      - name: "contact"
        label: "Contact Page Content"
        file: "content/contact.json"
        fields:
          - label: "Hero Section"
            name: "hero"
            widget: "object"
            fields:
              - { label: "Title",    name: "title",    widget: "string" }
              - { label: "Subtitle", name: "subtitle", widget: "string" }
          - label: "Form Labels"
            name: "form"
            widget: "object"
            fields:
              - { label: "First Name Label", name: "firstNameLabel", widget: "string" }
              - { label: "Last Name Label",  name: "lastNameLabel",  widget: "string" }
              - { label: "Email Label",      name: "emailLabel",     widget: "string" }
              - { label: "Company Label",    name: "companyLabel",   widget: "string" }
              - { label: "Message Label",    name: "messageLabel",   widget: "string" }
              - { label: "Submit Button",    name: "submitLabel",    widget: "string" }
```

- [ ] **Step 4: Add Netlify Identity redirect script to app/layout.tsx**

Open `app/layout.tsx`. Find the closing `</body>` tag and add the Netlify Identity redirect script just before it:

```tsx
<script dangerouslySetInnerHTML={{ __html: `
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("init", user => {
      if (!user) {
        window.netlifyIdentity.on("login", () => {
          document.location.href = "/admin/";
        });
      }
    });
  }
` }} />
```

The full bottom of the body in layout.tsx should look like:

```tsx
      </body>
```

becomes:

```tsx
        <script dangerouslySetInnerHTML={{ __html: `
          if (window.netlifyIdentity) {
            window.netlifyIdentity.on("init", user => {
              if (!user) {
                window.netlifyIdentity.on("login", () => {
                  document.location.href = "/admin/";
                });
              }
            });
          }
        ` }} />
      </body>
```

- [ ] **Step 5: Commit**

```bash
cd "C:/Users/warin/Desktop/testcc&webflow"
git add public/images/ public/admin/ app/layout.tsx
git commit -m "feat: add Decap CMS admin UI, placeholder images, Netlify Identity redirect"
```

---

### Task 7: Push to GitHub

**Files:** None (git operations only)

> `gh` CLI is not installed. This task uses git commands directly. You will need a GitHub account and a Personal Access Token (PAT) with `repo` scope.

- [ ] **Step 1: Ask the user to create a GitHub repository**

Ask: "Please create a new repository on github.com (public or private, your choice), name it whatever you like (e.g. `saas-website`), and give me the repository URL (e.g. `https://github.com/yourusername/saas-website`)."

Wait for the user to provide the URL before continuing.

- [ ] **Step 2: Add the remote and rename the branch to main**

Replace `<REPO_URL>` with the URL the user provided:

```bash
cd "C:/Users/warin/Desktop/testcc&webflow"
git remote add origin <REPO_URL>
git branch -M main
```

- [ ] **Step 3: Push**

```bash
git push -u origin main
```

If prompted for credentials, use your GitHub username and a Personal Access Token (not your password). To create one: github.com → Settings → Developer settings → Personal access tokens → Generate new token → select `repo` scope.

Expected: All commits appear on GitHub.

---

### Task 8: Deploy to Netlify and enable CMS access

**Files:** None (Netlify configuration via MCP tools or web UI)

> This task uses the Netlify MCP tools available in the environment, or can be done via netlify.com web UI.

- [ ] **Step 1: Check if the Netlify site already exists**

Use the Netlify MCP tool `mcp__2decbb98-ec6b-49c9-a5ae-93df5a4acc5c__netlify-project-services-reader` to list existing sites, or go to app.netlify.com.

If a site already exists for this project, note its site ID and skip to Step 3.

- [ ] **Step 2: Create a new Netlify site linked to the GitHub repo**

In the Netlify web UI (app.netlify.com):
1. Click "Add new site" → "Import an existing project"
2. Choose "Deploy with GitHub"
3. Authorize Netlify to access your GitHub account
4. Select the repository you created in Task 7
5. Build settings are auto-detected from `netlify.toml`:
   - Build command: `node node_modules/next/dist/bin/next build`
   - Publish directory: `out`
6. Click "Deploy site"

Wait for the first deploy to complete (green "Published" status).

- [ ] **Step 3: Enable Netlify Identity**

In the Netlify dashboard for your site:
1. Go to "Site settings" → "Identity"
2. Click "Enable Identity"
3. Under "Registration preferences", set to "Invite only" (so only you can add the client)
4. Under "External providers", you can optionally add Google/GitHub login

- [ ] **Step 4: Enable Git Gateway**

Still in "Site settings" → "Identity":
1. Scroll to "Services" → "Git Gateway"
2. Click "Enable Git Gateway"

This allows Decap CMS to commit to GitHub on behalf of users authenticated via Netlify Identity — without them needing a GitHub account.

- [ ] **Step 5: Invite the client as a CMS user**

In the Netlify dashboard → "Identity" tab:
1. Click "Invite users"
2. Enter the client's email address
3. They receive an email to set a password

- [ ] **Step 6: Verify the CMS works**

1. Open `https://your-site.netlify.app/admin`
2. Log in with the credentials you set up
3. You should see the Decap CMS interface with all 5 collections (Global, Home, Pricing, About, Contact)
4. Edit a text field (e.g., change the hero title on the Home page)
5. Click "Publish"
6. Go to your GitHub repo — you should see a new commit from `netlify[bot]` with the change
7. Go to Netlify → "Deploys" — a new build should have triggered
8. Once deployed, visit the live site and verify the text changed

Expected: The full loop works — edit in CMS → GitHub commit → Netlify rebuild → live site updated.

---

## Success Criteria

- [ ] `next build` completes with `output: 'export'`, producing an `out/` directory
- [ ] All 4 pages render correctly with content from JSON files
- [ ] Site is live on a Netlify URL (e.g. `yourname.netlify.app`)
- [ ] `/admin` loads the Decap CMS interface
- [ ] Client can log in with email + password (no GitHub account needed)
- [ ] Editing any text in the CMS and publishing triggers a GitHub commit
- [ ] Netlify auto-rebuilds within ~1 minute of the commit
- [ ] Client can upload images via the CMS image widget
