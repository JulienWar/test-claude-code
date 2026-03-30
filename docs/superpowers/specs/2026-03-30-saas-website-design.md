# SaaS Website — Design Spec

**Date:** 2026-03-30
**Figma source:** https://www.figma.com/design/A4JtPsWMATxSVnAlKoUZMz/Simple-Design-System--test-CC-
**Stack:** Next.js 14 (App Router) · Tailwind CSS · Framer Motion

---

## 1. Contexte

Site web statique multi-pages pour un produit SaaS, construit à partir du design system Figma "Simple Design System". L'utilisateur est designer (non développeur) — le projet doit être facilement modifiable sans toucher aux composants.

---

## 2. Pages

| Route | Fichier | Sections (ordre) |
|---|---|---|
| `/` | `app/page.tsx` | Header · HeroActions · CardGridIcon · PanelImageContent · CardGridTestimonials · PageNewsletter · Footer |
| `/pricing` | `app/pricing/page.tsx` | Header · HeroBasic · CardGridPricing · PageAccordion · Footer |
| `/about` | `app/about/page.tsx` | Header · HeroBasic · PanelImageContent · CardGridIcon · Footer |
| `/contact` | `app/contact/page.tsx` | Header · HeroForm · Footer |

---

## 3. Architecture des fichiers

```
app/
  layout.tsx          — HTML racine, import fonts Google (Inter, Noto Serif, Roboto Mono), ThemeProvider
  globals.css         — CSS custom properties Light/Dark
  page.tsx            — Home
  pricing/page.tsx
  about/page.tsx
  contact/page.tsx

components/
  layout/
    Header.tsx        — Logo + navigation + ThemeToggle
    Footer.tsx
    ThemeToggle.tsx   — Bouton light/dark, setState sur <html>
  sections/
    HeroBasic.tsx
    HeroActions.tsx
    HeroForm.tsx
    CardGridIcon.tsx
    CardGridPricing.tsx
    CardGridTestimonials.tsx
    PanelImageContent.tsx
    PageAccordion.tsx
    PageNewsletter.tsx
  ui/
    Button.tsx
    Input.tsx
    Card.tsx
    Badge.tsx

tailwind.config.js    — TOUTES les valeurs de design (couleurs, typo, espacement, radius)
```

---

## 4. Tokens de design

### globals.css — Variables CSS Light/Dark

Extrait directement des modes "SDS Light" et "SDS Dark" du fichier Figma.

```css
:root {
  --color-bg:             #ffffff;
  --color-bg-secondary:   #f5f5f5;   /* Brand/100 */
  --color-bg-brand:       #111111;   /* Brand/1000 */
  --color-text:           #111111;
  --color-text-secondary: #737373;   /* Brand/500 */
  --color-border:         rgba(12, 12, 13, 0.10);
}

.dark {
  --color-bg:             #111111;
  --color-bg-secondary:   #1c1c1c;
  --color-bg-brand:       #f5f5f5;
  --color-text:           #f5f5f5;
  --color-text-secondary: #a3a3a3;
  --color-border:         rgba(255, 255, 255, 0.10);
}
```

### tailwind.config.js — Référence complète

```js
darkMode: 'class',
theme: {
  extend: {
    colors: {
      bg:        'var(--color-bg)',
      secondary: 'var(--color-bg-secondary)',
      brand:     'var(--color-bg-brand)',
      text:      'var(--color-text)',
      muted:     'var(--color-text-secondary)',
      border:    'var(--color-border)',
    },
    fontFamily: {
      sans:  ['Inter', 'sans-serif'],
      serif: ['Noto Serif', 'serif'],
      mono:  ['Roboto Mono', 'monospace'],
    },
    fontSize: {
      hero:       ['72px', { lineHeight: '1.2', fontWeight: '700' }],
      page:       ['48px', { lineHeight: '1.2', fontWeight: '700' }],
      subtitle:   ['32px', { lineHeight: '1.2' }],
      heading:    ['24px', { lineHeight: '1.2', fontWeight: '600' }],
      subheading: ['20px', { lineHeight: '1.2' }],
      body:       ['16px', { lineHeight: '1.4' }],
      small:      ['14px', { lineHeight: '1.4' }],
    },
    spacing: {
      // Scale 4px — depuis Figma "Size/Space"
      '050': '2px',
      '1':   '4px',
      '1.5': '6px',
      '2':   '8px',
      '3':   '12px',
      '4':   '16px',
      '6':   '24px',
      '8':   '32px',
      '12':  '48px',
      '16':  '64px',
      '24':  '96px',
      '40':  '160px',
    },
    borderRadius: {
      sm:   '4px',
      md:   '8px',
      lg:   '16px',
      full: '9999px',
    },
  },
}
```

---

## 5. Dark mode — implémentation

- `tailwind.config.js` : `darkMode: 'class'`
- `ThemeToggle.tsx` : toggle la classe `.dark` sur `document.documentElement`
- Le `ThemeProvider` dans `layout.tsx` lit `localStorage` au montage pour persister le thème (implémentation custom, pas de dépendance `next-themes`)

---

## 6. Animations Framer Motion

| Contexte | Animation |
|---|---|
| Sections au scroll | `fade-in + translateY(20px → 0)` via `useInView` + `motion.div` |
| Cards au hover | `scale(1 → 1.02)` + ombre accrue |
| Boutons CTA | `whileHover` scale léger |
| Transitions de pages | `AnimatePresence` sur le layout racine |

Toutes les animations sont encapsulées dans leurs composants respectifs — aucune configuration globale nécessaire.

---

## 7. Contenu

Placeholder uniquement. Textes génériques SaaS (titres, descriptions, features, témoignages fictifs). Images : `placehold.co` ou `picsum.photos`. Le remplacement du contenu réel se fait directement dans les props de chaque composant section.

---

## 8. Contraintes respectées

- Toutes les couleurs/typo/espacements dans `tailwind.config.js` et `globals.css` uniquement
- Chaque section du site = un composant isolé dans `components/sections/`
- Les effets visuels (parallax, hover, CTA animés) sont encapsulés dans les composants
- Pas de dépendances inutiles au-delà de Next.js, Tailwind, Framer Motion

---

## 9. Hors scope

- Back-end / base de données
- Formulaire de contact fonctionnel (statique uniquement, pas d'envoi d'email)
- Internationalisation (i18n)
- Tests automatisés
