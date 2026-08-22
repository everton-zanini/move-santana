"use client";

import type { PointerEvent, RefObject } from "react";
import { PixelGlyph, ARROW_GLYPH } from "@/components/game/PixelGlyph";

function DPadButton({
  rotateDeg,
  onPress,
  onRelease,
  areaLabel,
  gridArea,
}: {
  rotateDeg: number;
  onPress: () => void;
  onRelease: () => void;
  areaLabel: string;
  gridArea: string;
}) {
  function handlePointerDown(event: PointerEvent<HTMLButtonElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    onPress();
  }

  return (
    <button
      type="button"
      aria-label={areaLabel}
      onPointerDown={handlePointerDown}
      onPointerUp={onRelease}
      onPointerCancel={onRelease}
      style={{ gridArea }}
      className="flex size-12 items-center justify-center border-2 border-move-gray-700 bg-move-ink/80 text-move-yellow active:bg-move-coral active:text-move-black"
    >
      <PixelGlyph matrix={ARROW_GLYPH} className="size-6" style={{ transform: `rotate(${rotateDeg}deg)` }} />
    </button>
  );
}

/**
 * Touch-only 8-bit D-pad, fixed to the bottom-left corner: front/back walk
 * (held = continuous move, same "hold to move" feel the old analog
 * joystick had), left/right turn the camera — an alternative to dragging,
 * mainly useful on touch where dragging *and* holding a button at once is
 * awkward. Writes straight into the caller-owned refs the engine reads
 * every tick, no re-render.
 */
export function DPad({
  moveRef,
  turnRef,
}: {
  moveRef: RefObject<number>;
  turnRef: RefObject<number>;
}) {
  return (
    <div
      className="absolute bottom-6 left-6 grid grid-cols-3 grid-rows-3 gap-1"
      style={{ gridTemplateAreas: `". up ." "left . right" ". down ."` }}
    >
      <DPadButton
        gridArea="up"
        rotateDeg={0}
        areaLabel="Andar pra frente"
        onPress={() => {
          moveRef.current = 1;
        }}
        onRelease={() => {
          moveRef.current = 0;
        }}
      />
      <DPadButton
        gridArea="left"
        rotateDeg={-90}
        areaLabel="Virar pra esquerda"
        onPress={() => {
          turnRef.current = -1;
        }}
        onRelease={() => {
          turnRef.current = 0;
        }}
      />
      <DPadButton
        gridArea="right"
        rotateDeg={90}
        areaLabel="Virar pra direita"
        onPress={() => {
          turnRef.current = 1;
        }}
        onRelease={() => {
          turnRef.current = 0;
        }}
      />
      <DPadButton
        gridArea="down"
        rotateDeg={180}
        areaLabel="Andar pra trás"
        onPress={() => {
          moveRef.current = -1;
        }}
        onRelease={() => {
          moveRef.current = 0;
        }}
      />
    </div>
  );
}
