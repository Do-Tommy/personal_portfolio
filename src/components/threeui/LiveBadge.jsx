'use client'

import React from 'react'
import { SparkBadge } from '@designcodeio/threeui/components/SparkBadge'
import { useReducedMotion } from '@/hooks/motionPrefs'

export default function LiveBadge() {
  const reduce = useReducedMotion()
  if (reduce) {
    return (
      <span className="rounded-full bg-emerald-400/20 px-2.5 py-0.5 text-xs font-medium text-emerald-200">
        Live
      </span>
    )
  }

  return (
    <span className="relative inline-block h-9 w-9 overflow-hidden rounded-full border border-white/15">
      <SparkBadge className="h-full w-full" sourceUrl="/spark-badge.html" />
    </span>
  )
}
