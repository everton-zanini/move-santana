"use client";

import { useCallback, useEffect, useState } from "react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useExploration } from "@/hooks/useExploration";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useIsPortrait } from "@/hooks/useIsPortrait";
import { PanoramaViewer } from "@/components/game/PanoramaViewer";
import { GameHUD } from "@/components/game/GameHUD";
import { GameTutorialScreen } from "@/components/game/GameTutorialScreen";
import { GameLoadingScreen } from "@/components/game/GameLoadingScreen";
import { RotateDevicePrompt } from "@/components/game/RotateDevicePrompt";
import { DoorTransitionFlash } from "@/components/game/DoorTransitionFlash";
import { PANORAMA } from "@/lib/constants";
import type { GamePhase } from "@/types/game";

/**
 * One play session. Mounted fresh every time the overlay opens and
 * unmounted on close — that's what makes the tutorial and the loading beat
 * play again on every open, since a fresh mount always starts at phase
 * "tutorial" with no explicit reset needed.
 */
export function GameSession({ onClose }: { onClose: () => void }) {
  const { markVisited } = useExploration();
  const [phase, setPhase] = useState<GamePhase>("tutorial");
  const [pendingAreaId, setPendingAreaId] = useState<string | null>(null);

  const isTouch = useIsTouchDevice();
  const isPortrait = useIsPortrait();

  useBodyScrollLock(true);
  useEscapeKey(true, onClose);

  useEffect(() => {
    if (phase !== "loading") return;
    const timeout = setTimeout(() => setPhase("ready"), PANORAMA.minLoadingMs);
    return () => clearTimeout(timeout);
  }, [phase]);

  const handleTutorialComplete = useCallback(() => setPhase("loading"), []);

  const handleDoorReached = useCallback(
    (areaId: string) => {
      markVisited(areaId);
      setPendingAreaId(areaId);
    },
    [markVisited],
  );

  const handleFlashComplete = useCallback(() => {
    const areaId = pendingAreaId;
    setPendingAreaId(null);
    onClose();
    if (areaId) {
      requestAnimationFrame(() => {
        document.getElementById(areaId)?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  }, [pendingAreaId, onClose]);

  const isReady = phase === "ready";
  const showRotatePrompt = isReady && isTouch && isPortrait;

  return (
    <>
      <PanoramaViewer active={isReady} onDoorReached={handleDoorReached} />
      <GameHUD onClose={onClose} />
      {pendingAreaId && <DoorTransitionFlash onComplete={handleFlashComplete} />}
      {phase === "tutorial" && <GameTutorialScreen onComplete={handleTutorialComplete} />}
      {phase === "loading" && <GameLoadingScreen />}
      {showRotatePrompt && <RotateDevicePrompt />}
    </>
  );
}
