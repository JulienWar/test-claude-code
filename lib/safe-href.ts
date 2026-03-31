const SAFE_PROTOCOLS = new Set(['https:', 'http:', 'mailto:', 'tel:'])

export function safeHref(href: string): string {
  if (!href) return '#'
  if (href.startsWith('/') || href.startsWith('#') || href.startsWith('?')) return href
  try {
    const url = new URL(href)
    if (SAFE_PROTOCOLS.has(url.protocol)) return href
  } catch {
    // Not a valid absolute URL — block it
  }
  return '#'
}
