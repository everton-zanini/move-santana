/**
 * Decorative connector lines behind the desktop hub grid, matching the
 * plus-shaped 3x3 layout in HubMap (center + top/left/right/bottom).
 * Purely visual — always `aria-hidden`.
 */
export function HubConnector() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 -z-10 h-full w-full"
    >
      {[
        [50, 50, 50, 16],
        [50, 50, 16, 50],
        [50, 50, 84, 50],
        [50, 50, 50, 84],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="var(--move-gray-700)"
          strokeWidth={0.4}
          strokeDasharray="2 2"
        />
      ))}
    </svg>
  );
}
