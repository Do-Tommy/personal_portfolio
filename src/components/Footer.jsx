'use client'

import Link from 'next/link'
import { Reveal } from '@/hooks/reveal'

export default function Footer() {
  return (
    <footer
      id="footer"
      className="section-shell relative overflow-hidden border-t border-white/10 py-16"
    >
      <Reveal from="up" className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center">
        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-accent">
          Tommy Do
        </p>
        <p className="text-lg font-light text-text/80">Network Engineer</p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-text/55">
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
