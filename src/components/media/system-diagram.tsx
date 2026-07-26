import { cn } from '@/lib/utils';

/**
 * Simplified system architecture diagram.
 *
 * Renders as inline SVG from data, so it costs no image request, scales
 * losslessly, and stays legible at 320px. Signal paths animate along their
 * length under `motion-safe` only — the animation traces the direction of
 * signal flow, which is the one thing a static diagram cannot show. With
 * reduced motion the paths simply render solid.
 *
 * These are explanatory, not engineering drawings, and every instance carries
 * that disclaimer.
 */

export type NodeKind =
  | 'display'
  | 'camera'
  | 'microphone'
  | 'speaker'
  | 'control'
  | 'player'
  | 'network'
  | 'cloud'
  | 'source';

export interface DiagramNode {
  id: string;
  label: string;
  kind: NodeKind;
  /** Position on a 0-100 grid. */
  x: number;
  y: number;
}

export interface DiagramLink {
  from: string;
  to: string;
  /** `signal` carries AV, `data` carries control or network traffic. */
  type?: 'signal' | 'data';
}

export interface SystemDiagramData {
  nodes: DiagramNode[];
  links: DiagramLink[];
  caption: string;
}

/** Compact glyphs drawn on a 24x24 box, centred on the node. */
function NodeGlyph({ kind }: { kind: NodeKind }) {
  const stroke = 'currentColor';
  const common = {
    fill: 'none',
    stroke,
    strokeWidth: 1.4,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };

  switch (kind) {
    case 'display':
      return (
        <g {...common}>
          <rect x="-9" y="-7" width="18" height="12" rx="1" />
          <path d="M-4 8h8M0 5v3" />
        </g>
      );
    case 'camera':
      return (
        <g {...common}>
          <rect x="-9" y="-5" width="13" height="10" rx="1.5" />
          <path d="M4 -1l5 -3v8l-5 -3z" />
        </g>
      );
    case 'microphone':
      return (
        <g {...common}>
          <rect x="-3" y="-9" width="6" height="10" rx="3" />
          <path d="M-6 -1a6 6 0 0 0 12 0M0 5v4M-4 9h8" />
        </g>
      );
    case 'speaker':
      return (
        <g {...common}>
          <path d="M-8 -3h4l5 -4v14l-5 -4h-4z" />
          <path d="M5 -3a5 5 0 0 1 0 6" />
        </g>
      );
    case 'control':
      return (
        <g {...common}>
          <rect x="-9" y="-7" width="18" height="14" rx="1.5" />
          <path d="M-5 -3h10M-5 1h6" />
        </g>
      );
    case 'player':
      return (
        <g {...common}>
          <rect x="-9" y="-6" width="18" height="12" rx="1.5" />
          <path d="M-2 -2l5 2 -5 2z" />
        </g>
      );
    case 'network':
      return (
        <g {...common}>
          <rect x="-9" y="-4" width="18" height="8" rx="1.5" />
          <path d="M-5 0h.01M-1 0h.01M3 0h.01" strokeWidth={2} />
        </g>
      );
    case 'cloud':
      return (
        <g {...common}>
          <path d="M-7 4a4 4 0 0 1 .6 -7.9 5.5 5.5 0 0 1 10.6 1.2A3.5 3.5 0 0 1 7 4z" />
        </g>
      );
    case 'source':
    default:
      return (
        <g {...common}>
          <rect x="-8" y="-6" width="16" height="12" rx="1.5" />
          <path d="M-3 0h6" />
        </g>
      );
  }
}

