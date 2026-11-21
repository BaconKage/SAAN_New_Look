'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

/** Moves its content slower than the page while the parent scrolls past. */
export function Parallax({ children, amount = 18, className }: { children: ReactNode; amount?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const tween = gsap.fromTo(
      el,
      { yPercent: 0, scale: 1.08 },
      {
        yPercent: amount,
        scale: 1.08,
        ease: 'none',
        scrollTrigger: { trigger: el.parentElement, start: 'top top', end: 'bottom top', scrub: true },
      },
    );
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [amount]);
  return (
    <div ref={ref} className={cn('absolute inset-0 will-change-transform', className)}>
      {children}
    </div>
  );
}
