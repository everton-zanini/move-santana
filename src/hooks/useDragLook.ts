"use client";

import { useEffect, useRef, type RefObject } from "react";

const TAP_THRESHOLD_PX = 10;

/**
 * Drag-to-look, shared by desktop (mouse) and mobile (touch) — the same
 * interaction on both platforms. Accumulates horizontal drag distance (px)
 * into the returned ref; the caller drains it once per game-loop tick
 * (read the value, then reset it to 0).
 */
export function useDragLook(elementRef: RefObject<HTMLElement | null>, active: boolean) {
  const deltaRef = useRef(0);
  const pointerIdRef = useRef<number | null>(null);
  const lastXRef = useRef(0);
  const startRef = useRef({ x: 0, y: 0, target: null as EventTarget | null });

  useEffect(() => {
    const el = elementRef.current;
    if (!active || !el) return;

    function onPointerDown(event: PointerEvent) {
      if (pointerIdRef.current !== null) return;
      pointerIdRef.current = event.pointerId;
      lastXRef.current = event.clientX;
      startRef.current = { x: event.clientX, y: event.clientY, target: event.target };
      el!.setPointerCapture(event.pointerId);
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerId !== pointerIdRef.current) return;
      deltaRef.current += event.clientX - lastXRef.current;
      lastXRef.current = event.clientX;
    }

    function endDrag(event: PointerEvent) {
      if (event.pointerId !== pointerIdRef.current) return;
      pointerIdRef.current = null;

      // Pointer capture retargets the native "click" event to this
      // container, so whatever was actually pressed (a door hotspot, a HUD
      // button) never gets its own click. Tell tap from drag by movement
      // distance, and manually click the originally-pressed element for a
      // tap — a real drag (moved past the threshold) fires nothing.
      if (event.type !== "pointerup") return;
      const dx = event.clientX - startRef.current.x;
      const dy = event.clientY - startRef.current.y;
      if (Math.hypot(dx, dy) < TAP_THRESHOLD_PX) {
        const pressed = (startRef.current.target as HTMLElement | null)?.closest<HTMLElement>(
          "button, a, [role='button']",
        );
        pressed?.click();
      }
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
      pointerIdRef.current = null;
      deltaRef.current = 0;
    };
  }, [elementRef, active]);

  return deltaRef;
}
