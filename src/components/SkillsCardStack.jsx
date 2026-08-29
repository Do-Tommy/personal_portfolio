'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useReducedMotion } from '@/hooks/motionPrefs'

export const skillDecks = [
  {
    id: 'software',
    label: 'Software',
    accent: '#5eead4',
    blurb: 'Apps, APIs, and the edge that serves them.',
    items: [
      'Python',
      'TypeScript',
      'JavaScript',
      'SvelteKit',
      'React',
      'Next.js',
      'FastAPI',
      'Tailwind',
      'nginx',
      'Caddy',
      'Traefik',
      'Docker',
    ],
  },
  {
    id: 'network',
    label: 'Network',
    accent: '#c95c3f',
    blurb: 'Routing, overlays, and registry-grade ops.',
    items: [
      'Nokia SRL',
      'Nokia SR OS',
      'Arista',
      'Huawei',
      'BGP',
      'OSPF',
      'EVPN',
      'VXLAN',
      'RPKI',
      'Peering',
      'ARIN',
      'Geofeed',
    ],
  },
  {
    id: 'ops',
    label: 'Ops & field',
    accent: '#eee6d0',
    blurb: 'Observability, infra, and hands-on plant work.',
    items: [
      'Grafana',
      'Prometheus',
      'SNMP',
      'gNMI',
      'Proxmox',
      'Ansible',
      'Linux',
      'Fiber',
      'DWDM',
      'MySQL',
      'Postgres',
      'AI agents',
    ],
  },
]

function CardFace({ card, index, total }) {
  return (
    <div className="flex h-full flex-col p-7 md:p-9">
      <div className="flex items-baseline justify-between gap-3">
        <p
          className="text-[10px] font-medium uppercase tracking-[0.28em]"
          style={{ color: card.accent }}
        >
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </p>
        <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">{card.id}</p>
      </div>
      <h3 className="mt-4 text-3xl font-light tracking-tight text-white md:text-4xl">
        {card.label}
      </h3>
      <p className="mt-2 text-sm font-light text-white/60">{card.blurb}</p>
      <ul className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {card.items.map((skill) => (
          <li
            key={skill}
            className="rounded-lg border border-white/12 bg-black/50 px-3 py-2.5 text-sm font-light text-white/90"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}

function CardPeek({ card, index, total }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-8 text-center">
      <p
        className="text-[10px] font-medium uppercase tracking-[0.28em]"
        style={{ color: card.accent }}
      >
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </p>
      <h3 className="mt-4 text-2xl font-light tracking-tight text-white/80 md:text-3xl">
        {card.label}
      </h3>
      <p className="mt-2 text-sm font-light text-white/40">{card.blurb}</p>
    </div>
  )
}

export default function SkillsCardStack() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const dragRef = useRef({ x: 0, active: false })
  const stageRef = useRef(null)
  const n = skillDecks.length

  const go = useCallback(
    (dir) => {
      setIndex((i) => (i + dir + n) % n)
    },
    [n],
  )

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') go(1)
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const onPointerDown = (e) => {
    dragRef.current = { x: e.clientX, active: true }
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const onPointerUp = (e) => {
    if (!dragRef.current.active) return
    const dx = e.clientX - dragRef.current.x
    dragRef.current.active = false
    if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1)
  }

  const deck = skillDecks[index]
  const left = skillDecks[(index - 1 + n) % n]
  const right = skillDecks[(index + 1) % n]
  const leftIndex = (index - 1 + n) % n
  const rightIndex = (index + 1) % n

  return (
    <div className="w-full">
      <div
        ref={stageRef}
        className="relative mx-auto h-[38rem] w-full max-w-5xl touch-pan-y select-none sm:h-[40rem]"
        style={{ perspective: '1600px' }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        role="region"
        aria-roledescription="carousel"
        aria-label="Skills card stack"
      >
        <motion.button
          type="button"
          aria-label={`Show ${left.label} deck`}
          className="absolute inset-x-0 top-0 mx-auto h-[34rem] w-full max-w-3xl rounded-3xl border border-white/10 bg-[rgba(10,18,16,0.55)] shadow-xl sm:h-[36rem]"
          style={{ zIndex: 10 }}
          animate={{ x: -92, rotateZ: -11, scale: 0.86, opacity: 0.55 }}
          transition={{ type: 'spring', stiffness: 180, damping: 28 }}
          onClick={() => go(-1)}
        >
          <CardPeek card={left} index={leftIndex} total={n} />
        </motion.button>

        <motion.button
          type="button"
          aria-label={`Show ${right.label} deck`}
          className="absolute inset-x-0 top-0 mx-auto h-[34rem] w-full max-w-3xl rounded-3xl border border-white/10 bg-[rgba(10,18,16,0.55)] shadow-xl sm:h-[36rem]"
          style={{ zIndex: 10 }}
          animate={{ x: 92, rotateZ: 11, scale: 0.86, opacity: 0.55 }}
          transition={{ type: 'spring', stiffness: 180, damping: 28 }}
          onClick={() => go(1)}
        >
          <CardPeek card={right} index={rightIndex} total={n} />
        </motion.button>

        <article
          className="absolute inset-x-0 top-0 z-30 mx-auto h-[34rem] w-full max-w-3xl overflow-hidden rounded-3xl border border-white/12 bg-[rgba(10,18,16,0.94)] shadow-2xl backdrop-blur-md sm:h-[36rem]"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={deck.id}
              className="h-full"
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <CardFace card={deck} index={index} total={n} />
            </motion.div>
          </AnimatePresence>
        </article>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.22em] text-white/45">
        <button
          type="button"
          onClick={() => go(-1)}
          className="rounded-full border border-white/15 px-3 py-1.5 transition hover:border-white/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Prev
        </button>
        <span aria-live="polite">{deck.label} · drag or tap</span>
        <button
          type="button"
          onClick={() => go(1)}
          className="rounded-full border border-white/15 px-3 py-1.5 transition hover:border-white/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Next
        </button>
      </div>
    </div>
  )
}
