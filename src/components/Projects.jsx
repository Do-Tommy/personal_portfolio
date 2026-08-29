'use client'

import React from 'react'
import { Reveal, Stagger } from '@/hooks/reveal'
import dynamic from 'next/dynamic'

const LiveBadge = dynamic(() => import('@/components/threeui/LiveBadge'), { ssr: false })
const SectionField = dynamic(
  () => import('@/components/threeui/SectionField'),
  { ssr: false },
)

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

const Projects = () => {
  return (
    <div
      id="projects"
      className="section-shell relative flex justify-center overflow-hidden py-20"
    >
      <SectionField kind="horizon" opacity={0.22} />
      <section className="relative z-10 w-full max-w-6xl px-6 md:px-10">
        <Reveal from="up">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-accent">
            Chapter · Projects
          </p>
          <h2 className="text-4xl font-light tracking-tight text-text md:text-5xl">
            Projects
          </h2>
          <p className="mt-3 max-w-2xl text-lg font-light text-text/70">
            Personal builds — live tools and experiments on the way to GitHub.
          </p>
        </Reveal>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" from="left" stagger={0.08}>
          {projectLists.map((project) => (
            <article
              key={project.name}
              className="glass-plate group flex flex-col p-5 transition duration-200 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-emerald-500/10"
            >
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-lg font-medium text-text">{project.name}</h3>
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
              <p className="mt-2 flex-1 text-sm font-light text-text/70">
                {project.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs text-text transition hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    GitHub
                  </a>
                ) : null}
                {project.site && project.site !== project.github ? (
                  <a
                    href={project.site}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-full bg-accent/80 px-3 py-1.5 text-xs font-medium text-black transition hover:bg-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    View site
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </Stagger>
      </section>
    </div>
  )
}

export default Projects
