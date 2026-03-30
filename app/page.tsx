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
