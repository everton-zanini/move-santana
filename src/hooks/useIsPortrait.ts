"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(orientation: portrait)";

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

/** Used to prompt landscape rotation for the game — irrelevant on desktop, which is never "portrait". */
export function useIsPortrait(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
