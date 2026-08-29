'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/motionPrefs'

export const skillDecks = [
  {
    id: 'software',
    label: 'Software',
    panel: '#14201c',
    ink: '#ebf6fa',
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
    panel: '#1a1410',
    ink: '#ebf6fa',
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
    panel: '#121a18',
    ink: '#ebf6fa',
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

const STACK_ROTATIONS = [0, 3.4, -5.2]
const STACK_SCALE_STEP = 0.018
const STACK_X = [0, -4.2, 5.4]
const STACK_Y = [0, 3.2, 6.8]
const STACK_Z = ['0px', '-14cqw', '-28cqw']

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v))
}

function setShellTransform(shell, x = 0, y = 0, tiltX = 0, tiltY = 0, turn = 0) {
  const plane = shell.querySelector('.skills-drag-plane')
  if (!plane) return
  plane.style.setProperty('--drag-x', `${x.toFixed(2)}px`)
  plane.style.setProperty('--drag-y', `${y.toFixed(2)}px`)
  plane.style.setProperty('--tilt-x', `${tiltX.toFixed(2)}deg`)
  plane.style.setProperty('--tilt-y', `${tiltY.toFixed(2)}deg`)
  plane.style.setProperty('--drag-turn', `${turn.toFixed(2)}deg`)
}

function resetShellTransform(shell) {
  setShellTransform(shell)
  const plane = shell.querySelector('.skills-drag-plane')
  if (plane) {
    plane.style.opacity = ''
    plane.style.setProperty('--release-blur', '0px')
  }
  shell.classList.remove('is-dragging', 'is-tracking', 'is-releasing')
}

