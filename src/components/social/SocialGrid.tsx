import type { SocialLink } from "@/types/social";
import { SocialCard } from "@/components/social/SocialCard";

export function SocialGrid({ links }: { links: SocialLink[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {links.map((link) => (
        <SocialCard key={link.id} link={link} />
      ))}
    </div>
  );
}
