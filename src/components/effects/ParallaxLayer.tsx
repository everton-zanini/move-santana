"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { m, useMotionValue, useSpring, useTransform } from "motion/react";
import { useReducedMotionPreference } from "@/providers/ReducedMotionProvider";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";

/**
 * Wraps a purely decorative element (never real content, so its position
 * never affects layout/reading order) and offsets it slightly based on
 * pointer position. Desktop-only, disabled under reduced motion.
 */
export function ParallaxLayer({
  children,
  intensity = 20,
  className,
}: {
  children: ReactNode;
  intensity?: number;
  className?: string;
}) {
  const reducedMotion = useReducedMotionPreference();
  const isTouch = useIsTouchDevice();
  const enabled = !reducedMotion && !isTouch;

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 20, stiffness: 120 });
  const springY = useSpring(mouseY, { damping: 20, stiffness: 120 });
  const x = useTransform(springX, (value) => value * intensity);
  const y = useTransform(springY, (value) => value * intensity);

  useEffect(() => {
    if (!enabled) return;
    function handleMove(event: MouseEvent) {
      const nx = event.clientX / window.innerWidth - 0.5;
      const ny = event.clientY / window.innerHeight - 0.5;
      mouseX.set(nx);
      mouseY.set(ny);
    }
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [enabled, mouseX, mouseY]);

  if (!enabled) {
    return (
      <div aria-hidden="true" className={className}>
        {children}
      </div>
    );
  }

  return (
    <m.div aria-hidden="true" className={className} style={{ x, y }}>
      {children}
    </m.div>
  );
}
