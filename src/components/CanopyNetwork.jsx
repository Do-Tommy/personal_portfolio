'use client'

import React, { useEffect, useRef } from 'react'
import { useReducedMotion } from '@/hooks/motionPrefs'

function mulberry32(seed) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

function easeOut(t) {
  return 1 - (1 - t) ** 3
}

function dist2(ax, ay, bx, by) {
  const dx = ax - bx
  const dy = ay - by
  return dx * dx + dy * dy
}

const PALETTE = [
  { r: 168, g: 118, b: 58 },
  { r: 186, g: 136, b: 70 },
  { r: 198, g: 158, b: 86 },
  { r: 168, g: 186, b: 98 },
  { r: 184, g: 208, b: 118 },
  { r: 206, g: 228, b: 148 },
]

function colorForDepth(depth, maxDepth, hueShift) {
  const t = depth / Math.max(1, maxDepth)
  const idx = t * (PALETTE.length - 1)
  const i0 = Math.floor(idx)
  const i1 = Math.min(PALETTE.length - 1, i0 + 1)
  const f = idx - i0
  let r = lerp(PALETTE[i0].r, PALETTE[i1].r, f)
  let g = lerp(PALETTE[i0].g, PALETTE[i1].g, f)
  let b = lerp(PALETTE[i0].b, PALETTE[i1].b, f)
  const strength = t * t * 22
  r += hueShift * strength
  g += hueShift * strength * -0.45
  return { r, g, b }
}

function getSwayAngle(branch, time, wind, shake) {
  let total = 0
  let b = branch
  let depth = 0
  while (b && depth < 18) {
    const a = b.swayAmp
    total += Math.sin(time * 0.00052 + b.swayPhase) * a
    total += Math.sin(time * 0.00031 + b.swayPhase * 1.7) * a * 0.6
    total += Math.sin(time * 0.00012 + b.swayPhase * 0.4) * a * 0.35
    depth += 1
    b = b.parent
  }
  total += wind * 0.034 * Math.min(depth, 12)
  if (shake > 0.01) {
    total += Math.sin(time * 0.016 + branch.swayPhase * 3) * shake * 0.055 * depth
  }
  return total
}

function getBranchEnd(branch, progress, time, wind, shake) {
  const sway = getSwayAngle(branch, time, wind, shake)
  const angle = branch.angle + sway
  const len = branch.length * progress
  const perpX = -Math.sin(angle)
  const perpY = Math.cos(angle)
  const curveOff = branch.curvature * len
  return {
    x: branch.x0 + Math.cos(angle) * len + perpX * curveOff,
    y: branch.y0 + Math.sin(angle) * len + perpY * curveOff,
    angle,
  }
}

function spawnChildren(parent, rng, maxDepth, branches, leaves) {
  if (parent.depth >= maxDepth) {
    const tip = getBranchEnd(parent, 1, 0, 0, 0)
    leaves.push({
      x: tip.x,
      y: tip.y,
      angle: parent.angle,
      size: 8 + rng() * 12,
      phase: rng() * Math.PI * 2,
      tint: rng(),
      branch: parent,
    })
    return
  }

  let count = parent.depth < 2 ? 2 + (rng() < 0.4 ? 1 : 0) : rng() < 0.28 ? 3 : 2
  const prune = parent.depth <= 3 ? 0 : parent.depth <= 5 ? 0.12 : 0.28
  if (rng() < prune) count = Math.max(1, count - 1)
  const spread = parent.depth < 2 ? 0.32 + rng() * 0.16 : 0.38 + rng() * 0.22

  for (let i = 0; i < count; i += 1) {
    let angleOffset
    if (count === 1) angleOffset = (rng() - 0.5) * 0.4
    else if (count === 2) angleOffset = (i === 0 ? -1 : 1) * (0.18 + rng() * (spread - 0.18))
    else angleOffset = (i - 1) * spread + (rng() - 0.5) * 0.16

    const child = {
      parent,
      x0: 0,
      y0: 0,
      angle: parent.angle + angleOffset,
      length: parent.length * (0.58 + rng() * 0.16),
      thickness: Math.max(0.55, parent.thickness * (0.48 + rng() * 0.18)),
      depth: parent.depth + 1,
      delay: parent.delay + 0.05 + parent.depth * 0.02,
      swayPhase: rng() * Math.PI * 2,
      swayAmp: 0.0017 * (parent.depth + 1) * (0.7 + rng() * 0.6),
      curvature: (rng() - 0.5) * 0.08 * (1 + parent.depth * 0.12),
      colorShift: (rng() - 0.5) * 24,
      hueShift: Math.max(-1, Math.min(1, parent.hueShift + (rng() - 0.5) * 0.7)),
      strokeSeeds: [rng() * 2 - 1, rng() * 2 - 1, rng() * 2 - 1, rng() * 2 - 1, rng() * 2 - 1],
      maxDepth,
    }
    branches.push(child)
    spawnChildren(child, rng, maxDepth, branches, leaves)
  }
}

