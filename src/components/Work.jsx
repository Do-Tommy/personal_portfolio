'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Reveal, Stagger } from '@/hooks/reveal'
import { useReducedMotion } from '@/hooks/motionPrefs'

const workItems = [
  {
    title: 'Geofeed pipeline',
    body: 'Created and maintain organizational geofeed served with nginx. Scripts manage, update, and verify geofeed files for multiple IP databases (MaxMind, IPBase, and others).',
    tags: ['nginx', 'geofeed', 'MaxMind', 'automation'],
  },
  {
    title: 'Cabinet and router migrations',
    body: 'Full network cabinet migrations with uplink uptime around 99%. Router migrations planned and executed for near-zero downtime.',
    tags: ['migrations', 'BGP', 'uptime'],
  },
  {
    title: 'Grafana and Prometheus observability',
    body: 'Full Grafana + Prometheus setup with exporters and dashboards: provider and peer status, in/out rate dips and peaks, spine and leaf switch port visibility and bandwidth, system status and logs. Alerts for network drops, BGP peering changes, and critical logs. Export via SNMP and gNMI into Prometheus.',
    tags: ['Grafana', 'Prometheus', 'SNMP', 'gNMI', 'alerting'],
  },
  {
    title: 'Customer network buildouts (140+ servers)',
    body: 'Customer full network setups from uplink switches/routers to downstream servers (140+). Routing redundancy architectures and quick server setup automation.',
    tags: ['bare metal', 'routing', 'automation', '140+ servers'],
  },
  {
    title: 'Internal tools migration',
    body: 'Migrated internal tooling from PHP 8 to Python / Svelte / FastAPI — roughly 10x efficiency through automation APIs and version-controlled network changes. Portal for network selection to configuration, one-click create/delete with idempotency, automatic network backups with config history and diffs, searchable IP tables, IPMI database, audit logs and admin panel, plus a data-hall fiber distance measuring tool.',
    tags: ['Python', 'Svelte', 'FastAPI', 'idempotency', 'portal'],
  },
]

function WorkCard({ item, index }) {
  const reduce = useReducedMotion()
  const number = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      className="glass-plate group relative overflow-hidden p-6 md:p-8"
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.85, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduce ? undefined : { y: -4, scale: 1.005 }}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-6 left-0 w-1 rounded-r-full bg-gradient-to-b from-accent/90 via-accent/40 to-transparent opacity-80 transition-opacity group-hover:opacity-100"
      />
      <div className="grid gap-5 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.35fr)] md:gap-10 md:pl-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-accent/80 text-scrim">
            {number}
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight text-text text-scrim md:text-2xl lg:text-[1.65rem]">
            {item.title}
          </h3>
          <ul className="mt-4 flex flex-wrap gap-2">
            {item.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-accent/25 bg-accent/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.08em] text-accent/90 text-scrim"
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
    </motion.article>
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
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.28em] text-accent text-scrim">
              Chapter · Work
            </p>
            <h2 className="text-4xl font-semibold tracking-tight text-text text-scrim md:text-5xl">
              Work
            </h2>
            <p className="mt-4 max-w-3xl text-lg font-medium leading-relaxed text-text/90 text-scrim md:text-xl">
              Network engineering and internal tooling at scale — migrations,
              observability, and automation that keep bare metal and routing
              reliable.
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
