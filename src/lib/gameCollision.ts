import { CELL } from "@/types/game";
import type { GameMap } from "@/types/game";

function isWallAt(map: GameMap, x: number, y: number): boolean {
  const cellX = Math.floor(x);
  const cellY = Math.floor(y);
  if (cellX < 0 || cellY < 0 || cellX >= map.width || cellY >= map.height) return true;
  return map.grid[cellY][cellX] === CELL.WALL;
}

/** Doors are walkable (reaching one is how a door "opens"); only walls block. */
function isSolidAt(map: GameMap, x: number, y: number, radius: number): boolean {
  return (
    isWallAt(map, x - radius, y - radius) ||
    isWallAt(map, x + radius, y - radius) ||
    isWallAt(map, x - radius, y + radius) ||
    isWallAt(map, x + radius, y + radius)
  );
}

/**
 * Resolves a move by testing X and Y independently (each against the
 * already-resolved other axis) — this is what makes the player slide along
 * a wall instead of stopping dead when moving diagonally into it.
 */
export function resolveMove(
  map: GameMap,
  x: number,
  y: number,
  dx: number,
  dy: number,
  radius: number,
): { x: number; y: number } {
  let nx = x;
  let ny = y;

  if (!isSolidAt(map, x + dx, y, radius)) nx = x + dx;
  if (!isSolidAt(map, nx, y + dy, radius)) ny = y + dy;

  return { x: nx, y: ny };
}
