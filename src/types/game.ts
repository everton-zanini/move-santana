export const CELL = { EMPTY: 0, WALL: 1, DOOR: 2 } as const;
export type CellValue = (typeof CELL)[keyof typeof CELL];

export interface GameDoor {
  areaId: string;
  x: number;
  y: number;
}

export interface GameMap {
  width: number;
  height: number;
  /** grid[y][x], row-major. */
  grid: CellValue[][];
  doors: GameDoor[];
  playerStart: { x: number; y: number; angle: number };
}

export interface RaycastHit {
  distance: number;
  /** 0 = ray crossed a vertical gridline (E/W-facing wall face), 1 = horizontal (N/S-facing). */
  side: 0 | 1;
  cell: CellValue;
  /** Grid coordinates of the cell that was hit — lets callers tell which specific door a ray hit. */
  cellX: number;
  cellY: number;
  /** 0..1 fractional position along the hit wall face — the texture U coordinate. */
  wallX: number;
}

export interface PlayerState {
  x: number;
  y: number;
  angle: number;
}

export interface MoveInput {
  /** -1..1, forward/back. */
  forward: number;
  /** -1..1, strafe right/left. */
  strafe: number;
}

export interface KeyboardMoveState {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

/** Same shape as the old analog joystick vector — the D-pad only ever sets `y` (no strafe). */
export interface DPadVector {
  x: number;
  y: number;
}

export type GamePhase = "tutorial" | "loading" | "ready";
