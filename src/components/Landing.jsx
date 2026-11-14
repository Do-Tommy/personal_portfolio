import Link from 'next/link'
import React from 'react'
import SocialMediaIcons from './SocialMediaIcons'

// One hero at every width: a flat dark ground with a soft accent glow, the
// same treatment as the share image. No photograph sits behind the headline.
const Landing = () => {
  return (
    <section
      id="landing"
      className="section-shell relative flex min-h-[100svh] w-full items-center overflow-hidden"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_90%_55%_at_50%_18%,rgba(94,234,212,0.13),transparent_70%)]"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-12 pt-24 text-center sm:pb-16 sm:pt-28 md:pb-32 md:pt-40">
        <div className="hero-enter w-full">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-accent">
            Tommy Do
          </p>
          <h1 className="font-display text-[3.25rem] font-medium leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl">
            Network Engineer
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-medium leading-relaxed text-white/90 md:text-2xl">
            Builds reliable networks and the software that operates them — bare
            metal, routing, and automation.
          </p>
          <p className="mt-4 text-sm font-medium text-text/70 md:text-base">
            OpenColo · San Jose, CA
          </p>
          <div className="mx-auto mt-9 flex max-w-sm flex-col items-stretch gap-3 sm:max-w-none sm:flex-row sm:items-center sm:justify-center sm:gap-4">
            <a
              href="#work"
              className="btn-primary btn-lg"
            >
              View work
            </a>
            <Link
              href="#contact"
              className="btn-secondary btn-lg"
            >
              Get in touch
            </Link>
          </div>
          <div className="mt-8 flex justify-center">
            <SocialMediaIcons />
          </div>
        </div>
      </div>
    </section>
  )
}

export default Landing
