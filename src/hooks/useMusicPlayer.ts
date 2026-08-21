"use client";

import { useContext } from "react";
import { MusicPlayerContext, type MusicPlayerContextValue } from "@/providers/MusicPlayerProvider";

export function useMusicPlayer(): MusicPlayerContextValue {
  const context = useContext(MusicPlayerContext);
  if (!context) {
    throw new Error("useMusicPlayer must be used within a MusicPlayerProvider");
  }
  return context;
}
