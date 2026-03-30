# SaaS Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-page static SaaS website (Home, Pricing, About, Contact) using Next.js App Router, Tailwind CSS with design tokens from Figma, and Framer Motion animations.

**Architecture:** All design tokens (colors, typography, spacing) live in `tailwind.config.js` and `app/globals.css` — never in components. Each page section is an isolated `'use client'` component in `components/sections/`. Dark/light mode is toggled by adding/removing the `.dark` class on `<html>` and persisted in `localStorage`.

**Tech Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · Framer Motion · Google Fonts (Inter, Noto Serif, Roboto Mono)

---

## File Map

```
tailwind.config.js            — darkMode, colors, fontFamily, fontSize, spacing, borderRadius
app/
  layout.tsx                  — Fonts (next/font/google), theme script (no FOUC), body classes
  globals.css                 — @tailwind directives + :root / .dark CSS variables
  page.tsx                    — Home page (assembles sections)
  pricing/page.tsx            — Pricing page
  about/page.tsx              — About page
  contact/page.tsx            — Contact page

components/
  layout/
    Header.tsx                — Sticky nav, logo, links, ThemeToggle, mobile menu
    Footer.tsx                — Links, copyright (Server Component)
    ThemeToggle.tsx           — Sun/moon icon, toggles .dark on <html>
  sections/
    HeroBasic.tsx             — Title + subtitle (used on Pricing, About)
    HeroActions.tsx           — Title + subtitle + 2 CTA buttons (Home hero)
    HeroForm.tsx              — Title + contact form (Contact page)
    CardGridIcon.tsx          — 3-col grid of icon+title+description cards
    CardGridPricing.tsx       — 3 pricing plans
    CardGridTestimonials.tsx  — 3 testimonial cards with avatars
    PanelImageContent.tsx     — Side-by-side image + text, reversible
    PageAccordion.tsx         — Collapsible FAQ list
    PageNewsletter.tsx        — Dark CTA section with email input
  ui/
    Button.tsx                — variant: primary | secondary | ghost; size: sm | md | lg
    Input.tsx                 — Label + text input
    Card.tsx                  — Surface card, optional hover animation
    Badge.tsx                 — Pill label, variant: default | brand
```

---

## Task 1: Initialize Next.js project

**Files:**
- Create: `package.json`, `tailwind.config.js`, `tsconfig.json`, `next.config.js` (via create-next-app)

- [ ] **Step 1: Initialize the project in the current directory**

```bash
cd "C:/Users/warin/Desktop/testcc&webflow"
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*" --no-git
```

When prompted, accept defaults (Yes to all).

Expected: project files created, `package.json` present with next/react/typescript.

- [ ] **Step 2: Install Framer Motion**

```bash
npm install framer-motion
```

Expected: `framer-motion` appears in `package.json` dependencies.

- [ ] **Step 3: Initialize git and make first commit**

```bash
git init
git add .
git commit -m "chore: initialize Next.js project with Tailwind and Framer Motion"
```

Expected: `.git` folder created, initial commit.

---

## Task 2: Configure design tokens

**Files:**
- Modify: `tailwind.config.js`
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Replace `tailwind.config.js` with design system tokens from Figma**

