'use client'

import React from 'react'
import Image from 'next/image'
import { Reveal } from '@/hooks/reveal'

function About() {
  return (
    <div
      id="about"
      className="section-shell relative overflow-hidden py-16 md:py-24"
    >
      <section className="relative z-10 w-full">
        <div className="grid min-h-[32rem] md:min-h-[36rem] lg:grid-cols-2 lg:gap-0">
          <Reveal from="left" delay={0.1} className="relative min-h-[22rem] lg:min-h-full">
            <div className="relative h-full min-h-[22rem] w-full lg:min-h-[36rem]">
              <Image
                width={900}
                height={1100}
                alt="Tommy Do"
                className="h-full w-full object-cover object-[center_20%]"
                src="/DSC00639.jpg"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1210]/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0a1210]/30" />
              <p className="absolute bottom-4 left-6 text-[10px] uppercase tracking-[0.22em] text-white/60">
                Field note · San Jose
              </p>
            </div>
          </Reveal>

          <Reveal from="right" delay={0.18} className="flex flex-col justify-center">
            <div className="px-6 py-10 md:px-10 md:py-14 lg:px-14 lg:py-16">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-accent">
                Chapter · About
              </p>
              <h2 className="text-4xl font-light tracking-tight text-text md:text-5xl">
                About me
              </h2>

              <div className="mt-8 space-y-6">
                <p className="text-lg font-light leading-relaxed tracking-wide text-text/90 md:text-xl">
                  I was born and raised in San Jose, California — Silicon Valley. I have
                  been fascinated by technology my whole life. From customizing MySpace
                  with HTML and CSS to scripting in games like Ragnarok Online, tinkering
                  is something I have always enjoyed, and programming pushed that further.
                </p>
                <p className="text-lg font-light leading-relaxed tracking-wide text-text/90 md:text-xl">
                  Currently I spend most of my time at OpenColo as a Support Engineer. I
                  work with an incredible team on bare metal hosting and data center
                  colocation. We provide 2N power redundancy, N+1 cooling, and 2N
                  networking so clients get reliability, availability, and speed.
                  OpenColo bridges users to their machines with 24/7 support.
                </p>
                <p className="text-lg font-light leading-relaxed tracking-wide text-text/75 md:text-xl">
                  Outside the ticket queue I dig into network automation, observability
                  (Grafana/Prometheus), and AI agent tooling — orchestration and prompt
                  strategies that make internal tools faster to ship. On the side I build
                  personal finance experiments, a matcha restock tracker, and a ticketing
                  exchange for ravers.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

export default About
