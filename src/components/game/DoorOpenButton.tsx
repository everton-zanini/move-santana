"use client";

import { DoorOpen } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Single action button, bottom-right: lights up in coral only while
 * `facedAreaId` is non-null (the engine reports a door directly ahead and
 * within range every frame, but only calls back up when that value
 * actually changes, so this stays a cheap state update). Pressing it is
 * now the only way through a door — walking into one no longer
 * auto-triggers it.
 */
export function DoorOpenButton({
  facedAreaId,
  onOpen,
}: {
  facedAreaId: string | null;
  onOpen: () => void;
}) {
  const enabled = facedAreaId !== null;

  return (
    <button
      type="button"
      onClick={onOpen}
      disabled={!enabled}
      aria-label="Abrir porta"
      className={cn(
        "absolute bottom-6 right-6 flex size-16 items-center justify-center border-2 transition-colors",
        enabled
          ? "border-move-black bg-move-coral text-move-black"
          : "border-move-gray-700 bg-move-ink/80 text-move-gray-500",
      )}
    >
      <DoorOpen className="size-7" aria-hidden="true" />
    </button>
  );
}
