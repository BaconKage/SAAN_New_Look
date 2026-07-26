import { AlertTriangle } from 'lucide-react';

import { contentRequired } from '@/lib/content-required';
import { showContentTodos } from '@/lib/content-visibility';
import { cn } from '@/lib/utils';

/**
 * Marker for content SAAN has not yet supplied or confirmed.
 *
 * Renders NOTHING unless `SHOW_CONTENT_TODOS=true`. On a normal preview or
 * production build the missing field is omitted entirely rather than shown as
 * a placeholder — a visitor should never see scaffolding, and a fake or
 * example email address would be worse than no email address at all.
 *
 * Because these render nothing publicly, `npm run audit:content` and
 * `npm run validate:launch` are what keep the outstanding items visible to us.
 */
export function ContentRequired({
  what,
  className,
}: {
  what: string;
  className?: string;
}) {
  if (!showContentTodos()) return null;

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
 * Block-level marker for a section whose content does not exist yet.
 *
 * Also renders nothing publicly. Sections that would otherwise be empty use a
 * genuine editorial treatment instead — see `PreparingNote` — rather than
 * showing the visitor a warning box.
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
  if (!showContentTodos()) return null;

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

/**
 * Public-facing note for content that is genuinely being prepared.
 *
 * Deliberately quiet and editorial — a single line of muted text, never a
 * warning panel. Used where a section's structure is worth keeping visible
 * while its content is pending.
 */
export function PreparingNote({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'text-body-sm flex items-center gap-2.5 text-ink-500',
        className
      )}
    >
      <span aria-hidden="true" className="h-px w-6 shrink-0 bg-amber-500" />
      {children}
    </p>
  );
}
