"use client";

import { useEffect } from "react";
import { m, useMotionValue, useSpring } from "motion/react";
import { useReducedMotionPreference } from "@/providers/ReducedMotionProvider";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { Z_INDEX } from "@/lib/constants";

/** Discreet coral dot that trails the pointer, desktop-only. */
export function CustomCursor() {
  const reducedMotion = useReducedMotionPreference();
  const isTouch = useIsTouchDevice();
  const shouldRender = !reducedMotion && !isTouch;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { damping: 30, stiffness: 400 });
  const springY = useSpring(y, { damping: 30, stiffness: 400 });

  useEffect(() => {
    if (!shouldRender) return;
    function handleMove(event: MouseEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [shouldRender, x, y]);

  if (!shouldRender) return null;

  return (
    <m.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 size-3 rounded-full bg-move-coral mix-blend-difference"
      style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%", zIndex: Z_INDEX.cursor }}
    />
  );
}
