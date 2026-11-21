import { TrophyIcon } from '@phosphor-icons/react/ssr';
import Image from 'next/image';

import { TextLink } from '@/components/ui/button';
import { recognition, references, type Reference } from '@/content/home';
import { site } from '@/content/site';
import { cn } from '@/lib/utils';

const PANEL = '#0a0b0d';

/**
 * A backlit plate holding an organisation's real logo, so it reads at a glance
 * next to its LED name. Wide wordmarks are capped so every plate keeps a similar weight.
 */
function LogoPlate({
  name,
  logo,
}: {
  name: string;
  logo: NonNullable<Reference['logo']>;
}) {
  const aspect = logo.w / logo.h;
  return (
    <span
      className={cn(
        'relative flex h-[var(--ph)] shrink-0 items-center rounded-2xl px-4 [--ph:3.5rem] md:px-5 md:[--ph:5.25rem]',
        logo.dark
          ? 'border border-white/10 bg-[#121418] shadow-[0_0_34px_-8px_rgb(224_138_0_/_0.5)]'
          : 'bg-[#eeeef0] shadow-[0_0_34px_-6px_rgb(224_138_0_/_0.55)]'
      )}
    >
      <span
        className="relative block"
        style={{
          height: 'calc(var(--ph) * 0.64)',
          width: `min(calc(var(--ph) * 0.64 * ${aspect.toFixed(3)}), 11.5rem)`,
        }}
      >
        <Image
          src={`/images/clients/${logo.file}`}
          alt={`${name} logo`}
          fill
          sizes="200px"
          className="object-contain"
        />
      </span>
    </span>
  );
}

/** One LED sign panel: logos and names run across it continuously, like a live ticker. */
function LedTicker({
  label,
  items,
  reverse = false,
  seconds,
}: {
  label: string;
  items: Reference[];
  reverse?: boolean;
  seconds: number;
}) {
  const row = [...items, ...items];
  return (
    <div
      className="group relative overflow-hidden border-y border-white/[0.06]"
      style={{ background: PANEL }}
    >
      <div aria-hidden className="led-grid absolute inset-0" />
      {/* Refresh sweep: a faint band of light that runs across the panel. */}
      <div
        aria-hidden
        className="led-text pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div className="h-full w-1/3 animate-[led-sweep_9s_linear_infinite] bg-gradient-to-r from-transparent via-current to-transparent opacity-[0.18]" />
      </div>

      <ul
        aria-hidden
        className={cn(
          'relative flex w-max animate-marquee items-center py-7 md:py-10',
          reverse && '[animation-direction:reverse]'
        )}
        style={{ animationDuration: `${seconds}s` }}
      >
        {row.map((item, i) => (
          <li
            key={i}
            className="flex items-center gap-5 pr-5 md:gap-10 md:pr-10"
          >
            {item.logo && <LogoPlate name={item.name} logo={item.logo} />}
            <span
              className="led-text whitespace-nowrap text-[clamp(2.1rem,5.6vw,5.4rem)] font-extrabold uppercase leading-[1.05] tracking-[0.015em] transition-colors duration-300 hover:text-[#fff0cc]"
              style={{ fontStretch: '112%' }}
            >
              {item.name}
            </span>
            <span className="led-text block size-4 shrink-0 rotate-45 bg-current opacity-60 md:size-6" />
          </li>
        ))}
      </ul>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-16 md:w-48"
        style={{
          background: `linear-gradient(to right, ${PANEL}, transparent)`,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-16 md:w-48"
        style={{
          background: `linear-gradient(to left, ${PANEL}, transparent)`,
        }}
      />
      <span className="label absolute left-4 top-3 rounded-full border border-white/10 bg-ink-950/85 px-3 py-1 text-fog-400 backdrop-blur md:left-10 md:top-4">
        {label}
      </span>
    </div>
  );
}

/** Organisations SAAN has worked with, shown on a live LED signage wall. */
export function References() {
  const years = new Date().getFullYear() - site.founded;
  return (
    <section
      aria-labelledby="references-title"
      className="relative overflow-hidden bg-ink-950 py-28 md:py-36"
    >
      <div className="container-x">
        <h2
          id="references-title"
          className="display max-w-[20ch] text-[clamp(2.5rem,5.2vw,5rem)] text-fog-50"
          data-reveal
        >
          Trusted by institutions and enterprises.
        </h2>
        <p
          className="mt-6 max-w-xl text-lg leading-relaxed text-fog-400"
          data-reveal
          style={{ ['--d' as string]: 100 }}
        >
          National research institutes, universities and companies across India
          have relied on SAAN for {years} years.
        </p>
      </div>

      <div
        className="mt-14 space-y-3 md:mt-20"
        data-reveal="fade"
        style={{ ['--d' as string]: 150 }}
      >
        <LedTicker
          label="Education & research"
          items={references.education}
          seconds={110}
        />
        <LedTicker
          label="Enterprise & industry"
          items={references.enterprise}
          seconds={125}
          reverse
        />
      </div>

      {/* Full lists for screen readers; the tickers above are decorative. */}
      <div className="sr-only">
        <h3>Education and research</h3>
        <ul>
          {references.education.map((r) => (
            <li key={r.name}>{r.name}</li>
          ))}
        </ul>
        <h3>Enterprise and industry</h3>
        <ul>
          {references.enterprise.map((r) => (
            <li key={r.name}>{r.name}</li>
          ))}
        </ul>
      </div>

      <div className="container-x mt-16 grid gap-4 md:mt-20 md:grid-cols-[1fr_1fr_1.25fr]">
        {recognition.map((r, i) => (
          <div
            key={r.title}
            className="relative overflow-hidden rounded-[var(--radius-card)] border border-white/[0.08] p-7 md:p-9"
            data-reveal
            style={{ background: PANEL, ['--d' as string]: i * 100 }}
          >
            <div aria-hidden className="led-grid absolute inset-0" />
            <p
              className="led-text relative whitespace-nowrap text-[clamp(3.2rem,5.2vw,6rem)] font-black italic leading-none tracking-[-0.02em]"
              style={{ fontStretch: '110%' }}
            >
              {r.year}
            </p>
            <div className="relative mt-8 flex items-center gap-3">
              <span className="grid size-10 shrink-0 place-items-center rounded-full border border-signal-500/40 text-signal-400">
                <TrophyIcon weight="fill" className="size-4" />
              </span>
              <p className="text-lg leading-snug text-fog-50">{r.title}</p>
            </div>
          </div>
        ))}
        <div
          className="relative flex min-h-[260px] flex-col justify-between overflow-hidden rounded-[var(--radius-card)] bg-signal-500 p-7 text-ink-950 md:p-9"
          data-reveal
          style={{ ['--d' as string]: 200 }}
        >
          <div
            aria-hidden
            className="led-field pointer-events-none absolute inset-0 opacity-50 mix-blend-multiply"
          />
          <p className="display-tight relative max-w-[16ch] text-[clamp(1.8rem,2.6vw,2.5rem)]">
            Since {site.founded}, from protocol labs to boardrooms.
          </p>
          <TextLink
            href="/about"
            className="relative mt-8 self-start text-ink-950 [&_span>span]:bg-ink-950 [&_svg]:text-ink-950"
          >
            Our story
          </TextLink>
        </div>
      </div>
    </section>
  );
}
