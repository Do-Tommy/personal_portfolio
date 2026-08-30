'use client'

import Link from 'next/link'
import { Reveal } from '@/hooks/reveal'

export default function Footer() {
  return (
    <footer
      id="footer"
      className="section-shell relative overflow-hidden py-12"
    >
      <Reveal
        from="up"
        viewport={{ once: true, amount: 0.15, margin: '0px 0px 0px 0px' }}
        className="relative z-10 mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 text-center"
      >
        <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent text-scrim">
          Tommy Do
        </p>
        <p className="text-base font-medium text-text/85 text-scrim">Network Engineer</p>
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-text/65">
          <Link href="/#about" className="transition hover:text-accent">
            About
          </Link>
          <span aria-hidden>·</span>
          <Link href="/#work" className="transition hover:text-accent">
            Work
          </Link>
          <span aria-hidden>·</span>
          <Link href="/#contact" className="transition hover:text-accent">
            Contact
          </Link>
        </div>
      </Reveal>
    </footer>
  )
}
