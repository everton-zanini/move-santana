"use client";

import { m } from "motion/react";
import { GAME, Z_INDEX } from "@/lib/constants";

export function DoorTransitionFlash({ onComplete }: { onComplete: () => void }) {
  return (
    <m.div
      aria-hidden="true"
      className="absolute inset-0 bg-move-yellow"
      style={{ zIndex: Z_INDEX.game + 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 1, 0] }}
      transition={{ duration: GAME.doorFlashMs / 1000, times: [0, 0.25, 0.7, 1] }}
      onAnimationComplete={onComplete}
    />
  );
}
