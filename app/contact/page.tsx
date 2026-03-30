import { Header }   from '@/components/layout/Header'
import { Footer }   from '@/components/layout/Footer'
import { HeroForm } from '@/components/sections/HeroForm'
import globalContent  from '@/content/global.json'
import contactContent from '@/content/contact.json'

export default function ContactPage() {
  return (
    <>
      <Header
        logo={globalContent.logo}
        nav={globalContent.nav}
        cta={globalContent.cta}
      />
      <main>
        <HeroForm
          title={contactContent.hero.title}
          subtitle={contactContent.hero.subtitle}
          firstNameLabel={contactContent.form.firstNameLabel}
          lastNameLabel={contactContent.form.lastNameLabel}
          emailLabel={contactContent.form.emailLabel}
          companyLabel={contactContent.form.companyLabel}
          messageLabel={contactContent.form.messageLabel}
          submitLabel={contactContent.form.submitLabel}
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
