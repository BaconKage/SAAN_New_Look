import { type ElementType } from 'react';

import { cn } from '@/lib/utils';

interface SplitProps {
  text: string;
  as?: ElementType;
  className?: string;
  /** Words (exact match) rendered in the accent colour and italic. */
  accent?: string[];
  /** Base delay in ms before the first word moves. */
  delay?: number;
  /** Force line breaks after these word indexes (0-based). */
  breaks?: number[];
  id?: string;
}

/**
 * Headline that reveals word by word as it scrolls into view. Server-rendered
 * plain text, so it stays readable and indexable without JavaScript.
 */
export function Split({ text, as: Tag = 'h2', className, accent = [], delay = 0, breaks = [], id }: SplitProps) {
  const words = text.split(' ');
  return (
    <Tag id={id} data-split="" className={className} style={{ ['--d' as string]: delay }} aria-label={text}>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden="true">
          <span className="w">
            <span
              style={{ ['--i' as string]: i }}
              className={cn(accent.includes(word) && 'text-signal-500 italic')}
            >
              {word}
            </span>
          </span>
          {breaks.includes(i) ? <br /> : i < words.length - 1 ? ' ' : null}
        </span>
      ))}
    </Tag>
  );
}
