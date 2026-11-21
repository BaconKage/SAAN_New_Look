'use client';

import { useEffect, useRef } from 'react';

/** LED dot field that lights up around the pointer. CSS variables only, no re-renders. */
export function Spotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;
    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      el.style.setProperty('--x', `${e.clientX - r.left}px`);
      el.style.setProperty('--y', `${e.clientY - r.top}px`);
    };
    host.addEventListener('pointermove', move);
    return () => host.removeEventListener('pointermove', move);
  }, []);

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 [--x:70%] [--y:40%]">
      <div className="led-field absolute inset-0 opacity-50" />
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle at center, rgb(224 138 0) 1.4px, transparent 1.9px)',
          backgroundSize: '14px 14px',
          maskImage: 'radial-gradient(260px circle at var(--x) var(--y), black, transparent)',
          WebkitMaskImage: 'radial-gradient(260px circle at var(--x) var(--y), black, transparent)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(600px circle at var(--x) var(--y), rgb(224 138 0 / 0.09), transparent 60%)' }}
      />
    </div>
  );
}
