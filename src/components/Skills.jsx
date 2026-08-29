'use client'

import React from 'react'
import { Reveal } from '@/hooks/reveal'
import SkillsCardStack from '@/components/SkillsCardStack'

const Skills = () => {
  return (
    <div
      id="skills"
      className="section-shell relative flex items-center justify-center overflow-visible py-20 md:py-28"
    >
      <section className="relative z-10 w-full max-w-6xl px-6 md:px-10">
        <Reveal from="up">
          <p className="mb-3 text-center text-[10px] font-medium uppercase tracking-[0.28em] text-accent">
            Chapter · Skills
          </p>
          <h2 className="text-center text-4xl font-light tracking-tight text-text md:text-5xl">
            Skills
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-center text-lg font-light text-text/70">
            Three decks — software, network, and ops. Drag or tap the stack to
            move through them.
          </p>
        </Reveal>

        <Reveal className="mt-14" from="up" delay={0.14}>
          <SkillsCardStack />
        </Reveal>
      </section>
    </div>
  )
}

export default Skills
