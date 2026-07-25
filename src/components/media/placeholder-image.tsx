import { ImageIcon } from 'lucide-react';

import type { ImageSlot } from '@/content/schemas';
import { cn } from '@/lib/utils';

/**
 * Placeholder for an image slot SAAN has not supplied yet.
 *
 * It reserves the exact final aspect ratio, so layout and the CLS budget are
 * already correct before real photography arrives, and it states which slot it
 * is so the shot list in docs/IMAGE_REQUIREMENTS.md can be matched to it.
 *
 * No stock photograph is ever shown in place of SAAN's own work.
 */
export function PlaceholderImage({
  slot,
  className,
  showLabel = true,
}: {
  slot: ImageSlot;
  className?: string;
  showLabel?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative flex items-center justify-center overflow-hidden',
        'rounded-md border border-dashed border-ink-300 bg-ink-50',
        className
      )}
      style={{ aspectRatio: `${slot.width} / ${slot.height}` }}
      role="img"
      aria-label={slot.alt || 'Photograph to be supplied'}
    >
      {/* Fine keyline grid — reads as a technical placeholder, not a broken image */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            'linear-gradient(to right, var(--color-ink-200) 1px, transparent 1px), linear-gradient(to bottom, var(--color-ink-200) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {showLabel ? (
        <div className="relative flex flex-col items-center gap-2 px-4 text-center">
          <ImageIcon
            width={24}
            height={24}
            strokeWidth={1.5}
            className="text-ink-400"
            aria-hidden="true"
            focusable="false"
          />
          <p className="text-eyebrow text-ink-500">Image required</p>
          <p className="font-mono text-[0.75rem] leading-relaxed text-ink-500">
            {slot.id}
            <br />
            {slot.width}&times;{slot.height}
          </p>
        </div>
      ) : null}
    </div>
  );
}
