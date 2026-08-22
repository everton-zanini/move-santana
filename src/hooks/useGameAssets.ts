"use client";

import { useEffect, useState } from "react";
import { createWallTexture, loadImage } from "@/lib/gameTextures";
import { WALL_PHRASES } from "@/lib/constants";

export interface GameAssets {
  isReady: boolean;
  wallTextures: HTMLCanvasElement[];
}

const EMPTY_ASSETS: GameAssets = { isReady: false, wallTextures: [] };

/**
 * Generates the wall textures once, ever — cached for the whole session
 * (reopening the game later reuses them instantly). Lives in the persistent
 * GameOverlay, not the per-session GameSession, precisely so it is never
 * reloaded. Doors aren't textured — they render as a flat coral fill plus
 * the `DoorMarker` overlay, so no texture is generated for them.
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
        const wallTextures = WALL_PHRASES.map((phrase) => createWallTexture(logo, phrase));
        setAssets({ isReady: true, wallTextures });
      });

    return () => {
      cancelled = true;
    };
  }, [assets.isReady]);

  return assets;
}
