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

export const PANORAMA = {
  fovDeg: 100, // horizontal slice of the 360° scene visible at once
  turnSensitivity: 0.25, // degrees of yaw per pixel of drag
  maxDelta: 1000 / 30, // clamp rAF delta, same rationale as PARTICLE_FIELD
  tutorialMs: 2400, // auto-advance floor for GameTutorialScreen (tap anywhere skips sooner)
  minLoadingMs: 500, // floor for GameLoadingScreen even if it has nothing real to wait for
  doorFlashMs: 450,
} as const;
