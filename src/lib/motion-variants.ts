import type { Variants } from "motion/react";

// Shared variants for the whole app. Every entry animates only `opacity`
// and `transform` (translate/scale) so animations stay compositor-only and
// never trigger layout/paint work. `MotionConfig[reducedMotion="user"]` in
// the root layout already collapses these globally when the OS requests
// reduced motion — no per-component branching needed for `motion.*`/`m.*`.

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } },
};

export const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

export const revealMask: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export const nodeHover = {
  rest: { scale: 1 },
  hover: { scale: 1.06, transition: { duration: 0.25, ease: "easeOut" } },
  tap: { scale: 0.95 },
} as const;

export const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.85, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 22 },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};