Replace the entire file with:

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // ─── Colors — from Figma "Color" collection (SDS Light / SDS Dark) ───
      colors: {
        background: 'var(--color-bg)',
        surface:    'var(--color-surface)',
        brand:      'var(--color-brand)',
        foreground: 'var(--color-foreground)',
        muted:      'var(--color-muted)',
        border:     'var(--color-border)',
      },
      // ─── Typography — from Figma "Typography Primitives" ─────────────────
      fontFamily: {
        sans:  ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-noto-serif)', 'serif'],
        mono:  ['var(--font-roboto-mono)', 'monospace'],
      },
      fontSize: {
        // From Figma text styles
        'hero':       ['72px', { lineHeight: '1.2', fontWeight: '700' }],
        'page':       ['48px', { lineHeight: '1.2', fontWeight: '700' }],
        'subtitle':   ['32px', { lineHeight: '1.2' }],
        'heading':    ['24px', { lineHeight: '1.2', fontWeight: '600' }],
        'subheading': ['20px', { lineHeight: '1.2' }],
        'body':       ['16px', { lineHeight: '1.4' }],
        'small':      ['14px', { lineHeight: '1.4' }],
      },
      // ─── Spacing — from Figma "Size/Space" scale (4px base) ──────────────
      spacing: {
        '0.5':  '2px',
        '1':    '4px',
        '1.5':  '6px',
        '2':    '8px',
        '3':    '12px',
        '4':    '16px',
        '6':    '24px',
        '8':    '32px',
        '12':   '48px',
        '16':   '64px',
        '24':   '96px',
        '40':   '160px',
      },
      // ─── Border radius — from Figma "Size/Radius" ────────────────────────
      borderRadius: {
        'sm':   '4px',
        'md':   '8px',
        'lg':   '16px',
        'full': '9999px',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 2: Replace `app/globals.css` with CSS variables for both themes**

Replace the entire file with:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* ── Light mode — from Figma "SDS Light" mode ── */
:root {
  --color-bg:         #ffffff;
  --color-surface:    #f5f5f5;   /* Brand/100 */
  --color-brand:      #111111;   /* Brand/1000 */
  --color-foreground: #111111;
  --color-muted:      #737373;   /* Brand/500 */
  --color-border:     rgba(12, 12, 13, 0.10);
}

/* ── Dark mode — from Figma "SDS Dark" mode ── */
.dark {
  --color-bg:         #111111;
  --color-surface:    #1c1c1c;
  --color-brand:      #f5f5f5;
  --color-foreground: #f5f5f5;
  --color-muted:      #a3a3a3;
  --color-border:     rgba(255, 255, 255, 0.10);
}

* {
  box-sizing: border-box;
}

body {
  background-color: var(--color-bg);
  color: var(--color-foreground);
  font-family: var(--font-inter), sans-serif;
  -webkit-font-smoothing: antialiased;
}
```

- [ ] **Step 3: Replace `app/layout.tsx` with font loading and theme initialization**

Replace the entire file with:

```tsx
import type { Metadata } from 'next'
import { Inter, Noto_Serif, Roboto_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-noto-serif',
  display: 'swap',
})

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SaaS Product',
  description: 'The platform built for your success.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Runs before first paint — prevents flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${notoSerif.variable} ${robotoMono.variable} bg-background text-foreground font-sans`}
      >
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 4: Verify the dev server starts with no errors**

```bash
npm run dev
```

Expected: server starts at http://localhost:3000, no TypeScript or Tailwind errors in terminal.

- [ ] **Step 5: Commit**

```bash
git add tailwind.config.js app/globals.css app/layout.tsx
git commit -m "feat: configure design tokens from Figma (colors, typography, spacing)"
```

---

## Task 3: Build UI atoms

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Input.tsx`
- Create: `components/ui/Card.tsx`
- Create: `components/ui/Badge.tsx`

- [ ] **Step 1: Create `components/ui/Button.tsx`**

```bash
mkdir -p components/ui
```

```tsx
// components/ui/Button.tsx
'use client'
import { motion } from 'framer-motion'

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
  type?: 'button' | 'submit'
  className?: string
}

const variants = {
  primary:   'bg-brand text-background hover:opacity-90',
  secondary: 'bg-surface text-foreground border border-border hover:opacity-80',
  ghost:     'bg-transparent text-foreground hover:bg-surface',
}

const sizes = {
  sm: 'px-3 py-1.5 text-small rounded-md',
  md: 'px-4 py-2 text-body rounded-md',
  lg: 'px-6 py-3 text-body rounded-lg',
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick,
  type = 'button',
  className = '',
}: ButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`inline-flex items-center justify-center font-semibold transition-colors cursor-pointer ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </motion.button>
  )
}
```

- [ ] **Step 2: Create `components/ui/Input.tsx`**

```tsx
// components/ui/Input.tsx
type InputProps = {
  label?: string
  type?: string
  placeholder?: string
  name?: string
  id?: string
  required?: boolean
}

export function Input({ label, type = 'text', placeholder, name, id, required }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label htmlFor={id} className="text-small font-semibold text-foreground">
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="px-4 py-2 rounded-md border border-border bg-surface text-foreground placeholder:text-muted text-body focus:outline-none focus:ring-2 focus:ring-brand/30"
      />
    </div>
  )
}
```

