'use client';

import { ArrowUpRightIcon } from '@phosphor-icons/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef } from 'react';

import { TextLink } from '@/components/ui/button';
import { solutions } from '@/content/solutions';

gsap.registerPlugin(ScrollTrigger);

/** Vertical scroll pans the practices sideways. Native swipe on small screens. */
export function SolutionsPan() {
  const wrap = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      '(min-width: 768px) and (prefers-reduced-motion: no-preference)',
      () => {
        const t = track.current!;
        const distance = () => Math.max(0, t.scrollWidth - window.innerWidth);
        const tween = gsap.to(t, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: wrap.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (bar.current)
                bar.current.style.transform = `scaleX(${self.progress})`;
            },
          },
        });
        // Cards ease in slightly as they enter from the right.
        t.querySelectorAll<HTMLElement>('[data-card-media]').forEach((m) => {
          gsap.fromTo(
            m,
            { scale: 1.18 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: m,
                containerAnimation: tween,
                start: 'left right',
                end: 'right 60%',
                scrub: true,
              },
            }
          );
        });
      }
    );
    return () => mm.revert();
  }, []);

  return (
    // GSAP wraps a pinned element in its own spacer node. This outer div stays
    // React-owned so unmounting never tries to remove a node GSAP has moved.
    <div className="relative bg-ink-900">
      <section
        ref={wrap}
        aria-labelledby="solutions-title"
        className="relative overflow-hidden bg-ink-900 md:h-[100dvh]"
      >
        <div className="flex h-full flex-col justify-center gap-10 py-24 md:gap-10 md:pb-6 md:pt-[calc(var(--header-h)+1rem)]">
          <div className="container-x flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <h2
              id="solutions-title"
              className="display max-w-[16ch] text-[clamp(2.5rem,5.2vw,5rem)] text-fog-50"
            >
              Eight practices.{' '}
              <span className="italic text-signal-500">One integrator.</span>
            </h2>
            <TextLink href="/solutions" className="shrink-0">
              All solutions
            </TextLink>
          </div>

          <div
            ref={track}
            className="flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scrollbar-width:none] md:snap-none md:gap-6 md:overflow-visible md:px-10 md:pb-0 xl:px-14"
          >
            {solutions.map((s, i) => (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="group relative flex h-[min(64vh,580px)] w-[82vw] shrink-0 snap-start flex-col overflow-hidden rounded-[var(--radius-card)] border border-white/[0.06] bg-ink-850 sm:w-[440px] md:w-[min(34vw,480px)]"
              >
                <div className="relative flex-1 overflow-hidden">
                  <div data-card-media className="absolute inset-0">
                    <Image
                      src={s.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 34vw, 82vw"
                      className="zoom-img object-cover"
                      priority={i < 2}
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-850 via-ink-850/10 to-transparent" />
                </div>
                <div className="relative flex items-end justify-between gap-6 p-6 md:p-7">
                  <div>
                    <h3 className="display-tight text-[1.55rem] text-fog-50">
                      {s.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 max-w-[38ch] text-[0.95rem] leading-relaxed text-fog-400">
                      {s.line}
                    </p>
                  </div>
                  <span className="grid size-11 shrink-0 place-items-center rounded-full border border-white/15 text-fog-50 transition-colors duration-300 group-hover:border-signal-500 group-hover:bg-signal-500 group-hover:text-ink-950">
                    <ArrowUpRightIcon weight="bold" className="size-4" />
                  </span>
                </div>
              </Link>
            ))}
            <span aria-hidden className="w-1 shrink-0 md:w-6" />
          </div>

          <div className="container-x hidden md:block">
            <span className="relative block h-px w-full overflow-hidden bg-white/10">
              <span
                ref={bar}
                className="absolute inset-0 origin-left scale-x-0 bg-signal-500"
              />
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
