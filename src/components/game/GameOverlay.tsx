"use client";

import { useGameOverlay } from "@/hooks/useGameOverlay";
import { useGameAssets } from "@/hooks/useGameAssets";
import { GameSession } from "@/components/game/GameSession";
import { Z_INDEX } from "@/lib/constants";

/**
 * Fullscreen shell for the exploration mode. Mounted once at the layout
 * root (a sibling of BottomTabBar/UnlockToast) so its `fixed` positioning
 * is never affected by an ancestor's `transform` animation. Wall textures
 * load once here and are cached across sessions; `GameSession` (the
 * actual play session) remounts fresh every time the game opens.
 */
export function GameOverlay() {
  const { isOpen, close } = useGameOverlay();
  const assets = useGameAssets();

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Modo exploração em primeira pessoa"
      className="fixed inset-0 overflow-hidden bg-move-black"
      style={{ zIndex: Z_INDEX.game }}
    >
      <GameSession assets={assets} onClose={close} />
    </div>
  );
}
