"use client";

import { Gamepad2 } from "lucide-react";
import { useGameOverlay } from "@/hooks/useGameOverlay";
import { useReducedMotionPreference } from "@/providers/ReducedMotionProvider";

/**
 * The one opt-in entry point into the first-person exploration mode.
 * Hidden entirely (not just disabled) under reduced motion — continuous
 * first-person movement is a classic motion-sickness trigger, and the
 * real hub/scroll navigation already covers the same destinations.
 */
export function GameLauncherButton() {
  const { open } = useGameOverlay();
  const reducedMotion = useReducedMotionPreference();

  if (reducedMotion) return null;

  return (
    <button
      type="button"
      onClick={open}
      className="mx-auto flex items-center gap-2 rounded-full border-2 border-move-gray-700 px-5 py-2.5 font-accent text-xs font-semibold uppercase tracking-widest text-move-gray-300 transition-colors hover:border-move-coral hover:text-move-white"
    >
      <Gamepad2 className="size-4" aria-hidden="true" />
      Modo exploração (beta)
    </button>
  );
}
