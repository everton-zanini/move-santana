"use client";

import Image from "next/image";
import { areas } from "@/data/areas";
import { HubNode } from "@/components/navigation/HubNode";
import { HubConnector } from "@/components/navigation/HubConnector";
import { ExplorationCounter } from "@/components/gamification/ExplorationCounter";
import { LogoClickTrigger } from "@/components/navigation/LogoClickTrigger";
import { useActiveSectionId } from "@/providers/ActiveSectionProvider";
import { useExploration } from "@/hooks/useExploration";

const outerAreas = areas.filter((area) => area.position !== "center");
const byPosition = (position: string) => outerAreas.find((area) => area.position === position);

/**
 * Desktop-only "game map": a plus-shaped grid with MOVE at the center and
 * the four other areas around it, connected by decorative lines. Hidden
 * below `md` — mobile gets `MobileNavRail`/`BottomTabBar` instead.
 */
export function HubMap() {
  const activeId = useActiveSectionId();
  const { visited } = useExploration();
  const top = byPosition("top");
  const left = byPosition("left");
  const right = byPosition("right");
  const bottom = byPosition("bottom");

  return (
    <nav aria-label="Mapa de exploração do Move" className="relative mx-auto max-w-xl py-10">
      <HubConnector />
      <div className="grid grid-cols-3 grid-rows-3 gap-4">
        <div className="col-start-2 row-start-1">
          {top && <HubNode area={top} isActive={activeId === top.id} isVisited={visited.includes(top.id)} />}
        </div>
        <div className="col-start-1 row-start-2">
          {left && (
            <HubNode area={left} isActive={activeId === left.id} isVisited={visited.includes(left.id)} />
          )}
        </div>
        <div className="col-start-2 row-start-2 flex flex-col items-center justify-center gap-2">
          <LogoClickTrigger>
            <Image
              src="/logos/m-mark-coral.png"
              alt="Move Santana"
              width={64}
              height={38}
              className="select-none"
            />
          </LogoClickTrigger>
          <ExplorationCounter />
        </div>
        <div className="col-start-3 row-start-2">
          {right && (
            <HubNode area={right} isActive={activeId === right.id} isVisited={visited.includes(right.id)} />
          )}
        </div>
        <div className="col-start-2 row-start-3">
          {bottom && (
            <HubNode
              area={bottom}
              isActive={activeId === bottom.id}
              isVisited={visited.includes(bottom.id)}
            />
          )}
        </div>
      </div>
    </nav>
  );
}
