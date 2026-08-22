"use client";

import { useEffect, useRef, type RefObject } from "react";
import { X } from "lucide-react";
import { DPad } from "@/components/game/DPad";
import { DoorOpenButton } from "@/components/game/DoorOpenButton";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

export function GameHUD({
  onClose,
  dpadMoveRef,
  dpadTurnRef,
  facedAreaId,
  onOpenDoor,
}: {
  onClose: () => void;
  dpadMoveRef: RefObject<number>;
  dpadTurnRef: RefObject<number>;
  facedAreaId: string | null;
  onOpenDoor: () => void;
}) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isTouch = useIsTouchDevice();

  useEffect(() => {
    // The background becomes `inert` the moment this overlay opens, which
    // blurs whatever was focused (the launcher button) without moving focus
    // anywhere — give keyboard users a real starting point inside it.
    closeButtonRef.current?.focus();
  }, []);

  return (
    <>
      <button
        ref={closeButtonRef}
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
        Arraste ou use o D-pad · aperte o botão pra abrir a porta
      </p>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-move-white/70"
      />

      {isTouch && <DPad moveRef={dpadMoveRef} turnRef={dpadTurnRef} />}
      <DoorOpenButton facedAreaId={facedAreaId} onOpen={onOpenDoor} />
    </>
  );
}
