"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(onStoreChange: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/**
 * Tracks `prefers-reduced-motion`. Used by the manual effects layer
 * (particles, custom cursor, parallax) — Framer Motion animations are
 * already covered globally by `MotionConfig[reducedMotion="user"]`.
 * `useSyncExternalStore` resyncs after hydration without a mismatch
 * warning, unlike a `useEffect` + `useState` pair.
 */
export function useReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