- [ ] **Step 3: Create `components/ui/Card.tsx`**

```tsx
// components/ui/Card.tsx
'use client'
import { motion } from 'framer-motion'

type CardProps = {
  children: React.ReactNode
  className?: string
  hoverable?: boolean
}

export function Card({ children, className = '', hoverable = false }: CardProps) {
  if (hoverable) {
    return (
      <motion.div
        whileHover={{ scale: 1.02, boxShadow: '0 8px 32px rgba(0,0,0,0.10)' }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className={`bg-surface rounded-lg border border-border p-6 ${className}`}
      >
        {children}
      </motion.div>
    )
  }
  return (
    <div className={`bg-surface rounded-lg border border-border p-6 ${className}`}>
      {children}
    </div>
  )
}
```

- [ ] **Step 4: Create `components/ui/Badge.tsx`**

```tsx
// components/ui/Badge.tsx
type BadgeProps = {
  children: React.ReactNode
  variant?: 'default' | 'brand'
}

export function Badge({ children, variant = 'default' }: BadgeProps) {
  const cls = {
    default: 'bg-surface text-muted border border-border',
    brand:   'bg-brand text-background',
  }
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-small font-semibold ${cls[variant]}`}>
      {children}
    </span>
  )
}
```

- [ ] **Step 5: Commit**

```bash
git add components/ui/
git commit -m "feat: add UI atoms — Button, Input, Card, Badge"
```

---

## Task 4: Build layout components

**Files:**
- Create: `components/layout/ThemeToggle.tsx`
- Create: `components/layout/Header.tsx`
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Create `components/layout/ThemeToggle.tsx`**

```bash
mkdir -p components/layout
```

```tsx
// components/layout/ThemeToggle.tsx
'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
  }, [])

  const toggle = () => {
    const next = !isDark
    setIsDark(next)
    document.documentElement.classList.toggle('dark', next)
    localStorage.setItem('theme', next ? 'dark' : 'light')
  }

  return (
    <motion.button
      onClick={toggle}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label="Toggle theme"
      className="p-2 rounded-md hover:bg-surface transition-colors text-foreground"
    >
      {isDark ? (
        // Sun icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
      ) : (
        // Moon icon
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      )}
    </motion.button>
  )
}
```

- [ ] **Step 2: Create `components/layout/Header.tsx`**

```tsx
// components/layout/Header.tsx
'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { Button } from '../ui/Button'

