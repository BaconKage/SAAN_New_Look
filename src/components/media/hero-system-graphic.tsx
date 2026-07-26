/**
 * Hero system graphic.
 *
 * An abstract representation of what SAAN actually delivers: rooms and screens
 * connected back through a control and network layer. Deliberately unlabelled
 * and non-specific — it evokes a system without pretending to be an engineering
 * drawing or a photograph of work we cannot yet show.
 *
 * Inline SVG, roughly 4KB, no image request and nothing to load: the hero's
 * LCP element stays the headline. Signal traces animate under `motion-safe`
 * only; with reduced motion the composition renders complete and static.
 */
export function HeroSystemGraphic({ className }: { className?: string }) {
  const rooms = [
    { x: 6, y: 10 },
    { x: 6, y: 40 },
    { x: 6, y: 70 },
  ];

  return (
    <svg
      viewBox="0 0 160 100"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Architectural grid */}
      <g opacity="0.5">
        {Array.from({ length: 17 }).map((_, index) => (
          <line
            key={`v${index}`}
            x1={index * 10}
            y1="0"
            x2={index * 10}
            y2="100"
            stroke="rgb(255 255 255 / 0.07)"
            strokeWidth="0.2"
          />
        ))}
        {Array.from({ length: 11 }).map((_, index) => (
          <line
            key={`h${index}`}
            x1="0"
            y1={index * 10}
            x2="160"
            y2={index * 10}
            stroke="rgb(255 255 255 / 0.07)"
            strokeWidth="0.2"
          />
        ))}
      </g>

      {/* Three rooms: a screen, a table and seats, drawn in plan */}
      {rooms.map((room, index) => (
        <g key={index} transform={`translate(${room.x} ${room.y})`}>
          <rect
            x="0"
            y="0"
            width="44"
            height="22"
            rx="1"
            fill="rgb(255 255 255 / 0.02)"
            stroke="rgb(255 255 255 / 0.16)"
            strokeWidth="0.3"
          />
          {/* Display on the end wall */}
          <rect
            x="2"
            y="8"
            width="1.6"
            height="6"
            rx="0.4"
            fill="var(--color-amber-500)"
            opacity="0.85"
          />
          {/* Table */}
          <rect
            x="14"
            y="8.5"
            width="18"
            height="5"
            rx="2.5"
            fill="none"
            stroke="rgb(255 255 255 / 0.22)"
            strokeWidth="0.3"
          />
          {/* Seats */}
          {[16, 21, 26, 31].map((seatX) => (
            <g key={seatX}>
              <circle
                cx={seatX}
                cy="6.2"
                r="1"
                fill="rgb(255 255 255 / 0.18)"
              />
              <circle
                cx={seatX}
                cy="15.8"
                r="1"
                fill="rgb(255 255 255 / 0.18)"
              />
            </g>
          ))}
          {/* Ceiling microphone and camera positions */}
          <circle
            cx="23"
            cy="3.2"
            r="0.7"
            fill="var(--color-signal-300)"
            opacity="0.7"
          />
          <circle
            cx="38"
            cy="11"
            r="0.7"
            fill="var(--color-signal-300)"
            opacity="0.7"
          />
        </g>
      ))}

      {/* Signal runs from each room into the spine */}
      {rooms.map((room, index) => {
        const y = room.y + 11;
        const path = `M ${room.x + 44} ${y} L 74 ${y} L 74 50 L 88 50`;
        return (
          <g key={`link${index}`}>
            <path
              d={path}
              fill="none"
              stroke="var(--color-amber-500)"
              strokeWidth="0.35"
              opacity="0.28"
            />
            <path
              d={path}
              fill="none"
              stroke="var(--color-amber-400)"
              strokeWidth="0.5"
              strokeLinecap="round"
              className="diagram-pulse"
              style={{ animationDelay: `${index * 420}ms` }}
            />
          </g>
        );
      })}

      {/* Control and network spine */}
      <g transform="translate(88 42)">
        <rect
          x="0"
          y="0"
          width="20"
          height="16"
          rx="1"
          fill="rgb(255 255 255 / 0.04)"
          stroke="rgb(255 255 255 / 0.22)"
          strokeWidth="0.35"
        />
        {[4, 7.5, 11].map((lineY) => (
          <line
            key={lineY}
            x1="3.5"
            y1={lineY}
            x2="16.5"
            y2={lineY}
            stroke="rgb(255 255 255 / 0.28)"
            strokeWidth="0.4"
          />
        ))}
        <circle cx="16.5" cy="13.5" r="0.8" fill="var(--color-amber-500)" />
      </g>

      {/* Onward to remote management */}
      <g>
        <path
          d="M 108 50 L 124 50 L 124 30 L 136 30"
          fill="none"
          stroke="var(--color-signal-500)"
          strokeWidth="0.35"
          opacity="0.5"
        />
        <path
          d="M 108 50 L 124 50 L 124 30 L 136 30"
          fill="none"
          stroke="var(--color-signal-300)"
          strokeWidth="0.5"
          strokeLinecap="round"
          className="diagram-pulse"
          style={{ animationDelay: '900ms' }}
        />
        <path
          d="M 136 34 a 3.4 3.4 0 0 1 .5 -6.7 4.6 4.6 0 0 1 8.9 1 3 3 0 0 1 .3 5.7 z"
          fill="rgb(255 255 255 / 0.03)"
          stroke="rgb(255 255 255 / 0.24)"
          strokeWidth="0.35"
        />
      </g>

      {/* Screens fed from the spine */}
      <g>
        <path
          d="M 108 50 L 124 50 L 124 72 L 132 72"
          fill="none"
          stroke="var(--color-amber-500)"
          strokeWidth="0.35"
          opacity="0.28"
        />
        <path
          d="M 108 50 L 124 50 L 124 72 L 132 72"
          fill="none"
          stroke="var(--color-amber-400)"
          strokeWidth="0.5"
          strokeLinecap="round"
          className="diagram-pulse"
          style={{ animationDelay: '1300ms' }}
        />
        {[64, 72, 80].map((screenY, index) => (
          <rect
            key={screenY}
            x="132"
            y={screenY - 3}
            width="16"
            height="6"
            rx="0.6"
            fill="rgb(255 255 255 / 0.03)"
            stroke="rgb(255 255 255 / 0.2)"
            strokeWidth="0.3"
            opacity={index === 1 ? 1 : 0.6}
          />
        ))}
      </g>
    </svg>
  );
}
