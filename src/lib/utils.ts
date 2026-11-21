import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Event fired once the preloader has finished (or was skipped). */
export const LOADED_EVENT = 'saan:loaded';

export function isSiteLoaded() {
  return typeof window !== 'undefined' && (window as unknown as { __saanLoaded?: boolean }).__saanLoaded === true;
}

export function onSiteLoaded(cb: () => void) {
  if (isSiteLoaded()) {
    cb();
    return () => {};
  }
  window.addEventListener(LOADED_EVENT, cb, { once: true });
  return () => window.removeEventListener(LOADED_EVENT, cb);
}
