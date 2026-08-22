export interface MoveArea {
  /** Matches the target section's `id`, e.g. "galeria". */
  id: string;
  /** Short hub label, e.g. "GALERIA". */
  label: string;
  description: string;
  /** Position in the hub grid: center is the "MOVE" node, others sit around it. */
  position: "top" | "left" | "right" | "bottom" | "center";
  /** Default true. Set false to show only the text label, no icon (e.g. "comece"). */
  showIcon?: boolean;
}
