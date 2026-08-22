"use client";

import { Orbit } from "lucide-react";

/**
 * iOS gates `deviceorientation` behind an explicit user-gesture permission
 * prompt — this button is that gesture. Shown only while permission hasn't
 * been resolved yet; dragging still works regardless of whether this is
 * ever tapped.
 */
export function GyroscopePermissionButton({ onRequest }: { onRequest: () => void }) {
  return (
    <button
      type="button"
      onClick={onRequest}
      className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-move-gray-700 bg-move-black/80 px-4 py-2 font-accent text-xs font-semibold uppercase tracking-wide text-move-white backdrop-blur"
    >
      <Orbit className="size-4 text-move-yellow" aria-hidden="true" />
      Ativar giroscópio
    </button>
  );
}
