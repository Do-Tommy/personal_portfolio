import React from 'react'

// A plain labelled pill: the animated iframe badge cost ~0.5s of main-thread
// work at load for a 36px decoration and never said what it meant.
export default function LiveBadge() {
  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-400/20 px-2.5 py-0.5 text-xs font-medium text-emerald-200">
      <span className="relative flex h-2 w-2" aria-hidden>
        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75 motion-safe:animate-ping" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
      </span>
      Live
    </span>
  )
}
