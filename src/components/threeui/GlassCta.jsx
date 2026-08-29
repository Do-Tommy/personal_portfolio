'use client'

import React from 'react'
import { GlassmorphismCta } from '@designcodeio/threeui/components/GlassmorphismCta'
import { useReducedMotion } from '@/hooks/motionPrefs'
import Link from 'next/link'

export default function GlassCta() {
  const reduce = useReducedMotion()
  if (reduce) {
    return (
      <Link
        href="/contact"
        className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-medium text-text"
      >
        Get in touch
      </Link>
    )
  }

  return (
    <Link href="/contact" className="block h-28 w-full max-w-sm overflow-hidden rounded-2xl">
      <GlassmorphismCta mode="dark" hue={150} className="h-full w-full" />
    </Link>
  )
}
