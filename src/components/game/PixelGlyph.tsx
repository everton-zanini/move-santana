import type { CSSProperties } from "react";

/** A small grid of square blocks — the "pixel art" language shared by the loading bar, tutorial, and D-pad. */
export function PixelGlyph({
  matrix,
  className,
  style,
}: {
  matrix: number[][];
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      aria-hidden="true"
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${matrix[0].length}, 1fr)`,
        gridTemplateRows: `repeat(${matrix.length}, 1fr)`,
        ...style,
      }}
    >
      {matrix.flatMap((row, y) =>
        row.map((cell, x) => (
          <div key={`${x}-${y}`} className={cell ? "bg-current" : "bg-transparent"} />
        )),
      )}
    </div>
  );
}

// Shared 6-wide pixel sprites.
export const CURSOR_GLYPH = [
  [1, 0, 0, 0, 0, 0],
  [1, 1, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0],
  [1, 1, 1, 1, 0, 0],
  [1, 1, 1, 1, 1, 0],
  [1, 1, 0, 1, 1, 0],
  [1, 0, 0, 0, 1, 1],
  [0, 0, 0, 0, 0, 1],
];

export const DOOR_GLYPH = [
  [1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1],
];

/** 5-wide up-arrow — rotate via CSS transform for down/left/right. */
export const ARROW_GLYPH = [
  [0, 0, 1, 0, 0],
  [0, 1, 1, 1, 0],
  [1, 1, 1, 1, 1],
  [0, 0, 1, 0, 0],
  [0, 0, 1, 0, 0],
];
