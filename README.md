# Move Santana

Landing page interativa do Move Santana — a juventude da Igreja Verbo da Vida Santana. Next.js (App Router) + TypeScript + Tailwind CSS v4 + Motion.

## Rodando localmente

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

Para simular o build de produção (o mesmo que roda na Vercel):

```bash
npm run build
npm run start
```

## Como editar o conteúdo

Todo o conteúdo editável fica em `src/data/`, separado dos componentes — não é necessário tocar em nenhum componente React para atualizar texto, fotos ou links.

| O que trocar | Arquivo |
| --- | --- |
| Fotos da galeria | `src/data/gallery.ts` + arquivos em `public/gallery/` |
| Instagram / WhatsApp / YouTube | `src/data/social.ts` |
| Nome, tagline, endereço, horário de culto, textos de SEO | `src/data/site.ts` |
| Áreas do "mapa" de navegação | `src/data/areas.ts` |

Vários campos nesses arquivos estão marcados com `// TODO: substituir` — são placeholders (número de WhatsApp, links de redes sociais) que precisam ser trocados pelos dados reais antes de publicar.

### Adicionando fotos na galeria

1. Coloque o arquivo em `public/gallery/`.
2. Adicione uma entrada em `src/data/gallery.ts` com `src`, `alt` (obrigatório, descreva a foto de verdade) e as dimensões reais (`width`/`height`) da imagem, para não quebrar o layout.
3. Marque `featured: true` numa foto para ela ocupar um espaço maior no grid.

### Logos

Os arquivos originais das logos estão em `public/logos/`. Se precisar trocar por uma versão nova, mantenha os mesmos nomes de arquivo (ou atualize as referências em `src/components/navigation/HeroGate.tsx`, `HubMap.tsx` e `src/components/sections/Footer.tsx`).

## Deploy na Vercel

1. Suba o repositório para o GitHub/GitLab/Bitbucket.
2. Em [vercel.com](https://vercel.com), importe o repositório — o Next.js é detectado automaticamente, nenhuma configuração extra é necessária.
3. Antes do primeiro deploy "de verdade", atualize `src/data/site.ts` (`site.url`) com o domínio real — é usado no `sitemap.ts`, `robots.ts` e nas meta tags de Open Graph.
4. `npm run build` já é validado localmente antes de cada entrega — não há banco de dados, backend ou variável de ambiente obrigatória.

## Arquitetura

```
src/
  app/            rotas, layout, metadata (sitemap/robots/manifest/OG image)
  components/
    ui/           componentes de apresentação genéricos (Button, Badge, ...)
    navigation/   hero, mapa de exploração (hub), nav mobile
    sections/     cada seção real da página (Move, Galeria, Sobre, Conecte, Footer)
    gallery/      grid de galeria + lightbox
    social/       cards de redes sociais
    effects/      camada decorativa (partículas, cursor, parallax, grain) — sempre opcional/gated
    gamification/ contador de exploração, toast de conclusão, easter eggs
    game/         modo exploração em panorama (olhar + tocar na porta) — opcional, ver abaixo
  data/           conteúdo editável (ver tabela acima)
  hooks/          lógica reutilizável (countdown, reduced motion, observers...)
  providers/      contexto React (exploração, seção ativa, reduced motion)
  lib/            variantes de animação, datas, utilitários
  types/          tipos TypeScript dos dados
```

A navegação é **uma única página** — o "mapa" (`HubMap` no desktop, `MobileNavRail`/`BottomTabBar` no mobile) rola suavemente até seções reais (`<section id="...">`), não são rotas separadas. Ver `.claude/skills/landing-page/SKILL.md` para o motivo e o passo a passo de como adicionar uma área nova.

### Modo exploração (panorama)

Um botão opcional "MODO EXPLORAÇÃO (BETA)" na seção Move abre uma cena 360° estilo "falso VR": arrastar (mouse, touch ou setas do teclado) gira a câmera, e cada área é uma porta clicável — tocar nela navega de verdade até a seção correspondente (e conta como "visitada" no contador de exploração). Toda vez que o modo abre, toca primeiro um tutorial em pixel art ensinando os controles, depois uma tela de carregamento breve, e só então a cena fica interativa. O cenário atual é um placeholder (marca d'água do logo + estrelas) até uma foto 360° real do espaço ser adicionada — ver `src/components/game/PanoramaViewer.tsx`. O botão **some completamente** quando o usuário tem "reduzir movimento" ativado no sistema — é uma camada extra, nunca o único caminho de navegação. Ver `.claude/skills/first-person-game/SKILL.md`.

## Skills do projeto

Em `.claude/skills/` há orientações específicas deste projeto para quem (humano ou Claude Code) for continuar o trabalho: `ui-design`, `mobile-first`, `animations`, `landing-page`, `accessibility`, `performance`, `nextjs`, `visual-testing`, `first-person-game`.
