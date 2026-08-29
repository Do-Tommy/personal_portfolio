'use client'

import React from 'react'
import { Reveal } from '@/hooks/reveal'
import dynamic from 'next/dynamic'

const SectionField = dynamic(
  () => import('@/components/threeui/SectionField'),
  { ssr: false },
)

function About() {
  return (
    <div
      id="about"
      className="section-shell relative flex items-center justify-center overflow-hidden py-24"
    >
      <SectionField kind="horizon" opacity={0.22} />
      <section className="relative z-10 w-full max-w-5xl px-6 md:px-10">
        <Reveal from="up">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-accent">
            Chapter · About
          </p>
          <h2 className="text-4xl font-light tracking-tight text-text md:text-5xl">
            About me
          </h2>
        </Reveal>
        <Reveal from="left" delay={0.12}>
          <div className="glass-plate mt-8 space-y-6 p-6 md:p-10">
            <p className="text-lg font-light leading-relaxed tracking-wide text-text/90">
              I was born and raised in San Jose, California — Silicon Valley. I have
              been fascinated by technology my whole life. From customizing MySpace
              with HTML and CSS to scripting in games like Ragnarok Online, tinkering
              is something I have always enjoyed, and programming pushed that further.
            </p>
            <p className="text-lg font-light leading-relaxed tracking-wide text-text/90">
              Currently I spend most of my time at OpenColo as a Support Engineer. I
              work with an incredible team on bare metal hosting and data center
              colocation. We provide 2N power redundancy, N+1 cooling, and 2N
              networking so clients get reliability, availability, and speed.
              OpenColo bridges users to their machines with 24/7 support.
            </p>
            <p className="text-lg font-light leading-relaxed tracking-wide text-text/80">
              Outside the ticket queue I dig into network automation, observability
              (Grafana/Prometheus), and AI agent tooling — orchestration and prompt
              strategies that make internal tools faster to ship. On the side I build
              personal finance experiments, a matcha restock tracker, and a ticketing
              exchange for ravers.
            </p>
          </div>
        </Reveal>
      </section>
    </div>
  )
}

export default About
