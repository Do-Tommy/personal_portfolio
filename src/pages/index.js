import Landing from '@/components/Landing'
import About from '@/components/About'
import Work from '@/components/Work'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import ContactSection from '@/components/ContactSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="relative bg-background text-text">
      <Landing />
      <About />
      <Work />
      <Skills />
      <Projects />
      <ContactSection />
      <Footer />
    </main>
  )
}
