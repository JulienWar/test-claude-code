import { Header }          from '@/components/layout/Header'
import { Footer }          from '@/components/layout/Footer'
import { HeroBasic }       from '@/components/sections/HeroBasic'
import { CardGridPricing } from '@/components/sections/CardGridPricing'
import { PageAccordion }   from '@/components/sections/PageAccordion'
import globalContent  from '@/content/global.json'
import pricingContent from '@/content/pricing.json'

export default function PricingPage() {
  return (
    <>
      <Header
        logo={globalContent.logo}
        nav={globalContent.nav}
        cta={globalContent.cta}
      />
      <main>
        <HeroBasic
          badge={pricingContent.hero.badge}
          title={pricingContent.hero.title}
          subtitle={pricingContent.hero.subtitle}
        />
        <CardGridPricing plans={pricingContent.plans} />
        <PageAccordion
          title={pricingContent.faq.title}
          faqs={pricingContent.faq.items}
        />
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
