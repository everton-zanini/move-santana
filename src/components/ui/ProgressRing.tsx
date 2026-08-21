export function ProgressRing({
  current,
  total,
  size = 40,
}: {
  current: number;
  total: number;
  size?: number;
}) {
  const radius = size / 2 - 4;
  const circumference = 2 * Math.PI * radius;
  const progress = total === 0 ? 0 : current / total;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--move-gray-700)"
          strokeWidth={3}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="var(--move-yellow)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - progress)}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: "stroke-dashoffset 0.4s ease-out" }}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center font-accent text-[10px] font-bold text-move-white">
        {current}/{total}
      </span>
    </div>
  );
}
