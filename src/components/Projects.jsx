'use client'

import React from 'react'
import { Reveal } from '@/hooks/reveal'

import LiveBadge from '@/components/threeui/LiveBadge'

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
]

const statusClass = {
  GitHub: 'bg-sky-400/20 text-sky-200',
}

function ProjectCard({ project }) {
  return (
    <article className="glass-plate group flex flex-col p-6 transition-transform duration-200 hover:-translate-y-0.5 md:p-7">
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
            className="btn-secondary"
          >
            GitHub
          </a>
        ) : null}
        {project.site && project.site !== project.github ? (
          <a
            href={project.site}
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
          >
            View site
          </a>
        ) : null}
      </div>
    </article>
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
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent text-scrim">
              Chapter · Projects
            </p>
            <h2 className="font-display text-4xl font-medium tracking-tight text-text text-scrim md:text-6xl">
              Projects
            </h2>
            <p className="mt-4 max-w-2xl text-lg font-medium text-text/90 text-scrim md:text-xl">
              Personal builds — small tools shipped and open on GitHub.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projectLists.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Projects
