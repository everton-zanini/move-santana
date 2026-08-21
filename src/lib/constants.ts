export const Z_INDEX = {
  base: 0,
  grain: 5,
  content: 10,
  nav: 40,
  cursor: 60,
  toast: 70,
  game: 80,
} as const;

export const PARTICLE_FIELD = {
  desktopCount: 36,
  maxDelta: 1000 / 30, // clamp rAF delta so a throttled tab doesn't jump particles
} as const;

export const EXPLORATION_STORAGE_KEY = "move-santana:visited-areas";

export const EASTER_EGG = {
  logoClickCount: 5,
  logoClickWindowMs: 2500,
  keySequence: ["m", "o", "v", "e"],
  logoTriggerEvent: "movesantana:logo-easter-egg",
} as const;

export const GAME = {
  gridSize: 21,
  center: 10,
  boateHalf: 2, // the central "MOVE" building (a 5x5 block, the boate/hub landmark)
  buildingHalf: 1, // each area building (3x3 block)
  buildingOffset: 7, // distance from the plaza center to each building's center
  moveSpeed: 3, // grid cells per second
  turnSensitivity: 0.005, // radians per pixel of drag
  playerRadius: 0.25,
  fov: (66 * Math.PI) / 180,
  renderWidth: 320,
  renderHeight: 200,
  maxRenderDistance: 16,
  maxDelta: 1000 / 30, // clamp rAF delta, same rationale as PARTICLE_FIELD
  doorFlashMs: 450,
  minLoadingMs: 500, // floor for GameLoadingScreen even if assets load faster
} as const;

// Short impact phrases painted on building walls, cycled by grid position
// (see lib/gameTextures.ts / useGameEngine.ts) so walls don't all repeat
// the exact same line.
export const WALL_PHRASES = ["NÃO FIQUE PARADO", "SE MOVA", "BORA JUNTO"] as const;
