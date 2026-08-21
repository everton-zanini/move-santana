"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { formatEventDate, formatEventTime } from "@/lib/date";

const UNITS = [
  ["dias", "days"],
  ["horas", "hours"],
  ["min", "minutes"],
  ["seg", "seconds"],
] as const;

/**
 * Renders the static formatted date first (SSR-safe, no-JS fallback), then
 * swaps to a live countdown once mounted — avoids a hydration mismatch from
 * comparing `Date.now()` on the server vs. the client.
 */
export function EventCountdown({ targetIso }: { targetIso: string }) {
  const parts = useCountdown(targetIso);

  if (!parts) {
    return (
      <p className="font-accent text-sm text-move-gray-300">
        {formatEventDate(targetIso)} às {formatEventTime(targetIso)}
      </p>
    );
  }

  if (parts.isPast) {
    return <p className="font-accent text-sm text-move-gray-300">Já rolou 🙌</p>;
  }

  return (
    <div className="flex gap-4" role="timer" aria-label="Contagem para o próximo evento">
      {UNITS.map(([label, key]) => (
        <div key={key} className="flex flex-col items-center">
          <span className="font-display text-2xl text-move-yellow sm:text-3xl">
            {String(parts[key]).padStart(2, "0")}
          </span>
          <span className="font-accent text-[10px] uppercase tracking-widest text-move-gray-300">
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
