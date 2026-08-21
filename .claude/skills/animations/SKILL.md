---
name: animations
description: Motion (motion/react) conventions for Move Santana — shared variants, reduced-motion gating, and the effects-layer isolation pattern.
---

# Animations — Move Santana

Este projeto usa o pacote `motion` (antigo framer-motion), importado de `"motion/react"`, sempre via o componente `m` (não `motion.*`) — o app está envolto em `<LazyMotion features={domAnimation} strict>` no `layout.tsx`, e `strict` quebra o build se algum componente usar `motion.div` em vez de `m.div`.

## Reduced motion — já resolvido globalmente, não reinvente

- `<MotionConfig reducedMotion="user">` no `layout.tsx` já faz todo `m.*`/variant respeitar `prefers-reduced-motion` automaticamente. **Não** adicione checagem manual de reduced-motion em componentes que só usam `m.div`/`whileInView`/variants.
- A camada manual de efeitos (`src/components/effects/*` — partículas, cursor customizado, parallax) não passa pelo Framer Motion em tudo (canvas, rAF cru), então usa `useReducedMotionPreference()` (de `ReducedMotionProvider`) para se auto-desligar. Qualquer novo efeito manual segue o mesmo padrão: cheque a preferência e retorne `null` (ou uma versão estática) no topo do componente.

## Variants compartilhadas

Ficam em `src/lib/motion-variants.ts`: `fadeUp`, `fadeIn`, `staggerContainer`, `revealMask`, `nodeHover`, `popIn`. Reutilize essas antes de criar uma nova — a consistência entre seções é intencional (toda seção usa `staggerContainer` + `fadeUp` nos filhos via `whileInView`).

## Regras físicas

- Anime **só** `opacity` e `transform` (translate/scale) — nunca `width`, `height`, `top`/`left`, `filter: blur()` em elementos que afetam layout. Mantém tudo no compositor, sem reflow.
- Entrada de seção usa `whileInView` com `viewport={{ once: true, amount: 0.3 }}` — anima uma vez, não repete ao rolar de novo.
- Parallax (`ParallaxLayer`) só em elementos puramente decorativos (`aria-hidden`), nunca em texto/conteúdo real — a posição do conteúdo nunca deve depender do mouse.

## Onde não usar motion

Componentes de dados puros (`EventCard`, `SocialCard`, seções server-renderizadas sem interatividade) não precisam de `m.*` — a entrada deles já é coberta pelo wrapper `m.div` com `staggerContainer` na seção pai. Não duplique animação em cada filho individualmente além do stagger.
