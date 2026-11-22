'use client';

import { useId, useState } from 'react';

import { Icon } from '@/components/ui/icon';
import type {
  CycleDiagram,
  DiagramNode,
  FlowDiagram,
  RoomDiagram,
  SystemDiagram,
} from '@/content/diagrams';
import type { Solution } from '@/content/solutions';
import { cn } from '@/lib/utils';

/*
 * "Inside a typical system": an architecture diagram of the solution with a
 * numbered key. Hovering a key item lights up its parts of the diagram, and
 * hovering a numbered part lights up its key item. Desktop gets a wide layout,
 * phones a vertical one; both are plain SVG in the site's ink and amber.
 */

const AMBER = 'var(--color-signal-500)';
const AMBER_SOFT = 'var(--color-signal-400)';
const INK_950 = 'var(--color-ink-950)';
const INK_850 = 'var(--color-ink-850)';
const FOG_50 = 'var(--color-fog-50)';
const FOG_200 = 'var(--color-fog-200)';
const FOG_400 = 'var(--color-fog-400)';
const FOG_500 = 'var(--color-fog-500)';
const LINE = 'rgb(255 255 255 / 0.13)';

type Active = number | null;
interface Hover {
  active: Active;
  setActive: (n: Active) => void;
}

// ---------------------------------------------------------------------------
// Shared pieces

function Defs({ uid }: { uid: string }) {
  return (
    <defs>
      <pattern
        id={`${uid}-dots`}
        width="16"
        height="16"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="1" cy="1" r="1" fill="rgb(255 255 255 / 0.055)" />
      </pattern>
      <radialGradient id={`${uid}-glow`}>
        <stop offset="0" stopColor="rgb(224 138 0 / 0.28)" />
        <stop offset="1" stopColor="rgb(224 138 0 / 0)" />
      </radialGradient>
    </defs>
  );
}

function Badge({
  n,
  x,
  y,
  r = 11,
}: {
  n: number;
  x: number;
  y: number;
  r?: number;
}) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={r} fill={AMBER} />
      <text
        textAnchor="middle"
        dy="0.36em"
        fontSize={r * 1.05}
        fontWeight={700}
        fill={INK_950}
        className="font-mono"
      >
        {n}
      </text>
    </g>
  );
}

function Node({
  uid,
  n,
  x,
  y,
  w,
  h,
  hover,
}: {
  uid: string;
  n: DiagramNode;
  x: number;
  y: number;
  w: number;
  h: number;
  hover: Hover;
}) {
  const ctx = n.kind === 'context';
  const core = n.kind === 'core';
  const on = n.ref != null && hover.active === n.ref;
  const dim = hover.active != null && !on;
  const iconBox = 40;
  return (
    <g
      transform={`translate(${x} ${y})`}
      opacity={dim ? 0.32 : 1}
      className="transition-opacity duration-300"
      onMouseEnter={n.ref != null ? () => hover.setActive(n.ref!) : undefined}
      onMouseLeave={n.ref != null ? () => hover.setActive(null) : undefined}
      style={n.ref != null ? { cursor: 'default' } : undefined}
    >
      {(core || on) && (
        <rect
          x={-40}
          y={-30}
          width={w + 80}
          height={h + 60}
          fill={`url(#${uid}-glow)`}
        />
      )}
      <rect
        width={w}
        height={h}
        rx={16}
        fill={ctx ? 'rgb(255 255 255 / 0.015)' : INK_850}
        stroke={
          on || core
            ? AMBER
            : ctx
              ? 'rgb(255 255 255 / 0.24)'
              : 'rgb(255 255 255 / 0.11)'
        }
        strokeOpacity={core && !on ? 0.65 : 1}
        strokeWidth={on ? 1.75 : 1}
        strokeDasharray={ctx ? '4 5' : undefined}
      />
      <rect
        x={14}
        y={(h - iconBox) / 2}
        width={iconBox}
        height={iconBox}
        rx={11}
        fill={ctx ? 'none' : 'rgb(255 255 255 / 0.035)'}
        stroke="rgb(255 255 255 / 0.1)"
      />
      <Icon
        name={n.icon}
        x={14 + 9}
        y={(h - iconBox) / 2 + 9}
        size={22}
        color={ctx ? FOG_400 : AMBER_SOFT}
      />
      <text
        x={68}
        y={n.sub ? h / 2 - 4 : h / 2 + 5}
        fontSize={15}
        fontWeight={600}
        fill={ctx ? FOG_200 : FOG_50}
      >
        {n.label}
      </text>
      {n.sub && (
        <text x={68} y={h / 2 + 15} fontSize={12} fill={FOG_400}>
          {n.sub}
        </text>
      )}
      {n.ref != null && <Badge n={n.ref} x={w - 18} y={18} />}
    </g>
  );
}

