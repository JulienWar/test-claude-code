import { Header }            from '@/components/layout/Header'
import { Footer }            from '@/components/layout/Footer'
import { HeroBasic }         from '@/components/sections/HeroBasic'
import { PanelImageContent } from '@/components/sections/PanelImageContent'
import { CardGridIcon }      from '@/components/sections/CardGridIcon'
import globalContent from '@/content/global.json'
import aboutContent  from '@/content/about.json'

export default function AboutPage() {
  return (
    <>
      <Header
        logo={globalContent.logo}
        nav={globalContent.nav}
        cta={globalContent.cta}
      />
      <main>
        <HeroBasic
          badge={aboutContent.hero.badge}
          title={aboutContent.hero.title}
          subtitle={aboutContent.hero.subtitle}
        />
        <PanelImageContent {...aboutContent.panel} />
        <CardGridIcon
          title={aboutContent.values.title}
          subtitle={aboutContent.values.subtitle}
          features={aboutContent.values.items}
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
