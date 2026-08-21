"use client";

import { Compass } from "lucide-react";
import { areas } from "@/data/areas";
import { cn } from "@/lib/utils";
import { Z_INDEX } from "@/lib/constants";
import { AREA_ICONS } from "@/lib/areaIcons";
import { useActiveSectionId } from "@/providers/ActiveSectionProvider";

/**
 * Persistent mobile-only quick-jump bar (app/game-style), always available
 * while scrolling — complements the in-flow MobileNavRail right after the
 * hero. Hidden on `md` and up, where HubMap is already always visible.
 */
export function BottomTabBar() {
  const activeId = useActiveSectionId();
  return (
    <nav
      aria-label="Atalhos do Move"
      className="fixed inset-x-0 bottom-0 flex justify-around border-t border-move-gray-800 bg-move-black/95 py-2 backdrop-blur md:hidden"
      style={{ zIndex: Z_INDEX.nav, paddingBottom: "max(env(safe-area-inset-bottom), 0.5rem)" }}
    >
      {areas.map((area) => {
        const Icon = AREA_ICONS[area.id] ?? Compass;
        const isActive = activeId === area.id;
        return (
          <a
            key={area.id}
            href={`#${area.id}`}
            aria-current={isActive ? "true" : undefined}
            className={cn(
              "flex min-h-12 flex-1 flex-col items-center justify-center gap-0.5 text-[10px] font-accent uppercase tracking-wide",
              isActive ? "text-move-yellow" : "text-move-gray-300",
            )}
          >
            <Icon className="size-5" aria-hidden="true" />
            {area.label}
          </a>
        );
      })}
    </nav>
  );
}