/** A link: a faint line with amber signal dots flowing along it. */
function Link({
  d,
  lit,
  dim,
  ends,
}: {
  d: string;
  lit: boolean;
  dim: boolean;
  /** Draw ports at both ends: x1, y1, x2, y2. */
  ends?: [number, number, number, number];
}) {
  return (
    <g opacity={dim ? 0.25 : 1} className="transition-opacity duration-300">
      <path d={d} fill="none" stroke={LINE} strokeWidth={1.5} />
      <path
        d={d}
        fill="none"
        stroke={AMBER}
        strokeWidth={lit ? 3 : 2.4}
        strokeLinecap="round"
        className="signal-flow"
      />
      {ends && (
        <>
          <Port x={ends[0]} y={ends[1]} />
          <Port x={ends[2]} y={ends[3]} />
        </>
      )}
    </g>
  );
}

function Port({ x, y }: { x: number; y: number }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={3.5}
      fill={INK_950}
      stroke="rgb(255 255 255 / 0.4)"
    />
  );
}

// ---------------------------------------------------------------------------
// Flow diagrams

const NW = 256;
const NH = 76;

function flowDesktop(d: FlowDiagram) {
  const W = 1200;
  const PAD = 28;
  const GAP = 28;
  const TITLE = 54;
  const GY = 20;
  const n = d.lanes.length;
  const laneW = (W - 2 * PAD - (n - 1) * GAP) / n;
  const max = Math.max(...d.lanes.map((l) => l.nodes.length));
  const areaH = max * NH + (max - 1) * GY;
  const top = PAD + TITLE;
  const H = top + areaH + PAD + 10;
  const lanes = d.lanes.map((l, i) => ({
    title: l.title,
    x: PAD + i * (laneW + GAP),
    y: PAD,
    w: laneW,
    h: H - 2 * PAD,
  }));
  const pos = new Map<string, { x: number; y: number; lane: number }>();
  d.lanes.forEach((l, i) => {
    const h = l.nodes.length * NH + (l.nodes.length - 1) * GY;
    const y0 = top + (areaH - h) / 2;
    l.nodes.forEach((nd, j) =>
      pos.set(nd.id, {
        x: lanes[i]!.x + (laneW - NW) / 2,
        y: y0 + j * (NH + GY),
        lane: i,
      })
    );
  });
  return { W, H, lanes, pos };
}

function FlowDesktop({
  d,
  hover,
  uid,
}: {
  d: FlowDiagram;
  hover: Hover;
  uid: string;
}) {
  const { W, H, lanes, pos } = flowDesktop(d);
  const nodes = d.lanes.flatMap((l) => l.nodes);
  const refOf = (id: string) => nodes.find((x) => x.id === id)?.ref;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-auto w-full"
      role="img"
      aria-label={d.caption}
    >
      <Defs uid={uid} />
      <rect width={W} height={H} fill={`url(#${uid}-dots)`} />
      {lanes.map((l) => (
        <g key={l.title}>
          <rect
            x={l.x}
            y={l.y}
            width={l.w}
            height={l.h}
            rx={22}
            fill="rgb(255 255 255 / 0.018)"
            stroke="rgb(255 255 255 / 0.05)"
          />
          <text
            x={l.x + l.w / 2}
            y={l.y + 32}
            textAnchor="middle"
            fontSize={11}
            letterSpacing={1.8}
            fill={FOG_500}
            className="font-mono uppercase"
          >
            {l.title.toUpperCase()}
          </text>
        </g>
      ))}
      {d.links.map(([a, b]) => {
        const p = pos.get(a)!;
        const q = pos.get(b)!;
        let path: string;
        let ends: [number, number, number, number];
        if (p.lane === q.lane) {
          const x = p.x + NW / 2;
          const down = p.y < q.y;
          const y1 = down ? p.y + NH : p.y;
          const y2 = down ? q.y : q.y + NH;
          path = `M${x} ${y1} L${x} ${y2}`;
          ends = [x, y1, x, y2];
        } else {
          const x1 = p.x + NW;
          const y1 = p.y + NH / 2;
          const x2 = q.x;
          const y2 = q.y + NH / 2;
          const dx = (x2 - x1) / 2;
          path = `M${x1} ${y1} C${x1 + dx} ${y1} ${x2 - dx} ${y2} ${x2} ${y2}`;
          ends = [x1, y1, x2, y2];
        }
        const lit =
          hover.active != null &&
          (refOf(a) === hover.active || refOf(b) === hover.active);
        return (
          <Link
            key={`${a}-${b}`}
            d={path}
            lit={lit}
            dim={hover.active != null && !lit}
            ends={ends}
          />
        );
      })}
      {nodes.map((n) => {
        const p = pos.get(n.id)!;
        return (
          <Node
            key={n.id}
            uid={uid}
            n={n}
            x={p.x}
            y={p.y}
            w={NW}
            h={NH}
            hover={hover}
          />
        );
      })}
    </svg>
  );
}

