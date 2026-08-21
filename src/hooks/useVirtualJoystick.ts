"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import type { JoystickVector } from "@/types/game";

/**
 * Touch-only joystick. A pointer that starts inside `baseRef`'s element is
 * captured by this hook for its whole lifetime (via `setPointerCapture`),
 * so it never reaches a `useDragLook` listener elsewhere on the canvas —
 * that's what lets look-drag and joystick-drag work at the same time on
 * mobile, with no manual pointerId exclusion list.
 *
 * Writes into the caller-owned `vectorRef` (rather than creating its own)
 * so a shared ancestor can pass the same ref to both this hook and the
 * game engine that reads it every tick.
 */
export function useVirtualJoystick(
  baseRef: RefObject<HTMLElement | null>,
  vectorRef: RefObject<JoystickVector>,
  maxRadiusPx: number,
) {
  const pointerIdRef = useRef<number | null>(null);
  const [knobOffset, setKnobOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = baseRef.current;
    if (!el) return;

    function updateFromEvent(event: PointerEvent) {
      const rect = el!.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      let dx = event.clientX - centerX;
      let dy = event.clientY - centerY;
      const distance = Math.hypot(dx, dy);
      if (distance > maxRadiusPx) {
        dx = (dx / distance) * maxRadiusPx;
        dy = (dy / distance) * maxRadiusPx;
      }

      vectorRef.current = { x: dx / maxRadiusPx, y: dy / maxRadiusPx };
      setKnobOffset({ x: dx, y: dy });
    }

    function onPointerDown(event: PointerEvent) {
      if (pointerIdRef.current !== null) return;
      pointerIdRef.current = event.pointerId;
      el!.setPointerCapture(event.pointerId);
      updateFromEvent(event);
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerId !== pointerIdRef.current) return;
      updateFromEvent(event);
    }

    function endDrag(event: PointerEvent) {
      if (event.pointerId !== pointerIdRef.current) return;
      pointerIdRef.current = null;
      vectorRef.current = { x: 0, y: 0 };
      setKnobOffset({ x: 0, y: 0 });
    }

    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    el.addEventListener("pointerup", endDrag);
    el.addEventListener("pointercancel", endDrag);

    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      el.removeEventListener("pointerup", endDrag);
      el.removeEventListener("pointercancel", endDrag);
    };
  }, [baseRef, vectorRef, maxRadiusPx]);

  return { knobOffset };
}
