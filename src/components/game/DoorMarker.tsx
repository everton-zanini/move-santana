"use client";

import { forwardRef } from "react";
import { AREA_ICONS } from "@/lib/areaIcons";

/**
 * A yellow door standing in the raycast scene, with the section name
 * painted on its face. Position and scale are driven imperatively every
 * frame by `updateDoorMarkers` (direct DOM style writes via `ref`, not
 * React state) since they change on every frame — the click handler and
 * content are static per door, so only `top`/`left`/`transform`/`opacity`
 * need to bypass React. Also directly clickable/tappable as a shortcut
 * alongside the dedicated open-door button.
 */
export const DoorMarker = forwardRef<
  HTMLButtonElement,
  { areaId: string; label: string; showIcon?: boolean; onSelect: () => void }
>(function DoorMarker({ areaId, label, showIcon = true, onSelect }, ref) {
  const Icon = AREA_ICONS[areaId] ?? AREA_ICONS.move;

  return (
    <button
      ref={ref}
      type="button"
      onClick={onSelect}
      aria-label={`Ir para ${label}`}
      className="absolute opacity-0 outline-none"
      style={{ left: "50%", top: "50%" }}
    >
      <div className="relative flex h-32 w-20 flex-col items-center justify-center gap-2 rounded-t-2xl border-2 border-move-black/50 bg-move-yellow px-2 py-4 shadow-xl sm:h-40 sm:w-24">
        {showIcon && <Icon className="size-6 shrink-0 text-move-black" aria-hidden="true" />}
        <span className="text-center font-accent text-[11px] font-bold uppercase leading-tight tracking-wide text-move-black sm:text-xs">
          {label}
        </span>
        <span
          aria-hidden="true"
          className="absolute right-2.5 top-1/2 size-2 -translate-y-1/2 rounded-full bg-move-black/50"
        />
      </div>
    </button>
  );
});
