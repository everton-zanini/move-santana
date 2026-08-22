"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gameMap } from "@/data/gameMap";
import { resolveMove } from "@/lib/gameCollision";
import { combineInput } from "@/lib/gameInput";
import { castRays, mixColor } from "@/lib/raycaster";
import { updateDoorMarkers } from "@/lib/doorMarkers";
import { TEXTURE_SIZE } from "@/lib/gameTextures";
import { GAME } from "@/lib/constants";
import { useKeyboardMoveState } from "@/hooks/useKeyboardMoveState";
import { useDragLook } from "@/hooks/useDragLook";
import type { GameAssets } from "@/hooks/useGameAssets";
import { CELL, type PlayerState, type RaycastHit } from "@/types/game";

const FOG_COLOR = "#080808";
const SKY_TOP_COLOR = "#050506";
const SKY_HORIZON_COLOR = "#17141a";
const GROUND_COLOR = "#0a0a0c";
const DOOR_COLOR = "#ff4d5a";

// Static star field for the open-world night sky — computed once (not per
// frame) since the positions never change.
const STARS = Array.from({ length: 60 }, () => ({
  xFrac: Math.random(),
  yFrac: Math.random(),
  radius: Math.random() < 0.85 ? 1 : 1.5,
}));

function makeInitialPlayer(): PlayerState {
  return { ...gameMap.playerStart };
}

/**
 * areaId of the nearest door within opening range, if any — else null.
 * Deliberately proximity-only, not angle/facing-based: once you've walked
 * right up to (or into) a doorway, you're often looking *past* it at the
 * solid wall beyond (there's no interior), which puts the door's center
 * behind you by the time you're standing in it — an angle check would
 * reject the door exactly when you're closest to it. Buildings are spaced
 * far enough apart (`GAME.buildingOffset`) that at most one door is ever
 * within `doorOpenRangeUnits` at a time, so distance alone is unambiguous.
 */
function findFacedDoor(player: PlayerState): string | null {
  let closestAreaId: string | null = null;
  let closestDistance = Infinity;

  for (const door of gameMap.doors) {
    const dx = door.x + 0.5 - player.x;
    const dy = door.y + 0.5 - player.y;
    const distance = Math.hypot(dx, dy);
    if (distance > GAME.doorOpenRangeUnits) continue;

    if (distance < closestDistance) {
      closestDistance = distance;
      closestAreaId = door.areaId;
    }
  }

  return closestAreaId;
}

export function useGameEngine(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  active: boolean,
  dpadMoveRef: RefObject<number>,
  dpadTurnRef: RefObject<number>,
  markerElsRef: RefObject<Record<string, HTMLButtonElement | null>>,
  assets: GameAssets,
  onFacedDoorChange: (areaId: string | null) => void,
) {
  const playerRef = useRef<PlayerState>(makeInitialPlayer());
  const assetsRef = useRef(assets);
  const facedAreaIdRef = useRef<string | null>(null);

  useEffect(() => {
    assetsRef.current = assets;
  }, [assets]);

  const keysRef = useKeyboardMoveState(active);
  const lookDeltaRef = useDragLook(canvasRef, active);

  useEffect(() => {
    if (!active) return;
    // Fresh run every time the overlay opens.
    playerRef.current = makeInitialPlayer();
    facedAreaIdRef.current = null;
    onFacedDoorChange(null);
  }, [active, onFacedDoorChange]);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    canvas.width = GAME.renderWidth;
    canvas.height = GAME.renderHeight;
    ctx.imageSmoothingEnabled = false;

    let frameId = 0;
    let lastTime = performance.now();
    let paused = false;

    function tick(now: number) {
      const dt = Math.min(now - lastTime, GAME.maxDelta) / 1000;
      lastTime = now;

      if (!paused) {
        const player = playerRef.current;

        const yawDelta = lookDeltaRef.current;
        lookDeltaRef.current = 0;
        player.angle += yawDelta * GAME.turnSensitivity;
        player.angle += dpadTurnRef.current * GAME.dpadTurnSpeed * dt;

        const input = combineInput(keysRef.current, { x: 0, y: -dpadMoveRef.current });
        const moveDistance = GAME.moveSpeed * dt;
        const moveX =
          (Math.cos(player.angle) * input.forward - Math.sin(player.angle) * input.strafe) *
          moveDistance;
        const moveY =
          (Math.sin(player.angle) * input.forward + Math.cos(player.angle) * input.strafe) *
          moveDistance;

        const resolved = resolveMove(gameMap, player.x, player.y, moveX, moveY, GAME.playerRadius);
        player.x = resolved.x;
        player.y = resolved.y;

        const hits = render(ctx!, player, assetsRef.current);
        updateDoorMarkers(player, hits, markerElsRef.current);

        const facedAreaId = findFacedDoor(player);
        if (facedAreaId !== facedAreaIdRef.current) {
          facedAreaIdRef.current = facedAreaId;
          onFacedDoorChange(facedAreaId);
        }
      }

      frameId = requestAnimationFrame(tick);
    }

    function handleVisibility() {
      paused = document.hidden;
      if (!paused) lastTime = performance.now();
    }

    document.addEventListener("visibilitychange", handleVisibility);
    frameId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frameId);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [active, canvasRef, dpadMoveRef, dpadTurnRef, markerElsRef, keysRef, lookDeltaRef, onFacedDoorChange]);
}

