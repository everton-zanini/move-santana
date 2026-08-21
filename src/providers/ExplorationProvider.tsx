"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { areas } from "@/data/areas";
import { EXPLORATION_STORAGE_KEY } from "@/lib/constants";

const trackedAreaIds = areas.filter((area) => area.position !== "center").map((area) => area.id);

// `localStorage.setItem` in the current tab does not fire the native
// `storage` event (only other tabs get it), so `markVisited` dispatches
// this custom event to notify our own `useSyncExternalStore` subscribers.
const CHANGE_EVENT = "movesantana:exploration-change";

// `useSyncExternalStore` requires a stable (reference-equal) snapshot when
// nothing actually changed, so the parsed array is cached and only
// re-parsed when the raw string differs from last time.
let cachedRaw: string | null = null;
let cachedVisited: string[] = [];

function readVisited(): string[] {
  let raw: string | null;
  try {
    raw = window.localStorage.getItem(EXPLORATION_STORAGE_KEY);
  } catch {
    raw = null;
  }

  if (raw !== cachedRaw) {
    cachedRaw = raw;
    try {
      cachedVisited = raw ? JSON.parse(raw) : [];
    } catch {
      cachedVisited = [];
    }
  }

  return cachedVisited;
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

const EMPTY_VISITED: string[] = [];

function getServerSnapshot(): string[] {
  return EMPTY_VISITED;
}

export interface ExplorationContextValue {
  visited: string[];
  totalCount: number;
  hasCompleted: boolean;
  /** True once the last area was marked visited, until `dismissCompletion` runs. */
  justCompleted: boolean;
  markVisited: (areaId: string) => void;
  dismissCompletion: () => void;
}

export const ExplorationContext = createContext<ExplorationContextValue | null>(null);

export function ExplorationProvider({ children }: { children: ReactNode }) {
  const visited = useSyncExternalStore(subscribe, readVisited, getServerSnapshot);
  const [justCompleted, setJustCompleted] = useState(false);

  const markVisited = useCallback((areaId: string) => {
    if (!trackedAreaIds.includes(areaId)) return;

    const current = readVisited();
    if (current.includes(areaId)) return;
    const next = [...current, areaId];

    try {
      window.localStorage.setItem(EXPLORATION_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // localStorage unavailable (private mode, etc.) — exploration state is
      // purely decorative, so failing silently is fine.
    }
    window.dispatchEvent(new Event(CHANGE_EVENT));

    if (next.length === trackedAreaIds.length) setJustCompleted(true);
  }, []);

  const dismissCompletion = useCallback(() => setJustCompleted(false), []);

  const value = useMemo<ExplorationContextValue>(
    () => ({
      visited,
      totalCount: trackedAreaIds.length,
      hasCompleted: visited.length >= trackedAreaIds.length,
      justCompleted,
      markVisited,
      dismissCompletion,
    }),
    [visited, justCompleted, markVisited, dismissCompletion],
  );

  return <ExplorationContext.Provider value={value}>{children}</ExplorationContext.Provider>;
}
