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