function CardBody({ deck, index, total }) {
  return (
    <div className="skills-artwork-body">
      <div className="relative z-10 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p
            className="text-[10px] font-semibold uppercase tracking-[0.28em] sm:text-xs"
            style={{ color: deck.accent }}
          >
            {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </p>
          <h3 className="mt-2 text-2xl font-semibold leading-tight tracking-tight text-scrim sm:text-3xl md:text-4xl">
            {deck.label}
          </h3>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-white/75 text-scrim sm:text-base md:text-lg">
            {deck.blurb}
          </p>
        </div>
        <p className="shrink-0 text-[9px] font-medium uppercase tracking-[0.18em] text-white/45 sm:text-[10px]">
          {deck.id}
        </p>
      </div>
      <ul className="relative z-10 mt-5 grid flex-1 grid-cols-2 gap-2.5 content-start sm:grid-cols-3 md:grid-cols-4 md:gap-3">
        {deck.items.map((skill) => (
          <li
            key={skill}
            className="flex items-center justify-center rounded-lg border border-white/14 bg-black/35 px-2.5 py-2 text-center text-xs font-medium text-white/90 text-scrim sm:text-sm md:px-3 md:py-2.5 md:text-[0.95rem]"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function SkillsCardStack() {
  const reduce = useReducedMotion()
  const sceneRef = useRef(null)
  const shellRefs = useRef([])
  const [order, setOrder] = useState([0, 1, 2])
  const [interacted, setInteracted] = useState(false)
  const [status, setStatus] = useState('')
  const orderRef = useRef(order)
  const transitioningRef = useRef(false)
  const activeDragRef = useRef(null)

  const topIndex = order[order.length - 1]
  const topDeck = skillDecks[topIndex]

  useEffect(() => {
    orderRef.current = order
  }, [order])

  const applyStackLayout = useCallback(() => {
    const currentOrder = orderRef.current
    const top = currentOrder[currentOrder.length - 1]

    currentOrder.forEach((cardId, index) => {
      const shell = shellRefs.current[cardId]
      if (!shell) return
      const depth = currentOrder.length - index - 1
      const isTop = cardId === top
      const artwork = shell.querySelector('.skills-artwork')

      shell.style.zIndex = String(index + 1)
      shell.style.pointerEvents = isTop ? 'auto' : 'none'
      shell.tabIndex = isTop ? 0 : -1
      shell.setAttribute('aria-hidden', isTop ? 'false' : 'true')
      shell.classList.toggle('is-active', isTop)
      shell.dataset.depth = String(depth)
      shell.style.setProperty('--stack-x', `${STACK_X[depth] ?? 0}%`)
      shell.style.setProperty('--stack-y', `${STACK_Y[depth] ?? 0}%`)
      shell.style.setProperty('--stack-z', STACK_Z[depth] ?? '0px')

      if (artwork) {
        artwork.style.setProperty('--stack-rotation', `${STACK_ROTATIONS[depth] ?? 0}deg`)
        artwork.style.setProperty('--stack-scale', String(1 - depth * STACK_SCALE_STEP))
      }

      if (!isTop) resetShellTransform(shell)
    })

    setStatus(`${skillDecks[top].label} is active`)
  }, [])

  useEffect(() => {
    applyStackLayout()
  }, [order, applyStackLayout])

  const sendToBack = useCallback(
    (cardId, vectorX = 1, vectorY = 0) => {
      if (transitioningRef.current || cardId !== orderRef.current[orderRef.current.length - 1]) return

      setInteracted(true)
      transitioningRef.current = true
      const shell = shellRefs.current[cardId]
      const scene = sceneRef.current
      if (!shell || !scene) return

      const magnitude = Math.max(1, Math.hypot(vectorX, vectorY))
      const directionX = vectorX / magnitude
      const directionY = vectorY / magnitude
      const distance = Math.max(190, scene.getBoundingClientRect().width * 0.66)
      const duration = reduce ? 0 : 180

      shell.classList.remove('is-dragging', 'is-tracking')
      shell.classList.add('is-releasing')
      setShellTransform(
        shell,
        directionX * distance,
        directionY * distance * 0.58,
        -directionY * 7,
        directionX * 8,
        directionX * 9,
      )
      const plane = shell.querySelector('.skills-drag-plane')
      if (plane) {
        plane.style.opacity = duration ? '0' : ''
        plane.style.setProperty('--release-blur', duration ? '16px' : '0px')
      }

      window.setTimeout(() => {
        setOrder((prev) => [cardId, ...prev.filter((id) => id !== cardId)])
        resetShellTransform(shell)
        transitioningRef.current = false
      }, duration)
    },
    [reduce],
  )

  const bringPreviousToFront = useCallback(() => {
    if (transitioningRef.current) return

    setInteracted(true)
    transitioningRef.current = true
    const current = orderRef.current
    const outgoingId = current[current.length - 1]
    const incomingId = current[0]
    const outgoing = shellRefs.current[outgoingId]
    const incoming = shellRefs.current[incomingId]
    const scene = sceneRef.current
    if (!outgoing || !incoming || !scene) return

    const distance = Math.max(190, scene.getBoundingClientRect().width * 0.66)
    const duration = reduce ? 0 : 360

    setShellTransform(incoming, -distance, 0, 0, -6, -8)
    const incomingPlane = incoming.querySelector('.skills-drag-plane')
    if (incomingPlane) incomingPlane.style.opacity = duration ? '0.12' : ''

    setOrder([...current.slice(1), incomingId])

    window.setTimeout(() => {
      resetShellTransform(incoming)
      if (incomingPlane) incomingPlane.style.opacity = ''
      transitioningRef.current = false
    }, duration || 1)
  }, [reduce])

  const getDragCommitThreshold = () => {
    const scene = sceneRef.current
    if (!scene) return 64
    return clamp(scene.getBoundingClientRect().width * 0.18, 52, 88)
  }

  const onPointerDown = (cardId) => (event) => {
    if (
      cardId !== orderRef.current[orderRef.current.length - 1] ||
      transitioningRef.current ||
      (event.button !== undefined && event.button !== 0)
    ) {
      return
    }

    const shell = shellRefs.current[cardId]
    if (!shell) return

    activeDragRef.current = {
      cardId,
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      committedDirection: 0,
      traveled: 0,
    }
    shell.classList.remove('is-tracking')
    shell.classList.add('is-dragging')
    shell.focus({ preventScroll: true })

    try {
      shell.setPointerCapture?.(event.pointerId)
    } catch {
      activeDragRef.current = null
    }
    event.preventDefault()
  }

  const onPointerMove = (cardId) => (event) => {
    const drag = activeDragRef.current
    if (!drag || drag.cardId !== cardId || event.pointerId !== drag.pointerId) return

    const shell = shellRefs.current[cardId]
    const scene = sceneRef.current
    if (!shell || !scene) return

    const x = event.clientX - drag.startX
    const y = event.clientY - drag.startY
    const width = Math.max(1, scene.getBoundingClientRect().width)
    const turn = clamp((x / width) * 11, -12, 12)
    const threshold = getDragCommitThreshold()
    const hasHorizontalIntent = Math.abs(x) >= Math.abs(y) * 0.75
    const committedDirection =
      Math.abs(x) >= threshold && hasHorizontalIntent ? Math.sign(x) : 0

    drag.traveled = Math.max(drag.traveled, Math.hypot(x, y))
    if (committedDirection) drag.committedDirection = committedDirection

    setShellTransform(
      shell,
      x,
      y,
      clamp((-y / width) * 6, -6, 6),
      clamp((x / width) * 7, -7, 7),
      turn,
    )
    setInteracted(true)
    event.preventDefault()
  }

  const onPointerUp = (cardId) => (event) => {
    const drag = activeDragRef.current
    if (!drag || drag.cardId !== cardId || event.pointerId !== drag.pointerId) return

    const shell = shellRefs.current[cardId]
    activeDragRef.current = null
    if (!shell) return

    shell.classList.remove('is-dragging')

    const x = event.clientX - drag.startX
    const y = event.clientY - drag.startY
    const threshold = getDragCommitThreshold()
    const direction =
      drag.committedDirection ||
      (Math.abs(x) >= threshold && Math.abs(x) >= Math.abs(y) * 0.75 ? Math.sign(x) : 0)

    if (direction < 0) {
      sendToBack(cardId, -1, y * 0.01)
      return
    }

    if (direction > 0) {
      sendToBack(cardId, 1, y * 0.01)
      return
    }

    if (drag.traveled < 14) {
      sendToBack(cardId, 1, 0)
      return
    }

    shell.classList.add('is-releasing')
    setShellTransform(shell)
    window.setTimeout(() => shell.classList.remove('is-releasing'), 180)
  }

  const onScenePointerMove = useCallback(
    (event) => {
      if (reduce || activeDragRef.current || transitioningRef.current) return
      const scene = sceneRef.current
      const topId = orderRef.current[orderRef.current.length - 1]
      const shell = shellRefs.current[topId]
      if (!scene || !shell) return

      const rect = scene.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width
      const y = (event.clientY - rect.top) / rect.height
      const isNear = x > -0.22 && x < 1.22 && y > -0.18 && y < 1.18

      if (!isNear) {
        shell.classList.remove('is-tracking')
        setShellTransform(shell)
        return
      }

      const tiltX = clamp((0.5 - y) * 10, -4.75, 4.75)
      const tiltY = clamp((x - 0.5) * 10, -4.75, 4.75)
      shell.classList.add('is-tracking')
      setShellTransform(shell, 0, 0, tiltX, tiltY, 0)
    },
    [reduce],
  )

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        sendToBack(orderRef.current[orderRef.current.length - 1], 1, 0)
      }
      if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        bringPreviousToFront()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [bringPreviousToFront, sendToBack])

  return (
    <div className="w-full">
      <div
        ref={sceneRef}
        className="skills-stack-scene"
        data-interacted={interacted ? 'true' : 'false'}
        onPointerMove={onScenePointerMove}
        role="group"
        aria-label="Drag left for the next card or right for the previous card. Tap for next."
      >
        <div className="skills-stack">
          {skillDecks.map((deck, cardId) => (
            <div
              key={deck.id}
              ref={(el) => {
                shellRefs.current[cardId] = el
              }}
              className="skills-stack-shell"
              data-card-id={cardId}
              data-name={deck.label}
              role="button"
              aria-label={`${deck.label}. Drag left for next or right for previous.`}
              onPointerDown={onPointerDown(cardId)}
              onPointerMove={onPointerMove(cardId)}
              onPointerUp={onPointerUp(cardId)}
              onPointerCancel={onPointerUp(cardId)}
            >
              <div className="skills-drag-plane">
                <article
                  className="skills-artwork"
                  style={{
                    '--panel': deck.panel,
                    '--ink': deck.ink,
                    '--accent-card': deck.accent,
                  }}
                >
                  <CardBody deck={deck} index={cardId} total={skillDecks.length} />
                </article>
              </div>
            </div>
          ))}
        </div>
      </div>

      <p className="skills-stack-hint" aria-hidden={interacted}>
        ← drag next · tap next · drag previous →
      </p>
      <p className="skills-stack-status" aria-live="polite">
        {status || `${topDeck.label} · swipe or tap`}
      </p>
    </div>
  )
}
