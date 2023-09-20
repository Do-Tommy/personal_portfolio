import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Landing from '@/components/Landing'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <div> 
      <Header/>
      <Landing/>
      <About/>
      <Skills/>
      <Projects/>
    </div>
  )
}
