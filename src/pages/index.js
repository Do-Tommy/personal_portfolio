import { Inter } from 'next/font/google'
import Landing from '@/components/Landing'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import WorkExperience from '@/components/WorkExperience'
import { Reveal } from '@/hooks/reveal'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div className="pt-24">
      <Landing />
      <About/>
      <WorkExperience/>
      <Skills/>
      <Projects/>
    </div>
)}


