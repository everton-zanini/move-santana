---
name: ui-design
description: Move Santana visual system — color hierarchy, typography, and the checklist to avoid a generic Tailwind-template look.
---

# UI Design — Move Santana

Aplica-se a qualquer componente visual novo ou revisão de UI neste projeto.

## Regras de cor

- Tokens: `--move-yellow` (#FFF800), `--move-coral` (#FF4D5A), `--move-black` (#080808), mais cinzas `--move-gray-300/500/700/800`. Definidos em `src/app/globals.css` via `@theme`.
- **Nunca** as duas cores saturadas (amarelo e coral) dominando a mesma tela ao mesmo tempo. Escolha uma cor de destaque por seção/CTA — a outra some para os cinzas/preto/branco naquela área.
- Fundo é quase preto (`--move-black`) por padrão. Elementos "card" usam `--move-ink` (levemente mais claro) para criar profundidade sem clarear o fundo geral.
- Estados de foco/hover sempre usam `--move-yellow` (ver `:focus-visible` global) — nunca dependa só de cor para indicar estado; combine com borda, ícone ou texto.

## Tipografia

- Display (`font-display` → Anton): títulos gigantes, hero, números de evento. Sempre uppercase, `leading-none`/`leading-[0.95]`.
- Accent (`font-accent` → Chakra Petch): labels de UI, badges, countdown, texto do hub — dá a sensação de HUD/interface, não de corpo de texto.
- Sans (`font-sans` → Inter): parágrafos e descrições. Nunca use Inter em títulos grandes — perde o caráter do projeto.

## Checklist "isso parece template genérico?"

Antes de considerar um componente pronto, verifique se ele **não** cai em nenhum destes padrões clichê:

- Hero centralizado + título + subtítulo + botão, sem nenhum elemento assimétrico/decorativo ao redor.
- Grid de 3 cards idênticos com ícone-título-texto e `rounded-lg` uniforme.
- Sombras suaves genéricas (`shadow-md` padrão) em vez de `glow-coral`/`glow-yellow` ou bordas duras.
- Texto perfeitamente centralizado e simétrico em todas as seções, sem quebra de grid ou elemento fora do eixo.

Prefira: grids quebrados/assimétricos, stickers rotacionados (`Sticker.tsx`), grain sutil (`.bg-grain`/`GrainOverlay`), números grandes, formas geométricas decorativas — sempre com hierarquia clara.
