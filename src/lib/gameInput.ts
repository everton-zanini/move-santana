import type { JoystickVector, KeyboardMoveState, MoveInput } from "@/types/game";

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

/**
 * Sums keyboard and joystick input instead of branching by device — a
 * physical keyboard and a touch joystick never coexist in practice, so
 * there's no case where summing them produces a wrong result.
 */
export function combineInput(keys: KeyboardMoveState, joystick: JoystickVector): MoveInput {
  const keyboardForward = (keys.forward ? 1 : 0) - (keys.backward ? 1 : 0);
  const keyboardStrafe = (keys.right ? 1 : 0) - (keys.left ? 1 : 0);

  return {
    forward: clamp(keyboardForward - joystick.y, -1, 1),
    strafe: clamp(keyboardStrafe + joystick.x, -1, 1),
  };
}
