---
name: visual-testing
description: How to verify Move Santana changes against the brief's aesthetic bar — breakpoints to check, reduced-motion states, and the "generic template" smell test.
---

# Visual Testing — Move Santana

## Breakpoints obrigatórios a checar

Sempre nesta ordem, com `npm run dev` (ou `next build && next start` para medir performance real):

1. 360px de largura (mobile compacto)
2. 390px
3. 412px
4. ~768px (tablet)
5. 1440px (desktop)
6. 1920px (desktop grande)

No DevTools, use o modo de dispositivo responsivo nessas larguras exatas — não confie só em redimensionar a janela.

## Estados a checar em toda mudança visual

- `prefers-reduced-motion: reduce` ligado (DevTools → Rendering → Emulate CSS media feature) — confirme que animações somem/reduzem drasticamente, mas o conteúdo continua legível e utilizável.
- Navegação completa via teclado (Tab por toda a página) — o foco deve ser sempre visível (contorno amarelo) e seguir uma ordem lógica.
- `HubMap` (desktop) vs. `MobileNavRail`/`BottomTabBar` (mobile) — confirme que a troca acontece exatamente em `md` (768px) e que nenhum dos dois aparece fora do seu breakpoint.

## Teste de "isso parece template genérico?"

Depois de qualquer mudança visual grande, pergunte: alguém que abrir isso reconheceria como "o site dos jovens da igreja" em menos de 2 segundos, ou parece um SaaS genérico? Se a resposta for "parece genérico", revise contra o checklist da skill `ui-design` antes de considerar a tarefa concluída.

## Console e build

Antes de reportar qualquer tarefa como concluída: `npm run build` sem erros/warnings novos, e console do navegador limpo (sem warning de hidratação — atenção especial em `EventCountdown`, que depende de `Date.now()` no cliente).
