# CMS + Deployment Design — SaaS Website

**Date:** 2026-03-30
**Stack:** Next.js 16.2.1 (static export) + Decap CMS + Netlify + GitHub

---

## Goal

Enable a non-technical client to edit all website content via a visual interface, with changes going live automatically. The designer hands off the site; the client owns the content.

---

## Pipeline: GitHub → Netlify

The site is exported as fully static HTML/CSS/JS (`next build` with `output: 'export'`). Netlify serves it from its CDN — no server required.

**Publish flow:**
1. Client edits content at `yoursite.netlify.app/admin`
2. Decap CMS commits the change to GitHub
3. Netlify detects the commit and rebuilds (`next build`)
4. Updated site is live in ~1 minute

**`netlify.toml`:**
```toml
[build]
  command = "next build"
  publish = "out"
```

**`next.config.ts` change:**
```ts
output: 'export'
images: { unoptimized: true }  // required for static export
```

---

## Content Architecture

All hardcoded content is extracted to JSON files in `content/`. Pages import these files at build time — no API calls, no fetch.

```
content/
  global.json      # logo text, nav links, footer columns + links
  home.json        # hero, features grid, panel, testimonials, newsletter
  pricing.json     # hero, pricing plans, FAQ accordion
  about.json       # hero, panel image/text, values grid
  contact.json     # hero title/subtitle, form field labels, submit button
```

### `content/global.json`
```json
{
  "logo": "YourBrand",
  "nav": [
    { "label": "Home", "href": "/" },
    { "label": "Pricing", "href": "/pricing" },
    { "label": "About", "href": "/about" },
    { "label": "Contact", "href": "/contact" }
  ],
  "footer": {
    "tagline": "Building better products.",
    "columns": [
      {
        "title": "Product",
        "links": [
          { "label": "Features", "href": "/features" },
          { "label": "Pricing", "href": "/pricing" }
        ]
      },
      {
        "title": "Company",
        "links": [
          { "label": "About", "href": "/about" },
          { "label": "Contact", "href": "/contact" }
        ]
      }
    ],
    "legal": [
      { "label": "Privacy", "href": "/privacy" },
      { "label": "Terms", "href": "/terms" }
    ]
  }
}
```

### `content/home.json`
```json
{
  "hero": {
    "badge": "Now in beta",
    "title": "Build something\npeople love",
    "subtitle": "The platform that helps teams ship faster.",
    "cta_primary": { "label": "Get started", "href": "/contact" },
    "cta_secondary": { "label": "Learn more", "href": "/about" }
  },
  "features": {
    "title": "Everything you need",
    "subtitle": "One platform, all the tools.",
    "items": [
      { "icon": "⚡", "title": "Fast", "body": "Ship in minutes." },
      { "icon": "🔒", "title": "Secure", "body": "Enterprise-grade security." },
      { "icon": "📊", "title": "Analytics", "body": "Understand your users." },
      { "icon": "🤝", "title": "Collaboration", "body": "Work as a team." },
      { "icon": "🔧", "title": "Customizable", "body": "Fits your workflow." },
      { "icon": "🌍", "title": "Global", "body": "CDN in 190+ countries." }
    ]
  },
  "panel": {
    "title": "Designed for scale",
    "body": "Whether you're a startup or an enterprise, our platform grows with you.",
    "cta": { "label": "See how it works", "href": "/about" },
    "image": "/images/panel-home.jpg",
    "reverse": false
  },
  "testimonials": {
    "title": "Trusted by teams worldwide",
    "items": [
      { "quote": "This changed how we build.", "author": "Alice Martin", "role": "CEO, Acme" },
      { "quote": "We shipped 3x faster.", "author": "Bob Chen", "role": "CTO, Startify" },
      { "quote": "Our team loves it.", "author": "Clara Diaz", "role": "PM, Launchpad" }
    ]
  },
  "newsletter": {
    "title": "Stay in the loop",
    "subtitle": "Product updates, no spam.",
    "placeholder": "Enter your email",
    "cta": "Subscribe"
  }
}
```

### `content/pricing.json`
```json
{
  "hero": {
    "badge": "Pricing",
    "title": "Simple, transparent pricing",
    "subtitle": "No hidden fees. Cancel anytime."
  },
  "plans": [
    {
      "name": "Starter",
      "price": "$0",
      "period": "/month",
      "description": "Perfect for individuals.",
      "features": ["5 projects", "1 user", "Community support"],
      "cta": "Get started",
      "popular": false
    },
    {
      "name": "Pro",
      "price": "$29",
      "period": "/month",
      "description": "For growing teams.",
      "features": ["Unlimited projects", "10 users", "Priority support", "Analytics"],
      "cta": "Start free trial",
      "popular": true
    },
    {
      "name": "Enterprise",
      "price": "Custom",
      "period": "",
      "description": "For large organizations.",
      "features": ["Unlimited everything", "SSO", "SLA", "Dedicated support"],
      "cta": "Contact us",
      "popular": false
    }
  ],
  "faq": {
    "title": "Frequently asked questions",
    "items": [
      { "question": "Can I change plans later?", "answer": "Yes, you can upgrade or downgrade at any time." },
      { "question": "Is there a free trial?", "answer": "Yes, all paid plans include a 14-day free trial." },
      { "question": "What payment methods do you accept?", "answer": "We accept all major credit cards and PayPal." },
      { "question": "Can I cancel anytime?", "answer": "Yes, no questions asked." }
    ]
  }
}
```

