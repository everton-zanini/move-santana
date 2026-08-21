"use client";

import { useRef, type RefObject } from "react";
import { useVirtualJoystick } from "@/hooks/useVirtualJoystick";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import type { JoystickVector } from "@/types/game";

const BASE_SIZE = 96;
const MAX_RADIUS = BASE_SIZE / 2 - 8;

/** Touch-only movement joystick, fixed to the bottom-left corner of the game overlay. */
export function VirtualJoystick({ vectorRef }: { vectorRef: RefObject<JoystickVector> }) {
  const isTouch = useIsTouchDevice();
  const baseRef = useRef<HTMLDivElement>(null);
  const { knobOffset } = useVirtualJoystick(baseRef, vectorRef, MAX_RADIUS);

  if (!isTouch) return null;

  return (
    <div
      ref={baseRef}
      aria-hidden="true"
      className="absolute bottom-8 left-8 touch-none rounded-full border-2 border-move-gray-500 bg-move-ink/70"
      style={{ width: BASE_SIZE, height: BASE_SIZE }}
    >
      <div
        className="absolute size-10 rounded-full bg-move-coral/80"
        style={{
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) translate(${knobOffset.x}px, ${knobOffset.y}px)`,
        }}
      />
    </div>
  );
}
