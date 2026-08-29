'use client'

import React from 'react'
import { Reveal } from '@/hooks/reveal'
import dynamic from 'next/dynamic'
import SkillsCardStack from '@/components/SkillsCardStack'

const SectionField = dynamic(
  () => import('@/components/threeui/SectionField'),
  { ssr: false },
)

const Skills = () => {
  return (
    <div
      id="skills"
      className="section-shell relative flex items-center justify-center overflow-hidden py-24"
    >
      <SectionField kind="topo" opacity={0.18} />
      <section className="relative z-10 w-full max-w-4xl px-6 md:px-10">
        <Reveal from="up">
          <p className="mb-3 text-center text-[10px] font-medium uppercase tracking-[0.28em] text-accent">
            Chapter · Skills
          </p>
          <h2 className="text-center text-4xl font-light tracking-tight text-text md:text-5xl">
            Skills
          </h2>
          <p className="mx-auto mt-3 max-w-md text-center text-lg font-light text-text/70">
            Three decks — software, network, and ops. Drag or tap the stack to
            move through them.
          </p>
        </Reveal>

        <Reveal className="mt-12" from="up" delay={0.14}>
          <SkillsCardStack />
        </Reveal>
      </section>
    </div>
  )
}

export default Skills
