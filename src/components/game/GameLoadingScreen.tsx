"use client";

import Image from "next/image";
import { m } from "motion/react";
import { PANORAMA } from "@/lib/constants";

const SEGMENT_COUNT = 10;

/** Shown for a brief, deliberate beat every time the game overlay opens. */
export function GameLoadingScreen() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 bg-move-black">
      <Image
        src="/logos/m-mark-coral.png"
        alt=""
        width={72}
        height={43}
        className="animate-pulse-glow"
      />
      <p className="font-accent text-xs font-semibold uppercase tracking-[0.3em] text-move-gray-300">
        Entrando no Move…
      </p>
      <PixelProgressBar />
    </div>
  );
}

/** Fill purely illustrates "loading" for the fixed beat above — it never reflects real asset progress. */
function PixelProgressBar() {
  return (
    <div
      role="presentation"
      className="flex gap-1 border border-move-gray-700 bg-move-gray-800 p-1"
    >
      {Array.from({ length: SEGMENT_COUNT }).map((_, i) => (
        <m.span
          key={i}
          className="h-3 w-2 bg-move-yellow"
          initial={{ opacity: 0.15 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.1,
            delay: (i / SEGMENT_COUNT) * (PANORAMA.minLoadingMs / 1000),
          }}
        />
      ))}
    </div>
  );
}
