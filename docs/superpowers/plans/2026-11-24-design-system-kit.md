# Design system e kit de imagens — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Pranchas HTML da marca Mango com 6 temas de degradê e um script que tira PNG delas.

**Architecture:** HTML estático em `escolhas/marca/`, servido pelo Vite. Tokens em `src/marca/marca.css`; temas em `escolhas/marca/temas.css` (bloco `[data-tema=...]` define `--g1 --g2 --g3 --fundo --tinta`); `temas.js` monta o seletor e lê `?v=`.

**Tech Stack:** HTML/CSS, Inter, Phosphor (CDN, como `loja.html`), Chrome headless.

**Spec:** `docs/superpowers/specs/2026-11-24-design-system-kit-design.md`

## Global Constraints

- Cores só via variáveis; as 6: `#ff9f1c #1fb57a #ff5e7e #2f7bff #7b5cff #22b5e8`; apoio `#ffd23f #a46bff #3aa0ff #3ddc97`.
- Temas: `manga arco-iris uva oceano folha noite`; padrão `manga`.
- Logo sem degradê, sombra, contorno; só Phosphor; nada da Apple.
- 390 px sem rolagem lateral.

## Review Focus

- `?v=` com tema inexistente → cai no `manga`, sem quebrar.
- Tema `noite`: texto continua legível (tinta clara sobre fundo escuro).
- 390 px: grade de cores e escala tipográfica não estouram a largura.

---

### Task 1: Tokens e temas

**Files:** Modify `src/marca/marca.css` · Create `escolhas/marca/temas.css`, `escolhas/marca/temas.js`, `escolhas/marca/temas.test.js`

**Produces:** `TEMAS` (array de `{id, nome}`) e `temaDaUrl(search) -> id` exportados de `temas.js`; `iniciarTemas()` aplica `data-tema` no `<html>` e desenha o seletor `.proto-picker`.

- [ ] Teste `temas.test.js` (`node --test`): `temaDaUrl('?v=uva') === 'uva'`; `temaDaUrl('?v=xyz') === 'manga'`; `temaDaUrl('') === 'manga'`; todo `id` de `TEMAS` aparece como `[data-tema="id"]` em `temas.css`.
- [ ] Rodar, falha. Implementar. Rodar, passa.
- [ ] Adicionar `--c-manga --c-verde --c-rosa --c-azul --c-roxo --c-ciano` e `--g-manga`, `--g-arco` em `marca.css`.
- [ ] Commit `feat(marca): 6 cores como variáveis e temas de degradê`.

### Task 2: prancha.html

**Files:** Create `escolhas/marca/prancha.html`, `escolhas/marca/index.html`

Seções (spec): capa · 01 cores · 02 tipografia · 03 peças · 04 aplicações · 05 tom de voz. Degradê em malha (`radial-gradient` com `--g1..3`).

- [ ] Montar; abrir em `/escolhas/marca/prancha.html?v=<cada tema>`; console sem erro; 390 px sem rolagem lateral.
- [ ] Commit `feat(marca): prancha da marca`.

### Task 3: scripts/kit.mjs

**Files:** Create `scripts/kit.mjs`

`node scripts/kit.mjs [base=http://localhost:5173]`: para cada prancha × tema roda Chrome `--headless=new --screenshot=<out> --window-size=1440,<altura> --force-device-scale-factor=2 --hide-scrollbars`, saída `docs/imagens/kit/<prancha>-<tema>.png`. Caminho do Chrome via `CHROME` ou o padrão do Windows.

- [ ] Com dev rodando, gera 6 PNGs não vazios. Commit `feat(marca): script do kit de imagens`.

### Task 4–6 (se der fôlego): logo.html, peels.html, cartoes.html, apps.html — mesmo padrão da Task 2, conteúdo da spec.
