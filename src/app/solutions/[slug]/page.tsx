import { ArrowUpRightIcon, CheckIcon, PlusIcon } from '@phosphor-icons/react/ssr';
import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { Parallax } from '@/components/motion/parallax';
import { Split } from '@/components/motion/split';
import { CtaBand } from '@/components/sections/cta-band';
import { ProjectStrip } from '@/components/sections/project-showcase';
import { SystemSection } from '@/components/solutions/system-diagram';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { diagrams } from '@/content/diagrams';
import { getProducts } from '@/content/products';
import { PRIMARY_CTA } from '@/content/site';
import { getSolution, solutions } from '@/content/solutions';

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: `${s.line} ${s.intro.split('. ')[0]}.`,
    alternates: { canonical: `/solutions/${s.slug}` },
    openGraph: { images: [{ url: s.image }] },
  };
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getSolution(slug);
  if (!s) notFound();
  const idx = solutions.findIndex((x) => x.slug === s.slug);
  const next = solutions[(idx + 1) % solutions.length]!;
  const related = getProducts(s.products);

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* Hero */}
      <section className="relative flex min-h-[88dvh] items-end overflow-hidden bg-ink-950 pb-16 pt-[calc(var(--header-h)+4rem)] md:pb-24">
        <Parallax>
          <Image src={s.image} alt="" fill priority sizes="100vw" className="object-cover" />
        </Parallax>
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/55 to-ink-950/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-950/70 to-transparent" />
        <div className="container-x relative">
          <nav aria-label="Breadcrumb" className="mb-8" data-reveal="fade">
            <ol className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-fog-400">
              <li>
                <Link href="/solutions" className="transition-colors hover:text-fog-50">
                  Solutions
                </Link>
              </li>
              <li className="text-white/25">/</li>
              <li aria-current="page" className="text-fog-200">
                {s.short}
              </li>
            </ol>
          </nav>
          <Split as="h1" text={s.title} className="display max-w-[16ch] text-[clamp(2.7rem,6.6vw,6.5rem)] text-fog-50" />
          <p data-reveal style={{ ['--d' as string]: 300 }} className="mt-7 max-w-xl text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-fog-200">
            {s.line}
          </p>
        </div>
      </section>

      {/* Overview */}
      <section aria-label="Overview" className="bg-ink-950 py-24 md:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <p
            data-reveal
            className="text-[clamp(1.45rem,2.4vw,2.2rem)] font-medium leading-[1.3] tracking-[-0.015em] text-fog-50 lg:col-span-7"
          >
            {s.intro}
          </p>
          <ul className="space-y-5 lg:col-span-4 lg:col-start-9">
            {s.outcomes.map((o, i) => (
              <li key={o} data-reveal style={{ ['--d' as string]: 120 + i * 90 }} className="flex gap-4 border-t border-white/[0.08] pt-5">
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-signal-500 text-ink-950">
                  <CheckIcon weight="bold" className="size-3.5" />
                </span>
                <span className="text-lg leading-snug text-fog-200">{o}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Capabilities */}
      <section aria-labelledby="cap-title" className="border-t border-white/[0.07] bg-ink-900 py-24 md:py-32">
        <div className="container-x">
          <h2 id="cap-title" className="display max-w-[18ch] text-[clamp(2.2rem,4.4vw,4rem)] text-fog-50" data-reveal>
            What we deliver
          </h2>
          <div className="mt-14 grid border-t border-white/[0.08] md:grid-cols-2">
            {s.capabilities.map((c, i) => (
              <div
                key={c.title}
                data-reveal
                style={{ ['--d' as string]: (i % 2) * 100 }}
                className="group flex gap-6 border-b border-white/[0.08] py-9 md:px-2 md:odd:border-r md:odd:pr-10 md:even:pl-10"
              >
                <span className="grid size-14 shrink-0 place-items-center rounded-2xl border border-white/10 text-signal-400 transition-colors duration-500 group-hover:border-signal-500 group-hover:bg-signal-500 group-hover:text-ink-950">
                  <Icon name={c.icon} className="size-7" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold text-fog-50" style={{ fontStretch: '108%' }}>
                    {c.title}
                  </h3>
                  <p className="mt-2 leading-relaxed text-fog-400">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {s.project && <ProjectStrip id={s.project.id} photos={s.project.photos} />}

      {/* Typical system, drawn as an architecture diagram with a numbered key */}
      <SystemSection diagram={diagrams[s.slug]!} rows={s.system} />

      {/* Related products */}
      {related.length > 0 && (
        <section aria-labelledby="rel-title" className="border-t border-white/[0.07] bg-ink-900 py-24 md:py-32">
          <div className="container-x">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <h2 id="rel-title" className="display max-w-[18ch] text-[clamp(2.2rem,4.4vw,4rem)] text-fog-50" data-reveal>
                Products we often specify
              </h2>
              <Link href="/products" className="font-medium text-fog-200 underline-offset-4 hover:text-fog-50 hover:underline">
                All products
              </Link>
            </div>
            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, i) => (
                <Link
                  key={p.id}
                  href={`/products?item=${p.id}`}
                  data-reveal
                  style={{ ['--d' as string]: (i % 3) * 90 }}
                  className="studio group relative flex aspect-[5/4] flex-col overflow-hidden rounded-[var(--radius-card)] p-6"
                >
                  <div className="relative flex-1">
                    <Image src={p.image} alt={`${p.brand} ${p.name}`} fill sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw" className="object-contain p-4 transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-105" />
                  </div>
                  <div className="mt-4 flex items-end justify-between gap-4">
                    <div>
                      <p className="font-mono text-xs uppercase tracking-[0.1em] text-ink-600">{p.brand}</p>
                      <p className="mt-1 text-lg font-semibold text-ink-950">{p.name}</p>
                    </div>
                    <span className="grid size-9 place-items-center rounded-full bg-ink-950 text-fog-50 transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRightIcon weight="bold" className="size-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Fits + FAQ */}
      <section aria-labelledby="faq-title" className="bg-ink-950 py-24 md:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 className="label text-fog-500" data-reveal>
              Where it fits
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2" data-reveal style={{ ['--d' as string]: 100 }}>
              {s.fits.map((f) => (
                <li key={f} className="rounded-full border border-white/12 px-4 py-2 text-fog-200">
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-10" data-reveal style={{ ['--d' as string]: 200 }}>
              <Button href={`${PRIMARY_CTA.href}?solution=${s.slug}`}>{PRIMARY_CTA.label}</Button>
            </div>
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <h2 id="faq-title" className="display text-[clamp(2rem,3.6vw,3.25rem)] text-fog-50" data-reveal>
              Questions we hear
            </h2>
            <div className="mt-8 border-t border-white/[0.08]">
              {s.faqs.map((f) => (
                <details key={f.q} className="group border-b border-white/[0.08]" data-reveal>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-lg text-fog-50 [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 transition-transform duration-500 group-open:rotate-45 group-open:border-signal-500 group-open:text-signal-500">
                      <PlusIcon className="size-4" />
                    </span>
                  </summary>
                  <p className="max-w-2xl pb-7 leading-relaxed text-fog-400">{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Next practice */}
      <section aria-label="Next solution" className="bg-ink-950 pb-8">
        <div className="container-x">
          <Link href={`/solutions/${next.slug}`} className="group relative flex min-h-[340px] items-end overflow-hidden rounded-[var(--radius-card)] border border-white/[0.06] p-8 md:min-h-[420px] md:p-12">
            <Image src={next.image} alt="" fill sizes="100vw" className="zoom-img object-cover opacity-60" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/50 to-transparent" />
            <div className="relative flex w-full flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="label text-signal-400">Next solution</p>
                <p className="display mt-4 text-[clamp(2.2rem,5vw,4.5rem)] text-fog-50">{next.title}</p>
              </div>
              <span className="grid size-16 shrink-0 place-items-center rounded-full bg-fog-50 text-ink-950 transition-[transform,background-color] duration-500 group-hover:rotate-45 group-hover:bg-signal-500">
                <ArrowUpRightIcon weight="bold" className="size-6" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
