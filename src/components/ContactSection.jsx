'use client'

import React from 'react'
import { Reveal } from '@/hooks/reveal'
import SocialMediaIcons from '@/components/SocialMediaIcons'
import ContactForm, { MailtoFallback } from '@/components/ContactForm'

export default function ContactSection() {
  const formId = process.env.NEXT_PUBLIC_FORM

  return (
    <section
      id="contact"
      className="section-shell relative overflow-hidden py-20 md:py-28"
    >
      <div className="relative z-10 mx-auto w-full max-w-5xl px-6 md:px-10">
        <Reveal from="up" viewport={{ once: true, amount: 0.15, margin: '0px 0px 0px 0px' }}>
          <div className="radial-copy mx-auto max-w-2xl text-center">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent text-scrim">
              Chapter · Contact
            </p>
            <h2 className="font-display text-4xl font-medium tracking-tight text-white text-scrim md:text-5xl">
              Contact me
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base font-medium text-text/90 text-scrim md:text-lg">
              Network engineering, automation, or a project idea — send a note.
            </p>
          </div>
        </Reveal>

        <Reveal
          className="mt-10 md:mt-12"
          from="up"
          delay={0.12}
          viewport={{ once: true, amount: 0.15, margin: '0px 0px 0px 0px' }}
        >
          <div className="glass-plate mx-auto max-w-xl p-6 md:p-8">
            {formId ? <ContactForm formId={formId} compact /> : <MailtoFallback />}
          </div>
        </Reveal>

        <Reveal
          className="mt-8 flex justify-center"
          from="up"
          delay={0.18}
          viewport={{ once: true, amount: 0.15, margin: '0px 0px 0px 0px' }}
        >
          <SocialMediaIcons />
        </Reveal>
      </div>
    </section>
  )
}