export function SystemDiagram({
  data,
  tone = 'light',
  className,
  labelledBy,
}: {
  data: SystemDiagramData;
  tone?: 'light' | 'dark';
  className?: string;
  labelledBy?: string;
}) {
  const byId = new Map(data.nodes.map((node) => [node.id, node]));

  const line =
    tone === 'dark' ? 'rgb(255 255 255 / 0.14)' : 'var(--color-ink-200)';
  const nodeStroke =
    tone === 'dark' ? 'rgb(255 255 255 / 0.22)' : 'var(--color-ink-200)';
  const nodeFill =
    tone === 'dark' ? 'rgb(255 255 255 / 0.04)' : 'var(--color-ink-0)';
  const glyph =
    tone === 'dark' ? 'var(--color-ink-300)' : 'var(--color-ink-600)';
  const labelFill =
    tone === 'dark' ? 'var(--color-ink-300)' : 'var(--color-ink-600)';
  const signal =
    tone === 'dark' ? 'var(--color-amber-400)' : 'var(--color-amber-500)';
  const dataPath =
    tone === 'dark' ? 'var(--color-signal-300)' : 'var(--color-signal-500)';

  return (
    <figure className={cn('not-prose', className)}>
      <svg
        viewBox="0 0 100 64"
        className="w-full"
        role="img"
        aria-labelledby={labelledBy}
        aria-label={labelledBy ? undefined : data.caption}
      >
        {/* Architectural grid — the drafting-paper reference behind the system */}
        <g aria-hidden="true" opacity={tone === 'dark' ? 0.5 : 0.65}>
          {Array.from({ length: 11 }).map((_, index) => (
            <line
              key={`v${index}`}
              x1={index * 10}
              y1="0"
              x2={index * 10}
              y2="64"
              stroke={line}
              strokeWidth="0.15"
            />
          ))}
          {Array.from({ length: 7 }).map((_, index) => (
            <line
              key={`h${index}`}
              x1="0"
              y1={index * 10}
              x2="100"
              y2={index * 10}
              stroke={line}
              strokeWidth="0.15"
            />
          ))}
        </g>

        {/* Signal paths, drawn as orthogonal runs rather than curves — this is
            how cable routes actually behave in a building. */}
        <g aria-hidden="true">
          {data.links.map((link, index) => {
            const from = byId.get(link.from);
            const to = byId.get(link.to);
            if (!from || !to) return null;

            const midX = (from.x + to.x) / 2;
            const path = `M ${from.x} ${from.y} L ${midX} ${from.y} L ${midX} ${to.y} L ${to.x} ${to.y}`;
            const isData = link.type === 'data';

            return (
              <g key={`${link.from}-${link.to}-${index}`}>
                <path
                  d={path}
                  fill="none"
                  stroke={isData ? dataPath : signal}
                  strokeWidth="0.35"
                  opacity="0.35"
                />
                <path
                  d={path}
                  fill="none"
                  stroke={isData ? dataPath : signal}
                  strokeWidth="0.55"
                  strokeLinecap="round"
                  className="diagram-pulse"
                  style={{ animationDelay: `${index * 260}ms` }}
                />
              </g>
            );
          })}
        </g>

        {/* Nodes */}
        <g>
          {data.nodes.map((node) => (
            <g key={node.id} transform={`translate(${node.x} ${node.y})`}>
              <rect
                x="-7"
                y="-5.5"
                width="14"
                height="11"
                rx="1.2"
                fill={nodeFill}
                stroke={nodeStroke}
                strokeWidth="0.3"
              />
              <g transform="scale(0.28)" color={glyph}>
                <NodeGlyph kind={node.kind} />
              </g>
              <text
                y="9.6"
                textAnchor="middle"
                fill={labelFill}
                style={{
                  fontSize: '2.6px',
                  fontFamily: 'var(--font-mono)',
                  letterSpacing: '0.04em',
                }}
              >
                {node.label}
              </text>
            </g>
          ))}
        </g>
      </svg>

      <figcaption
        className={cn(
          'mt-5 text-[0.8125rem] leading-relaxed',
          tone === 'dark' ? 'text-ink-400' : 'text-ink-500'
        )}
      >
        {data.caption} Illustrative system overview — the final design follows a
        site assessment.
      </figcaption>
    </figure>
  );
}
