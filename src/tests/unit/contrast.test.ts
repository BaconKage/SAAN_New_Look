import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { describe, expect, it } from 'vitest';

/**
 * Design-token contrast enforcement.
 *
 * Token values are read straight out of `tokens.css` rather than duplicated
 * into a TypeScript object, so there is exactly one source of truth and the
 * test cannot silently drift away from what the site actually renders.
 *
 * This encodes the binding colour rules from docs/DESIGN_SYSTEM.md §2 —
 * in particular that amber-500 is a fill colour and never a text colour on
 * white, which is the single easiest mistake to make with this palette.
 */

const tokensPath = fileURLToPath(
  new URL('../../styles/tokens.css', import.meta.url)
);
const tokensCss = readFileSync(tokensPath, 'utf8');

function readToken(name: string): string {
  const match = tokensCss.match(
    new RegExp(`--color-${name}:\\s*(#[0-9a-fA-F]{6})`)
  );
  if (match?.[1] === undefined) {
    throw new Error(`Token --color-${name} not found in tokens.css`);
  }
  return match[1];
}

function toLinear(channel: number): number {
  const c = channel / 255;
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex: string): number {
  const r = Number.parseInt(hex.slice(1, 3), 16);
  const g = Number.parseInt(hex.slice(3, 5), 16);
  const b = Number.parseInt(hex.slice(5, 7), 16);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

/** WCAG 2.x contrast ratio, 1:1 to 21:1. */
export function contrastRatio(foreground: string, background: string): number {
  const l1 = relativeLuminance(foreground);
  const l2 = relativeLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

interface Pairing {
  name: string;
  foreground: string;
  background: string;
  /** 4.5 for body text, 3 for large text and UI components. */
  minimum: number;
}

const pairings: Pairing[] = [
  // --- Body and heading text on light surfaces ---
  {
    name: 'ink-900 on white',
    foreground: 'ink-900',
    background: 'ink-0',
    minimum: 4.5,
  },
  {
    name: 'ink-800 on white',
    foreground: 'ink-800',
    background: 'ink-0',
    minimum: 4.5,
  },
  {
    name: 'ink-700 on white',
    foreground: 'ink-700',
    background: 'ink-0',
    minimum: 4.5,
  },
  {
    name: 'ink-600 on white',
    foreground: 'ink-600',
    background: 'ink-0',
    minimum: 4.5,
  },
  {
    name: 'ink-500 on white',
    foreground: 'ink-500',
    background: 'ink-0',
    minimum: 4.5,
  },
  {
    name: 'ink-900 on ink-25',
    foreground: 'ink-900',
    background: 'ink-25',
    minimum: 4.5,
  },
  {
    name: 'ink-600 on ink-25',
    foreground: 'ink-600',
    background: 'ink-25',
    minimum: 4.5,
  },
  {
    name: 'ink-500 on ink-25',
    foreground: 'ink-500',
    background: 'ink-25',
    minimum: 4.5,
  },
  {
    name: 'ink-600 on ink-50',
    foreground: 'ink-600',
    background: 'ink-50',
    minimum: 4.5,
  },

  // --- Amber text: MUST use amber-700 on light, never amber-500 ---
  {
    name: 'amber-700 on white',
    foreground: 'amber-700',
    background: 'ink-0',
    minimum: 4.5,
  },
  {
    name: 'amber-700 on ink-25',
    foreground: 'amber-700',
    background: 'ink-25',
    minimum: 4.5,
  },
  {
    name: 'amber-800 on amber-50',
    foreground: 'amber-800',
    background: 'amber-50',
    minimum: 4.5,
  },
  {
    name: 'amber-900 on amber-50',
    foreground: 'amber-900',
    background: 'amber-50',
    minimum: 4.5,
  },

  // --- Amber fills carry ink-900 text, never white ---
  {
    name: 'ink-900 on amber-500',
    foreground: 'ink-900',
    background: 'amber-500',
    minimum: 4.5,
  },
  {
    name: 'ink-900 on amber-600',
    foreground: 'ink-900',
    background: 'amber-600',
    minimum: 4.5,
  },

  // --- Primary and inverse buttons ---
  {
    name: 'white on ink-900 (primary button)',
    foreground: 'ink-0',
    background: 'ink-900',
    minimum: 4.5,
  },
  {
    name: 'white on ink-800 (primary hover)',
    foreground: 'ink-0',
    background: 'ink-800',
    minimum: 4.5,
  },
  {
    name: 'ink-900 on white (inverse button)',
    foreground: 'ink-900',
    background: 'ink-0',
    minimum: 4.5,
  },

  // --- Dark sections ---
  {
    name: 'white on ink-950',
    foreground: 'ink-0',
    background: 'ink-950',
    minimum: 4.5,
  },
  {
    name: 'ink-300 on ink-950',
    foreground: 'ink-300',
    background: 'ink-950',
    minimum: 4.5,
  },
  {
    name: 'ink-400 on ink-950',
    foreground: 'ink-400',
    background: 'ink-950',
    minimum: 4.5,
  },
  {
    name: 'amber-400 on ink-950',
    foreground: 'amber-400',
    background: 'ink-950',
    minimum: 4.5,
  },
  {
    name: 'amber-400 on ink-900',
    foreground: 'amber-400',
    background: 'ink-900',
    minimum: 4.5,
  },
  {
    // The footer legal bar. ink-500 was used here originally and is only
    // 3.48:1 on ink-950 — it failed the axe sweep, not this table, which is
    // why the dark-surface pairings are now enumerated explicitly.
    name: 'ink-400 on ink-950 (footer legal bar)',
    foreground: 'ink-400',
    background: 'ink-950',
    minimum: 4.5,
  },

  // --- Semantic ---
  {
    name: 'success-600 on white',
    foreground: 'success-600',
    background: 'ink-0',
    minimum: 4.5,
  },
  {
    name: 'danger-600 on white',
    foreground: 'danger-600',
    background: 'ink-0',
    minimum: 4.5,
  },
  {
    name: 'warning-600 on white',
    foreground: 'warning-600',
    background: 'ink-0',
    minimum: 4.5,
  },
  {
    name: 'info-600 on white',
    foreground: 'info-600',
    background: 'ink-0',
    minimum: 4.5,
  },
  {
    name: 'signal-500 on white',
    foreground: 'signal-500',
    background: 'ink-0',
    minimum: 4.5,
  },

  // --- Non-text UI: WCAG 2.2 SC 1.4.11 requires 3:1 ---
  {
    name: 'amber-600 focus ring on white',
    foreground: 'amber-600',
    background: 'ink-0',
    minimum: 3,
  },
  {
    name: 'amber-600 focus ring on ink-25',
    foreground: 'amber-600',
    background: 'ink-25',
    minimum: 3,
  },
  {
    name: 'amber-600 focus ring on ink-50',
    foreground: 'amber-600',
    background: 'ink-50',
    minimum: 3,
  },
  {
    name: 'amber-400 focus ring on ink-950',
    foreground: 'amber-400',
    background: 'ink-950',
    minimum: 3,
  },
  {
    name: 'ink-300 border on white',
    foreground: 'ink-300',
    background: 'ink-0',
    minimum: 1.5,
  },
];

describe('design token contrast (WCAG 2.2 AA)', () => {
  for (const pairing of pairings) {
    it(`${pairing.name} meets ${pairing.minimum}:1`, () => {
      const ratio = contrastRatio(
        readToken(pairing.foreground),
        readToken(pairing.background)
      );
      expect(
        Number(ratio.toFixed(2)),
        `${pairing.name} was ${ratio.toFixed(2)}:1`
      ).toBeGreaterThanOrEqual(pairing.minimum);
    });
  }
});

describe('amber usage rules', () => {
  it('amber-500 fails AA as body text on white, which is why it is fill-only', () => {
    // Documents the constraint rather than asserting compliance: if this ever
    // starts passing, the brand colour has been changed and the "amber is a
    // fill, not a text colour" rule in DESIGN_SYSTEM.md §2 needs revisiting.
    const ratio = contrastRatio(readToken('amber-500'), readToken('ink-0'));
    expect(ratio).toBeLessThan(4.5);
  });

  it('amber-500 also fails the 3:1 non-text threshold on white', () => {
    // Discovered by this test during Phase 2: the focus ring was originally
    // specified as amber-500, which is only 2.72:1 on white and therefore
    // fails WCAG 2.2 SC 1.4.11. The ring now uses amber-600. amber-500 remains
    // valid for large fills, where it sits under ink-900 text rather than
    // acting as the contrasting element itself.
    const ratio = contrastRatio(readToken('amber-500'), readToken('ink-0'));
    expect(ratio).toBeLessThan(3);
  });

  it('the brand amber matches the value sampled from the SAAN logo', () => {
    expect(readToken('amber-500').toLowerCase()).toBe('#e38700');
  });
});
