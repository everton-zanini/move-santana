import { PANORAMA } from "@/lib/constants";
import type { PanoramaHotspot } from "@/types/game";

/** Wraps into (-180, 180]. */
function normalizeDeg(deg: number): number {
  const wrapped = ((deg % 360) + 360) % 360;
  return wrapped > 180 ? wrapped - 360 : wrapped;
}

/**
 * Projects a hotspot's fixed bearing (`hotspotYaw`) against the camera's
 * current look direction (`yaw`) onto a 0–100 horizontal position within the
 * visible field of view. Pure math, no DOM — mirrors the old raycaster's
 * screen-projection step but angle-only (no distance/occlusion).
 */
export function projectHotspot(
  yaw: number,
  hotspotYaw: number,
  fovDeg: number = PANORAMA.fovDeg,
): { leftPercent: number; visible: boolean } {
  const diff = normalizeDeg(hotspotYaw - yaw);
  const half = fovDeg / 2;
  return {
    leftPercent: 50 + (diff / half) * 50,
    visible: Math.abs(diff) <= half,
  };
}

/**
 * Writes each hotspot marker's screen position directly to the DOM every
 * frame — called from the render loop, intentionally bypassing React state
 * so dragging stays smooth at 60fps without re-rendering.
 */
export function updateHotspotMarkers(
  yaw: number,
  hotspots: PanoramaHotspot[],
  markerEls: Record<string, HTMLButtonElement | null>,
) {
  for (const hotspot of hotspots) {
    const el = markerEls[hotspot.areaId];
    if (!el) continue;

    const { leftPercent, visible } = projectHotspot(yaw, hotspot.yawDeg);

    if (!visible) {
      el.style.opacity = "0";
      el.style.pointerEvents = "none";
      continue;
    }

    el.style.left = `${leftPercent}%`;
    el.style.opacity = "1";
    el.style.pointerEvents = "auto";
  }
}