const NAV_LINKS = [
  { href: '/',        label: 'Home' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about',   label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="font-bold text-heading text-foreground">
          Logo
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map((link) => (
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

        {/* Right side */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Button size="sm" className="hidden md:inline-flex">Get started</Button>
          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
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

      {/* Mobile menu */}
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
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`text-body ${pathname === link.href ? 'text-foreground font-semibold' : 'text-muted'}`}
                >
                  {link.label}
                </Link>
              ))}
              <Button size="sm" className="w-full">Get started</Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
```

- [ ] **Step 3: Create `components/layout/Footer.tsx`**

```tsx
// components/layout/Footer.tsx
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <p className="font-bold text-heading text-foreground">Logo</p>
            <p className="text-muted text-body mt-2 max-w-xs">
              The platform that helps you build faster, smarter, and with more confidence.
            </p>
          </div>
          <div>
            <p className="font-semibold text-small text-foreground uppercase tracking-wider mb-4">Product</p>
            <ul className="flex flex-col gap-2">
              <li><Link href="/" className="text-muted text-body hover:text-foreground transition-colors">Home</Link></li>
              <li><Link href="/pricing" className="text-muted text-body hover:text-foreground transition-colors">Pricing</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-semibold text-small text-foreground uppercase tracking-wider mb-4">Company</p>
            <ul className="flex flex-col gap-2">
              <li><Link href="/about" className="text-muted text-body hover:text-foreground transition-colors">About</Link></li>
              <li><Link href="/contact" className="text-muted text-body hover:text-foreground transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-small">© 2026 Logo. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-muted text-small hover:text-foreground">Privacy</Link>
            <Link href="#" className="text-muted text-small hover:text-foreground">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 4: Replace `app/page.tsx` temporarily to verify Header and Footer render**

```tsx
// app/page.tsx — temporary smoke test
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-foreground text-heading">Layout OK</p>
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 5: Open http://localhost:3000 and verify**

Check:
- Header appears with nav links and theme toggle
- Clicking the toggle switches between light and dark (background and text colors change)
- Refreshing keeps the selected theme (localStorage persistence)
- Footer renders at the bottom with links

- [ ] **Step 6: Commit**

```bash
git add components/layout/ app/page.tsx
git commit -m "feat: add Header, Footer, ThemeToggle with dark mode toggle"
```

---

## Task 5: Build Hero section components

**Files:**
- Create: `components/sections/HeroBasic.tsx`
- Create: `components/sections/HeroActions.tsx`
- Create: `components/sections/HeroForm.tsx`

Note: all section components are `'use client'` because they use Framer Motion hooks (`useRef`, `useInView`).

The `fadeUp` animation pattern is repeated in each component (no shared abstraction — each component is self-contained and independently readable).

- [ ] **Step 1: Create `components/sections/HeroBasic.tsx`**

```bash
mkdir -p components/sections
```

```tsx
// components/sections/HeroBasic.tsx
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
```

- [ ] **Step 2: Create `components/sections/HeroActions.tsx`**

```tsx
// components/sections/HeroActions.tsx
'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
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
    transition: { duration: 0.6, delay, ease: 'easeOut' },
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
```

- [ ] **Step 3: Create `components/sections/HeroForm.tsx`**

```tsx
// components/sections/HeroForm.tsx
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
          We'd love to hear from you. Fill out the form and we'll get back to you shortly.
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
```

- [ ] **Step 4: Verify heroes render — temporarily add to `app/page.tsx`**

```tsx
// app/page.tsx — temporary preview
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { HeroActions } from '@/components/sections/HeroActions'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroActions />
      </main>
      <Footer />
    </>
  )
}
```

Open http://localhost:3000. The hero should fade in on load. Toggle dark mode — colors should switch.

- [ ] **Step 5: Commit**

```bash
git add components/sections/HeroBasic.tsx components/sections/HeroActions.tsx components/sections/HeroForm.tsx app/page.tsx
git commit -m "feat: add Hero section components (HeroBasic, HeroActions, HeroForm)"
```

---

## Task 6: Build content section components

**Files:**
- Create: `components/sections/CardGridIcon.tsx`
- Create: `components/sections/PanelImageContent.tsx`

- [ ] **Step 1: Create `components/sections/CardGridIcon.tsx`**

```tsx
// components/sections/CardGridIcon.tsx
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
  { icon: '⚡', title: 'Lightning fast',      description: 'Optimized for speed at every layer of the stack, from database to UI.' },
  { icon: '🔒', title: 'Secure by default',   description: 'Enterprise-grade security with end-to-end encryption and SSO support.' },
  { icon: '🔄', title: 'Always in sync',      description: 'Real-time collaboration across your entire team without conflicts.' },
  { icon: '📊', title: 'Insightful analytics',description: 'Understand your data with beautiful dashboards and actionable insights.' },
  { icon: '🔌', title: 'Easy integrations',   description: 'Connect with 100+ tools you already use in just a few clicks.' },
  { icon: '🛠️', title: 'Developer friendly',  description: 'A powerful API and CLI tools to build exactly what you need.' },
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
```

- [ ] **Step 2: Create `components/sections/PanelImageContent.tsx`**

```tsx
// components/sections/PanelImageContent.tsx
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
```

- [ ] **Step 3: Commit**

```bash
git add components/sections/CardGridIcon.tsx components/sections/PanelImageContent.tsx
git commit -m "feat: add CardGridIcon and PanelImageContent section components"
```

---

## Task 7: Build social proof and conversion sections

**Files:**
- Create: `components/sections/CardGridTestimonials.tsx`
- Create: `components/sections/CardGridPricing.tsx`
- Create: `components/sections/PageAccordion.tsx`
- Create: `components/sections/PageNewsletter.tsx`

- [ ] **Step 1: Create `components/sections/CardGridTestimonials.tsx`**

```tsx
// components/sections/CardGridTestimonials.tsx
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
  { quote: 'This platform transformed how our team works. We ship 3× faster than before.',      author: 'Sarah Chen',  role: 'CTO at Nexus',         initials: 'SC' },
  { quote: "The best investment we've made. The ROI was visible within the first week.",         author: 'Marc Dupont', role: 'CEO at Lumio',          initials: 'MD' },
  { quote: "Finally a tool that doesn't get in the way. It just works, every single time.",     author: 'Priya Patel', role: 'Lead Engineer at Orbit', initials: 'PP' },
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
                <p className="text-body text-foreground flex-1">"{t.quote}"</p>
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
```

- [ ] **Step 2: Create `components/sections/CardGridPricing.tsx`**

```tsx
// components/sections/CardGridPricing.tsx
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
```

- [ ] **Step 3: Create `components/sections/PageAccordion.tsx`**

```tsx
// components/sections/PageAccordion.tsx
'use client'
import { useRef, useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'

type Faq = { question: string; answer: string }

type PageAccordionProps = {
  title?: string
  faqs?: Faq[]
}

const DEFAULT_FAQS: Faq[] = [
  { question: 'How does the free trial work?',          answer: 'You get 14 days of full access to the Pro plan with no credit card required. At the end of your trial you can upgrade or continue on the free plan.' },
  { question: 'Can I change my plan at any time?',      answer: 'Yes, you can upgrade or downgrade at any time. Changes take effect immediately and we pro-rate any billing differences.' },
  { question: 'What payment methods do you accept?',    answer: 'We accept all major credit cards (Visa, Mastercard, Amex) and PayPal. Enterprise customers can also pay by invoice.' },
  { question: 'Is my data secure?',                     answer: 'Absolutely. We use AES-256 encryption at rest and TLS 1.3 in transit. We are SOC 2 Type II certified and GDPR compliant.' },
  { question: 'Do you offer refunds?',                  answer: "We offer a 30-day money-back guarantee on all paid plans. Contact our support team and we'll process your refund within 5 business days." },
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
```

- [ ] **Step 4: Create `components/sections/PageNewsletter.tsx`**

```tsx
// components/sections/PageNewsletter.tsx
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
```

- [ ] **Step 5: Commit**

```bash
git add components/sections/CardGridTestimonials.tsx components/sections/CardGridPricing.tsx components/sections/PageAccordion.tsx components/sections/PageNewsletter.tsx
git commit -m "feat: add CardGridTestimonials, CardGridPricing, PageAccordion, PageNewsletter"
```

---

## Task 8: Assemble the four pages

**Files:**
- Modify: `app/page.tsx`
- Create: `app/pricing/page.tsx`
- Create: `app/about/page.tsx`
- Create: `app/contact/page.tsx`

- [ ] **Step 1: Write `app/page.tsx` — Home**

```tsx
// app/page.tsx
import { Header }               from '@/components/layout/Header'
import { Footer }               from '@/components/layout/Footer'
import { HeroActions }          from '@/components/sections/HeroActions'
import { CardGridIcon }         from '@/components/sections/CardGridIcon'
import { PanelImageContent }    from '@/components/sections/PanelImageContent'
import { CardGridTestimonials } from '@/components/sections/CardGridTestimonials'
import { PageNewsletter }       from '@/components/sections/PageNewsletter'

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <HeroActions />
        <CardGridIcon />
        <PanelImageContent />
        <CardGridTestimonials />
        <PageNewsletter />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 2: Write `app/pricing/page.tsx`**

```bash
mkdir -p app/pricing
```

```tsx
// app/pricing/page.tsx
import { Header }          from '@/components/layout/Header'
import { Footer }          from '@/components/layout/Footer'
import { HeroBasic }       from '@/components/sections/HeroBasic'
import { CardGridPricing } from '@/components/sections/CardGridPricing'
import { PageAccordion }   from '@/components/sections/PageAccordion'

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroBasic
          badge="Pricing"
          title="Simple, transparent pricing"
          subtitle="Choose the plan that fits your needs. Upgrade or downgrade at any time."
        />
        <CardGridPricing />
        <PageAccordion />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 3: Write `app/about/page.tsx`**

```bash
mkdir -p app/about
```

```tsx
// app/about/page.tsx
import { Header }            from '@/components/layout/Header'
import { Footer }            from '@/components/layout/Footer'
import { HeroBasic }         from '@/components/sections/HeroBasic'
import { PanelImageContent } from '@/components/sections/PanelImageContent'
import { CardGridIcon }      from '@/components/sections/CardGridIcon'

const VALUES = [
  { icon: '🎯', title: 'Mission first',       description: 'We exist to help teams ship better products faster. Everything we build serves that mission.' },
  { icon: '🤝', title: 'Customer obsessed',   description: 'We talk to our users every day and build what they actually need, not what we assume they need.' },
  { icon: '🚀', title: 'Move fast',           description: 'We ship weekly and iterate based on real feedback. Perfect is the enemy of shipped.' },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <HeroBasic
          badge="About us"
          title="Built by builders, for builders"
          subtitle="We're a small, focused team on a mission to make software development more human."
        />
        <PanelImageContent
          badge="Our story"
          title="We started because we were frustrated"
          description="After years of using fragmented tools that didn't talk to each other, we decided to build the platform we always wished existed. Three years later, thousands of teams rely on us daily."
          imageUrl="https://picsum.photos/600/400?grayscale&random=2"
          imageAlt="Team at work"
        />
        <CardGridIcon
          title="What we stand for"
          subtitle="Three core values that guide every decision we make."
          features={VALUES}
        />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 4: Write `app/contact/page.tsx`**

```bash
mkdir -p app/contact
```

```tsx
// app/contact/page.tsx
import { Header }    from '@/components/layout/Header'
import { Footer }    from '@/components/layout/Footer'
import { HeroForm }  from '@/components/sections/HeroForm'

export default function ContactPage() {
  return (
    <>
      <Header />
      <main>
        <HeroForm />
      </main>
      <Footer />
    </>
  )
}
```

- [ ] **Step 5: Verify all four pages in the browser**

With `npm run dev` running, check each route:

| URL | What to verify |
|-----|---------------|
| http://localhost:3000 | Hero + 3 sections + newsletter CTA, all fade in on scroll |
| http://localhost:3000/pricing | Hero + 3 pricing cards + accordion FAQ |
| http://localhost:3000/about | Hero + panel + 3 value cards |
| http://localhost:3000/contact | Contact form |

Also verify: clicking nav links navigates correctly, active link is bold, mobile menu opens/closes, dark mode toggle persists on each page.

- [ ] **Step 6: Commit**

```bash
git add app/page.tsx app/pricing/ app/about/ app/contact/
git commit -m "feat: assemble Home, Pricing, About, Contact pages"
```

---

## Task 9: Delete generated boilerplate

**Files:**
- Modify: `app/page.tsx` (already done in Task 8)
- Delete boilerplate if create-next-app added placeholder content to globals.css

- [ ] **Step 1: Check `app/globals.css` for create-next-app placeholder styles**

Open `app/globals.css`. If it contains anything beyond what was written in Task 2 (e.g., `:root { --background: ... }` from the Next.js template), remove those extra lines. The file should only contain the content from Task 2 Step 2.

- [ ] **Step 2: Add `.superpowers/` to `.gitignore`**

Open `.gitignore` and add this line at the end:

```
# Visual brainstorming companion
.superpowers/
```

- [ ] **Step 3: Delete the `public/` placeholder files (optional)**

```bash
rm -f public/next.svg public/vercel.svg
```

- [ ] **Step 4: Final build check**

```bash
npm run build
```

Expected: build succeeds with no errors. TypeScript and ESLint pass.

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: remove create-next-app boilerplate, verify clean build"
```

---

## Summary

After all tasks:

```
✓ Next.js 14 App Router project with TypeScript
✓ All design tokens in tailwind.config.js and globals.css (Figma-sourced)
✓ Light/Dark mode with localStorage persistence and no FOUC
✓ 4 pages: /, /pricing, /about, /contact
✓ 9 section components, all with Framer Motion scroll animations
✓ 4 UI atoms (Button, Input, Card, Badge)
✓ Responsive header with mobile menu
✓ Clean build with no TypeScript errors
```

**To change any color:** edit the value in `globals.css` — no component changes needed.
**To change typography or spacing:** edit `tailwind.config.js` — no component changes needed.
**To swap placeholder content:** pass props directly to section components in each `page.tsx`.
