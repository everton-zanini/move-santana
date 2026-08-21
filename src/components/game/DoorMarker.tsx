"use client";

import { forwardRef } from "react";
import { AREA_ICONS } from "@/lib/areaIcons";

/**
 * Icon + plain-text label for one panorama hotspot. Horizontal position and
 * visibility are driven imperatively every frame by the panorama engine
 * (direct DOM style writes via `ref`, not React state) since they change on
 * every drag frame — the click handler and content are static per door, so
 * only that `left`/`opacity` needs to bypass React.
 */
export const DoorMarker = forwardRef<
  HTMLButtonElement,
  { areaId: string; label: string; onSelect: () => void; onFocus?: () => void }
>(function DoorMarker({ areaId, label, onSelect, onFocus }, ref) {
  const Icon = AREA_ICONS[areaId] ?? AREA_ICONS.move;

  return (
    <button
      ref={ref}
      type="button"
      onClick={onSelect}
      onFocus={onFocus}
      className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 opacity-0 outline-none"
      style={{ left: "50%" }}
    >
      <span className="flex size-12 items-center justify-center rounded-full bg-move-yellow text-move-black shadow-lg transition-transform hover:scale-105">
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="whitespace-nowrap rounded-full bg-move-black/80 px-2.5 py-1 font-accent text-xs font-bold uppercase tracking-wide text-move-white">
        {label}
      </span>
    </button>
  );
});
