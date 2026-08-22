"use client";

import { useEffect, useRef } from "react";
import type { KeyboardMoveState } from "@/types/game";

const FORWARD_KEYS = new Set(["w", "arrowup"]);
const BACKWARD_KEYS = new Set(["s", "arrowdown"]);
const LEFT_KEYS = new Set(["a", "arrowleft"]);
const RIGHT_KEYS = new Set(["d", "arrowright"]);

/** WASD/arrow keys held state, as a ref (read once per game-loop tick, no re-renders). */
export function useKeyboardMoveState(active: boolean) {
  const stateRef = useRef<KeyboardMoveState>({
    forward: false,
    backward: false,
    left: false,
    right: false,
  });

  useEffect(() => {
    if (!active) return;

    function setKey(key: string, value: boolean) {
      const state = stateRef.current;
      if (FORWARD_KEYS.has(key)) state.forward = value;
      else if (BACKWARD_KEYS.has(key)) state.backward = value;
      else if (LEFT_KEYS.has(key)) state.left = value;
      else if (RIGHT_KEYS.has(key)) state.right = value;
    }

    function onKeyDown(event: KeyboardEvent) {
      setKey(event.key.toLowerCase(), true);
    }
    function onKeyUp(event: KeyboardEvent) {
      setKey(event.key.toLowerCase(), false);
    }

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      stateRef.current = { forward: false, backward: false, left: false, right: false };
    };
  }, [active]);

  return stateRef;
}
