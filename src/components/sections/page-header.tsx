import Image from 'next/image';
import Link from 'next/link';
import { type ReactNode } from 'react';

import { Split } from '@/components/motion/split';

interface PageHeaderProps {
  title: string;
  accent?: string[];
  intro?: ReactNode;
  image?: string;
  crumbs?: { label: string; href: string }[];
  children?: ReactNode;
}

/** Inner-page header: wide headline over an LED-screened photograph. */
export function PageHeader({ title, accent, intro, image, crumbs, children }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-ink-950 pb-20 pt-[calc(var(--header-h)+5rem)] md:pb-28 md:pt-[calc(var(--header-h)+7rem)]">
      {image && (
        <div aria-hidden className="absolute inset-0">
          <Image src={image} alt="" fill priority sizes="100vw" className="object-cover opacity-80 [filter:grayscale(1)_sepia(0.55)_saturate(1.7)_hue-rotate(-14deg)_brightness(0.95)]" />
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at center, transparent 1.9px, rgb(8 9 11) 2.6px)',
              backgroundSize: '6px 6px',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/30 to-ink-950/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-950/80 via-ink-950/30 to-transparent" />
        </div>
      )}
      <div className="container-x relative">
        {crumbs && (
          <nav aria-label="Breadcrumb" className="mb-8" data-reveal="fade">
            <ol className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-[0.1em] text-fog-500">
              {crumbs.map((c, i) => (
                <li key={c.href} className="flex items-center gap-2">
                  {i > 0 && <span className="text-white/20">/</span>}
                  <Link href={c.href} className="transition-colors hover:text-fog-50">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ol>
          </nav>
        )}
        <Split as="h1" text={title} accent={accent} className="display max-w-[18ch] text-[clamp(2.9rem,7.4vw,7.25rem)] text-fog-50" />
        {intro && (
          <div data-reveal style={{ ['--d' as string]: 250 }} className="mt-8 max-w-2xl text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed text-fog-200">
            {intro}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
