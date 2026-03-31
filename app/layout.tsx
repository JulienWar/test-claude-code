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
        <script src="/theme-init.js" />
        {/* Netlify Identity widget — must be on ALL pages so invitation links work */}
        <script src="https://identity.netlify.com/v1/netlify-identity-widget.js" />
        {/* Redirect to /admin/ after login */}
        <script src="/netlify-identity-init.js" />
      </head>
      <body
        className={`${inter.variable} ${notoSerif.variable} ${robotoMono.variable} bg-background text-foreground font-sans`}
      >
        {children}
      </body>
    </html>
  )
}
