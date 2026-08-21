import { gameMap } from "@/data/gameMap";
import { GAME } from "@/lib/constants";
import { CELL, type PlayerState, type RaycastHit } from "@/types/game";

function normalizeAngle(angle: number): number {
  return Math.atan2(Math.sin(angle), Math.cos(angle));
}

/**
 * Positions each door's icon+label marker in screen space (as a % of the
 * canvas's displayed box, so it lines up regardless of the low internal
 * render resolution) by projecting the door's world position the same way
 * the raycaster does, then reuses that column's already-cast ray to check
 * the door is actually the nearest thing on that ray (so a marker never
 * "shows through" a nearer wall).
 *
 * Mutates the marker elements' styles directly — called once per frame
 * from the render loop, so this intentionally bypasses React state.
 */
export function updateDoorMarkers(
  player: PlayerState,
  hits: RaycastHit[],
  markerEls: Record<string, HTMLDivElement | null>,
) {
  const { renderWidth: width, renderHeight: height, fov, maxRenderDistance } = GAME;
  const horizon = height / 2;

  for (const door of gameMap.doors) {
    const el = markerEls[door.areaId];
    if (!el) continue;

    const dx = door.x + 0.5 - player.x;
    const dy = door.y + 0.5 - player.y;
    const distance = Math.hypot(dx, dy);
    const relativeAngle = normalizeAngle(Math.atan2(dy, dx) - player.angle);

    if (Math.abs(relativeAngle) > fov / 2 || distance > maxRenderDistance) {
      el.style.opacity = "0";
      continue;
    }

    const column = Math.round(((relativeAngle + fov / 2) / fov) * (width - 1));
    const hit = hits[column];
    const isUnoccluded = hit.cell === CELL.DOOR && hit.cellX === door.x && hit.cellY === door.y;

    if (!isUnoccluded) {
      el.style.opacity = "0";
      continue;
    }

    const wallHeight = Math.min(height / hit.distance, height);
    const topPixel = horizon - wallHeight / 2;
    const scale = Math.max(0.6, Math.min(1.6, 3 / distance));

    el.style.left = `${(column / (width - 1)) * 100}%`;
    el.style.top = `${(topPixel / height) * 100}%`;
    el.style.opacity = "1";
    el.style.transform = `translate(-50%, -100%) scale(${scale})`;
  }
}
