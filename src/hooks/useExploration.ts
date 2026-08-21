"use client";

import { useContext } from "react";
import { ExplorationContext, type ExplorationContextValue } from "@/providers/ExplorationProvider";

export function useExploration(): ExplorationContextValue {
  const context = useContext(ExplorationContext);
  if (!context) {
    throw new Error("useExploration must be used within an ExplorationProvider");
  }
  return context;
}
