import { areas } from "@/data/areas";
import { GAME } from "@/lib/constants";
import { CELL, type CellValue, type GameDoor, type GameMap } from "@/types/game";

// The level is an open plaza (not a maze) with a building per area, so its
// layout is generated from areas.ts instead of hand-authored — a plus
// arrangement of buildings around a central landmark, matching the same
// top/left/right/bottom axes HubMap uses.
const POSITION_TO_DELTA: Record<string, [number, number]> = {
  top: [0, -1],
  bottom: [0, 1],
  left: [-1, 0],
  right: [1, 0],
};

function carveBuilding(grid: CellValue[][], centerX: number, centerY: number, half: number) {
  for (let y = centerY - half; y <= centerY + half; y++) {
    for (let x = centerX - half; x <= centerX + half; x++) {
      grid[y][x] = CELL.WALL;
    }
  }
}

function buildGameMap(): GameMap {
  const { gridSize, center, boateHalf, buildingHalf, buildingOffset } = GAME;

  // Open ground everywhere, with a solid ring at the edge so the player
  // can't walk off the world.
  const grid: CellValue[][] = Array.from({ length: gridSize }, (_, y) =>
    Array.from({ length: gridSize }, (_, x): CellValue =>
      x === 0 || y === 0 || x === gridSize - 1 || y === gridSize - 1 ? CELL.WALL : CELL.EMPTY,
    ),
  );

  const doors: GameDoor[] = [];

  // The central "boate" — the MOVE building/landmark players start facing.
  // Its door is decorative (re-confirms the #move section) rather than one
  // of the tracked exploration areas.
  carveBuilding(grid, center, center, boateHalf);
  const boateDoorY = center + boateHalf;
  grid[boateDoorY][center] = CELL.DOOR;
  doors.push({ areaId: "move", x: center, y: boateDoorY });

  for (const area of areas) {
    const delta = POSITION_TO_DELTA[area.position];
    if (!delta) continue; // "move" itself is handled above as the boate

    const [dx, dy] = delta;
    const buildingX = center + dx * buildingOffset;
    const buildingY = center + dy * buildingOffset;
    carveBuilding(grid, buildingX, buildingY, buildingHalf);

    // Door sits on the building's face closest to the plaza center.
    const doorX = buildingX - dx * buildingHalf;
    const doorY = buildingY - dy * buildingHalf;
    grid[doorY][doorX] = CELL.DOOR;
    doors.push({ areaId: area.id, x: doorX, y: doorY });
  }

  return {
    width: gridSize,
    height: gridSize,
    grid,
    doors,
    playerStart: { x: center + 0.5, y: center + boateHalf + 3.5, angle: -Math.PI / 2 },
  };
}

export const gameMap: GameMap = buildGameMap();
