'use client'

import React from 'react'
import { LiquidMetalButton } from '@designcodeio/threeui/components/LiquidMetalButton'
import { useReducedMotion } from '@/hooks/motionPrefs'

export default function MetalCta({ text = 'View work', href = '#work' }) {
  const reduce = useReducedMotion()

  const go = () => {
    if (href.startsWith('#')) {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    window.location.href = href
  }

  if (reduce) {
    return (
      <a
        href={href}
        className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
      >
        {text}
      </a>
    )
  }

  return (
    <div className="h-16 w-[14rem]">
      <LiquidMetalButton
        variant="pill"
        text={text}
        embedded
        rendering="colored"
        onClick={go}
      />
    </div>
  )
}
