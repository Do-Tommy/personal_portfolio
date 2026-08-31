'use client'

import React, { useState } from 'react'

const inputClass =
  'mt-1.5 w-full rounded-xl border border-white/15 bg-black/20 px-3 py-2.5 text-text placeholder:text-text/50 outline-none focus:border-accent/50'

export function MailtoFallback({ compact = false }) {
  return (
  <div className={compact ? '' : 'mt-8'}>
    <a
      href="mailto:hello@tommydo.dev?subject=Portfolio%20contact"
      className="group relative inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.01] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:hover:scale-100"
    >
      <span
        className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-accent/40 blur-xl"
        aria-hidden
      />
      Email hello@tommydo.dev
    </a>
  </div>
  )
}

export default function ContactForm({ formId, compact = false }) {
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
      <p className="py-6 text-center text-lg font-medium text-text text-scrim">
        Thanks — I will get back to you soon.
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} className={compact ? 'space-y-4' : 'mt-8 space-y-5'}>
      <div>
        <label htmlFor="contact-name" className="text-sm font-medium text-text text-scrim">
          Name
        </label>
        <input id="contact-name" type="text" name="name" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="contact-email" className="text-sm font-medium text-text text-scrim">
          Email
        </label>
        <input id="contact-email" type="email" name="email" required className={inputClass} />
      </div>
      <div>
        <label htmlFor="contact-message" className="text-sm font-medium text-text text-scrim">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={compact ? 4 : 5}
          required
          className={`${inputClass} resize-none`}
        />
      </div>
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="group relative inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:scale-[1.01] disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent motion-reduce:hover:scale-100"
      >
        <span
          className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-accent/40 blur-xl"
          aria-hidden
        />
        {status === 'submitting' ? 'Sending…' : 'Send message'}
      </button>
    </form>
  )
}
