export type SocialPlatform = "instagram" | "whatsapp" | "youtube" | "tiktok";

export interface SocialLink {
  id: string;
  platform: SocialPlatform;
  label: string;
  description: string;
  href: string;
  handle?: string;
}
