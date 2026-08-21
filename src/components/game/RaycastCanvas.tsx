"use client";

import { useRef, type RefObject } from "react";
import { areas } from "@/data/areas";
import { gameMap } from "@/data/gameMap";
import { useGameEngine } from "@/hooks/useGameEngine";
import type { GameAssets } from "@/hooks/useGameAssets";
import { DoorMarker } from "@/components/game/DoorMarker";
import type { JoystickVector } from "@/types/game";

// Every door in the level gets a marker, including the central "boate"
// (areaId "move") — derived from gameMap.doors so this never drifts out of
// sync with the generated level.
const doorAreas = gameMap.doors
  .map((door) => areas.find((area) => area.id === door.areaId))
  .filter((area): area is NonNullable<typeof area> => area !== undefined);

/** Presentation only — the `<canvas>` plus door markers, and mounting the game engine loop. */
export function RaycastCanvas({
  active,
  joystickVectorRef,
  assets,
  onDoorReached,
}: {
  active: boolean;
  joystickVectorRef: RefObject<JoystickVector>;
  assets: GameAssets;
  onDoorReached: (areaId: string) => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const markerElsRef = useRef<Record<string, HTMLDivElement | null>>({});

  useGameEngine(canvasRef, active, joystickVectorRef, markerElsRef, assets, onDoorReached);

  return (
    <div className="relative h-full w-full">
      <canvas
        ref={canvasRef}
        className="h-full w-full touch-none"
        style={{ imageRendering: "pixelated" }}
        aria-hidden="true"
      />
      {doorAreas.map((area) => (
        <DoorMarker
          key={area.id}
          areaId={area.id}
          label={area.label}
          ref={(el) => {
            markerElsRef.current[area.id] = el;
          }}
        />
      ))}
    </div>
  );
}
