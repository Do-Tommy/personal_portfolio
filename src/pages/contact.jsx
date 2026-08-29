'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import { Reveal } from '@/hooks/reveal'

const SectionField = dynamic(
  () => import('@/components/threeui/SectionField'),
  { ssr: false },
)

function MailtoFallback() {
  return (
    <div className="relative z-10 mx-auto mt-28 max-w-xl px-6 pb-24">
      <Reveal from="up">
        <div className="glass-plate p-6 md:p-8">
        <h1 className="text-3xl font-light tracking-tight text-text">
          Get in touch
        </h1>
        <p className="mt-2 text-sm font-light text-text/70">
          Network engineering, automation, or a project idea — send a note.
        </p>
        <a
          href="mailto:hello@tommydo.dev?subject=Portfolio%20contact"
          className="group relative mt-8 inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.02] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <span
            className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-accent/40 blur-xl"
            aria-hidden
          />
          Email hello@tommydo.dev
        </a>
        </div>
      </Reveal>
    </div>
  )
}

function ContactForm({ formId }) {
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    setError('')
    const form = e.currentTarget
    const data = new FormData(form)
    try {
      const res = await fetch(`https://formspree.io/f/${formId}`, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })
      if (res.ok) {
        setStatus('succeeded')
        form.reset()
      } else {
        const body = await res.json().catch(() => ({}))
        setError(body.error || 'Something went wrong. Try again.')
        setStatus('idle')
      }
    } catch {
      setError('Network error. Try again or use email.')
      setStatus('idle')
    }
  }

  if (status === 'succeeded') {
    return (
      <div className="relative z-10 grid min-h-[70vh] place-items-center px-6">
        <p className="max-w-md text-center text-2xl font-light text-text">
          Thanks — I will get back to you soon.
        </p>
      </div>
    )
  }

  return (
    <div className="relative z-10 mx-auto mt-28 max-w-xl px-6 pb-24">
      <Reveal from="up">
      <div className="glass-plate p-6 md:p-8">
        <h1 className="text-3xl font-light tracking-tight text-text">
          Get in touch
        </h1>
        <p className="mt-2 text-sm font-light text-text/70">
          Network engineering, automation, or a project idea — send a note.
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="name" className="text-sm font-medium text-text">
              Name
            </label>
            <input
              id="name"
              type="text"
              name="name"
              required
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2.5 text-text outline-none focus:border-accent/50"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-text">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="mt-1.5 w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2.5 text-text outline-none focus:border-accent/50"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm font-medium text-text">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              className="mt-1.5 w-full resize-none rounded-xl border border-white/15 bg-black/20 px-3 py-2.5 text-text outline-none focus:border-accent/50"
            />
          </div>
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="group relative inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition hover:scale-[1.01] disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:hover:scale-100"
          >
            <span
              className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-accent/40 blur-xl"
              aria-hidden
            />
            {status === 'submitting' ? 'Sending…' : 'Send message'}
          </button>
        </form>
      </div>
      </Reveal>
    </div>
  )
}

const Contact = () => {
  const formId = process.env.NEXT_PUBLIC_FORM
  return (
    <div className="section-shell relative min-h-[100svh] overflow-hidden">
      <SectionField kind="horizon" opacity={0.22} />
      {formId ? <ContactForm formId={formId} /> : <MailtoFallback />}
    </div>
  )
}

export default Contact
