'use client'

import React from 'react'
import { Reveal } from '@/hooks/reveal'
import SkillsCardStack from '@/components/SkillsCardStack'

const Skills = () => {
  return (
    <div
      id="skills"
      className="section-shell relative flex items-center justify-center overflow-x-clip py-16 md:py-28"
    >
      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-10">
        <Reveal from="up">
          <div className="radial-copy mx-auto max-w-2xl px-2 py-6 text-center md:px-0 md:py-0">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent text-scrim">
              Chapter · Skills
            </p>
            <h2 className="font-display text-4xl font-medium tracking-tight text-text text-scrim md:text-5xl">
              Skills
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-base font-medium text-text/90 text-scrim md:text-lg">
              Three decks across software, network, and ops.
            </p>
          </div>
        </Reveal>

        <Reveal className="mx-auto mt-10 w-full max-w-[54rem] md:mt-14 sm:max-w-[60rem]" from="up" delay={0.14}>
          <SkillsCardStack />
        </Reveal>
      </section>
    </div>
  )
}

export default Skills