function render(ctx: CanvasRenderingContext2D, player: PlayerState, assets: GameAssets): RaycastHit[] {
  const { renderWidth: width, renderHeight: height, fov, maxRenderDistance } = GAME;
  const horizon = height / 2;

  const sky = ctx.createLinearGradient(0, 0, 0, horizon);
  sky.addColorStop(0, SKY_TOP_COLOR);
  sky.addColorStop(1, SKY_HORIZON_COLOR);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, horizon);

  ctx.fillStyle = "#ffffff";
  for (const star of STARS) {
    ctx.globalAlpha = star.radius > 1 ? 0.9 : 0.6;
    ctx.fillRect(star.xFrac * width, star.yFrac * horizon, star.radius, star.radius);
  }
  ctx.globalAlpha = 1;

  ctx.fillStyle = GROUND_COLOR;
  ctx.fillRect(0, horizon, width, horizon);

  const hits = castRays(gameMap, player, fov, width);
  const { wallTextures } = assets;

  for (let x = 0; x < width; x++) {
    const hit = hits[x];
    const wallHeight = Math.min(height / hit.distance, height);
    const top = horizon - wallHeight / 2;

    if (hit.cell === CELL.DOOR) {
      const shade = hit.side === 1 ? mixColor(DOOR_COLOR, "#000000", 0.22) : DOOR_COLOR;
      ctx.fillStyle = mixColor(shade, FOG_COLOR, hit.distance / maxRenderDistance);
      ctx.fillRect(x, top, 1, wallHeight);
      continue;
    }

    if (hit.cell === CELL.WALL && wallTextures.length > 0) {
      const variant = Math.abs(hit.cellX * 7 + hit.cellY * 13) % wallTextures.length;
      const texture = wallTextures[variant];
      const srcX = Math.min(TEXTURE_SIZE - 1, Math.floor(hit.wallX * TEXTURE_SIZE));
      ctx.drawImage(texture, srcX, 0, 1, TEXTURE_SIZE, x, top, 1, wallHeight);

      // Directional shading (N/S faces read slightly darker than E/W) plus
      // distance fog, both as flat alpha overlays on top of the texture.
      if (hit.side === 1) {
        ctx.globalAlpha = 0.22;
        ctx.fillStyle = "#000000";
        ctx.fillRect(x, top, 1, wallHeight);
      }
      ctx.globalAlpha = Math.min(1, hit.distance / maxRenderDistance);
      ctx.fillStyle = FOG_COLOR;
      ctx.fillRect(x, top, 1, wallHeight);
      ctx.globalAlpha = 1;
    }
  }

  return hits;
}
