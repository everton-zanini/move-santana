"use client";

import { useEffect, useRef, type RefObject } from "react";

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

  useEffect(() => {
    const el = elementRef.current;
    if (!active || !el) return;

    function onPointerDown(event: PointerEvent) {
      if (pointerIdRef.current !== null) return;
      pointerIdRef.current = event.pointerId;
      lastXRef.current = event.clientX;
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
