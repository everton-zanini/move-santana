"use client";

import { forwardRef } from "react";
import { AREA_ICONS } from "@/lib/areaIcons";

/**
 * A coral door for one panorama hotspot, with the section name painted on
 * its face. Horizontal position and visibility are driven imperatively
 * every frame by the panorama engine (direct DOM style writes via `ref`,
 * not React state) since they change on every drag frame — the click
 * handler and content are static per door, so only `left`/`opacity` needs
 * to bypass React.
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
      aria-label={`Ir para ${label}`}
      className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 outline-none transition-transform hover:scale-105"
      style={{ left: "50%" }}
    >
      <div className="relative flex h-32 w-20 flex-col items-center justify-center gap-2 rounded-t-2xl border-2 border-move-black/50 bg-move-coral px-2 py-4 shadow-xl sm:h-40 sm:w-24">
        <Icon className="size-6 shrink-0 text-move-black" aria-hidden="true" />
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
