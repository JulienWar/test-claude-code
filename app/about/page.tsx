import { Header }            from '@/components/layout/Header'
import { Footer }            from '@/components/layout/Footer'
import { HeroBasic }         from '@/components/sections/HeroBasic'
import { PanelImageContent } from '@/components/sections/PanelImageContent'
import { CardGridIcon }      from '@/components/sections/CardGridIcon'

const VALUES = [
  { icon: '🎯', title: 'Mission first',     description: 'We exist to help teams ship better products faster. Everything we build serves that mission.' },
  { icon: '🤝', title: 'Customer obsessed', description: 'We talk to our users every day and build what they actually need, not what we assume they need.' },
  { icon: '🚀', title: 'Move fast',         description: 'We ship weekly and iterate based on real feedback. Perfect is the enemy of shipped.' },
]

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <HeroBasic
          badge="About us"
          title="Built by builders, for builders"
          subtitle="We're a small, focused team on a mission to make software development more human."
        />
        <PanelImageContent
          badge="Our story"
          title="We started because we were frustrated"
          description="After years of using fragmented tools that didn't talk to each other, we decided to build the platform we always wished existed. Three years later, thousands of teams rely on us daily."
          imageUrl="https://picsum.photos/600/400?grayscale&random=2"
          imageAlt="Team at work"
        />
        <CardGridIcon
          title="What we stand for"
          subtitle="Three core values that guide every decision we make."
          features={VALUES}
        />
      </main>
      <Footer />
    </>
  )
}
