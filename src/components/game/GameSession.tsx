"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useBodyScrollLock } from "@/hooks/useBodyScrollLock";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useExploration } from "@/hooks/useExploration";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { useIsPortrait } from "@/hooks/useIsPortrait";
import type { GameAssets } from "@/hooks/useGameAssets";
import { RaycastCanvas } from "@/components/game/RaycastCanvas";
import { GameHUD } from "@/components/game/GameHUD";
import { GameLoadingScreen } from "@/components/game/GameLoadingScreen";
import { RotateDevicePrompt } from "@/components/game/RotateDevicePrompt";
import { DoorTransitionFlash } from "@/components/game/DoorTransitionFlash";
import { GAME } from "@/lib/constants";
import type { JoystickVector } from "@/types/game";

/**
 * One play session. Mounted fresh every time the overlay opens and
 * unmounted on close — that's what resets the minimum-loading-duration
 * timer without needing to manually reset any state, since a fresh mount
 * always starts from `minDurationDone = false`.
 */
export function GameSession({ assets, onClose }: { assets: GameAssets; onClose: () => void }) {
  const { markVisited } = useExploration();
  const [pendingAreaId, setPendingAreaId] = useState<string | null>(null);
  const [minDurationDone, setMinDurationDone] = useState(false);
  const joystickVectorRef = useRef<JoystickVector>({ x: 0, y: 0 });

  const isTouch = useIsTouchDevice();
  const isPortrait = useIsPortrait();

  useBodyScrollLock(true);
  useEscapeKey(true, onClose);

  useEffect(() => {
    const timeout = setTimeout(() => setMinDurationDone(true), GAME.minLoadingMs);
    return () => clearTimeout(timeout);
  }, []);

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

  const isReady = assets.isReady && minDurationDone;
  const showRotatePrompt = isReady && isTouch && isPortrait;

  return (
    <>
      <RaycastCanvas
        active={isReady}
        joystickVectorRef={joystickVectorRef}
        assets={assets}
        onDoorReached={handleDoorReached}
      />
      <GameHUD onClose={onClose} joystickVectorRef={joystickVectorRef} />
      {pendingAreaId && <DoorTransitionFlash onComplete={handleFlashComplete} />}
      {!isReady && <GameLoadingScreen />}
      {showRotatePrompt && <RotateDevicePrompt />}
    </>
  );
}
