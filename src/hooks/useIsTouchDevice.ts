"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(pointer: coarse)";

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

/** Gates desktop-only effects (parallax, custom cursor). SSR-safe: starts `false`. */
export function useIsTouchDevice(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
