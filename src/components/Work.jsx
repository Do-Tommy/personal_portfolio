'use client'

import React from 'react'
import Image from 'next/image'
import { Reveal, Stagger } from '@/hooks/reveal'

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
      className="section-shell relative overflow-hidden py-20 md:py-28"
    >
      <section className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-10">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-14">
          <div>
            <Reveal from="up">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.28em] text-accent">
                Chapter · Work
              </p>
              <h2 className="text-4xl font-light tracking-tight text-text md:text-5xl">
                Work
              </h2>
              <p className="mt-4 max-w-3xl text-xl font-light leading-relaxed text-text/70">
                Network engineering and internal tooling at scale — migrations,
                observability, and automation that keep bare metal and routing
                reliable.
              </p>
            </Reveal>

            <Stagger className="mt-14 divide-y divide-white/10" from="up" stagger={0.16}>
              {workItems.map((item) => (
                <article
                  key={item.title}
                  className="grid gap-4 py-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] md:gap-10 md:py-12"
                >
                  <h3 className="text-2xl font-medium tracking-tight text-text md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="text-base font-light leading-relaxed text-text/70 md:text-lg">
                    {item.body}
                  </p>
                </article>
              ))}
            </Stagger>
          </div>

          <Reveal from="right" delay={0.12} className="hidden lg:block">
            <div className="relative sticky top-28 h-[calc(100vh-8rem)] max-h-[52rem]">
              <Image
                src="/work-landscape.jpg"
                alt="River canyon landscape"
                width={900}
                height={1200}
                className="h-full w-full object-cover object-center"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1210]/60 via-transparent to-[#0a1210]/20" />
              <p className="absolute bottom-4 left-4 text-[10px] uppercase tracking-[0.22em] text-white/50">
                Field note · uplink country
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  )
}

export default Work
