import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import Landing from '@/components/Landing'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import useDarkMode from '@/hooks/darkMode'
import { DarkModeToggle } from '@/components/DarkModeToggle'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  
  return (
    <div> 
      <DarkModeToggle/>
      <Landing/>
      <About/>
      <Skills/>
      <Projects/>
      
      </div>
)}


