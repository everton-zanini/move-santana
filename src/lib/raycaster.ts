import { CELL } from "@/types/game";
import type { GameMap, PlayerState, RaycastHit } from "@/types/game";

function isBlocking(map: GameMap, x: number, y: number): boolean {
  if (x < 0 || y < 0 || x >= map.width || y >= map.height) return true;
  const cell = map.grid[y][x];
  return cell === CELL.WALL || cell === CELL.DOOR;
}

/** Classic grid DDA raycast (lodev/Wolfenstein-style). Pure math, no DOM. */
export function castRay(map: GameMap, x: number, y: number, angle: number): RaycastHit {
  const rayDirX = Math.cos(angle);
  const rayDirY = Math.sin(angle);

  let mapX = Math.floor(x);
  let mapY = Math.floor(y);

  const deltaDistX = rayDirX === 0 ? Infinity : Math.abs(1 / rayDirX);
  const deltaDistY = rayDirY === 0 ? Infinity : Math.abs(1 / rayDirY);

  let stepX: number;
  let sideDistX: number;
  if (rayDirX < 0) {
    stepX = -1;
    sideDistX = (x - mapX) * deltaDistX;
  } else {
    stepX = 1;
    sideDistX = (mapX + 1 - x) * deltaDistX;
  }

  let stepY: number;
  let sideDistY: number;
  if (rayDirY < 0) {
    stepY = -1;
    sideDistY = (y - mapY) * deltaDistY;
  } else {
    stepY = 1;
    sideDistY = (mapY + 1 - y) * deltaDistY;
  }

  let side: 0 | 1 = 0;
  const maxSteps = map.width + map.height;

  for (let i = 0; i < maxSteps; i++) {
    if (sideDistX < sideDistY) {
      sideDistX += deltaDistX;
      mapX += stepX;
      side = 0;
    } else {
      sideDistY += deltaDistY;
      mapY += stepY;
      side = 1;
    }

    if (isBlocking(map, mapX, mapY)) break;
  }

  const distance =
    side === 0
      ? (mapX - x + (1 - stepX) / 2) / rayDirX
      : (mapY - y + (1 - stepY) / 2) / rayDirY;

  const inBounds = mapX >= 0 && mapY >= 0 && mapX < map.width && mapY < map.height;
  const cell = inBounds ? map.grid[mapY][mapX] : CELL.WALL;

  // Fractional position along the hit face (0..1) — the texture U coordinate.
  const wallHit = side === 0 ? y + distance * rayDirY : x + distance * rayDirX;
  let wallX = wallHit - Math.floor(wallHit);

  // Without this, the same wall face sampled from opposite walking
  // directions reads mirrored — flip U to match which edge of the cell
  // the ray actually entered from. (Inverted from the textbook lodev
  // condition: this engine's angle/axis convention runs the other way.)
  if (side === 0 && rayDirX < 0) wallX = 1 - wallX;
  if (side === 1 && rayDirY > 0) wallX = 1 - wallX;

  return {
    distance: Math.max(distance, 0.0001),
    side,
    cell,
    cellX: mapX,
    cellY: mapY,
    wallX,
  };
}

export function castRays(
  map: GameMap,
  player: PlayerState,
  fov: number,
  rayCount: number,
): RaycastHit[] {
  const hits: RaycastHit[] = [];
  for (let i = 0; i < rayCount; i++) {
    const angle = player.angle - fov / 2 + (i / Math.max(rayCount - 1, 1)) * fov;
    hits.push(castRay(map, player.x, player.y, angle));
  }
  return hits;
}

function clamp01(value: number): number {
  return Math.max(0, Math.min(1, value));
}

/** Linearly mixes two "#rrggbb" colors by `t` (0 = a, 1 = b). */
export function mixColor(a: string, b: string, t: number): string {
  const clamped = clamp01(t);
  const parse = (hex: string) => [
    parseInt(hex.slice(1, 3), 16),
    parseInt(hex.slice(3, 5), 16),
    parseInt(hex.slice(5, 7), 16),
  ];
  const [ar, ag, ab] = parse(a);
  const [br, bg, bb] = parse(b);
  const mix = (x: number, y: number) => Math.round(x + (y - x) * clamped);
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(mix(ar, br))}${toHex(mix(ag, bg))}${toHex(mix(ab, bb))}`;
}
