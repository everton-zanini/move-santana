import type { SocialLink } from "@/types/social";

// TODO: substitua pelos links reais. Este é o único lugar que precisa mudar
// para atualizar Instagram/Telegram/YouTube em todo o site.
export const socialLinks: SocialLink[] = [
  {
    id: "instagram",
    platform: "instagram",
    label: "Instagram",
    description: "Bastidores, stories e os próximos eventos em primeira mão.",
    href: "https://instagram.com/movesantana", // TODO: substituir
    handle: "@movesantana",
  },
  {
    id: "telegram",
    platform: "telegram",
    label: "Telegram",
    description: "Fala com o bot do Move e fica por dentro de tudo.",
    href: "https://t.me/move_santana_bot?start=boasvindas",
    handle: "@move_santana_bot",
  },
  {
    id: "youtube",
    platform: "youtube",
    label: "YouTube",
    description: "Assiste os cultos e os melhores momentos.",
    href: "https://youtube.com/@movesantana", // TODO: substituir
    handle: "Move Santana",
  },
];
