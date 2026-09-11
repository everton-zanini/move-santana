"use client";

import { useMemo, useSyncExternalStore } from "react";

type CountdownValue = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isComplete: boolean;
};

function getRemainingSeconds(targetTime: number): number {
  return Math.max(0, Math.ceil((targetTime - Date.now()) / 1000));
}

function subscribe(onStoreChange: () => void) {
  const interval = setInterval(onStoreChange, 1000);
  return () => clearInterval(interval);
}

function getServerSnapshot(): number | null {
  return null;
}

function deriveCountdown(remainingSeconds: number): CountdownValue {
  return {
    days: Math.floor(remainingSeconds / 86400),
    hours: Math.floor((remainingSeconds % 86400) / 3600),
    minutes: Math.floor((remainingSeconds % 3600) / 60),
    seconds: remainingSeconds % 60,
    isComplete: remainingSeconds <= 0,
  };
}

/**
 * Ticks a countdown to `target` every second. The external store snapshot is
 * a plain number (remaining seconds) so `useSyncExternalStore` can compare
 * it by value — no cached object identity needed. The server snapshot
 * (`null`) and the client's pre-hydration render agree, and the real value
 * only appears once the interval subscription resyncs post-hydration,
 * avoiding a mismatch from `Date.now()` differing between server and client.
 */
export function useCountdown(target: Date): CountdownValue | null {
  const targetTime = target.getTime();

  const remainingSeconds = useSyncExternalStore(
    subscribe,
    () => getRemainingSeconds(targetTime),
    getServerSnapshot,
  );

  return useMemo(
    () => (remainingSeconds === null ? null : deriveCountdown(remainingSeconds)),
    [remainingSeconds],
  );
}
