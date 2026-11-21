import { ArrowUpRightIcon } from '@phosphor-icons/react/ssr';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import { CtaBand } from '@/components/sections/cta-band';
import { PageHeader } from '@/components/sections/page-header';
import { process } from '@/content/home';
import { solutions } from '@/content/solutions';
import { cn } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Solutions',
  description:
    'Boardrooms, video conferencing, LED video walls, digital signage, professional audio, smart classrooms, control systems and AMC support from SAAN Protocol Experts, Bengaluru.',
  alternates: { canonical: '/solutions' },
};

// Alternating wide/narrow rhythm across a 12-column grid.
const spans = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7'];

export default function SolutionsPage() {
  return (
    <>
      <PageHeader
        title="Every room, designed as one system."
        accent={['one', 'system.']}
        image="/images/photos/led-person.jpg"
        intro="Eight practices, delivered by one team: from the first survey and drawing to installation, training and years of support."
      />

      <section aria-label="All solutions" className="bg-ink-950 pb-28 md:pb-36">
        <div className="container-x grid gap-5 md:grid-cols-12">
          {solutions.map((s, i) => (
            <Link
              key={s.slug}
              href={`/solutions/${s.slug}`}
              data-reveal
              style={{ ['--d' as string]: (i % 2) * 120 }}
              className={cn(
                'group relative flex min-h-[420px] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] border border-white/[0.06] md:min-h-[520px]',
                spans[i % 4],
              )}
            >
              <Image src={s.image} alt="" fill sizes="(min-width: 768px) 58vw, 100vw" className="zoom-img object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/40 to-transparent" />
              <div className="relative flex items-end justify-between gap-6 p-7 md:p-9">
                <div>
                  <h2 className="display-tight text-[clamp(1.8rem,2.6vw,2.6rem)] text-fog-50">{s.title}</h2>
                  <p className="mt-3 max-w-[46ch] leading-relaxed text-fog-200">{s.line}</p>
                </div>
                <span className="grid size-12 shrink-0 place-items-center rounded-full bg-fog-50 text-ink-950 transition-[background-color,transform] duration-500 group-hover:rotate-45 group-hover:bg-signal-500">
                  <ArrowUpRightIcon weight="bold" className="size-5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section aria-labelledby="delivery-title" className="border-y border-white/[0.07] bg-ink-900 py-24 md:py-32">
        <div className="container-x">
          <h2 id="delivery-title" className="display max-w-[20ch] text-[clamp(2.2rem,4.4vw,4rem)] text-fog-50" data-reveal>
            The same seven steps, whatever the room.
          </h2>
          <ol className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-7">
            {process.map((p, i) => (
              <li key={p.title} data-reveal style={{ ['--d' as string]: i * 70 }} className="relative border-t border-white/10 pt-6">
                <span className="absolute -top-px left-0 h-px w-10 bg-signal-500" />
                <p className="text-xl font-semibold text-fog-50" style={{ fontStretch: '110%' }}>
                  {p.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-fog-400">{p.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
