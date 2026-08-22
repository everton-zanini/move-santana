import type { DPadVector, KeyboardMoveState, MoveInput } from "@/types/game";

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Sums keyboard and D-pad input instead of branching by device — a
 * physical keyboard and an on-screen D-pad never coexist in practice, so
 * there's no case where summing them produces a wrong result. The D-pad
 * only ever sets `y` (forward/back) — it has no strafe buttons.
 */
export function combineInput(keys: KeyboardMoveState, dpad: DPadVector): MoveInput {
  const keyboardForward = (keys.forward ? 1 : 0) - (keys.backward ? 1 : 0);
  const keyboardStrafe = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);

  return {
    forward: clamp(keyboardForward - dpad.y, -1, 1),
    strafe: clamp(keyboardStrafe + dpad.x, -1, 1),
  };
}
