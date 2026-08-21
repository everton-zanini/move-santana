"use client";

import { useEffect, useState } from "react";
import { gameMap } from "@/data/gameMap";
import { areas } from "@/data/areas";
import { createDoorTexture, createWallTexture, loadImage } from "@/lib/gameTextures";
import { WALL_PHRASES } from "@/lib/constants";

export interface GameAssets {
  isReady: boolean;
  doorTextures: Record<string, HTMLCanvasElement>;
  wallTextures: HTMLCanvasElement[];
}

const EMPTY_ASSETS: GameAssets = { isReady: false, doorTextures: {}, wallTextures: [] };

/**
 * Generates the door/wall textures once, ever — cached for the whole
 * session (reopening the game later reuses them instantly). Lives in the
 * persistent GameOverlay, not the per-session GameSession, precisely so it
 * is never reloaded.
 */
export function useGameAssets(): GameAssets {
  const [assets, setAssets] = useState<GameAssets>(EMPTY_ASSETS);

  useEffect(() => {
    if (assets.isReady) return;
    let cancelled = false;

    loadImage("/logos/m-mark-black.png")
      .catch(() => null)
      .then((logo) => {
        if (cancelled) return;

        const doorTextures: Record<string, HTMLCanvasElement> = {};
        for (const door of gameMap.doors) {
          const area = areas.find((a) => a.id === door.areaId);
          doorTextures[door.areaId] = createDoorTexture(area?.label ?? door.areaId);
        }

        const wallTextures = WALL_PHRASES.map((phrase) => createWallTexture(logo, phrase));
        setAssets({ isReady: true, doorTextures, wallTextures });
      });

    return () => {
      cancelled = true;
    };
  }, [assets.isReady]);

  return assets;
}
