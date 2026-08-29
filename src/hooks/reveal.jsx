'use client'

import { motion, useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

const easeOut = [0.16, 1, 0.3, 1]

// Trigger when the element crosses ~45% down the viewport.
const inViewOptions = {
  amount: 0.12,
  once: true,
  margin: '0px 0px -55% 0px',
}

const presets = {
  soft: {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0 },
    duration: 0.65,
  },
  up: {
    hidden: { opacity: 0, y: 48, filter: 'blur(5px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
    duration: 1.25,
  },
  left: {
    hidden: { opacity: 0, x: -52, filter: 'blur(5px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
    duration: 1.25,
  },
  right: {
    hidden: { opacity: 0, x: 52, filter: 'blur(5px)' },
    visible: { opacity: 1, x: 0, filter: 'blur(0px)' },
    duration: 1.25,
  },
  kage: {
    hidden: { opacity: 0, y: 44, filter: 'blur(6px)' },
    visible: { opacity: 1, y: 0, filter: 'blur(0px)' },
    duration: 1.3,
  },
  kageSafe: {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0 },
    duration: 1.15,
  },
}

export const Reveal = ({
  children,
  className = '',
  intensity = 'kage',
  from,
  delay = 0,
}) => {
  const ref = useRef(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(ref, inViewOptions)
  const key = prefersReduced
    ? 'soft'
    : from || (intensity === 'kage' ? 'kage' : intensity)
  const preset = presets[key] || presets.up

  return (
    <div ref={ref} className={`relative ${className}`}>
      <motion.div
        variants={{
          hidden: preset.hidden,
          visible: preset.visible,
        }}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        transition={{
          duration: preset.duration,
          delay: prefersReduced ? 0 : delay,
          ease: easeOut,
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}

export const Stagger = ({
  children,
  className = '',
  intensity = 'kage',
  from = 'up',
  stagger = 0.14,
}) => {
  const ref = useRef(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(ref, inViewOptions)
  const key = prefersReduced ? 'soft' : from === 'left' || from === 'right' ? from : 'kageSafe'
  const preset = presets[key] || presets.kageSafe

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: prefersReduced ? 0 : stagger,
            delayChildren: prefersReduced ? 0 : 0.12,
          },
        },
      }}
    >
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={child?.key ?? i}
              variants={{
                hidden: preset.hidden,
                visible: preset.visible,
              }}
              transition={{ duration: preset.duration, ease: easeOut }}
            >
              {child}
            </motion.div>
          ))
        : children}
    </motion.div>
  )
}
