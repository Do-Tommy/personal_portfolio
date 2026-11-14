'use client'

import React, { useEffect, useState } from 'react'
import { RxHamburgerMenu, RxCrossCircled } from 'react-icons/rx'
import useMediaQuery from '@/hooks/useMediaQuery'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const navItems = [
  { name: 'Home', link: '/#landing' },
  { name: 'About', link: '/#about' },
  { name: 'Work', link: '/#work' },
  { name: 'Skills', link: '/#skills' },
  { name: 'Projects', link: '/#projects' },
  { name: 'Contact', link: '/#contact' },
]

const navLinkClass =
  'rounded-lg px-3 py-2.5 text-sm uppercase tracking-wide text-text/90 text-scrim transition hover:bg-white/5 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-300'

const Header = () => {
  const isDesktop = useMediaQuery('(min-width:768px)')
  const [active, setActive] = useState(false)
  const mobileOpen = active && !isDesktop

  useEffect(() => {
    if (!mobileOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [mobileOpen])

  useEffect(() => {
    if (isDesktop && active) setActive(false)
  }, [isDesktop, active])

  return (
    <header className="fixed inset-x-0 top-0 z-40 w-full">
      <div className="relative flex h-16 items-center justify-between border-b border-white/10 bg-[#0a1210]/85 px-6 backdrop-blur-md md:mx-auto md:mt-4 md:h-[4.25rem] md:max-w-6xl md:rounded-2xl md:border md:border-white/12 md:bg-[#0a1210]/55 md:px-8 md:shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
        <Link className="flex min-h-[2.75rem] items-center gap-3" href={navItems[0].link} onClick={() => setActive(false)}>
          <Image src="/homeicon.png" alt="" width={40} height={40} />
          <span className="text-xl font-medium tracking-tight text-text text-scrim hover:text-accent">
            Tommy Do
          </span>
        </Link>

        <button
          type="button"
          onClick={() => setActive(!active)}
          className="relative z-50 -mr-2 flex h-11 w-11 cursor-pointer items-center justify-center text-text md:hidden"
          aria-label={active ? 'Close menu' : 'Open menu'}
          aria-expanded={active}
        >
          {active ? (
            <RxCrossCircled className="h-6 w-6" aria-hidden />
          ) : (
            <RxHamburgerMenu className="h-6 w-6" aria-hidden />
          )}
        </button>

        <nav className="hidden md:flex md:flex-row md:items-center md:gap-1">
          {navItems.map((item) => (
            <Link key={item.name} href={item.link} scroll={false} className={navLinkClass}>
              <motion.span whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                {item.name}
              </motion.span>
            </Link>
          ))}
        </nav>
      </div>

      {mobileOpen ? (
          <nav
            aria-label="Site"
            className="fixed inset-x-0 bottom-0 top-16 z-50 flex flex-col overflow-y-auto bg-[#0a1210] px-6 pb-10 pt-4 md:hidden"
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.link}
                scroll={false}
                onClick={() => setActive(false)}
                className="flex min-h-[3.5rem] items-center border-b border-white/10 font-display text-2xl text-text transition hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                {item.name}
              </Link>
            ))}
          </nav>
      ) : null}
    </header>
  )
}

export default Header
