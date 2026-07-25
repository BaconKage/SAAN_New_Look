'use client';

import {
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from 'react';

import { cn } from '@/lib/utils';

/**
 * Scroll reveal.
 *
 * Deliberately built on IntersectionObserver and a CSS transition rather than
 * an animation library: it costs roughly 40 lines and no bundle, where a motion
 * library would ship tens of kilobytes to fade in some headings. An animation
 * library is added in Phase 6, where the configurator and the system-architecture
 * diagrams genuinely need orchestration.
 *
 * ACCESSIBILITY: the hidden initial state lives inside a
 * `prefers-reduced-motion: no-preference` media query in globals.css. When
 * reduced motion is set, the element is simply visible — it is never left at
 * `opacity: 0` waiting for an animation that will not run. This is the most
 * common bug in scroll-reveal implementations and it hides content from exactly
 * the users who opted out. Guarded by src/tests/e2e/reveal.motion.spec.ts.
 */
export function Reveal({
  children,
  as: Component = 'div',
  delay = 0,
  className,
}: {
  children: ReactNode;
  as?: ElementType;
  /** Stagger step, 0-4. Maps to a 60ms increment. */
  delay?: 0 | 1 | 2 | 3 | 4;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (element === null) return;

    // No IntersectionObserver: reveal on the next frame so the content is
    // never left hidden. Deferred rather than set synchronously, which would
    // cause a cascading render.
    if (typeof IntersectionObserver === 'undefined') {
      const frame = requestAnimationFrame(() => setRevealed(true));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setRevealed(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.05 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      data-reveal=""
      data-revealed={revealed ? 'true' : 'false'}
      data-reveal-delay={delay > 0 ? String(delay) : undefined}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
