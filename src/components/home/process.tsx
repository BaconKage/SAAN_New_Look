'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

import { process } from '@/content/home';

gsap.registerPlugin(ScrollTrigger);

/** Seven stages; a signal line draws down the list as each stage comes into focus. */
export function Process() {
  const list = useRef<HTMLOListElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const ctx = gsap.context(() => {
      if (!reduce) {
        gsap.fromTo(
          line.current,
          { scaleY: 0 },
          { scaleY: 1, ease: 'none', scrollTrigger: { trigger: el, start: 'top 60%', end: 'bottom 60%', scrub: true } },
        );
      }
      el.querySelectorAll('li').forEach((li) => {
        ScrollTrigger.create({ trigger: li, start: 'top 62%', end: 'bottom 62%', toggleClass: 'is-active' });
      });
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section aria-labelledby="process-title" className="relative bg-ink-900 py-28 md:py-40">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 id="process-title" className="display text-[clamp(2.5rem,5vw,4.75rem)] text-fog-50" data-reveal>
              From survey to <span className="italic text-signal-500">support.</span>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-fog-400" data-reveal style={{ ['--d' as string]: 100 }}>
              The same team carries your project through every stage, so nothing is lost between the people who design a room and the people who keep it running.
            </p>
            <div className="relative mt-10 hidden aspect-[4/3] max-w-md overflow-hidden rounded-[var(--radius-card)] lg:block" data-reveal="clip" style={{ ['--d' as string]: 200 }}>
              <Image src="/images/photos/sol-support.jpg" alt="A SAAN engineer working on an equipment rack" fill sizes="30vw" className="object-cover" />
            </div>
          </div>
        </div>

        <ol ref={list} className="relative lg:col-span-6 lg:col-start-7">
          <span aria-hidden className="absolute bottom-6 left-[15px] top-3 w-px bg-white/10">
            <span ref={line} className="absolute inset-0 origin-top bg-gradient-to-b from-signal-500 to-signal-400" />
          </span>
          {process.map((step) => (
            <li key={step.title} className="group relative pb-14 pl-14 last:pb-0 md:pb-20">
              <span
                aria-hidden
                className="absolute left-0 top-1.5 grid size-[31px] place-items-center rounded-full border border-white/15 bg-ink-900 transition-colors duration-500 group-[.is-active]:border-signal-500"
              >
                <span className="size-2 rounded-full bg-white/25 transition-[background-color,transform] duration-500 group-[.is-active]:scale-125 group-[.is-active]:bg-signal-500" />
              </span>
              <h3 className="display-tight text-[clamp(1.9rem,3vw,2.75rem)] text-fog-500 transition-colors duration-500 group-[.is-active]:text-fog-50">
                {step.title}
              </h3>
              <p className="mt-3 max-w-lg text-lg leading-relaxed text-fog-400">{step.text}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {step.items.map((it) => (
                  <li key={it} className="rounded-full border border-white/10 px-3.5 py-1.5 text-sm text-fog-400">
                    {it}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
