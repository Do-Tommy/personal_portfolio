'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Reveal } from '@/hooks/reveal'
import dynamic from 'next/dynamic'
import { useReducedMotion } from '@/hooks/motionPrefs'

const LiveBadge = dynamic(() => import('@/components/threeui/LiveBadge'), { ssr: false })

const projectLists = [
  {
    name: 'Personal Portfolio',
    description: 'Personal portfolio built on Next.js and Tailwind CSS',
    github: 'https://github.com/Do-Tommy/personal_portfolio',
    site: 'https://www.tommydo.dev/',
    status: 'Live',
  },
  {
    name: 'Tpump Randomizer',
    description: 'Tpump drink builder',
    github: 'https://github.com/Do-Tommy/tpumpme',
    site: 'https://do-tommy.github.io/tpumpme/',
    status: 'Live',
  },
  {
    name: 'Image Converter',
    description: 'Image converter GUI using the Python PIL library',
    github: 'https://github.com/Do-Tommy/py-image-converter',
    site: 'https://github.com/Do-Tommy/py-image-converter',
    status: 'GitHub',
  },
  {
    name: 'Personal finance tool',
    description: 'Measure and test portfolio and market data',
    github: null,
    site: null,
    status: 'Coming soon',
  },
  {
    name: 'Matcha restock tracker',
    description: 'Watch matcha restocks',
    github: null,
    site: null,
    status: 'Coming soon',
  },
  {
    name: 'Ravers ticketing exchange',
    description: 'Simple ticketing platform for ravers to exchange with each other',
    github: null,
    site: null,
    status: 'Coming soon',
  },
]

const statusClass = {
  GitHub: 'bg-sky-400/20 text-sky-200',
  'Coming soon': 'bg-amber-400/20 text-amber-100',
}

function ProjectCard({ project, index }) {
  const reduce = useReducedMotion()

  return (
    <motion.article
      className="glass-plate group flex flex-col p-6 md:p-7"
      initial={reduce ? false : { opacity: 0, y: 36, x: index % 2 === 0 ? -20 : 20 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, amount: 0.15, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 1.2, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduce ? undefined : { y: -4, scale: 1.01 }}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="text-xl font-medium text-text text-scrim md:text-2xl">{project.name}</h3>
        {project.status === 'Live' ? (
          <LiveBadge />
        ) : (
          <span
            className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium ${statusClass[project.status]}`}
          >
            {project.status}
          </span>
        )}
      </div>
      <p className="mt-3 flex-1 text-base font-medium leading-relaxed text-text/85 text-scrim">
        {project.description}
      </p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs text-text text-scrim transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            GitHub
          </a>
        ) : null}
        {project.site && project.site !== project.github ? (
          <a
            href={project.site}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-accent/80 px-4 py-2 text-xs font-medium text-black transition hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            View site
          </a>
        ) : null}
      </div>
    </motion.article>
  )
}

const Projects = () => {
  return (
    <div
      id="projects"
      className="section-shell relative flex justify-center overflow-hidden py-20 md:py-28"
    >
      <section className="relative z-10 w-full max-w-7xl px-6 md:px-10">
        <Reveal from="up">
          <div className="radial-copy max-w-2xl">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent text-scrim">
              Chapter · Projects
            </p>
            <h2 className="font-display text-4xl font-medium tracking-tight text-text text-scrim md:text-6xl">
              Projects
            </h2>
            <p className="mt-4 max-w-2xl text-lg font-medium text-text/90 text-scrim md:text-xl">
              Personal builds — live tools and experiments on the way to GitHub.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projectLists.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Projects
