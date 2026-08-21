---
name: nextjs
description: App Router conventions used in Move Santana — metadata/sitemap/robots, server-vs-client component boundaries, and the no-backend static-deploy constraint.
---

# Next.js — Move Santana

Next.js App Router + TypeScript strict + Tailwind v4 (config CSS-first via `@theme` em `globals.css`, sem `tailwind.config.ts`). Deploy estático/client-heavy na Vercel, sem banco de dados, sem API própria.

## Server vs. Client

- `src/data/*.ts` e `src/types/*.ts` são código puro, importáveis de qualquer lugar (server ou client).
- **Qualquer arquivo que use `m.div`/`m.a`/etc. (JSX de `motion/react`) diretamente precisa de `"use client"` no topo**, mesmo que o arquivo não tenha nenhum hook próprio. `m.div` faz um acesso de propriedade (`createMotionComponent()`) que só pode ser resolvido em runtime de cliente — colocá-lo dentro de um Server Component quebra o build com "Attempted to call createMotionComponent() from the server" (aconteceu com todas as seções e o `HeroGate` neste projeto; todas levaram `"use client"` por isso). Isso não prejudica SEO: o HTML ainda é gerado estaticamente, só a hidratação é client-side.
- Tudo em `src/components/navigation/*`, `src/components/sections/*`, `src/components/effects/*`, `src/components/gamification/*` e os providers em `src/providers/*` é `"use client"` neste projeto, por usarem `m.*`, estado, `matchMedia`, `IntersectionObserver` ou `localStorage`.
- Componentes de apresentação pura sem `m.*` e sem hooks (`EventCard`, `SocialCard`, `GalleryItem`, a maioria de `ui/*`) continuam Server Components — não adicione `"use client"` neles só por precaução.

## Metadata/SEO

- Toda metadata (title/description/OG) vem de `src/data/site.ts` (`site.seo.*`) e é consumida em `src/app/layout.tsx` — não hardcode strings de SEO em outro lugar.
- `src/app/sitemap.ts`, `robots.ts` e `manifest.ts` usam as *file conventions* do App Router (retornam `MetadataRoute.Sitemap/Robots/Manifest`) — não crie `public/sitemap.xml` estático manualmente.

## Fontes

Anton, Chakra Petch e Inter via `next/font/google` no `layout.tsx`, cada uma com `variable` própria (`--font-anton`, `--font-chakra-petch`, `--font-inter`), mapeadas para `--font-display`/`--font-accent`/`--font-sans` no `@theme` de `globals.css`. Para usar uma fonte em um componente, use as classes Tailwind `font-display`/`font-accent`/`font-sans` — nunca importe uma fonte Google direto num componente filho.

## Restrição de deploy

Sem servidor próprio, sem banco de dados, sem filesystem em runtime. Tudo que hoje é "dado" (`events.ts`, `gallery.ts`, `social.ts`) é estático no build. Se uma feature futura exigir dados dinâmicos (ex.: formulário de contato), prefira um serviço de terceiros (ex.: Formspree, WhatsApp direto) a construir um backend — mantém o `npm run build` simples e o deploy na Vercel sem configuração extra.
