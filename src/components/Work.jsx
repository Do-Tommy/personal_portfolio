'use client'

import React from 'react'
import { Reveal, Stagger } from '@/hooks/reveal'
import dynamic from 'next/dynamic'

const SectionField = dynamic(
  () => import('@/components/threeui/SectionField'),
  { ssr: false },
)

const workItems = [
  {
    title: 'Geofeed pipeline',
    body: 'Created and maintain organizational geofeed served with nginx. Scripts manage, update, and verify geofeed files for multiple IP databases (MaxMind, IPBase, and others).',
  },
  {
    title: 'Cabinet and router migrations',
    body: 'Full network cabinet migrations with uplink uptime around 99%. Router migrations planned and executed for near-zero downtime.',
  },
  {
    title: 'Grafana and Prometheus observability',
    body: 'Full Grafana + Prometheus setup with exporters and dashboards: provider and peer status, in/out rate dips and peaks, spine and leaf switch port visibility and bandwidth, system status and logs. Alerts for network drops, BGP peering changes, and critical logs. Export via SNMP and gNMI into Prometheus.',
  },
  {
    title: 'Customer network buildouts (140+ servers)',
    body: 'Customer full network setups from uplink switches/routers to downstream servers (140+). Routing redundancy architectures and quick server setup automation.',
  },
  {
    title: 'Internal tools migration',
    body: 'Migrated internal tooling from PHP 8 to Python / Svelte / FastAPI — roughly 10x efficiency through automation APIs and version-controlled network changes. Portal for network selection to configuration, one-click create/delete with idempotency, automatic network backups with config history and diffs, searchable IP tables, IPMI database, audit logs and admin panel, plus a data-hall fiber distance measuring tool.',
  },
]

function Work() {
  return (
    <div
      id="work"
      className="section-shell relative flex items-center justify-center overflow-hidden py-24"
    >
      <SectionField kind="flow" opacity={0.2} />
      <section className="relative z-10 w-full max-w-6xl px-6 md:px-10">
        <Reveal from="up">
          <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-accent">
            Chapter · Work
          </p>
          <h2 className="text-4xl font-light tracking-tight text-text md:text-5xl">
            Work
          </h2>
          <p className="mt-3 max-w-2xl text-lg font-light text-text/70">
            Network engineering and internal tooling at scale — migrations,
            observability, and automation that keep bare metal and routing
            reliable.
          </p>
        </Reveal>
        <Stagger className="mt-10 grid gap-4 md:grid-cols-2" from="up" stagger={0.12}>
          {workItems.map((item) => (
            <article
              key={item.title}
              className="glass-plate group p-6 transition duration-200 ease-out hover:-translate-y-1 hover:border-white/20 hover:bg-white/10 hover:shadow-emerald-500/10"
            >
              <h3 className="text-xl font-medium text-text">{item.title}</h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-text/70">
                {item.body}
              </p>
            </article>
          ))}
        </Stagger>
      </section>
    </div>
  )
}

export default Work