function plantTree(branches, leaves, rng, spec) {
  const trunk = {
    parent: null,
    x0: spec.x,
    y0: spec.y,
    rootX: spec.x,
    rootY: spec.y,
    angle: -Math.PI / 2 + spec.lean,
    length: spec.len,
    thickness: spec.thick,
    depth: 0,
    delay: spec.delay,
    swayPhase: rng() * Math.PI * 2,
    swayAmp: 0.0008,
    curvature: (rng() - 0.5) * 0.03,
    colorShift: (rng() - 0.5) * 16,
    hueShift: 0,
    strokeSeeds: [rng() * 2 - 1, rng() * 2 - 1, rng() * 2 - 1, rng() * 2 - 1, rng() * 2 - 1],
    maxDepth: spec.depth,
  }
  branches.push(trunk)
  spawnChildren(trunk, rng, spec.depth, branches, leaves)
  return trunk
}

function buildForest(w, heroH, pageH) {
  const rng = mulberry32(17)
  const branches = []
  const leaves = []
  const trees = []
  const isNarrow = w < 720
  const heroSpecs = isNarrow
    ? [{ x: w * 0.82, y: heroH * 0.99, lean: 0.1, len: heroH * 0.52, thick: 28, depth: 7, delay: 0 }]
    : [
        { x: w * 0.08, y: heroH * 0.99, lean: -0.12, len: heroH * 0.62, thick: 34, depth: 8, delay: 0.08 },
        { x: w * 0.92, y: heroH * 0.99, lean: 0.12, len: heroH * 0.6, thick: 32, depth: 8, delay: 0 },
      ]

  heroSpecs.forEach((spec) => {
    trees.push(plantTree(branches, leaves, rng, spec))
  })

  const ids = ['about', 'work', 'skills', 'projects', 'footer']
  ids.forEach((id, i) => {
    const el = document.getElementById(id)
    if (!el) return
    const y = el.getBoundingClientRect().top + window.scrollY + el.offsetHeight * 0.92
    const left = i % 2 === 0
    const spec = {
      x: w * (isNarrow ? (left ? 0.08 : 0.92) : left ? 0.06 : 0.94),
      y: Math.min(pageH - 24, y),
      lean: left ? 0.22 : -0.22,
      len: heroH * (isNarrow ? 0.32 : 0.4),
      thick: isNarrow ? 16 : 22,
      depth: isNarrow ? 6 : 7,
      delay: 0.1 + i * 0.04,
    }
    trees.push(plantTree(branches, leaves, rng, spec))
  })

  return { branches, leaves, trees }
}

function sectionBoxes() {
  return ['about', 'work', 'skills', 'projects', 'footer']
    .map((id) => {
      const el = document.getElementById(id)
      if (!el) return null
      const r = el.getBoundingClientRect()
      const top = r.top + window.scrollY
      return {
        id,
        top,
        bottom: top + r.height,
        left: r.left,
        right: r.right,
        width: r.width,
      }
    })
    .filter(Boolean)
}

