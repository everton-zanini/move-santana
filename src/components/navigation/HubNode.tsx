"use client";

import { m } from "motion/react";
import type { MoveArea } from "@/types/area";
import { nodeHover } from "@/lib/motion-variants";
import { cn } from "@/lib/utils";

export function HubNode({
  area,
  isActive,
  isVisited,
  className,
}: {
  area: MoveArea;
  isActive: boolean;
  isVisited: boolean;
  className?: string;
}) {
  return (
    <m.a
      href={`#${area.id}`}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={nodeHover}
      aria-current={isActive ? "true" : undefined}
      className={cn(
        "group relative flex flex-col items-center justify-center gap-1 rounded-2xl border-2 px-5 py-4 text-center transition-colors",
        isActive
          ? "border-move-yellow bg-move-yellow/10"
          : "border-move-gray-700 bg-move-ink hover:border-move-coral",
        className,
      )}
    >
      {isVisited && (
        <span
          aria-hidden="true"
          className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full bg-move-coral font-accent text-[10px] font-bold text-move-black"
        >
          ✓
        </span>
      )}
      <span className="font-accent text-sm font-bold uppercase tracking-wide text-move-white">
        {area.label}
      </span>
      <span className="text-xs text-move-gray-300">{area.description}</span>
    </m.a>
  );
}
