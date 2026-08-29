'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
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

export default function SkillsCardStack() {
  const reduce = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
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

  const onPointerMove = (e) => {
    if (reduce || !stageRef.current) return
    const rect = stageRef.current.getBoundingClientRect()
    const nx = (e.clientX - rect.left) / rect.width - 0.5
    const ny = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: ny * -6, y: nx * 8 })
  }

  const onPointerLeave = () => setTilt({ x: 0, y: 0 })

  const deck = skillDecks[index]

  return (
    <div className="w-full">
      <div
        ref={stageRef}
        className="relative mx-auto h-[34rem] w-full max-w-2xl touch-pan-y select-none sm:h-[36rem]"
        style={{ perspective: '1400px' }}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        role="region"
        aria-roledescription="carousel"
        aria-label="Skills card stack"
      >
        {skillDecks.map((card, i) => {
          const offset = (i - index + n) % n
          const isFront = offset === 0
          const depth = offset === 0 ? 0 : offset === 1 ? 1 : 2
          const z = 30 - depth * 10
          const y = depth * 14
          const scale = 1 - depth * 0.045
          const rot = depth * -3

          return (
            <motion.article
              key={card.id}
              className="absolute inset-x-0 top-0 mx-auto h-[30rem] w-full max-w-xl overflow-hidden rounded-3xl border border-white/12 shadow-2xl sm:h-[32rem]"
              style={{
                zIndex: z,
                background: isFront
                  ? 'rgba(10, 18, 16, 0.88)'
                  : 'rgba(10, 18, 16, 0.35)',
                backdropFilter: 'blur(16px)',
                transformStyle: 'preserve-3d',
                cursor: isFront ? 'grab' : 'pointer',
                pointerEvents: isFront || depth === 1 ? 'auto' : 'none',
              }}
              animate={{
                y,
                scale,
                rotateZ: rot + (isFront && !reduce ? tilt.y * 0.12 : 0),
                rotateX: isFront && !reduce ? tilt.x : 0,
                rotateY: isFront && !reduce ? tilt.y : depth * -5,
                opacity: isFront ? 1 : depth === 1 ? 0.22 : 0,
              }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              onClick={() => {
                if (!isFront) setIndex(i)
              }}
            >
              {isFront ? (
                <div className="relative z-10 flex h-full flex-col p-7 md:p-9">
                  <div className="flex items-baseline justify-between gap-3">
                    <p
                      className="text-[10px] font-medium uppercase tracking-[0.28em]"
                      style={{ color: card.accent }}
                    >
                      {String(i + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      {card.id}
                    </p>
                  </div>
                  <h3 className="mt-4 text-3xl font-light tracking-tight text-white md:text-4xl">
                    {card.label}
                  </h3>
                  <p className="mt-2 text-sm font-light text-white/60">{card.blurb}</p>

                  <AnimatePresence mode="wait">
                    <motion.ul
                      key={card.id}
                      className="mt-6 grid flex-1 grid-cols-2 content-start gap-2.5 sm:grid-cols-3"
                      initial={reduce ? false : { opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reduce ? undefined : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {card.items.map((skill, si) => (
                        <motion.li
                          key={skill}
                          className="rounded-lg border border-white/12 bg-black/45 px-3 py-2.5 text-sm font-light text-white/90"
                          initial={reduce ? false : { opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            delay: reduce ? 0 : 0.03 * si,
                            duration: 0.35,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                        >
                          {skill}
                        </motion.li>
                      ))}
                    </motion.ul>
                  </AnimatePresence>
                </div>
              ) : null}
            </motion.article>
          )
        })}
      </div>

      <div className="mt-6 flex items-center justify-center gap-4 text-[10px] uppercase tracking-[0.22em] text-white/45">
        <button
          type="button"
          onClick={() => go(-1)}
          className="rounded-full border border-white/15 px-3 py-1.5 transition hover:border-white/35 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Prev
        </button>
        <span aria-live="polite">
          {deck.label} · drag or tap
        </span>
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
