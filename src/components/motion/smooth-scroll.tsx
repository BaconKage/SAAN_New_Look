'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

import { LOADED_EVENT, onSiteLoaded, prefersReducedMotion } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;
export const getLenis = () => lenisInstance;

/**
 * Lenis smooth scrolling synced to GSAP's ticker, plus the IntersectionObserver
 * that drives every [data-reveal] / [data-split] element on the page.
 */
export function SmoothScroll() {
  const pathname = usePathname();

  useEffect(() => {
    if (prefersReducedMotion()) return;
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 1, touchMultiplier: 1.4 });
    lenisInstance = lenis;
    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);

  // Reveal system. One long-lived observer pair: an IntersectionObserver that
  // marks elements `.is-in`, and a MutationObserver that registers any reveal
  // element React adds later (route changes, Suspense, filtered lists), so
  // content can never be left hidden.
  useEffect(() => {
    const seen = new WeakSet<Element>();
    // A fully clipped element reads as invisible to IntersectionObserver, so clip
    // reveals are observed through their parent and the class applied to the child.
    const proxies = new Map<Element, Element[]>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const t = entry.target;
          if (t.matches('[data-reveal]:not([data-reveal="clip"]), [data-split]')) t.classList.add('is-in');
          proxies.get(t)?.forEach((c) => c.classList.add('is-in'));
          proxies.delete(t);
          io.unobserve(t);
        }
      },
      { rootMargin: '0px 0px -6% 0px', threshold: 0 },
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>('[data-reveal]:not(.is-in), [data-split]:not(.is-in)').forEach((el) => {
        if (seen.has(el)) return;
        // The hero reveals itself after the preloader.
        if (el.closest('[data-reveal-manual]')) return;
        seen.add(el);
        // Already scrolled past (restored scroll, anchor links): show it, no animation needed.
        const target = el.dataset.reveal === 'clip' && el.parentElement ? el.parentElement : el;
        if (target.getBoundingClientRect().bottom < 0) {
          el.classList.add('is-in');
          return;
        }
        if (el.dataset.reveal === 'clip' && el.parentElement) {
          const p = el.parentElement;
          proxies.set(p, [...(proxies.get(p) ?? []), el]);
          io.observe(p);
        } else {
          io.observe(el);
        }
      });
    };

    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(scan, 30);
    };
    const mo = new MutationObserver(schedule);

    // Safety net: never wait on the preloader for more than a few seconds.
    const failSafe = setTimeout(() => {
      const w = window as unknown as { __saanLoaded?: boolean };
      if (!w.__saanLoaded) {
        w.__saanLoaded = true;
        window.dispatchEvent(new Event(LOADED_EVENT));
      }
    }, 5000);

    const off = onSiteLoaded(() => {
      scan();
      mo.observe(document.body, { childList: true, subtree: true });
    });

    return () => {
      off();
      clearTimeout(timer);
      clearTimeout(failSafe);
      mo.disconnect();
      io.disconnect();
    };
  }, []);

  // Route change: back to the top, then re-measure every ScrollTrigger once
  // the new page has laid out.
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const anchor = hash ? document.getElementById(decodeURIComponent(hash)) : null;
    if (!anchor) lenisInstance?.scrollTo(0, { immediate: true, force: true });
    const t = setTimeout(() => {
      ScrollTrigger.refresh();
      // Links like /about#recognition land on their section, below the fixed header.
      if (anchor) {
        if (lenisInstance) lenisInstance.scrollTo(anchor, { offset: -96, immediate: true, force: true });
        else anchor.scrollIntoView();
      }
    }, 120);
    return () => clearTimeout(t);
  }, [pathname]);

  return null;
}
