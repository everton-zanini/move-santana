"use client";

import type { RefObject } from "react";
import { X } from "lucide-react";
import { VirtualJoystick } from "@/components/game/VirtualJoystick";
import type { JoystickVector } from "@/types/game";

export function GameHUD({
  onClose,
  joystickVectorRef,
}: {
  onClose: () => void;
  joystickVectorRef: RefObject<JoystickVector>;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar modo exploração"
        className="absolute right-4 top-4 flex size-11 items-center justify-center rounded-full bg-move-ink/80 text-move-white"
      >
        <X className="size-5" aria-hidden="true" />
      </button>

      <p
        aria-hidden="true"
        className="absolute left-1/2 top-4 -translate-x-1/2 whitespace-nowrap font-accent text-[11px] uppercase tracking-widest text-move-gray-300"
      >
        WASD ou joystick para andar · arraste para olhar · entre em um prédio
      </p>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-move-white/70"
      />

      <VirtualJoystick vectorRef={joystickVectorRef} />
    </>
  );
}
