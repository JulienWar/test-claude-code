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
