import { m } from "motion/react";
import { Smartphone } from "lucide-react";

/** Blocks play on touch devices held in portrait — the game plays much better in landscape. */
export function RotateDevicePrompt() {
  return (
    <div
      role="status"
      className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 bg-move-black px-8 text-center"
    >
      <m.div
        animate={{ rotate: [0, -90, -90, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, times: [0, 0.35, 0.75, 1] }}
      >
        <Smartphone className="size-12 text-move-yellow" aria-hidden="true" />
      </m.div>
      <p className="font-accent text-sm font-semibold uppercase tracking-widest text-move-white">
        Gire seu celular
      </p>
      <p className="max-w-xs text-sm text-move-gray-300">
        O modo exploração fica melhor na horizontal.
      </p>
    </div>
  );
}
