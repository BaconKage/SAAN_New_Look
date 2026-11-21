'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';

import { Counter } from '@/components/motion/counter';

gsap.registerPlugin(ScrollTrigger);

const TEXT =
  'Since 2007, SAAN has designed, supplied and supported the rooms where enterprises meet, teach and present. One accountable team, from the first site survey to the maintenance visit years later.';
const HIGHLIGHT = new Set(['One', 'accountable', 'team,']);

const stats = [
  { to: 2007, from: 1990, suffix: '', label: 'Founded in Bengaluru' },
  { to: 30, suffix: '+', label: 'Years of leadership in enterprise technology' },
  { to: 8, suffix: '', label: 'Solution practices under one roof' },
  { to: 30, suffix: '+', label: 'Technology brands in our design toolkit' },
];

/** The statement lights up word by word as you scroll through it. */
export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const words = el.querySelectorAll('[data-word]');
    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: 0.6 },
        },
      );
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative bg-ink-950 py-28 md:py-40">
      <div className="container-x">
        <p
          ref={ref}
          className="max-w-[26ch] text-[clamp(1.9rem,4.4vw,4.1rem)] font-semibold leading-[1.1] tracking-[-0.025em] text-fog-50"
          style={{ fontStretch: '108%' }}
        >
          {TEXT.split(' ').map((w, i) => (
            <span key={i} data-word className={HIGHLIGHT.has(w) ? 'text-signal-500' : undefined}>
              {w}{' '}
            </span>
          ))}
        </p>

        <dl className="mt-20 grid grid-cols-2 gap-x-6 gap-y-12 border-t border-white/[0.08] pt-12 md:mt-28 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} data-reveal style={{ ['--d' as string]: i * 90 }}>
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="display block text-[clamp(2.8rem,5vw,4.6rem)] text-fog-50">
                  <Counter to={s.to} from={s.from ?? 0} suffix={s.suffix} />
                </span>
                <span className="mt-3 block max-w-[22ch] text-fog-400">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
