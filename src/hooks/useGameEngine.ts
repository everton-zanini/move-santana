"use client";

import { useEffect, useRef, type RefObject } from "react";
import { gameMap } from "@/data/gameMap";
import { resolveMove } from "@/lib/gameCollision";
import { combineInput } from "@/lib/gameInput";
import { castRays } from "@/lib/raycaster";
import { updateDoorMarkers } from "@/lib/doorMarkers";
import { TEXTURE_SIZE } from "@/lib/gameTextures";
import { GAME } from "@/lib/constants";
import { useKeyboardMoveState } from "@/hooks/useKeyboardMoveState";
import { useDragLook } from "@/hooks/useDragLook";
import type { GameAssets } from "@/hooks/useGameAssets";
import { CELL, type JoystickVector, type PlayerState, type RaycastHit } from "@/types/game";

const FOG_COLOR = "#080808";
const SKY_TOP_COLOR = "#050506";
const SKY_HORIZON_COLOR = "#17141a";
const GROUND_COLOR = "#0a0a0c";

// Static star field for the open-world night sky — computed once (not
// per frame) since the positions never change.
const STARS = Array.from({ length: 60 }, () => ({
  xFrac: Math.random(),
  yFrac: Math.random(),
  radius: Math.random() < 0.85 ? 1 : 1.5,
}));

function makeInitialPlayer(): PlayerState {
  return { ...gameMap.playerStart };
}

export function useGameEngine(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  active: boolean,
  joystickVectorRef: RefObject<JoystickVector>,
  markerElsRef: RefObject<Record<string, HTMLDivElement | null>>,
  assets: GameAssets,
  onDoorReached: (areaId: string) => void,
) {
  const playerRef = useRef<PlayerState>(makeInitialPlayer());
  const doorFiredRef = useRef(false);
  const assetsRef = useRef(assets);

  useEffect(() => {
    assetsRef.current = assets;
  }, [assets]);

  const keysRef = useKeyboardMoveState(active);
  const lookDeltaRef = useDragLook(canvasRef, active);

  useEffect(() => {
    if (!active) return;
    // Fresh run every time the overlay opens.
    playerRef.current = makeInitialPlayer();
    doorFiredRef.current = false;
  }, [active]);

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
        if (!doorFiredRef.current) {
          const player = playerRef.current;

          const yawDelta = lookDeltaRef.current;
          lookDeltaRef.current = 0;
          player.angle += yawDelta * GAME.turnSensitivity;

          const input = combineInput(keysRef.current, joystickVectorRef.current);
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

          const cellX = Math.floor(player.x);
          const cellY = Math.floor(player.y);
          if (gameMap.grid[cellY]?.[cellX] === CELL.DOOR) {
            const door = gameMap.doors.find((d) => d.x === cellX && d.y === cellY);
            if (door) {
              doorFiredRef.current = true;
              onDoorReached(door.areaId);
            }
          }
        }

        const hits = render(ctx!, playerRef.current, assetsRef.current);
        updateDoorMarkers(playerRef.current, hits, markerElsRef.current);
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
  }, [active, canvasRef, joystickVectorRef, markerElsRef, keysRef, lookDeltaRef, onDoorReached]);
}

function render(
  ctx: CanvasRenderingContext2D,
  player: PlayerState,
  assets: GameAssets,
): RaycastHit[] {
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
  const { doorTextures, wallTextures } = assets;

  for (let x = 0; x < width; x++) {
    const hit = hits[x];
    const wallHeight = Math.min(height / hit.distance, height);
    const top = horizon - wallHeight / 2;

    let texture: HTMLCanvasElement | undefined;
    if (hit.cell === CELL.DOOR) {
      const door = gameMap.doors.find((d) => d.x === hit.cellX && d.y === hit.cellY);
      texture = door ? doorTextures[door.areaId] : undefined;
    } else if (hit.cell === CELL.WALL && wallTextures.length > 0) {
      const variant = Math.abs(hit.cellX * 7 + hit.cellY * 13) % wallTextures.length;
      texture = wallTextures[variant];
    }

    if (texture) {
      const srcX = Math.min(TEXTURE_SIZE - 1, Math.floor(hit.wallX * TEXTURE_SIZE));
      ctx.drawImage(texture, srcX, 0, 1, TEXTURE_SIZE, x, top, 1, wallHeight);
    }

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

  return hits;
}
