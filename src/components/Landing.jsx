import Link from 'next/link'
import React from 'react'
import SocialMediaIcons from './SocialMediaIcons'
import { Reveal } from '@/hooks/reveal'

const Landing = () => {
  return (
    <section
      id="landing"
      className="section-shell relative flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#0a1210]/35 via-[#0a1210]/15 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a1210]/50 via-transparent to-[#0a1210]/30" />
      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-24 pt-32 text-center md:pb-32 md:pt-40">
        <Reveal from="up" className="w-full">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-accent text-scrim">
            Tommy Do
          </p>
          <h1 className="text-6xl font-semibold tracking-tight text-white text-scrim md:text-7xl lg:text-8xl">
            Network Engineer
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl font-medium leading-relaxed text-white/90 text-scrim md:text-2xl">
            Builds reliable networks and the software that operates them — bare
            metal, routing, and automation.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-medium text-white backdrop-blur-md transition duration-150 hover:border-white/45 hover:bg-white/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              View work
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-accent/40 bg-accent/15 px-7 py-3.5 text-sm font-medium text-accent backdrop-blur-md transition duration-150 hover:border-accent/60 hover:bg-accent/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Get in touch
            </Link>
          </div>
          <div className="mt-8 flex justify-center">
            <SocialMediaIcons />
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Landing
