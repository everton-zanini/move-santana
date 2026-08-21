"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { areas } from "@/data/areas";
import { cn } from "@/lib/utils";
import { useActiveSectionId } from "@/providers/ActiveSectionProvider";
import { useExploration } from "@/hooks/useExploration";

/**
 * Mobile equivalent of HubMap: the same 5 areas as a horizontally
 * swipeable, scroll-snapped rail — not a shrunk copy of the desktop map.
 * Native `scroll-snap` handles touch/trackpad; visible prev/next buttons
 * cover keyboard and non-touch pointer users.
 */
export function MobileNavRail() {
  const activeId = useActiveSectionId();
  const { visited } = useExploration();
  const railRef = useRef<HTMLDivElement>(null);

  function scrollByCard(direction: 1 | -1) {
    railRef.current?.scrollBy({ left: direction * 160, behavior: "smooth" });
  }

  return (
    <nav aria-label="Navegação do Move" className="relative">
      <div
        ref={railRef}
        role="group"
        aria-roledescription="carrossel"
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 scrollbar-none"
      >
        {areas.map((area) => {
          const isActive = activeId === area.id;
          return (
            <a
              key={area.id}
              href={`#${area.id}`}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "relative flex min-w-32 shrink-0 snap-start flex-col items-start gap-1 rounded-2xl border-2 px-4 py-3",
                isActive
                  ? "border-move-yellow bg-move-yellow/10"
                  : "border-move-gray-700 bg-move-ink",
              )}
            >
              {visited.includes(area.id) && (
                <span
                  aria-hidden="true"
                  className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-move-coral text-[10px] font-bold text-move-black"
                >
                  ✓
                </span>
              )}
              <span className="font-accent text-xs font-bold uppercase tracking-wide text-move-white">
                {area.label}
              </span>
              <span className="text-[11px] text-move-gray-300">{area.description}</span>
            </a>
          );
        })}
      </div>

      <div className="mt-2 flex justify-end gap-2 px-5">
        <button
          type="button"
          onClick={() => scrollByCard(-1)}
          aria-label="Ver área anterior"
          className="flex size-9 items-center justify-center rounded-full border border-move-gray-700 text-move-white"
        >
          <ChevronLeft className="size-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => scrollByCard(1)}
          aria-label="Ver próxima área"
          className="flex size-9 items-center justify-center rounded-full border border-move-gray-700 text-move-white"
        >
          <ChevronRight className="size-4" aria-hidden="true" />
        </button>
      </div>
    </nav>
  );
}