function pull(mx, my, x, y, radius, strength) {
  const d2 = dist2(mx, my, x, y)
  const r2 = radius * radius
  if (d2 > r2 || d2 < 1) return { x: 0, y: 0, t: 0 }
  const d = Math.sqrt(d2)
  const t = (1 - d / radius) ** 2
  return {
    x: ((mx - x) / d) * t * strength,
    y: ((my - y) / d) * t * strength,
    t,
  }
}

export default function CanopyNetwork() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    if (!canvas || !wrap) return undefined
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return undefined

    let forest = null
    let heroH = window.innerHeight
    let pageW = window.innerWidth
    let raf = 0
    let running = true
    const mouse = {
      x: pageW * 0.7,
      y: heroH * 0.4,
      tx: pageW * 0.7,
      ty: heroH * 0.4,
    }
    let shake = 0
    const started = performance.now()
    const fallers = []
    const landed = []
    let spawnAcc = 0
    const rng = mulberry32(29)
    let lastPageH = 0

    const resize = () => {
      const dpr = Math.min(1.5, window.devicePixelRatio || 1)
      const width = window.innerWidth
      const height = window.innerHeight
      pageW = width
      const landing = document.getElementById('landing')
      heroH = landing ? landing.offsetHeight : height
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const pageH = Math.max(document.documentElement.scrollHeight, height)
      if (!forest || Math.abs(pageH - lastPageH) > 120 || width !== forest._w) {
        forest = buildForest(width, heroH, pageH)
        forest._w = width
        lastPageH = pageH
        landed.length = 0
        seedSections()
      }
    }

    const toDoc = (clientX, clientY) => ({
      x: clientX,
      y: clientY + window.scrollY,
    })

    const onMove = (e) => {
      const p = toDoc(e.clientX, e.clientY)
      mouse.tx = p.x
      mouse.ty = p.y
    }

    const interactive = (el) =>
      el?.closest?.('a, button, input, textarea, select, [role="button"], [role="region"]')

    const burstFrom = (docX, docY) => {
      if (!forest || reduce) return
      const pool = forest.leaves
      const n = Math.min(28, pool.length)
      for (let i = 0; i < n; i += 1) {
        const src = pool[(rng() * pool.length) | 0]
        const end = getBranchEnd(src.branch, 1, performance.now(), 0, shake)
        fallers.push({
          x: end.x + (rng() - 0.5) * 28,
          y: end.y + (rng() - 0.5) * 16,
          vx: (rng() - 0.5) * 2.4 + (docX - src.x) * 0.003,
          vy: 0.3 + rng() * 1.2,
          rot: rng() * Math.PI * 2,
          rv: (rng() - 0.5) * 0.14,
          size: 7 + rng() * 12,
          tint: rng(),
          phase: rng() * 6,
        })
      }
      shake = 1
    }

    const onDown = (e) => {
      if (interactive(e.target)) return
      const p = toDoc(e.clientX, e.clientY)
      burstFrom(p.x, p.y)
    }

    const spawnFaller = (src, extraVy = 0) => {
      if (fallers.length > 168) return
      fallers.push({
        x: src.x,
        y: src.y,
        vx: (rng() - 0.5) * 0.9,
        vy: 0.4 + rng() * 0.85 + extraVy,
        rot: src.angle || 0,
        rv: (rng() - 0.5) * 0.1,
        size: src.size * (0.65 + rng() * 0.5),
        tint: src.tint,
        phase: src.phase,
      })
    }

    const tryLand = (f) => {
      const boxes = sectionBoxes()
      const hit = boxes.find((b) => f.y > b.top + 40 && f.y < b.bottom - 40)
      if (!hit) return false
      if (landed.length > 160) landed.shift()
      const pad = 36
      landed.push({
        x: Math.max(hit.left + pad, Math.min(hit.right - pad, f.x)),
        y: f.y,
        size: Math.max(8, f.size),
        tint: f.tint,
        phase: f.phase,
        pulse: rng() * Math.PI * 2,
      })
      return true
    }

    const seedSections = () => {
      if (landed.length) return
      sectionBoxes().forEach((hit) => {
        const pad = 40
        const n = hit.id === 'skills' ? 22 : 16
        for (let i = 0; i < n; i += 1) {
          landed.push({
            x: hit.left + pad + rng() * Math.max(40, hit.width - pad * 2),
            y: hit.top + 70 + rng() * Math.max(60, hit.bottom - hit.top - 140),
            size: 7 + rng() * 9,
            tint: rng(),
            phase: rng() * Math.PI * 2,
            pulse: rng() * Math.PI * 2,
          })
        }
      })
    }

    const drawLeaf = (x, y, rot, size, tint, alpha) => {
      ctx.save()
      ctx.translate(x, y)
      ctx.rotate(rot)
      ctx.fillStyle = `rgba(${110 + tint * 55}, ${158 + tint * 50}, ${96}, ${alpha})`
      ctx.beginPath()
      ctx.ellipse(0, 0, size, size * 0.4, 0, 0, Math.PI * 2)
      ctx.fill()
      ctx.strokeStyle = `rgba(40, 70, 36, ${alpha * 0.35})`
      ctx.lineWidth = 0.6
      ctx.beginPath()
      ctx.moveTo(-size * 0.15, 0)
      ctx.lineTo(size * 0.85, 0)
      ctx.stroke()
      ctx.restore()
    }

    const drawBranch = (b, time, wind, grow) => {
      const local = Math.max(0, Math.min(1, (grow - b.delay) / 0.42))
      if (local <= 0) return
      const progress = easeOut(local)
      const sway = getSwayAngle(b, time, wind, shake)
      const angle = b.angle + sway
      const len = b.length * progress
      const x1 = b.x0
      const y1 = b.y0 - window.scrollY
      const perpX = -Math.sin(angle)
      const perpY = Math.cos(angle)
      const curveOff = b.curvature * len * 1.4
      const cpx1 = x1 + Math.cos(angle) * len * 0.33 + perpX * curveOff * 0.4
      const cpy1 = y1 + Math.sin(angle) * len * 0.33 + perpY * curveOff * 0.4
      const cpx2 = x1 + Math.cos(angle) * len * 0.66 + perpX * curveOff * 0.85
      const cpy2 = y1 + Math.sin(angle) * len * 0.66 + perpY * curveOff * 0.85
      const x2 = x1 + Math.cos(angle) * len + perpX * curveOff * 0.7
      const y2 = y1 + Math.sin(angle) * len + perpY * curveOff * 0.7
      const h = window.innerHeight
      if (y1 < -140 && y2 < -140) return
      if (y1 > h + 140 && y2 > h + 140) return

      const col = colorForDepth(b.depth, b.maxDepth, b.hueShift)
      const depthT = b.depth / Math.max(1, b.maxDepth)
      const baseAlpha =
        b.depth <= 1 ? 0.96 : b.depth <= 5 ? lerp(0.92, 0.72, depthT) : lerp(0.7, 0.38, (depthT - 0.5) * 2)
      const strokeCount = b.depth < 3 ? 5 : b.depth < 6 ? 3 : 2
      const thickBase = b.thickness
      const thickTaper = lerp(thickBase, thickBase * 0.55, progress)

      if (b.depth < 3) {
        ctx.beginPath()
        ctx.moveTo(x1, y1)
        ctx.bezierCurveTo(cpx1, cpy1, cpx2, cpy2, x2, y2)
        ctx.strokeStyle = `rgba(210, 170, 90, ${0.16 + (1 - depthT) * 0.12})`
        ctx.lineWidth = thickTaper * 2.4
        ctx.stroke()
      }

      for (let s = 0; s < strokeCount; s += 1) {
        const seed = b.strokeSeeds[s] || 0
        const normalizedS = strokeCount > 1 ? s / (strokeCount - 1) - 0.5 : 0
        const offsetAmt = normalizedS * thickBase * 0.35 + seed * thickBase * 0.08
        const ox = perpX * offsetAmt
        const oy = perpY * offsetAmt
        const shift = normalizedS * 22 + b.colorShift * 0.3
        const r = Math.max(0, Math.min(255, col.r + shift))
        const g = Math.max(0, Math.min(255, col.g + shift * 0.65))
        const bb = Math.max(0, Math.min(255, col.b + shift * 0.4))
        const isCore = s === Math.floor(strokeCount / 2)
        const alpha = baseAlpha * (isCore ? 1 : 0.5)
        const thick = thickTaper * (isCore ? 1 : lerp(0.65, 0.45, Math.abs(normalizedS)))
        ctx.beginPath()
        ctx.moveTo(x1 + ox, y1 + oy)
        ctx.bezierCurveTo(cpx1 + ox, cpy1 + oy, cpx2 + ox, cpy2 + oy, x2 + ox, y2 + oy)
        ctx.strokeStyle = `rgba(${r | 0}, ${g | 0}, ${bb | 0}, ${alpha})`
        ctx.lineWidth = thick
        ctx.stroke()
      }

      if (b.depth < 2 && progress > 0.55) {
        ctx.strokeStyle = `rgba(92, 62, 28, ${0.28 + (1 - depthT) * 0.18})`
        ctx.lineWidth = 1.4
        for (let i = 2; i < 11; i += 1) {
          const t = i / 12
          const bx = lerp(x1, x2, t)
          const by = lerp(y1, y2, t)
          const mark = 3 + b.thickness * 0.12
          ctx.beginPath()
          ctx.moveTo(bx + perpX * mark, by + perpY * mark)
          ctx.lineTo(bx - perpX * mark * 0.4, by - perpY * mark * 0.4)
          ctx.stroke()
        }
      }
    }

    const draw = (now) => {
      if (!running) return
      const width = window.innerWidth
      const height = window.innerHeight
      const scrollY = window.scrollY
      if (!forest) resize()
      const { branches, leaves, trees } = forest
      const elapsed = (now - started) / 1000
      const grow = reduce ? 1 : easeOut(Math.min(1, elapsed * 0.3))
      const dt = 0.016

      mouse.x += (mouse.tx - mouse.x) * 0.12
      mouse.y += (mouse.ty - mouse.y) * 0.12
      shake *= 0.94
      if (shake < 0.01) shake = 0

      ctx.clearRect(0, 0, width, height)
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'

      const mx = mouse.x
      const my = mouse.y

      trees.forEach((root) => {
        const dist = Math.abs(mx - root.rootX)
        const prox = Math.max(0, 1 - dist / (pageW * 0.55))
        root._wind = Math.max(-1, Math.min(1, (mx - root.rootX) / (pageW * 0.45))) * (0.35 + prox * 0.65)
      })

      branches.forEach((b) => {
        if (b.parent) {
          const root = (() => {
            let n = b
            while (n.parent) n = n.parent
            return n
          })()
          const pe = getBranchEnd(b.parent, 1, now, root._wind || 0, shake)
          b.x0 = pe.x
          b.y0 = pe.y
        }
      })

      branches.forEach((b) => {
        let n = b
        while (n.parent) n = n.parent
        drawBranch(b, now, n._wind || 0, grow)
      })

      if (!reduce && grow > 0.42) {
        spawnAcc += dt
        while (spawnAcc > 0.038 && fallers.length < 170) {
          spawnAcc -= 0.038
          const src = leaves[(rng() * leaves.length) | 0]
          const end = getBranchEnd(src.branch, 1, now, 0, shake)
          spawnFaller(
            {
              ...src,
              x: end.x + (rng() - 0.5) * 18,
              y: end.y + (rng() - 0.5) * 10,
            },
            rng() * 0.3,
          )
        }
        if (rng() > 0.65 && fallers.length < 170) {
          fallers.push({
            x: rng() * width,
            y: scrollY - 24,
            vx: (rng() - 0.5) * 0.7,
            vy: 0.55 + rng() * 1.1,
            rot: rng() * Math.PI * 2,
            rv: (rng() - 0.5) * 0.1,
            size: 6 + rng() * 11,
            tint: rng(),
            phase: rng() * 6,
          })
        }
      }

      leaves.forEach((leaf) => {
        if (grow < 0.28) return
        const appear = Math.max(0, Math.min(1, (grow - 0.28) / 0.4))
        const end = getBranchEnd(leaf.branch, 1, now, 0, shake)
        const p = pull(mx, my, end.x, end.y, 170, 36 + shake * 28)
        if (!reduce && p.t > 0.72 && rng() > 0.92) {
          spawnFaller({ ...leaf, x: end.x, y: end.y }, 0.45)
        }
        const sway = Math.sin(elapsed * 1.1 + leaf.phase) * 6 + p.x
        drawLeaf(
          end.x + sway,
          end.y - scrollY + Math.cos(elapsed * 0.8 + leaf.phase) * 2.4 + p.y,
          leaf.angle + 1.2 + sway * 0.02,
          leaf.size,
          leaf.tint,
          appear * 0.88,
        )
      })

      for (let i = fallers.length - 1; i >= 0; i -= 1) {
        const f = fallers[i]
        const p = pull(mx, my, f.x, f.y, 150, 1.5)
        f.vx += p.x * 0.08 + Math.sin(elapsed * 1.4 + f.phase) * 0.025
        f.vy += 0.026
        f.vx *= 0.99
        f.x += f.vx
        f.y += f.vy
        f.rot += f.rv
        const onScreen = f.y - scrollY < height + 50 && f.y - scrollY > -50
        if (onScreen && f.vy > 0.75 && rng() > 0.9 && tryLand(f)) {
          fallers.splice(i, 1)
          continue
        }
        if (!onScreen) {
          tryLand(f)
          fallers.splice(i, 1)
          continue
        }
        drawLeaf(f.x, f.y - scrollY, f.rot, f.size * 1.2, f.tint, 1)
      }

      const viewTop = scrollY - 40
      const viewBot = scrollY + height + 40
      const vis = landed.filter((n) => n.y > viewTop && n.y < viewBot)

      ctx.lineWidth = 1.05
      for (let i = 0; i < vis.length; i += 1) {
        const a = vis[i]
        const near = []
        for (let j = i + 1; j < vis.length; j += 1) {
          const b = vis[j]
          const d2v = dist2(a.x, a.y, b.x, b.y)
          if (d2v < 170 * 170) near.push({ j, d2: d2v })
        }
        near.sort((x, y) => x.d2 - y.d2)
        const hotA = pull(mx, my, a.x, a.y, 130, 1).t
        near.slice(0, 3).forEach((n, idx) => {
          const b = vis[n.j]
          const hot = Math.max(hotA, pull(mx, my, b.x, b.y, 130, 1).t)
          const pulse = 0.4 + 0.6 * (0.5 + 0.5 * Math.sin(elapsed * 2 + a.pulse + idx))
          ctx.strokeStyle = `rgba(94, 234, 212, ${(0.26 + hot * 0.5) * pulse})`
          ctx.beginPath()
          ctx.moveTo(a.x, a.y - scrollY)
          ctx.lineTo(b.x, b.y - scrollY)
          ctx.stroke()
        })
      }

      vis.forEach((n) => {
        const hot = pull(mx, my, n.x, n.y, 130, 18)
        n.x += hot.x * 0.04
        n.y += hot.y * 0.04
        drawLeaf(
          n.x,
          n.y - scrollY,
          elapsed * 0.2 + n.phase,
          n.size * (0.58 + hot.t * 0.22),
          n.tint,
          0.58,
        )
      })

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown)
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null
    if (ro) ro.observe(document.documentElement)
    const later = window.setTimeout(() => {
      forest = null
      lastPageH = 0
      resize()
    }, 480)
    raf = requestAnimationFrame(draw)

    return () => {
      running = false
      cancelAnimationFrame(raf)
      window.clearTimeout(later)
      ro?.disconnect()
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
    }
  }, [reduce])

  return (
    <div ref={wrapRef} className="pointer-events-none fixed inset-0 z-[4]" aria-hidden>
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
    </div>
  )
}
