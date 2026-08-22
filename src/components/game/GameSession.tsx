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
import { GameTutorialScreen } from "@/components/game/GameTutorialScreen";
import { GameLoadingScreen } from "@/components/game/GameLoadingScreen";
import { RotateDevicePrompt } from "@/components/game/RotateDevicePrompt";
import { DoorTransitionFlash } from "@/components/game/DoorTransitionFlash";
import { GAME } from "@/lib/constants";
import type { GamePhase } from "@/types/game";

/**
 * One play session. Mounted fresh every time the overlay opens and
 * unmounted on close — that's what makes the tutorial and the loading beat
 * play again on every open, since a fresh mount always starts at phase
 * "tutorial" with no explicit reset needed.
 */
export function GameSession({ assets, onClose }: { assets: GameAssets; onClose: () => void }) {
  const { markVisited } = useExploration();
  const [rawPhase, setRawPhase] = useState<Exclude<GamePhase, "ready">>("tutorial");
  const [minDurationDone, setMinDurationDone] = useState(false);
  const [pendingAreaId, setPendingAreaId] = useState<string | null>(null);
  const [facedAreaId, setFacedAreaId] = useState<string | null>(null);
  const dpadMoveRef = useRef(0);
  const dpadTurnRef = useRef(0);

  const isTouch = useIsTouchDevice();
  const isPortrait = useIsPortrait();

  useBodyScrollLock(true);
  useEscapeKey(true, onClose);

  useEffect(() => {
    if (rawPhase !== "loading") return;
    const timeout = setTimeout(() => setMinDurationDone(true), GAME.minLoadingMs);
    return () => clearTimeout(timeout);
  }, [rawPhase]);

  // Derived, not synced via effect: "ready" is fully determined by the
  // timer plus the (usually-already-cached) asset load, so there's no
  // extra state to keep in sync — just compute it every render.
  const phase: GamePhase =
    rawPhase === "loading" && minDurationDone && assets.isReady ? "ready" : rawPhase;

  const handleTutorialComplete = useCallback(() => setRawPhase("loading"), []);

  const handleDoorReached = useCallback(
    (areaId: string) => {
      markVisited(areaId);
      setPendingAreaId(areaId);
    },
    [markVisited],
  );

  const handleOpenFacedDoor = useCallback(() => {
    if (facedAreaId) handleDoorReached(facedAreaId);
  }, [facedAreaId, handleDoorReached]);

  const isReady = phase === "ready";

  // Desktop convenience: Enter/E opens whichever door the D-pad button
  // would open, mirroring it without needing a mouse click on the HUD.
  useEffect(() => {
    if (!isReady) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Enter" || event.key.toLowerCase() === "e") handleOpenFacedDoor();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isReady, handleOpenFacedDoor]);

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

  const showRotatePrompt = isReady && isTouch && isPortrait;

  return (
    <>
      <RaycastCanvas
        active={isReady}
        dpadMoveRef={dpadMoveRef}
        dpadTurnRef={dpadTurnRef}
        assets={assets}
        onFacedDoorChange={setFacedAreaId}
        onDoorSelect={handleDoorReached}
      />
      <GameHUD
        onClose={onClose}
        dpadMoveRef={dpadMoveRef}
        dpadTurnRef={dpadTurnRef}
        facedAreaId={facedAreaId}
        onOpenDoor={handleOpenFacedDoor}
      />
      {pendingAreaId && <DoorTransitionFlash onComplete={handleFlashComplete} />}
      {phase === "tutorial" && <GameTutorialScreen onComplete={handleTutorialComplete} />}
      {phase === "loading" && <GameLoadingScreen />}
      {showRotatePrompt && <RotateDevicePrompt />}
    </>
  );
}
