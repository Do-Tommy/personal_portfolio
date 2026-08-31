'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import SocialMediaIcons from './SocialMediaIcons'
import { Reveal } from '@/hooks/reveal'
import { useReducedMotion } from '@/hooks/motionPrefs'

const Landing = () => {
  const sectionRef = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['-6%', '22%'])

  return (
    <section
      ref={sectionRef}
      id="landing"
      className="section-shell relative flex min-h-[100svh] w-full items-start overflow-hidden md:items-center"
    >
      <motion.div
        className="pointer-events-none absolute inset-0 z-[1] md:hidden"
        style={{ y: reduce ? 0 : parallaxY }}
        aria-hidden
      >
        <div className="absolute inset-[-18%]">
          <Image
            src="/landing-parallax.jpg?v=2"
            alt=""
            fill
            priority
            quality={92}
            unoptimized
            sizes="100vw"
            className="object-cover object-[center_68%]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1210]/96 via-[#0a1210]/55 to-[#0a1210]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a1210]/45 via-transparent to-[#0a1210]/45" />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-b from-[#0a1210]/35 via-[#0a1210]/15 to-transparent" />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-gradient-to-r from-[#0a1210]/50 via-transparent to-[#0a1210]/30" />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-20 pt-28 text-center md:pb-32 md:pt-40">
        <Reveal from="up" className="w-full">
          <div className="w-full">
            <p className="landing-hero-accent mb-4 text-sm font-semibold uppercase tracking-[0.28em] text-accent">
              Tommy Do
            </p>
            <h1 className="landing-hero-outline font-display text-6xl font-medium tracking-tight text-white md:text-7xl lg:text-8xl">
              Network Engineer
            </h1>
            <p className="landing-hero-outline mx-auto mt-6 max-w-2xl text-xl font-medium leading-relaxed text-white md:text-2xl">
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
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-accent/40 bg-accent/15 px-7 py-3.5 text-sm font-medium text-accent backdrop-blur-md transition duration-150 hover:border-accent/60 hover:bg-accent/25 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Get in touch
              </Link>
            </div>
            <div className="mt-8 flex justify-center">
              <SocialMediaIcons />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export default Landing
