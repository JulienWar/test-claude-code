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
