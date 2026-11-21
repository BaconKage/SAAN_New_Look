'use client';

import { gsap } from 'gsap';
import { useEffect, useRef, useState } from 'react';

import { LOADED_EVENT } from '@/lib/utils';

import { AssemblyWall, TIMELINE } from './loader-wall';

const STATUS: [number, string][] = [
  [0, 'Assembling cabinets'],
  [TIMELINE.assemble, 'Locking the wall'],
  [TIMELINE.revealStart, 'Writing signal'],
  [TIMELINE.revealEnd, 'Signal locked'],
];

function markDone() {
  const w = window as unknown as { __saanLoaded?: boolean };
  if (w.__saanLoaded) return;
  w.__saanLoaded = true;
  window.dispatchEvent(new Event(LOADED_EVENT));
}

/**
 * Page loader, about three seconds: LED cabinets fly in and assemble into a
 * wall the size of the visitor's screen, the seams close, the wall writes
 * "SAAN", then the camera dives into one lit LED and comes out in the hero.
 *
 * Time only advances on rendered frames, so a tab opened in the background
 * plays the sequence when it is first seen rather than skipping it. Plays on
 * every full page load; moving between pages inside the site never replays it
 * because the root layout stays mounted. Skipped under reduced motion (boot
 * script in layout.tsx). React owns every node here.
 */
export function Preloader() {
  const root = useRef<HTMLDivElement>(null);
  const host = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const el = root.current;
    const hostEl = host.current;
    const html = document.documentElement;
    const reduce = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (!el || !hostEl || html.classList.contains('skip-loader') || reduce) {
      markDone();
      return;
    }
    (window as unknown as { __saanLoaderShown?: boolean }).__saanLoaderShown =
      true;

    const cv = document.createElement('canvas');
    cv.setAttribute('aria-hidden', 'true');
    cv.className = 'absolute inset-0 size-full';
    hostEl.appendChild(cv);
    let wall: AssemblyWall | null = null;
    try {
      wall = new AssemblyWall(cv);
    } catch {
      cv.remove();
      el.dataset.fallback = '1';
    }

    let disposed = false;
    const family =
      getComputedStyle(html).getPropertyValue('--font-archivo').trim() ||
      'sans-serif';
    Promise.race([
      document.fonts?.load(`italic 900 100px ${family}`).catch(() => undefined),
      new Promise((r) => setTimeout(r, 900)),
    ]).then(() => {
      if (!disposed && wall) wall.buildText(family);
    });
    const onResize = () => wall?.resize();
    window.addEventListener('resize', onResize);

    // --- Fixed timeline ---------------------------------------------------
    let t = 0;
    let last = 0;
    let raf = 0;
    let fallbackTween: gsap.core.Tween | null = null;
    const meta = el.querySelectorAll<HTMLElement>('[data-meta]');

    const frame = (now: number) => {
      if (disposed) return;
      // Cap each step so a stalled or hidden tab resumes instead of jumping ahead.
      t += last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;

      if (countRef.current)
        countRef.current.textContent = String(
          Math.round(Math.min(1, t / TIMELINE.revealEnd) * 100)
        ).padStart(3, '0');
      if (statusRef.current) {
        const s = [...STATUS].reverse().find(([at]) => t >= at)![1];
        if (statusRef.current.textContent !== s)
          statusRef.current.textContent = s;
      }
      const metaFade =
        1 - Math.min(1, Math.max(0, (t - TIMELINE.revealEnd) / 0.25));
      meta.forEach((m) => (m.style.opacity = String(metaFade)));

      if (wall) {
        wall.update(t);
        wall.render(now);
        if (t >= TIMELINE.done) markDone();
        el.style.opacity = String(
          1 -
            Math.min(
              1,
              Math.max(
                0,
                (t - TIMELINE.fadeStart) / (TIMELINE.end - TIMELINE.fadeStart)
              )
            )
        );
        if (t >= TIMELINE.end) {
          setGone(true);
          return;
        }
      } else if (t >= 1.6 && !fallbackTween) {
        markDone();
        fallbackTween = gsap.to(el, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
          onComplete: () => setGone(true),
        });
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    // Never hold the page hostage: if frames stall while the tab is visible, finish anyway.
    let failSafe: ReturnType<typeof setTimeout>;
    const arm = () =>
      setTimeout(() => {
        if (document.hidden) {
          failSafe = arm();
          return;
        }
        markDone();
        setGone(true);
      }, 6000);
    failSafe = arm();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(failSafe);
      fallbackTween?.kill();
      window.removeEventListener('resize', onResize);
      wall?.destroy();
      cv.remove();
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={root}
      data-preloader
      className="group/loader fixed inset-0 z-[70] hidden overflow-hidden bg-ink-950 [.js_&]:block [.skip-loader_&]:!hidden"
      role="status"
      aria-label="Loading SAAN Protocol Experts"
    >
      <div ref={host} className="absolute inset-0" />

      {/* Fallback without WebGL: the same word as LED type. */}
      <div className="led-grid absolute inset-0 hidden group-data-[fallback]/loader:block" />
      <p
        aria-hidden
        className="led-text absolute inset-0 hidden place-items-center text-[clamp(4rem,16vw,14rem)] font-black italic leading-none group-data-[fallback]/loader:grid"
        style={{ fontStretch: '125%' }}
      >
        SAAN
      </p>

      <div
        data-meta
        className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 p-6 font-mono text-[0.7rem] uppercase tracking-[0.14em] text-fog-400 md:p-10"
      >
        <span className="hidden sm:block">SAAN Protocol Experts</span>
        <span className="flex items-center gap-4">
          <span ref={countRef} className="tabular-nums text-fog-50">
            000
          </span>
          <span className="h-px w-10 bg-white/20" />
          <span ref={statusRef}>{STATUS[0]![1]}</span>
        </span>
        <span className="hidden sm:block">Bengaluru, since 2007</span>
      </div>
    </div>
  );
}
