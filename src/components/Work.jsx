'use client'

import React from 'react'
import { Reveal, Stagger } from '@/hooks/reveal'

const workItems = [
  {
    title: 'Geofeed pipeline',
    body: 'Built and maintain the organization’s geofeed, served with nginx. Scripts update and verify entries across MaxMind, IPBase, and other IP databases.',
    tags: ['nginx', 'geofeed', 'MaxMind', 'automation'],
  },
  {
    title: 'Cabinet and router migrations',
    body: 'Full network cabinet migrations and router migrations, planned and executed for near-zero downtime.',
    tags: ['migrations', 'BGP', 'uptime'],
  },
  {
    title: 'Grafana and Prometheus observability',
    body: 'Grafana and Prometheus stack fed by SNMP and gNMI: provider and peer status, spine and leaf port bandwidth, system logs. Alerts on network drops and BGP peering changes.',
    tags: ['Grafana', 'Prometheus', 'SNMP', 'gNMI', 'alerting'],
  },
  {
    title: 'Customer network buildouts (140+ servers)',
    body: 'Full customer networks from uplink routers down to 140+ servers, with redundant routing and automated server setup.',
    tags: ['bare metal', 'routing', 'automation', '140+ servers'],
  },
  {
    title: 'Internal tools migration',
    body: 'Moved internal tooling from PHP 8 to Python, FastAPI, and Svelte — roughly 10x faster operations. One portal covers network configuration, config backups with diffs, IP and IPMI tables, and audit logs.',
    tags: ['Python', 'Svelte', 'FastAPI', 'idempotency', 'portal'],
  },
]

function WorkCard({ item, index }) {
  const number = String(index + 1).padStart(2, '0')

  return (
    <article className="glass-plate group relative overflow-hidden p-6 transition-transform duration-200 hover:-translate-y-0.5 md:p-8">
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-6 left-0 w-1 rounded-r-full bg-gradient-to-b from-accent/90 via-accent/40 to-transparent opacity-80 transition-opacity group-hover:opacity-100"
      />
      <div className="grid gap-5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] md:gap-10 md:pl-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent/80 text-scrim">
            {number}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-text text-scrim md:text-2xl lg:text-[1.65rem]">
            {item.title}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-xs font-medium uppercase tracking-[0.08em] text-accent/90 text-scrim"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-base font-medium leading-relaxed text-text/85 text-scrim md:border-l md:border-white/10 md:pl-8 md:text-lg">
          {item.body}
        </p>
      </div>
    </article>
  )
}

function Work() {
  return (
    <div
      id="work"
      className="section-shell relative overflow-hidden py-20 md:py-28"
    >
      <section className="relative z-10 mx-auto w-full max-w-5xl px-6 md:px-10">
        <div className="radial-copy">
          <Reveal from="up">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent text-scrim">
              Chapter · Work
            </p>
            <h2 className="font-display text-4xl font-medium tracking-tight text-text text-scrim md:text-5xl">
              Work
            </h2>
            <p className="mt-4 max-w-3xl text-lg font-medium leading-relaxed text-text/90 text-scrim md:text-xl">
              Network engineering and internal tooling at scale — migrations,
              observability, and automation that keep bare metal and routing
              reliable.
            </p>
            <p className="mt-6 inline-flex flex-col gap-x-3 gap-y-0.5 rounded-2xl sm:flex-row sm:flex-wrap sm:items-center border border-white/15 bg-black/30 px-4 py-2.5 text-sm font-medium text-text text-scrim md:text-base">
              <span className="font-semibold">NOC / Network Engineer</span>
              <span aria-hidden className="hidden text-accent sm:inline">·</span>
              <span>OpenColo, San Jose, CA</span>
              <span aria-hidden className="hidden text-accent sm:inline">·</span>
              <span>2024 – Present</span>
            </p>
          </Reveal>

          <Stagger className="mt-12 flex flex-col gap-5 md:mt-16 md:gap-6" from="up" stagger={0.12}>
            {workItems.map((item, index) => (
              <WorkCard key={item.title} item={item} index={index} />
            ))}
          </Stagger>
        </div>
      </section>
    </div>
  )
}

export default Work