function FlowMobile({
  d,
  hover,
  uid,
}: {
  d: FlowDiagram;
  hover: Hover;
  uid: string;
}) {
  const W = 400;
  const X = 22;
  const w = W - 2 * X;
  const h = 70;
  const GY = 10;
  const TITLE = 36;
  const PADL = 14;
  const JOIN = 46;
  const blocks: {
    lane: FlowDiagram['lanes'][number];
    top: number;
    height: number;
    nodesTop: number;
  }[] = [];
  for (const l of d.lanes) {
    const prev = blocks[blocks.length - 1];
    const top = prev ? prev.top + prev.height + JOIN : 16;
    const height =
      TITLE + l.nodes.length * h + (l.nodes.length - 1) * GY + PADL;
    blocks.push({ lane: l, top, height, nodesTop: top + TITLE });
  }
  const last = blocks[blocks.length - 1]!;
  const H = last.top + last.height + 16;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="mx-auto block h-auto w-full max-w-[460px]"
      role="img"
      aria-label={d.caption}
    >
      <Defs uid={uid} />
      <rect width={W} height={H} fill={`url(#${uid}-dots)`} />
      {blocks.map((b, i) => (
        <g key={b.lane.title}>
          <rect
            x={X - 10}
            y={b.top}
            width={w + 20}
            height={b.height}
            rx={20}
            fill="rgb(255 255 255 / 0.018)"
            stroke="rgb(255 255 255 / 0.05)"
          />
          <text
            x={W / 2}
            y={b.top + 23}
            textAnchor="middle"
            fontSize={11}
            letterSpacing={1.8}
            fill={FOG_500}
            className="font-mono"
          >
            {b.lane.title.toUpperCase()}
          </text>
          {i < blocks.length - 1 && (
            <>
              <Link
                d={`M${W / 2} ${b.top + b.height} L${W / 2} ${blocks[i + 1]!.top}`}
                lit={false}
                dim={false}
              />
              <Port x={W / 2} y={b.top + b.height} />
              <Port x={W / 2} y={blocks[i + 1]!.top} />
            </>
          )}
          {b.lane.nodes.map((n, j) => (
            <Node
              key={n.id}
              uid={uid}
              n={n}
              x={X}
              y={b.nodesTop + j * (h + GY)}
              w={w}
              h={h}
              hover={hover}
            />
          ))}
        </g>
      ))}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Cycle diagram (support)

function CycleDesktop({
  d,
  hover,
  uid,
}: {
  d: CycleDiagram;
  hover: Hover;
  uid: string;
}) {
  const W = 1200;
  const H = 580;
  const cx = 600;
  const cy = 290;
  const rx = 400;
  const ry = 200;
  const w = 286;
  const pts = [
    [cx, cy - ry],
    [cx + rx, cy],
    [cx, cy + ry],
    [cx - rx, cy],
  ] as const;
  const ring = `M${cx} ${cy - ry} A${rx} ${ry} 0 0 1 ${cx + rx} ${cy} A${rx} ${ry} 0 0 1 ${cx} ${cy + ry} A${rx} ${ry} 0 0 1 ${cx - rx} ${cy} A${rx} ${ry} 0 0 1 ${cx} ${cy - ry}`;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="block h-auto w-full"
      role="img"
      aria-label={d.caption}
    >
      <Defs uid={uid} />
      <rect width={W} height={H} fill={`url(#${uid}-dots)`} />
      <Link d={ring} lit={false} dim={false} />
      {pts.map(([x, y], i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={x}
          y2={y}
          stroke="rgb(255 255 255 / 0.1)"
          strokeDasharray="3 7"
        />
      ))}
      <circle cx={cx} cy={cy} r={170} fill={`url(#${uid}-glow)`} />
      <circle
        cx={cx}
        cy={cy}
        r={96}
        fill={INK_850}
        stroke={AMBER}
        strokeOpacity={0.6}
      />
      <text
        x={cx}
        y={cy - 12}
        textAnchor="middle"
        fontSize={18}
        fontWeight={600}
        fill={FOG_50}
      >
        {d.hub.label[0]}
      </text>
      <text
        x={cx}
        y={cy + 11}
        textAnchor="middle"
        fontSize={18}
        fontWeight={600}
        fill={FOG_50}
      >
        {d.hub.label[1]}
      </text>
      <text x={cx} y={cy + 36} textAnchor="middle" fontSize={12} fill={FOG_400}>
        {d.hub.sub}
      </text>
      {d.nodes.map((n, i) => {
        const [x, y] = pts[i]!;
        return (
          <Node
            key={n.id}
            uid={uid}
            n={n}
            x={x - w / 2}
            y={y - NH / 2}
            w={w}
            h={NH}
            hover={hover}
          />
        );
      })}
    </svg>
  );
}