### `content/about.json`
```json
{
  "hero": {
    "badge": "About us",
    "title": "We're building the future of work",
    "subtitle": "A small team with a big mission."
  },
  "panel": {
    "title": "Our story",
    "body": "Founded in 2022, we set out to make software development accessible to everyone.",
    "cta": { "label": "Join our team", "href": "/contact" },
    "image": "/images/panel-about.jpg",
    "reverse": true
  },
  "values": {
    "title": "Our values",
    "subtitle": "What drives us every day.",
    "items": [
      { "icon": "🎯", "title": "Focus", "body": "We do fewer things, better." },
      { "icon": "❤️", "title": "Care", "body": "We genuinely care about our users." },
      { "icon": "🚀", "title": "Speed", "body": "We ship, learn, and iterate." }
    ]
  }
}
```

### `content/contact.json`
```json
{
  "hero": {
    "title": "Get in touch",
    "subtitle": "We'd love to hear from you."
  },
  "form": {
    "first_name_label": "First name",
    "last_name_label": "Last name",
    "email_label": "Email",
    "company_label": "Company",
    "message_label": "Message",
    "submit_label": "Send message"
  }
}
```

---

## Decap CMS Configuration

Two files in `public/admin/`:

### `public/admin/index.html`
Standard Decap CMS loader — loads the CMS UI from CDN. No custom code.

### `public/admin/config.yml`
Declares all collections mirroring the JSON files above. Key settings:

```yaml
backend:
  name: git-gateway   # proxied through Netlify — client needs no GitHub account
  branch: main

media_folder: public/images
public_folder: /images

collections:
  - name: global
    label: Global (Nav & Footer)
    files:
      - file: content/global.json
        # fields: logo, nav list, footer columns
  - name: home
    label: Home Page
    files:
      - file: content/home.json
        # fields: hero, features items list, panel, testimonials list, newsletter
  - name: pricing
    label: Pricing Page
    files:
      - file: content/pricing.json
        # fields: hero, plans list, faq list
  - name: about
    label: About Page
    files:
      - file: content/about.json
        # fields: hero, panel, values items list
  - name: contact
    label: Contact Page
    files:
      - file: content/contact.json
        # fields: hero, form labels
```

Authentication: **Netlify Identity** widget included in `index.html`. Client receives an email invitation from Netlify dashboard — no separate account needed.

---

## Component Changes

Pages import JSON directly. Components receive typed props — no CMS logic inside components.

```tsx
// app/page.tsx
import homeContent from '@/content/home.json'
import globalContent from '@/content/global.json'

export default function HomePage() {
  return (
    <>
      <Header nav={globalContent.nav} logo={globalContent.logo} />
      <HeroActions {...homeContent.hero} />
      <CardGridIcon {...homeContent.features} />
      <PanelImageContent {...homeContent.panel} />
      <CardGridTestimonials {...homeContent.testimonials} />
      <PageNewsletter {...homeContent.newsletter} />
      <Footer {...globalContent.footer} logo={globalContent.logo} />
    </>
  )
}
```

All section components are updated to accept props instead of using internal hardcoded data. Shape of props mirrors the JSON structure exactly.

**Image handling:** Placeholder `picsum.photos` URLs replaced by paths to `public/images/`. Decap CMS provides an image upload widget pointing to this folder.

---

## Implementation Tasks (outline)

1. Push to GitHub — create repo, push `master` as `main`
2. Configure static export — `next.config.ts` + `netlify.toml`
3. Create content JSON files — all 5 files with current hardcoded content
4. Update components to accept props — all section + layout components
5. Update pages to pass content from JSON imports
6. Set up Decap CMS — `public/admin/index.html` + `config.yml`
7. Add placeholder images to `public/images/`
8. Deploy to Netlify — connect GitHub repo, enable Netlify Identity
9. Verify build, test CMS login, test a content edit end-to-end

---

## Success Criteria

- `next build` succeeds with `output: 'export'`
- Site is live on Netlify with a public URL
- Client can log in at `/admin` and edit all text content
- Client can upload and swap images
- Publishing a change triggers a Netlify rebuild and goes live in < 2 minutes
- No code knowledge required for the client
