"use client";

import { AnimatePresence, m } from "motion/react";
import { useEffect } from "react";
import { useExploration } from "@/hooks/useExploration";
import { popIn } from "@/lib/motion-variants";
import { Z_INDEX } from "@/lib/constants";

/**
 * One-time celebration when all areas have been explored. The message is
 * real content (not decoration), so it's announced via `aria-live` even
 * though the toast itself is also visible.
 */
export function UnlockToast() {
  const { justCompleted, dismissCompletion } = useExploration();

  useEffect(() => {
    if (!justCompleted) return;
    const timeout = setTimeout(dismissCompletion, 6000);
    return () => clearTimeout(timeout);
  }, [justCompleted, dismissCompletion]);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-24 flex justify-center px-4 sm:bottom-8"
      style={{ zIndex: Z_INDEX.toast }}
      aria-live="polite"
    >
      <AnimatePresence>
        {justCompleted && (
          <m.div
            role="status"
            variants={popIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="pointer-events-auto flex items-center gap-3 rounded-2xl border border-move-gray-700 bg-move-ink px-5 py-3 shadow-xl"
          >
            <span className="font-accent text-sm font-semibold text-move-white">
              Você explorou o Move inteiro! Bem-vindo(a) à família 🙌
            </span>
            <button
              type="button"
              onClick={dismissCompletion}
              className="font-accent text-xs uppercase text-move-gray-300 hover:text-move-yellow"
            >
              Fechar
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
