export interface MoveArea {
  /** Matches the target section's `id`, e.g. "eventos". */
  id: string;
  /** Short hub label, e.g. "EVENTOS". */
  label: string;
  description: string;
  /** Position in the hub grid: center is the "MOVE" node, others sit around it. */
  position: "top" | "left" | "right" | "bottom" | "center";
}
