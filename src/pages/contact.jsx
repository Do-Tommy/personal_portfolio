'use client'

import React from 'react'
import { Reveal } from '@/hooks/reveal'
import ContactForm, { MailtoFallback } from '@/components/ContactForm'

const Contact = () => {
  const formId = process.env.NEXT_PUBLIC_FORM

  return (
    <div className="section-shell relative min-h-[100svh] overflow-hidden">
      <div className="relative z-10 mx-auto mt-28 max-w-xl px-6 pb-24">
        <Reveal from="up">
          <div className="glass-plate p-6 md:p-8">
            <h1 className="font-display text-3xl font-medium tracking-tight text-text text-scrim">
              Get in touch
            </h1>
            <p className="mt-2 text-sm font-medium text-text/85 text-scrim">
              Network engineering, automation, or a project idea — send a note.
            </p>
            {formId ? <ContactForm formId={formId} /> : <MailtoFallback />}
          </div>
        </Reveal>
      </div>
    </div>
  )
}

export default Contact
