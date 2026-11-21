import { MapPinIcon, TrophyIcon } from '@phosphor-icons/react/ssr';
import type { Metadata } from 'next';
import Image from 'next/image';

import { Counter } from '@/components/motion/counter';
import { CtaBand } from '@/components/sections/cta-band';
import { PageHeader } from '@/components/sections/page-header';
import { TextLink } from '@/components/ui/button';
import { recognition } from '@/content/home';
import { site } from '@/content/site';

export const metadata: Metadata = {
  title: 'About',
  description:
    'SAAN Protocol Experts is a Bengaluru technology integrator founded in 2007, led by Srinivas Perur Varda. Enterprise AV, unified communications and lifecycle support.',
  alternates: { canonical: '/about' },
};

const timeline = [
  { year: '2007', title: 'Founded in Bengaluru', text: 'SAAN starts with a simple idea: align technology development with what enterprise customers actually need.' },
  { year: '2008', title: 'Incorporated', text: 'SAAN Protocol Experts Private Limited is incorporated and builds its first practices around protocol testing and IT infrastructure.' },
  { year: 'Early years', title: 'Three technology divisions', text: 'Test and measurement for R&D labs, IT infrastructure services and electronic component supply for engineering teams.' },
  { year: '2015', title: 'Lifesize Partner Program', text: 'Video conferencing becomes a core practice as hybrid collaboration grows.' },
  { year: '2017', title: 'APAC Partner Enablement Award', text: 'Recognition for partner enablement in the Asia-Pacific region.' },
  { year: 'Today', title: 'Enterprise AV and collaboration', text: 'Boardrooms, video walls, auditoriums, classrooms and support contracts for corporate, education and institutional clients.' },
];

const principles = [
  { title: 'Design before supply', text: 'We survey and draw the room first. Equipment is chosen to fit the design, not the other way round.' },
  { title: 'Brand-neutral advice', text: 'We work across manufacturers, so recommendations follow the room, the users and the budget.' },
  { title: 'One accountable team', text: 'The people who design your system are the people who commission it and answer when you call.' },
  { title: 'Support that lasts', text: 'Preventive maintenance, OEM coordination and upgrades keep rooms working for years, not weeks.' },
];

const divisions = [
  { code: 'TMG', name: 'Test & Measurement', text: 'Protocol, network and storage test equipment for telecom and storage R&D teams: Fibre Channel, Ethernet, SAS, SATA and PCIe.' },
  { code: 'ITG', name: 'Information Technology', text: 'Enterprise infrastructure, networks, managed services, security and ITIL-aligned operations.' },
  { code: 'ECG', name: 'Electronic Components', text: 'Component sourcing for IT, electronics, automotive and medical-device engineering teams.' },
];

