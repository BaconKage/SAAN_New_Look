import { EnvelopeSimpleIcon, MapPinIcon, PhoneIcon, WhatsappLogoIcon } from '@phosphor-icons/react/ssr';
import type { Metadata } from 'next';
import { Suspense } from 'react';

import { Planner } from '@/components/contact/planner';
import { PageHeader } from '@/components/sections/page-header';
import { mailLink, site, telLink, whatsappLink } from '@/content/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: `Plan your AV, video conferencing or signage project with SAAN Protocol Experts, Bengaluru. Call ${site.phone.display} or send us a brief.`,
  alternates: { canonical: '/contact' },
};

const channels = [
  { icon: PhoneIcon, label: 'Call', value: site.phone.display, href: telLink },
  { icon: WhatsappLogoIcon, label: 'WhatsApp', value: 'Chat with the team', href: whatsappLink('Hello SAAN, I would like to discuss a project.'), external: true },
  { icon: EnvelopeSimpleIcon, label: 'Email', value: site.email, href: mailLink('Project enquiry') },
];

export default function ContactPage() {
  return (
    <>
      <PageHeader
        title="Plan your project."
        accent={['project.']}
        intro="Three quick steps. Tell us what you are planning and we will come back with questions, a site visit and a proposal."
      />

      <section aria-label="Project planner and contact details" className="bg-ink-950 pb-28 md:pb-36">
        <div className="container-x grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7" data-reveal>
            <Suspense fallback={<div className="h-[560px] rounded-[var(--radius-card)] border border-white/[0.08] bg-ink-900" />}>
              <Planner />
            </Suspense>
          </div>

          <aside className="space-y-4 lg:col-span-4 lg:col-start-9" data-reveal style={{ ['--d' as string]: 150 }}>
            <h2 className="label text-fog-500">Or reach us directly</h2>
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.external ? '_blank' : undefined}
                rel={c.external ? 'noopener noreferrer' : undefined}
                className="group flex items-center gap-5 rounded-2xl border border-white/[0.08] p-5 transition-colors duration-300 hover:border-signal-500/60 hover:bg-white/[0.02]"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-white/[0.05] text-signal-400 transition-colors duration-300 group-hover:bg-signal-500 group-hover:text-ink-950">
                  <c.icon className="size-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm text-fog-500">{c.label}</span>
                  <span className="block truncate text-lg text-fog-50">{c.value}</span>
                </span>
              </a>
            ))}

            <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
              <iframe
                title="SAAN Protocol Experts office on the map"
                src={site.address.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[240px] w-full grayscale invert-[0.92] hue-rotate-180"
              />
              <a href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="flex gap-3 bg-ink-900 p-5 text-fog-200 transition-colors hover:text-fog-50">
                <MapPinIcon className="mt-1 size-5 shrink-0 text-signal-500" />
                <span className="text-sm leading-relaxed">
                  {site.address.lines.map((l) => (
                    <span key={l} className="block">
                      {l}
                    </span>
                  ))}
                </span>
              </a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
