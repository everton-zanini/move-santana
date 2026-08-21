"use client";

import { useRef, useSyncExternalStore } from "react";
import { getCountdownParts, type CountdownParts } from "@/lib/date";

function subscribe(onStoreChange: () => void) {
  const interval = setInterval(onStoreChange, 1000);
  return () => clearInterval(interval);
}

/**
 * Ticks every second via `useSyncExternalStore`. Returns `null` for the
 * server snapshot so SSR/hydration never disagree on `Date.now()` — the
 * caller should render a static formatted date while this is `null` (see
 * EventCountdown).
 */
export function useCountdown(targetIso: string): CountdownParts | null {
  // useSyncExternalStore requires getSnapshot to return a reference-stable
  // value when nothing changed; getCountdownParts allocates a fresh object
  // every call, so the result is cached per second to avoid re-rendering
  // (and re-subscribing) in an infinite loop.
  const cacheRef = useRef<{ key: string; value: CountdownParts } | null>(null);

  return useSyncExternalStore(
    subscribe,
    () => {
      const parts = getCountdownParts(targetIso);
      const key = `${parts.days}:${parts.hours}:${parts.minutes}:${parts.seconds}:${parts.isPast}`;
      if (cacheRef.current?.key !== key) {
        cacheRef.current = { key, value: parts };
      }
      return cacheRef.current.value;
    },
    () => null,
  );
}