function CycleMobile({
  d,
  hover,
  uid,
}: {
  d: CycleDiagram;
  hover: Hover;
  uid: string;
}) {
  const W = 400;
  const X = 58;
  const w = W - X - 18;
  const h = 70;
  const GY = 26;
  const top = 108;
  const ys = d.nodes.map((_, i) => top + i * (h + GY));
  const H = ys[ys.length - 1]! + h + 24;
  const railX = 28;
  const firstY = ys[0]! + h / 2;
  const lastY = ys[ys.length - 1]! + h / 2;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="mx-auto block h-auto w-full max-w-[460px]"
      role="img"
      aria-label={d.caption}
    >
      <Defs uid={uid} />
      <rect width={W} height={H} fill={`url(#${uid}-dots)`} />
      <rect
        x={18}
        y={14}
        width={W - 36}
        height={68}
        rx={34}
        fill={INK_850}
        stroke={AMBER}
        strokeOpacity={0.6}
      />
      <text
        x={W / 2}
        y={44}
        textAnchor="middle"
        fontSize={16}
        fontWeight={600}
        fill={FOG_50}
      >
        {d.hub.label.join(' ')}
      </text>
      <text x={W / 2} y={64} textAnchor="middle" fontSize={12} fill={FOG_400}>
        {d.hub.sub}
      </text>
      {/* Down through each step, then back up the rail to start again. */}
      {ys.slice(0, -1).map((y, i) => (
        <Link
          key={i}
          d={`M${X + w / 2} ${y + h} L${X + w / 2} ${ys[i + 1]}`}
          lit={false}
          dim={false}
        />
      ))}
      <Link
        d={`M${X} ${lastY} L${railX + 12} ${lastY} Q${railX} ${lastY} ${railX} ${lastY - 12} L${railX} ${firstY + 12} Q${railX} ${firstY} ${railX + 12} ${firstY} L${X} ${firstY}`}
        lit={false}
        dim={false}
      />
      {d.nodes.map((n, i) => (
        <Node
          key={n.id}
          uid={uid}
          n={n}
          x={X}
          y={ys[i]!}
          w={w}
          h={h}
          hover={hover}
        />
      ))}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Room cutaway (acoustics & interiors)

function RoomCutaway({
  d,
  hover,
  uid,
  W,
  H,
  labels,
}: {
  d: RoomDiagram;
  hover: Hover;
  uid: string;
  W: number;
  H: number;
  labels: boolean;
}) {
  const m = W > 800 ? 56 : 18;
  const N = { l: m, r: W - m, t: m * 0.6 + 10, b: H - m * 0.6 - 10 };
  const Nw = N.r - N.l;
  const Nh = N.b - N.t;
  const VP = { x: W / 2, y: N.t + Nh * 0.42 };
  const k = 0.42;
  const scale = (s: number) => 1 / (1 + s * (1 / k - 1));
  const P = (xn: number, yn: number, s: number) => {
    const f = scale(s);
    return [VP.x + (xn - VP.x) * f, VP.y + (yn - VP.y) * f] as const;
  };
  const pt = (xn: number, yn: number, s: number) => P(xn, yn, s).join(' ');
  const poly = (pts: (readonly [number, number])[]) =>
    pts.map((p) => p.join(',')).join(' ');
  const B = {
    l: P(N.l, N.t, 1)[0],
    t: P(N.l, N.t, 1)[1],
    r: P(N.r, N.b, 1)[0],
    b: P(N.r, N.b, 1)[1],
  };

  const a = hover.active;
  const lit = (n: number) => a === n;
  const dim = (n: number) => a != null && a !== n;
  const grp = (n: number) => ({
    opacity: dim(n) ? 0.3 : 1,
    className: 'transition-opacity duration-300',
    onMouseEnter: () => hover.setActive(n),
    onMouseLeave: () => hover.setActive(null),
  });

  // Ceiling grid lines
  const cols = W > 800 ? 10 : 6;
  const depthSteps = [0.12, 0.27, 0.44, 0.63, 0.83];
  // Seating rows (back to front so near chairs overlap far ones)
  const rows = W > 800 ? [0.78, 0.6, 0.42, 0.24] : [0.72, 0.48, 0.24];
  const seatsX =
    W > 800 ? [0.2, 0.32, 0.44, 0.56, 0.68, 0.8] : [0.24, 0.42, 0.6, 0.78];
  // Speech source at the lectern
  const lect = { xn: N.l + Nw * 0.25, s: 0.9 };
  const mouth = P(lect.xn + Nw * 0.03, N.b - Nh * 0.3, lect.s);
  const R = Nw * 0.36;

  const amberLine = (n: number) =>
    lit(n) ? 'rgb(242 169 46 / 0.95)' : 'rgb(224 138 0 / 0.5)';

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className={cn('block h-auto w-full', W < 800 && 'mx-auto max-w-[520px]')}
      role="img"
      aria-label={d.caption}
    >
      <Defs uid={uid} />
      <clipPath id={`${uid}-room`}>
        <rect x={N.l} y={N.t} width={Nw} height={Nh} />
      </clipPath>
      <rect width={W} height={H} fill={`url(#${uid}-dots)`} />

      {/* Back wall: the teaching wall, with screen and boards */}
      <rect
        x={B.l}
        y={B.t}
        width={B.r - B.l}
        height={B.b - B.t}
        fill="#14161b"
        stroke="rgb(255 255 255 / 0.12)"
      />
      {(() => {
        const s1 = P(VP.x - Nw * 0.17, N.t + Nh * 0.2, 1);
        const s2 = P(VP.x + Nw * 0.17, N.t + Nh * 0.52, 1);
        const wb1 = P(VP.x - Nw * 0.36, N.t + Nh * 0.26, 1);
        const wb2 = P(VP.x - Nw * 0.2, N.t + Nh * 0.5, 1);
        const wb3 = P(VP.x + Nw * 0.2, N.t + Nh * 0.26, 1);
        const wb4 = P(VP.x + Nw * 0.36, N.t + Nh * 0.5, 1);
        return (
          <g>
            <rect
              x={s1[0]}
              y={s1[1]}
              width={s2[0] - s1[0]}
              height={s2[1] - s1[1]}
              fill="rgb(224 138 0 / 0.16)"
              stroke="rgb(224 138 0 / 0.55)"
            />
            <rect
              x={wb1[0]}
              y={wb1[1]}
              width={wb2[0] - wb1[0]}
              height={wb2[1] - wb1[1]}
              fill="rgb(255 255 255 / 0.05)"
              stroke="rgb(255 255 255 / 0.2)"
            />
            <rect
              x={wb3[0]}
              y={wb3[1]}
              width={wb4[0] - wb3[0]}
              height={wb4[1] - wb3[1]}
              fill="rgb(255 255 255 / 0.05)"
              stroke="rgb(255 255 255 / 0.2)"
            />
          </g>
        );
      })()}

      {/* 2: ceiling */}
      <g {...grp(2)}>
        <polygon
          points={poly([
            P(N.l, N.t, 0),
            P(N.r, N.t, 0),
            P(N.r, N.t, 1),
            P(N.l, N.t, 1),
          ])}
          fill={lit(2) ? 'rgb(224 138 0 / 0.08)' : '#101216'}
        />
        {Array.from({ length: cols - 1 }, (_, i) => {
          const xn = N.l + (Nw * (i + 1)) / cols;
          return (
            <path
              key={i}
              d={`M${pt(xn, N.t, 0)} L${pt(xn, N.t, 1)}`}
              stroke={
                lit(2) ? 'rgb(242 169 46 / 0.6)' : 'rgb(255 255 255 / 0.11)'
              }
            />
          );
        })}
        {depthSteps.map((s) => (
          <path
            key={s}
            d={`M${pt(N.l, N.t, s)} L${pt(N.r, N.t, s)}`}
            stroke={
              lit(2) ? 'rgb(242 169 46 / 0.6)' : 'rgb(255 255 255 / 0.11)'
            }
          />
        ))}
      </g>

      {/* 3: floor */}
      <g {...grp(3)}>
        <polygon
          points={poly([
            P(N.l, N.b, 0),
            P(N.r, N.b, 0),
            P(N.r, N.b, 1),
            P(N.l, N.b, 1),
          ])}
          fill={lit(3) ? 'rgb(224 138 0 / 0.12)' : '#17120c'}
        />
        {Array.from({ length: (W > 800 ? 18 : 10) - 1 }, (_, i) => {
          const xn = N.l + (Nw * (i + 1)) / (W > 800 ? 18 : 10);
          return (
            <path
              key={i}
              d={`M${pt(xn, N.b, 0)} L${pt(xn, N.b, 1)}`}
              stroke={
                lit(3) ? 'rgb(242 169 46 / 0.55)' : 'rgb(224 138 0 / 0.16)'
              }
            />
          );
        })}
      </g>

      {/* 1: walls, slats on the left, fabric panels on the right */}
      <g {...grp(1)}>
        <polygon
          points={poly([
            P(N.l, N.t, 0),
            P(N.l, N.t, 1),
            P(N.l, N.b, 1),
            P(N.l, N.b, 0),
          ])}
          fill="#121418"
        />
        <polygon
          points={poly([
            P(N.r, N.t, 0),
            P(N.r, N.t, 1),
            P(N.r, N.b, 1),
            P(N.r, N.b, 0),
          ])}
          fill="#121418"
        />
        {Array.from({ length: W > 800 ? 30 : 18 }, (_, i) => {
          const n = W > 800 ? 30 : 18;
          const s = 0.05 + (0.9 * i) / (n - 1);
          return (
            <path
              key={i}
              d={`M${pt(N.l, N.t + Nh * 0.14, s)} L${pt(N.l, N.b - Nh * 0.2, s)}`}
              stroke={amberLine(1)}
              strokeWidth={(W > 800 ? 5 : 3.5) * scale(s)}
              strokeLinecap="round"
            />
          );
        })}
        {[
          [0.06, 0.3],
          [0.38, 0.6],
          [0.68, 0.9],
        ].map(([s1, s2]) => (
          <polygon
            key={s1}
            points={poly([
              P(N.r, N.t + Nh * 0.16, s1!),
              P(N.r, N.t + Nh * 0.16, s2!),
              P(N.r, N.b - Nh * 0.24, s2!),
              P(N.r, N.b - Nh * 0.24, s1!),
            ])}
            fill={lit(1) ? 'rgb(224 138 0 / 0.28)' : 'rgb(224 138 0 / 0.12)'}
            stroke={amberLine(1)}
          />
        ))}
      </g>

      {/* Lectern */}
      {(() => {
        const f1 = P(lect.xn, N.b - Nh * 0.2, lect.s);
        const f2 = P(lect.xn + Nw * 0.07, N.b, lect.s);
        return (
          <rect
            x={f1[0]}
            y={f1[1]}
            width={f2[0] - f1[0]}
            height={f2[1] - f1[1]}
            rx={2}
            fill="#24272e"
            stroke="rgb(255 255 255 / 0.3)"
          />
        );
      })()}

      {/* Speech, absorbed before it can echo */}
      <g clipPath={`url(#${uid}-room)`}>
        {[0, 1, 2].map((i) => (
          <ellipse
            key={i}
            cx={mouth[0]}
            cy={mouth[1]}
            rx={R}
            ry={R * 0.5}
            fill="none"
            stroke={AMBER}
            strokeWidth={1.5}
            className="sound-wave"
            style={{
              animationDelay: `${i * 1.1}s`,
              transformOrigin: `${mouth[0]}px ${mouth[1]}px`,
            }}
          />
        ))}
      </g>

      {/* 4: seating */}
      <g {...grp(4)}>
        {rows.map((s) =>
          seatsX.map((u) => {
            const [x, y] = P(N.l + Nw * u, N.b - Nh * 0.02, s);
            const c = scale(s) * (W > 800 ? 1.25 : 0.95);
            const st = lit(4)
              ? 'rgb(242 169 46 / 0.9)'
              : 'rgb(255 255 255 / 0.22)';
            return (
              <g
                key={`${s}-${u}`}
                transform={`translate(${x} ${y}) scale(${c})`}
              >
                <line
                  x1={-12}
                  y1={0}
                  x2={-12}
                  y2={-16}
                  stroke={st}
                  strokeWidth={2}
                />
                <line
                  x1={12}
                  y1={0}
                  x2={12}
                  y2={-16}
                  stroke={st}
                  strokeWidth={2}
                />
                <rect
                  x={-17}
                  y={-22}
                  width={34}
                  height={7}
                  rx={3}
                  fill="#24272e"
                  stroke={st}
                />
                <rect
                  x={-15}
                  y={-48}
                  width={30}
                  height={26}
                  rx={6}
                  fill="#2a2d35"
                  stroke={st}
                />
                <rect
                  x={12}
                  y={-30}
                  width={18}
                  height={5}
                  rx={2}
                  fill={lit(4) ? AMBER : 'rgb(224 138 0 / 0.55)'}
                />
              </g>
            );
          })
        )}
      </g>

      {/* Section cut: the near frame and corner edges */}
      <rect
        x={N.l}
        y={N.t}
        width={Nw}
        height={Nh}
        fill="none"
        stroke="rgb(255 255 255 / 0.16)"
        strokeWidth={1.5}
      />
      {[
        [N.l, N.t],
        [N.r, N.t],
        [N.r, N.b],
        [N.l, N.b],
      ].map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          d={`M${x} ${y} L${pt(x!, y!, 1)}`}
          stroke="rgb(255 255 255 / 0.14)"
        />
      ))}

      {/* Callouts */}
      {(() => {
        const r = W > 800 ? 14 : 15;
        const spots: [number, readonly [number, number]][] = [
          [1, P(N.l, N.t + Nh * 0.45, 0.22)],
          [1, P(N.r, N.t + Nh * 0.42, 0.18)],
          [2, P(VP.x + Nw * 0.12, N.t, 0.18)],
          [3, P(N.l + Nw * 0.1, N.b, 0.06)],
          [4, P(N.l + Nw * 0.86, N.b - Nh * 0.16, 0.24)],
        ];
        return spots.map(([n, [x, y]], i) => {
          const label = d.labels[n - 1]!;
          const right = x < W / 2;
          const tw = label.length * 7.4 + 22;
          return (
            <g key={i} {...grp(n)}>
              {labels && (n !== 1 || i === 0) && (
                <g
                  transform={`translate(${right ? x + r + 8 : x - r - 8 - tw} ${y - 13})`}
                >
                  <rect
                    width={tw}
                    height={26}
                    rx={13}
                    fill="rgb(8 9 11 / 0.85)"
                    stroke={lit(n) ? AMBER : 'rgb(255 255 255 / 0.14)'}
                  />
                  <text
                    x={11}
                    y={17.5}
                    fontSize={13}
                    fontWeight={600}
                    fill={FOG_50}
                  >
                    {label}
                  </text>
                </g>
              )}
              <Badge n={n} x={x} y={y} r={r} />
            </g>
          );
        });
      })()}
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Section

