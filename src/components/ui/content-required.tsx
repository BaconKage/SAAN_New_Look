import { AlertTriangle } from 'lucide-react';

import { contentRequired } from '@/lib/content-required';
import { cn } from '@/lib/utils';

/**
 * Visible marker for content SAAN has not yet supplied or confirmed.
 *
 * Deliberately conspicuous so it can never be mistaken for finished copy
 * during a client review, and never quietly shipped. `npm run audit:content`
 * reports every occurrence, and the launch build fails while any remain.
 */
export function ContentRequired({
  what,
  className,
}: {
  what: string;
  className?: string;
}) {
  return (
    <span className={cn('content-required', className)} role="note">
      <AlertTriangle
        width={14}
        height={14}
        strokeWidth={2}
        aria-hidden="true"
        focusable="false"
      />
      {contentRequired(what)}
    </span>
  );
}

/**
 * Block-level placeholder for a whole section whose content does not exist yet.
 *
 * Shows the real structure of the section without inventing content to fill
 * it — the brief prohibits fabricating customers, projects, partners or awards.
 */
export function ContentRequiredBlock({
  what,
  note,
  className,
}: {
  what: string;
  note: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-md border border-dashed border-amber-600/50 bg-amber-50 p-6 sm:p-8',
        className
      )}
    >
      <p className="text-eyebrow flex items-center gap-2 text-amber-800">
        <AlertTriangle
          width={14}
          height={14}
          strokeWidth={2}
          aria-hidden="true"
          focusable="false"
        />
        Content required
      </p>
      <p className="text-body mt-3 font-mono text-[0.9375rem] text-amber-900">
        {contentRequired(what)}
      </p>
      <p className="text-body-sm mt-3 max-w-2xl text-ink-600">{note}</p>
    </div>
  );
}
