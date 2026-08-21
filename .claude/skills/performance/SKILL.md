---
name: performance
description: Core Web Vitals budget for the static Vercel deploy — image rules, particle/canvas perf caps, and the CLS guard against decorative effects.
---

# Performance — Move Santana

Site estático/client-heavy, sem backend, hospedado na Vercel. Prioridade: rápido no celular.

## Imagens

- Sempre `next/image`, sempre com `width`/`height` (ou `sizes` correto) para nunca causar layout shift. Ver `GalleryImage` (tipo exige `width`/`height`) e `GalleryItem.tsx`.
- Logos em `public/logos/` já são PNG grandes (até ~4200px de largura) — sempre renderize com `width`/`height` reduzidos no componente (`next/image` reamostra), nunca sirva o arquivo original em tamanho real no mobile.
- Novas fotos de galeria: adicione em `public/gallery/`, meça as dimensões reais antes de cadastrar em `src/data/gallery.ts` (não invente `width`/`height`).

## Efeitos decorativos (partículas, cursor, parallax, grain)

- `ParticleField`: contagem fixa em `PARTICLE_FIELD.desktopCount` (ver `src/lib/constants.ts`) — não aumente sem motivo; já é desktop-only e se autodesliga em touch/reduced-motion.
- Todo loop de animação manual (canvas/rAF) precisa: (1) pausar em `visibilitychange`/aba oculta, (2) clampar o delta do `requestAnimationFrame` (`PARTICLE_FIELD.maxDelta`) pra não "pular" depois de a aba ficar em segundo plano.
- `GrainOverlay` é CSS puro (sem JS, sem canvas) — se precisar de outro efeito "sempre visível", prefira CSS a canvas/JS sempre que possível.
- Nenhum efeito decorativo pode mover ou redimensionar conteúdo real (texto, botões, cards) — isso é CLS. Efeitos ficam em elementos `aria-hidden`, posicionados `absolute`/`fixed`, nunca no fluxo do layout.

## Bundle

- Animação usa `motion` com `LazyMotion features={domAnimation}` (ver `layout.tsx`) — não importe `motion` (pacote completo) nem `domMax` a menos que drag/layout animations sejam genuinamente necessários; isso infla o bundle.
- Não adicione lib de carrossel/swipe (embla, swiper etc.) — `scroll-snap` nativo já cobre os casos deste projeto.

## Verificação antes de considerar uma mudança "pronta"

`npm run build` sem erros, depois `npm run start` local e checar no DevTools: sem erros de hidratação no console, sem CLS visível ao carregar a Home, imagens carregando lazy fora da primeira viewport.
