"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ReducedMotionContext = createContext(false);

/**
 * Single `matchMedia` listener for the whole tree, consumed by the manual
 * effects layer (particles, custom cursor, parallax, grain). Framer Motion
 * animations get reduced motion for free via `MotionConfig` in the layout.
 */
export function ReducedMotionProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  return <ReducedMotionContext.Provider value={reduced}>{children}</ReducedMotionContext.Provider>;
}

export function useReducedMotionPreference(): boolean {
  return useContext(ReducedMotionContext);
}
