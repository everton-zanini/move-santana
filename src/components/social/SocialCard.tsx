import { Camera, MessageCircle, PlaySquare, Send, ArrowUpRight, type LucideIcon } from "lucide-react";
import type { SocialLink } from "@/types/social";

const ICONS: Record<SocialLink["platform"], LucideIcon> = {
  instagram: Camera,
  telegram: Send,
  youtube: PlaySquare,
  tiktok: MessageCircle,
};

export function SocialCard({ link }: { link: SocialLink }) {
  const Icon = ICONS[link.platform];

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col gap-4 rounded-3xl border border-move-gray-700 bg-move-ink p-6 transition-colors hover:border-move-coral"
    >
      <div className="flex items-center justify-between">
        <span className="flex size-12 items-center justify-center rounded-2xl bg-move-coral text-move-black">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        <ArrowUpRight
          className="size-5 text-move-gray-500 transition-colors group-hover:text-move-yellow"
          aria-hidden="true"
        />
      </div>

      <div>
        <h3 className="font-display text-xl uppercase text-move-white">{link.label}</h3>
        {link.handle && (
          <p className="font-accent text-xs uppercase tracking-wide text-move-coral">
            {link.handle}
          </p>
        )}
        <p className="mt-2 text-sm text-move-gray-300">{link.description}</p>
      </div>
    </a>
  );
}
