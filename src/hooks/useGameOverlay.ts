"use client";

import { useContext } from "react";
import { GameOverlayContext, type GameOverlayContextValue } from "@/providers/GameOverlayProvider";

export function useGameOverlay(): GameOverlayContextValue {
  const context = useContext(GameOverlayContext);
  if (!context) {
    throw new Error("useGameOverlay must be used within a GameOverlayProvider");
  }
  return context;
}
