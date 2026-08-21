import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const VARIANT_CLASSES = {
  coral:
    "bg-move-coral text-move-black hover:bg-move-white focus-visible:bg-move-white glow-coral",
  yellow:
    "bg-move-yellow text-move-black hover:bg-move-white focus-visible:bg-move-white glow-yellow",
  outline:
    "bg-transparent text-move-white border-2 border-move-white hover:border-move-yellow hover:text-move-yellow",
} as const;

type Variant = keyof typeof VARIANT_CLASSES;

const baseClasses =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-accent text-sm font-semibold uppercase tracking-wide transition-colors duration-200 min-h-12";

interface CommonProps {
  children: ReactNode;
  variant?: Variant;
  showArrow?: boolean;
  className?: string;
}

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const { children, variant = "coral", showArrow = true, className, ...rest } = props;
  const classes = cn(baseClasses, VARIANT_CLASSES[variant], className);

  if ("href" in rest && rest.href) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & {
      href: string;
    };
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
        {showArrow && <ArrowRight className="size-4" aria-hidden="true" />}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
      {showArrow && <ArrowRight className="size-4" aria-hidden="true" />}
    </button>
  );
}
