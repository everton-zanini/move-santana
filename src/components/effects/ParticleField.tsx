"use client";

import { useEffect, useRef } from "react";
import { useReducedMotionPreference } from "@/providers/ReducedMotionProvider";
import { useIsTouchDevice } from "@/hooks/useIsTouchDevice";
import { PARTICLE_FIELD, Z_INDEX } from "@/lib/constants";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

const COLORS = ["#fff800", "#ff4d5a", "#ffffff"];

/**
 * Ambient floating dots behind the hero, desktop-only. Self-gates on
 * reduced-motion/touch so it can be dropped in without the caller having
 * to remember the guard. Pauses via `visibilitychange`, clamps rAF delta
 * so a throttled background tab never causes a jump on refocus.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotionPreference();
  const isTouch = useIsTouchDevice();
  const shouldRender = !reducedMotion && !isTouch;

  useEffect(() => {
    if (!shouldRender) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const particles: Particle[] = Array.from({ length: PARTICLE_FIELD.desktopCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.5) * 12,
      radius: Math.random() * 2 + 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }));

    let lastTime = performance.now();
    let frameId = 0;
    let paused = false;

    function tick(now: number) {
      const delta = Math.min(now - lastTime, PARTICLE_FIELD.maxDelta) / 1000;
      lastTime = now;

      if (!paused) {
        ctx!.clearRect(0, 0, width, height);
        for (const p of particles) {
          p.x += p.vx * delta;
          p.y += p.vy * delta;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;

          ctx!.beginPath();
          ctx!.fillStyle = p.color;
          ctx!.globalAlpha = 0.6;
          ctx!.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx!.fill();
        }
      }

      frameId = requestAnimationFrame(tick);
    }

    function handleVisibility() {
      paused = document.hidden;
      if (!paused) lastTime = performance.now();
    }

    function handleResize() {
      width = canvas!.width = canvas!.offsetWidth;
      height = canvas!.height = canvas!.offsetHeight;
    }

    document.addEventListener("visibilitychange", handleVisibility);
    window.addEventListener("resize", handleResize);
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("visibilitychange", handleVisibility);
      window.removeEventListener("resize", handleResize);
    };
  }, [shouldRender]);

  if (!shouldRender) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
      style={{ zIndex: Z_INDEX.base, pointerEvents: "none" }}
    />
  );
}
