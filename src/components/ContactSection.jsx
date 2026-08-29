'use client'

import Link from 'next/link'
import { Reveal } from '@/hooks/reveal'

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="section-shell relative overflow-hidden py-24 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <Reveal from="up">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-accent">
            Chapter · Contact
          </p>
          <h2 className="text-4xl font-semibold tracking-tight text-white md:text-5xl">
            Get in touch
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg font-light text-text/75">
            Network engineering, automation, or a project idea — send a note.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center justify-center rounded-full border border-accent/40 bg-accent/15 px-8 py-3.5 text-sm font-medium text-accent backdrop-blur-md transition duration-200 hover:scale-[1.02] hover:border-accent/60 hover:bg-accent/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Contact me
          </Link>
        </Reveal>
      </div>
    </section>
  )
}
