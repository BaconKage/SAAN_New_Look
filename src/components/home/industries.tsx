'use client';

import { gsap } from 'gsap';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

import { industries } from '@/content/home';
import { cn } from '@/lib/utils';

/** Sector list. On desktop a preview image trails the pointer over the active row. */
export function Industries() {
  const section = useRef<HTMLElement>(null);
  const float = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const sec = section.current;
    const fl = float.current;
    if (!sec || !fl || !window.matchMedia('(pointer: fine)').matches) return;
    const xTo = gsap.quickTo(fl, 'x', { duration: 0.7, ease: 'power3.out' });
    const yTo = gsap.quickTo(fl, 'y', { duration: 0.7, ease: 'power3.out' });
    const move = (e: PointerEvent) => {
      const r = sec.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
    };
    sec.addEventListener('pointermove', move);
    return () => sec.removeEventListener('pointermove', move);
  }, []);

  return (
    <section ref={section} aria-labelledby="industries-title" className="relative overflow-hidden bg-ink-900 py-28 md:py-36">
      <div className="container-x">
        <h2 id="industries-title" className="display max-w-[18ch] text-[clamp(2.5rem,5.2vw,5rem)] text-fog-50" data-reveal>
          Built for the way each sector works.
        </h2>

        <ul className="mt-14 border-t border-white/[0.08]" onMouseLeave={() => setActive(null)}>
          {industries.map((ind, i) => (
            <li key={ind.name} className="border-b border-white/[0.08]" data-reveal style={{ ['--d' as string]: i * 50 }}>
              <div onMouseEnter={() => setActive(i)} className="group flex items-center gap-5 py-6 md:py-8">
                <div className="relative size-16 shrink-0 overflow-hidden rounded-xl md:hidden">
                  <Image src={ind.image} alt="" fill sizes="64px" className="object-cover" />
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-1 md:flex-row md:items-center md:justify-between md:gap-10">
                  <h3
                    className={cn(
                      'display-tight text-[clamp(1.6rem,4.2vw,3.6rem)] transition-[color,transform] duration-500 ease-[var(--ease-out-expo)]',
                      active === null || active === i ? 'text-fog-50' : 'text-fog-500/50',
                      active === i && 'md:translate-x-4',
                    )}
                  >
                    {ind.name}
                  </h3>
                  <p className={cn('text-fog-400 transition-colors duration-500 md:max-w-sm md:text-right md:text-lg', active === i && 'text-fog-200')}>
                    {ind.line}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div
        ref={float}
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
      >
        <div
          className={cn(
            'relative -translate-x-1/2 -translate-y-1/2 transition-[opacity,transform] duration-500 ease-[var(--ease-out-expo)]',
            active === null ? 'scale-75 opacity-0' : 'scale-100 opacity-100',
          )}
        >
          <div className="relative h-[220px] w-[320px] overflow-hidden rounded-[var(--radius-card)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
            {industries.map((ind, i) => (
              <Image
                key={ind.name}
                src={ind.image}
                alt=""
                fill
                sizes="320px"
                className={cn('object-cover transition-opacity duration-500', active === i ? 'opacity-100' : 'opacity-0')}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
