"use client";

import { useEffect, useRef, type RefObject } from "react";
import { useDragLook } from "@/hooks/useDragLook";
import { useDeviceOrientationLook } from "@/hooks/useDeviceOrientationLook";
import { PANORAMA } from "@/lib/constants";
import { panoramaHotspots } from "@/data/panoramaHotspots";
import { updateHotspotMarkers } from "@/lib/panoramaProjection";

const ARROW_KEY_STEP_DEG = 15;

function wrap360(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

/**
 * Drives the panorama's yaw from drag input (mouse/touch, via `useDragLook`),
 * physically turning the phone (via `useDeviceOrientationLook`), and arrow
 * keys — writing the backdrop's parallax transform and each door marker's
 * screen position directly to the DOM every frame, same bypass-React-state
 * approach as the old raycast render loop, since these change every frame.
 */
export function usePanoramaEngine(
  containerRef: RefObject<HTMLElement | null>,
  backdropRef: RefObject<HTMLElement | null>,
  markerElsRef: RefObject<Record<string, HTMLButtonElement | null>>,
  active: boolean,
) {
  const yawRef = useRef(0);
  const dragDeltaRef = useDragLook(containerRef, active);
  const orientation = useDeviceOrientationLook(active);

  useEffect(() => {
    if (!active) return;

    function applyYaw() {
      if (backdropRef.current) {
        backdropRef.current.style.transform = `translateX(${-(yawRef.current / 360) * 100}%)`;
      }
      updateHotspotMarkers(yawRef.current, panoramaHotspots, markerElsRef.current);
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") yawRef.current = wrap360(yawRef.current - ARROW_KEY_STEP_DEG);
      else if (event.key === "ArrowRight") yawRef.current = wrap360(yawRef.current + ARROW_KEY_STEP_DEG);
      else return;
      applyYaw();
    }
    window.addEventListener("keydown", onKeyDown);

    let frameId: number;
    function tick() {
      const dragDelta = dragDeltaRef.current;
      dragDeltaRef.current = 0;
      const orientationDelta = orientation.deltaRef.current;
      orientation.deltaRef.current = 0;
      if (dragDelta !== 0 || orientationDelta !== 0) {
        yawRef.current = wrap360(
          yawRef.current + dragDelta * PANORAMA.turnSensitivity + orientationDelta,
        );
      }
      applyYaw();
      frameId = requestAnimationFrame(tick);
    }
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, dragDeltaRef, orientation.deltaRef, backdropRef, markerElsRef]);

  function focusHotspot(yawDeg: number) {
    yawRef.current = yawDeg;
    if (backdropRef.current) {
      backdropRef.current.style.transform = `translateX(${-(yawDeg / 360) * 100}%)`;
    }
    updateHotspotMarkers(yawDeg, panoramaHotspots, markerElsRef.current);
  }

  return {
    focusHotspot,
    needsOrientationPermission: orientation.needsPermission,
    orientationPermission: orientation.permission,
    requestOrientationPermission: orientation.requestPermission,
  };
}
