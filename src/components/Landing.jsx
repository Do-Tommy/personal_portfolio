import Link from 'next/link'
import React from 'react'
import SocialMediaIcons from './SocialMediaIcons'
import Image from 'next/image'
import { Reveal } from '@/hooks/reveal'

const Landing = () => {
  return (
    <section
      id="landing"
      className="section-shell relative flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0a1210]/80 via-[#0a1210]/20 to-transparent" />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-10 px-6 pb-20 pt-28 md:flex-row md:items-end md:justify-between md:pb-28 md:pt-36">
        <Reveal from="left" className="max-w-xl text-center md:text-left">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.22em] text-accent">
            Tommy Do
          </p>
          <h1 className="text-5xl font-light tracking-tight text-text md:text-6xl lg:text-7xl">
            Network Engineer
          </h1>
          <p className="mt-5 text-lg font-light leading-relaxed text-text/80 md:text-xl">
            Builds reliable networks and the software that operates them — bare
            metal, routing, and automation.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
            <a
              href="#work"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-text backdrop-blur-md transition duration-150 hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              View work
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-text backdrop-blur-md transition duration-150 hover:border-white/40 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Get in touch
            </Link>
          </div>
          <div className="mt-6 flex justify-center md:justify-start">
            <SocialMediaIcons />
          </div>
        </Reveal>
        <Reveal from="right" className="relative w-full max-w-sm shrink-0">
          <div
            className="glass-plate overflow-hidden rounded-3xl p-2"
            style={{ transform: 'rotate(-1.4deg)' }}
          >
            <Image
              width={500}
              height={500}
              alt="Tommy Do"
              className="relative m-auto w-full rounded-2xl object-cover"
              src="/DSC00639.jpg"
              priority
            />
            <p className="px-3 py-2 text-[10px] uppercase tracking-[0.22em] text-white/50">
              Field note · San Jose
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Landing
