export type SocialPlatform = "instagram" | "telegram" | "youtube" | "tiktok";

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  label: string;
  description: string;
  href: string;
  handle?: string;
}
