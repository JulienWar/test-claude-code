import Link from 'next/link'
import { safeHref } from '@/lib/safe-href'

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
                    <Link href={safeHref(link.href)} className="text-muted text-body hover:text-foreground transition-colors">
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
              <Link key={link.href} href={safeHref(link.href)} className="text-muted text-small hover:text-foreground transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