export default function AboutPage() {
  const years = new Date().getFullYear() - site.founded;
  return (
    <>
      <PageHeader
        title="Aligning technology and enterprise since 2007."
        accent={['technology', 'enterprise']}
        image="/images/photos/led-macro.jpg"
        intro="SAAN Protocol Experts is a Bengaluru technology integrator. We design, supply, install and support the systems that let organisations meet, teach and present."
      />

      {/* Story */}
      <section aria-label="Our story" className="bg-ink-950 py-24 md:py-32">
        <div className="container-x grid items-center gap-14 lg:grid-cols-12">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] lg:col-span-5" data-reveal="clip">
            <Image src="/images/photos/event.jpg" alt="An audience watching a presentation on a large screen" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-[clamp(1.45rem,2.3vw,2.1rem)] font-medium leading-[1.3] tracking-[-0.015em] text-fog-50" data-reveal>
              We began in protocol testing and IT infrastructure, working with engineering teams who expected equipment to behave exactly as specified.
            </p>
            <p className="mt-6 text-lg leading-relaxed text-fog-400" data-reveal style={{ ['--d' as string]: 100 }}>
              That discipline now goes into boardrooms, auditoriums and classrooms. Every system is designed for its room, tested end to end and handed over with documentation, so the people who use it every day do not have to think about the technology.
            </p>
            <dl className="mt-12 grid grid-cols-2 gap-8 border-t border-white/[0.08] pt-10" data-reveal style={{ ['--d' as string]: 200 }}>
              <div>
                <dt className="sr-only">Years in business</dt>
                <dd className="display text-[clamp(2.6rem,4.4vw,4rem)] text-fog-50">
                  <Counter to={years} suffix="+" />
                </dd>
                <dd className="mt-2 text-fog-400">Years in business</dd>
              </div>
              <div>
                <dt className="sr-only">Leadership experience</dt>
                <dd className="display text-[clamp(2.6rem,4.4vw,4rem)] text-fog-50">
                  <Counter to={30} suffix="+" />
                </dd>
                <dd className="mt-2 text-fog-400">Years of leadership experience</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section aria-labelledby="timeline-title" className="border-y border-white/[0.07] bg-ink-900 py-24 md:py-32">
        <div className="container-x">
          <h2 id="timeline-title" className="display max-w-[16ch] text-[clamp(2.2rem,4.4vw,4rem)] text-fog-50" data-reveal>
            How we got here
          </h2>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-white/[0.07] bg-white/[0.07] sm:grid-cols-2 lg:grid-cols-3">
            {timeline.map((t, i) => (
              <li key={t.title} className="group relative bg-ink-900 p-8 transition-colors duration-500 hover:bg-ink-850 md:p-10" data-reveal style={{ ['--d' as string]: (i % 3) * 90 }}>
                <p className="font-mono text-sm text-signal-400">{t.year}</p>
                <h3 className="mt-6 text-2xl font-semibold text-fog-50" style={{ fontStretch: '110%' }}>
                  {t.title}
                </h3>
                <p className="mt-3 leading-relaxed text-fog-400">{t.text}</p>
                <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-signal-500 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Leadership */}
      <section aria-labelledby="lead-title" className="bg-ink-950 py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="lead-title" className="display text-[clamp(2.2rem,4.4vw,4rem)] text-fog-50" data-reveal>
              Led by an engineer of enterprise technology
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal style={{ ['--d' as string]: 120 }}>
            <div className="relative overflow-hidden rounded-[var(--radius-card)] border border-white/[0.08] bg-ink-850 p-8 md:p-10">
              <div className="led-field pointer-events-none absolute inset-0 opacity-40" />
              <p className="relative text-3xl font-semibold text-fog-50" style={{ fontStretch: '112%' }}>
                {site.director.name}
              </p>
              <p className="relative mt-1 font-mono text-sm uppercase tracking-[0.1em] text-signal-400">{site.director.role}</p>
              <p className="relative mt-7 text-lg leading-relaxed text-fog-200">
                Srinivas brings more than thirty years in IT, AV and enterprise technology, including senior roles at SS Compwares, Intertec Systems and Zenith Infotech, with deep exposure to networking and storage R&D markets.
              </p>
              <p className="relative mt-4 leading-relaxed text-fog-400">
                He founded SAAN to be a solutions-led integrator rather than a reseller: one that designs the system, stands behind the installation and stays for the support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section aria-labelledby="principles-title" className="border-t border-white/[0.07] bg-ink-900 py-24 md:py-32">
        <div className="container-x">
          <h2 id="principles-title" className="display max-w-[18ch] text-[clamp(2.2rem,4.4vw,4rem)] text-fog-50" data-reveal>
            How we work
          </h2>
          <div className="mt-14 grid gap-x-12 gap-y-12 md:grid-cols-2">
            {principles.map((p, i) => (
              <div key={p.title} className="flex gap-6" data-reveal style={{ ['--d' as string]: (i % 2) * 100 }}>
                <span className="display mt-1 text-[2.4rem] leading-none text-signal-500/80">{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="text-2xl font-semibold text-fog-50" style={{ fontStretch: '110%' }}>
                    {p.title}
                  </h3>
                  <p className="mt-3 max-w-md text-lg leading-relaxed text-fog-400">{p.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Heritage divisions */}
      <section aria-labelledby="div-title" className="bg-ink-950 py-24 md:py-32">
        <div className="container-x">
          <h2 id="div-title" className="display max-w-[20ch] text-[clamp(2.2rem,4.4vw,4rem)] text-fog-50" data-reveal>
            Roots in engineering
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-fog-400" data-reveal style={{ ['--d' as string]: 100 }}>
            Before AV became our focus, SAAN served R&D and IT teams through three divisions. That background still shapes how we test and document every system.
          </p>
          <div className="mt-14 grid gap-4 lg:grid-cols-[1.3fr_1fr_1fr]">
            {divisions.map((d, i) => (
              <div key={d.code} className="relative overflow-hidden rounded-[var(--radius-card)] border border-white/[0.07] bg-ink-850 p-8 first:bg-signal-500 first:text-ink-950" data-reveal style={{ ['--d' as string]: i * 100 }}>
                <p className="display text-[3.5rem] leading-none opacity-90">{d.code}</p>
                <p className="mt-8 text-xl font-semibold">{d.name}</p>
                <p className={i === 0 ? 'mt-3 leading-relaxed text-ink-950/80' : 'mt-3 leading-relaxed text-fog-400'}>{d.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition + office */}
      <section id="recognition" aria-labelledby="rec-title" className="scroll-mt-24 border-t border-white/[0.07] bg-ink-900 py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 id="rec-title" className="display text-[clamp(2.2rem,4.4vw,4rem)] text-fog-50" data-reveal>
              Recognition
            </h2>
            <ul className="mt-10 space-y-4">
              {recognition.map((r) => (
                <li key={r.title} className="flex items-center gap-5 rounded-2xl border border-white/[0.08] p-5" data-reveal>
                  <span className="grid size-14 shrink-0 place-items-center rounded-full bg-signal-500 text-ink-950">
                    <TrophyIcon weight="fill" className="size-6" />
                  </span>
                  <div>
                    <p className="text-lg text-fog-50">{r.title}</p>
                    <p className="font-mono text-sm text-fog-500">{r.year}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7" data-reveal style={{ ['--d' as string]: 120 }}>
            <h2 className="label text-fog-500">Our office</h2>
            <div className="mt-6 overflow-hidden rounded-[var(--radius-card)] border border-white/[0.08]">
              <iframe
                title="SAAN Protocol Experts office location"
                src={site.address.embedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="block h-[300px] w-full grayscale invert-[0.92] hue-rotate-180"
              />
              <div className="flex flex-col gap-4 bg-ink-850 p-6 sm:flex-row sm:items-end sm:justify-between">
                <p className="flex gap-3 text-fog-200">
                  <MapPinIcon className="mt-1 size-5 shrink-0 text-signal-500" />
                  <span>
                    {site.address.lines.map((l) => (
                      <span key={l} className="block">
                        {l}
                      </span>
                    ))}
                  </span>
                </p>
                <TextLink href={site.address.mapsUrl} target="_blank" rel="noopener noreferrer" className="shrink-0">
                  Directions
                </TextLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
