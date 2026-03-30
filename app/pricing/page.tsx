import { Header }          from '@/components/layout/Header'
import { Footer }          from '@/components/layout/Footer'
import { HeroBasic }       from '@/components/sections/HeroBasic'
import { CardGridPricing } from '@/components/sections/CardGridPricing'
import { PageAccordion }   from '@/components/sections/PageAccordion'

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        <HeroBasic
          badge="Pricing"
          title="Simple, transparent pricing"
          subtitle="Choose the plan that fits your needs. Upgrade or downgrade at any time."
        />
        <CardGridPricing />
        <PageAccordion />
      </main>
      <Footer />
    </>
  )
}
