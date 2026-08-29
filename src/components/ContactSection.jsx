'use client'

import Link from 'next/link'
import { Reveal } from '@/hooks/reveal'

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="section-shell relative overflow-hidden py-24 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6">
        <Reveal from="up">
          <div className="radial-copy px-2 py-10 text-center sm:px-4 sm:py-12">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent text-scrim">
              Chapter · Contact
            </p>
            <h2 className="text-4xl font-bold tracking-tight text-white text-scrim md:text-5xl">
              Get in touch
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base font-medium text-text/90 text-scrim md:text-lg">
              Network engineering, automation, or a project idea — send a note.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex items-center justify-center rounded-full border border-accent/50 bg-accent/20 px-8 py-3.5 text-sm font-semibold text-accent backdrop-blur-md transition duration-200 hover:scale-[1.02] hover:border-accent/70 hover:bg-accent/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Contact me
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
