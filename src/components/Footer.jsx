'use client'

import Link from 'next/link'
import { Reveal } from '@/hooks/reveal'

export default function Footer() {
  return (
    <footer
      id="footer"
      className="section-shell relative overflow-hidden py-12"
    >
      <Reveal from="up" className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-accent">
          Tommy Do
        </p>
        <p className="text-base font-light text-text/70">Network Engineer</p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-text/50">
          <Link href="/#about" className="transition hover:text-accent">
            About
          </Link>
          <span aria-hidden>·</span>
          <Link href="/#work" className="transition hover:text-accent">
            Work
          </Link>
          <span aria-hidden>·</span>
          <Link href="/contact" className="transition hover:text-accent">
            Contact
          </Link>
        </div>
      </Reveal>
    </footer>
  )
}
