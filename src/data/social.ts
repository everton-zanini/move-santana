import type { SocialLink } from "@/types/social";

// TODO: substitua pelos links reais. Este é o único lugar que precisa mudar
// para atualizar Instagram/WhatsApp/YouTube em todo o site.
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
    id: "whatsapp",
    platform: "whatsapp",
    label: "WhatsApp",
    description: "Entra no grupo e fica por dentro de tudo.",
    href: "https://wa.me/5511999999999", // TODO: substituir pelo número real
    handle: "Grupo do Move",
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
