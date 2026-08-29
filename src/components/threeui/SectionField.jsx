'use client'

import dynamic from 'next/dynamic'
import React, { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/motionPrefs'

const LivingWorld = dynamic(
  () =>
    import('@designcodeio/threeui/components/SylvaLivingWorldScene').then(
      (m) => ({ default: m.SylvaLivingWorldScene }),
    ),
  { ssr: false },
)

const EmeraldHorizon = dynamic(
  () =>
    import('@designcodeio/threeui/components/EmeraldHorizonBackground').then(
      (m) => ({ default: m.EmeraldHorizonBackground }),
    ),
  { ssr: false },
)

const ParticleDrift = dynamic(
  () =>
    import('@designcodeio/threeui/components/ParticleDrift').then((m) => ({
      default: m.ParticleDrift,
    })),
  { ssr: false },
)

const FlowField = dynamic(
  () =>
    import('@designcodeio/threeui/components/FlowField').then((m) => ({
      default: m.FlowField,
    })),
  { ssr: false },
)

const TopologyField = dynamic(
  () =>
    import('@designcodeio/threeui/components/TopologyField').then((m) => ({
      default: m.TopologyField,
    })),
  { ssr: false },
)

const FluidField = dynamic(
  () =>
    import('@designcodeio/threeui/components/FluidFieldBackground').then(
      (m) => ({ default: m.FluidFieldBackground }),
    ),
  { ssr: false },
)

const ExpanseField = dynamic(
  () =>
    import('@designcodeio/threeui/components/ExpanseField').then((m) => ({
      default: m.ExpanseField,
    })),
  { ssr: false },
)

const SCENE = {
  living: LivingWorld,
  horizon: EmeraldHorizon,
  drift: ParticleDrift,
  flow: FlowField,
  topo: TopologyField,
  fluid: FluidField,
  expanse: ExpanseField,
}

const SCENE_PROPS = {
  living: {},
  horizon: {
    speed: 0.55,
    waveScale: 1.05,
    variation: 0.9,
    glow: 1.05,
    vignette: 0.95,
    hue: -6,
  },
  drift: { mode: 'dark', hue: 118, opacity: 0.9, speed: 0.7, density: 0.85 },
  flow: { mode: 'dark', hue: 122, speed: 0.65, density: 0.8 },
  topo: { mode: 'dark', hue: 128 },
  fluid: { mode: 'dark', hue: 126, saturation: 0.85, brightness: 0.9 },
  expanse: { mode: 'dark', hue: 120, saturation: 0.8, brightness: 0.85 },
}

function StaticWash() {
  return (
    <div
      className="absolute inset-0 bg-gradient-to-b from-emerald-950/80 via-[#0a1210] to-black"
      aria-hidden
    />
  )
}

/**
 * One ambient WebGL field per section. Mounts only while in view so
 * neighboring scenes do not fight for the GPU.
 */
export default function SectionField({
  kind = 'drift',
  opacity = 0.5,
  wash = 'section',
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [visible, setVisible] = useState(true)
  const Scene = SCENE[kind] || ParticleDrift
  const sceneProps = SCENE_PROPS[kind] || SCENE_PROPS.drift

  useEffect(() => {
    const host = ref.current?.parentElement
    if (!host) return
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.08, rootMargin: '12% 0px' },
    )
    io.observe(host)
    return () => io.disconnect()
  }, [])

  if (reduce) {
    return <StaticWash />
  }

  return (
    <div
      ref={ref}
      className="shader-frame pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden
    >
      {visible ? (
        <div className="absolute inset-0" style={{ opacity }}>
          <Scene className="h-full w-full" {...sceneProps} />
        </div>
      ) : (
        <StaticWash />
      )}
      {wash === 'hero' ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0a1210]/80 via-[#0a1210]/28 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1210]/40 via-transparent to-[#0a1210]/90" />
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[#0a1210]/18" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0a1210]/85 via-transparent to-[#0a1210]/90" />
        </>
      )}
    </div>
  )
}
