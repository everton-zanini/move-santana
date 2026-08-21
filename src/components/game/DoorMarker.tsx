"use client";

import { forwardRef } from "react";
import { AREA_ICONS } from "@/lib/areaIcons";

/**
 * Icon + label floating above a door in the raycast scene. Position,
 * scale and opacity are driven imperatively every frame by the game
 * engine (direct DOM style writes via `ref`, not React state) — the
 * label text/icon themselves are static per door, so only the parent
 * component re-renders never, only the engine mutates this element.
 */
export const DoorMarker = forwardRef<HTMLDivElement, { areaId: string; label: string }>(
  function DoorMarker({ areaId, label }, ref) {
    const Icon = AREA_ICONS[areaId] ?? AREA_ICONS.move;

    return (
      <div
        ref={ref}
        aria-hidden="true"
        className="pointer-events-none absolute flex flex-col items-center gap-1 opacity-0"
        style={{ left: "50%", top: "50%" }}
      >
        <span className="flex size-8 items-center justify-center rounded-full bg-move-yellow text-move-black shadow-lg">
          <Icon className="size-4" aria-hidden="true" />
        </span>
        <span className="whitespace-nowrap rounded-full bg-move-black/80 px-2 py-0.5 font-accent text-[10px] font-bold uppercase tracking-wide text-move-white">
          {label}
        </span>
      </div>
    );
  },
);
