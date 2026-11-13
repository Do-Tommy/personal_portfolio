'use client'

import React from 'react'
import { Reveal, Stagger } from '@/hooks/reveal'

// Network leads: it is the headline discipline, so it is read first.
export const skillGroups = [
  {
    id: 'network',
    label: 'Network',
    accent: '#5eead4',
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
    id: 'software',
    label: 'Software',
    accent: '#c95c3f',
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
    id: 'ops',
    label: 'Ops & field',
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

function SkillGroup({ group }) {
  return (
    <article className="glass-plate flex h-full flex-col p-6 md:p-7">
      <span
        aria-hidden
        className="mb-5 block h-1 w-10 rounded-full"
        style={{ background: group.accent }}
      />
      <h3 className="text-2xl font-semibold tracking-tight text-text text-scrim">{group.label}</h3>
      <p className="mt-2 text-base font-medium leading-relaxed text-text/85 text-scrim">
        {group.blurb}
      </p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {group.items.map((skill) => (
          <li
            key={skill}
            className="rounded-lg border border-white/15 bg-black/35 px-3 py-1.5 text-sm font-medium text-white/90"
          >
            {skill}
          </li>
        ))}
      </ul>
    </article>
  )
}

const Skills = () => {
  return (
    <div
      id="skills"
      className="section-shell relative flex items-center justify-center overflow-x-clip py-16 md:py-28"
    >
      <section className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-6 md:px-10">
        <Reveal from="up">
          <div className="radial-copy mx-auto max-w-2xl px-2 py-6 text-center md:px-0 md:py-0">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent text-scrim">
              Chapter · Skills
            </p>
            <h2 className="font-display text-4xl font-medium tracking-tight text-text text-scrim md:text-5xl">
              Skills
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-base font-medium text-text/90 text-scrim md:text-lg">
              Network first, with the software and ops work that runs it.
            </p>
          </div>
        </Reveal>

        <Stagger className="mt-10 grid gap-5 md:mt-14 lg:grid-cols-3" from="up" stagger={0.1}>
          {skillGroups.map((group) => (
            <SkillGroup key={group.id} group={group} />
          ))}
        </Stagger>
      </section>
    </div>
  )
}

export default Skills