const keyCols: Record<number, string> = {
  3: 'lg:grid-cols-3',
  4: 'sm:grid-cols-2 lg:grid-cols-4',
  5: 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5',
};

const legends: Record<SystemDiagram['kind'], [string, string, string]> = {
  flow: [
    'Supplied and installed by SAAN',
    'Your people, content or platforms',
    'Signal flow',
  ],
  room: [
    'Supplied and fitted by SAAN',
    'Speech, absorbed instead of echoing',
    '',
  ],
  cycle: ['Part of every support plan', 'The service loop, all year', ''],
};

export function SystemSection({
  diagram,
  rows,
}: {
  diagram: SystemDiagram;
  rows: Solution['system'];
}) {
  const [active, setActive] = useState<Active>(null);
  const hover = { active, setActive };
  const raw = useId().replace(/[^a-zA-Z0-9]/g, '');
  const legend = legends[diagram.kind];

  return (
    <section
      aria-labelledby="sys-title"
      className="border-t border-white/[0.07] bg-ink-950 py-24 md:py-32"
    >
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <h2
            id="sys-title"
            className="display max-w-[14ch] text-[clamp(2.2rem,4.4vw,4rem)] text-fog-50"
            data-reveal
          >
            Inside a typical system
          </h2>
          <div
            className="max-w-md"
            data-reveal
            style={{ ['--d' as string]: 100 }}
          >
            <p className="leading-relaxed text-fog-400">
              Every project is designed for its room. This is how the building
              blocks usually fit together, and the brands we often specify.
            </p>
            <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-fog-500">
              <li className="flex items-center gap-2">
                <span className="grid size-4 place-items-center rounded-full bg-signal-500 text-[0.55rem] font-bold text-ink-950">
                  1
                </span>
                {legend[0]}
              </li>
              <li className="flex items-center gap-2">
                {diagram.kind === 'room' ? (
                  <span className="size-3.5 rounded-full border border-signal-500/80" />
                ) : diagram.kind === 'cycle' ? (
                  <span className="h-0.5 w-5 bg-[radial-gradient(circle,var(--color-signal-500)_1px,transparent_1.5px)] bg-[length:6px_2px]" />
                ) : (
                  <span className="size-3.5 rounded-[4px] border border-dashed border-white/40" />
                )}
                {legend[1]}
              </li>
              {legend[2] && (
                <li className="flex items-center gap-2">
                  <span className="h-0.5 w-5 bg-[radial-gradient(circle,var(--color-signal-500)_1px,transparent_1.5px)] bg-[length:6px_2px]" />
                  {legend[2]}
                </li>
              )}
            </ul>
          </div>
        </div>

        <figure
          className="mt-12 overflow-hidden rounded-[var(--radius-card)] border border-white/[0.07] bg-ink-900 p-2 sm:p-4"
          data-reveal
        >
          <div className="hidden lg:block">
            {diagram.kind === 'flow' && (
              <FlowDesktop d={diagram} hover={hover} uid={`${raw}d`} />
            )}
            {diagram.kind === 'cycle' && (
              <CycleDesktop d={diagram} hover={hover} uid={`${raw}d`} />
            )}
            {diagram.kind === 'room' && (
              <RoomCutaway
                d={diagram}
                hover={hover}
                uid={`${raw}d`}
                W={1200}
                H={560}
                labels
              />
            )}
          </div>
          <div className="lg:hidden">
            {diagram.kind === 'flow' && (
              <FlowMobile d={diagram} hover={hover} uid={`${raw}m`} />
            )}
            {diagram.kind === 'cycle' && (
              <CycleMobile d={diagram} hover={hover} uid={`${raw}m`} />
            )}
            {diagram.kind === 'room' && (
              <RoomCutaway
                d={diagram}
                hover={hover}
                uid={`${raw}m`}
                W={520}
                H={420}
                labels={false}
              />
            )}
          </div>
          <figcaption className="sr-only">{diagram.caption}</figcaption>
        </figure>

        <ol
          className={cn(
            'mt-4 grid gap-3',
            keyCols[rows.length] ?? 'sm:grid-cols-2 lg:grid-cols-3'
          )}
        >
          {rows.map((row, i) => {
            const n = i + 1;
            const on = active === n;
            return (
              <li
                key={row.role}
                tabIndex={0}
                onMouseEnter={() => setActive(n)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(n)}
                onBlur={() => setActive(null)}
                data-reveal
                style={{ ['--d' as string]: i * 70 }}
                className={cn(
                  'rounded-2xl border bg-ink-850/60 p-5 outline-none transition-colors duration-300',
                  on ? 'border-signal-500/70 bg-ink-850' : 'border-white/[0.07]'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-signal-500 font-mono text-xs font-bold text-ink-950">
                    {n}
                  </span>
                  <h3
                    className="text-lg font-semibold leading-tight text-fog-50"
                    style={{ fontStretch: '108%' }}
                  >
                    {row.role}
                  </h3>
                </div>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-fog-400">
                  {row.detail}
                </p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {row.brands.map((b) => (
                    <li
                      key={b}
                      className="rounded-full border border-white/10 bg-ink-950/60 px-2.5 py-1 font-mono text-[0.7rem] text-fog-200"
                    >
                      {b}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
