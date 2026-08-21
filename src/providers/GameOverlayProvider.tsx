"use client";

import { createContext, useCallback, useMemo, useState, type ReactNode } from "react";
import { useReducedMotionPreference } from "@/providers/ReducedMotionProvider";

export interface GameOverlayContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const GameOverlayContext = createContext<GameOverlayContextValue | null>(null);

export function GameOverlayProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const reducedMotion = useReducedMotionPreference();

  const open = useCallback(() => {
    // Defense in depth: the launcher button is already hidden under reduced
    // motion, but continuous first-person motion is enough of a motion-
    // sickness trigger that `open()` itself refuses too.
    if (reducedMotion) return;
    setIsOpen(true);
  }, [reducedMotion]);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo<GameOverlayContextValue>(() => ({ isOpen, open, close }), [isOpen, open, close]);

  return <GameOverlayContext.Provider value={value}>{children}</GameOverlayContext.Provider>;
}
