# Site Mango FORGE 75, parte 1: base, abertura, por dentro e reserva

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ter o site React no ar com a identidade Mango, o teclado 3D fixo atrás da página, a abertura e a cena "Por dentro" completa (camadas explicadas, vista lateral com cotas, abas com som e tabela de specs), terminando na reserva e no rodapé.

**Architecture:** Um único `<Canvas>` R3F fixo atrás da página lê, a cada quadro, um objeto de estado (`src/3d/estado.js`). As cenas não tocam no three: o progresso do scroll de cada uma (GSAP ScrollTrigger) passa por funções puras em `src/3d/roteiro.js`, que devolvem o estado do 3D, e esse estado é gravado com `definir()`. O modelo existente (`src/teclado/modelo.js`) é usado sem reescrever.

**Tech Stack:** React 19.3, Vite 8, three 0.186, @react-three/fiber 9, GSAP 3 + ScrollTrigger, liquid-glass-react 1.1, @shadergradient/react 2.4, testes com `node --test` (stdlib, sem dependência nova).

**Spec:** `docs/superpowers/specs/2026-10-06-mango-forge75-site-design.md`

**Parte 2 (outro plano, depois desta):** Destaques, Cores, Switch, Números, `prefers-reduced-transparency`, passada de polish.

## Global Constraints

- Cores: texto `#1d1d1f`; fundos `#fff` e `#f5f5f7`; faixa escura `#000` com texto `#f5f5f7` e secundário `#86868b`; azul de ação único `#0066cc` (foco `#0071e3`, link no escuro `#2997ff`); cobalto `#2563eb` só no produto.
- Tipo: Inter (Google Fonts, `opsz` 14..32, pesos 300..700) com `font-feature-settings: "cv11", "ss01"`; corpo 17px/1.44; títulos 600 com tracking negativo; pesos 300/400/600, **nunca 500**.
- Pílula para ações; raio de 18px em cards; tiles de página sem raio.
- Uma única sombra: `rgba(0,0,0,.22) 3px 5px 30px`, só no produto.
- Botões: `transform: scale(0.95)` ao pressionar.
- Gradiente só como luz de estúdio atrás do teclado; nenhum gradiente decorativo no resto.
- Vidro (liquid-glass-react) só em controles flutuantes. As barras usam o material da Apple em CSS (`backdrop-filter: saturate(180%) blur(20px)`).
- Animação ligada ao scroll usa scrub; animação disparada usa `toggleActions`; nunca as duas no mesmo trigger.
- O rodapé sempre diz que é uma paródia de portfólio, sem relação com a Apple.
- Textos em português do Brasil.
- Nenhuma dependência nova além das já instaladas.

## Review Focus

1. **Celular em pé (390×844):** o teclado de 32,5 cm não pode sair cortado da tela. A distância da câmera cresce em telas estreitas (`fatorDistancia`, testada na Task 2).
2. **Rolar para trás ou pular com o trilho/âncora:** o 3D tem que ficar igual ao de quem chegou rolando. O estado é função pura do progresso (testado na Task 2: mesmo `p` → mesmo estado, e `p` fora de 0..1 é limitado).
3. **`prefers-reduced-motion`:** sem scrub; a abertura mostra a pose final e a cena 3 mostra as camadas já separadas, com a lista inteira em texto (Tasks 4 e 5, verificação com `--force-prefers-reduced-motion` na Task 8).
4. **Sem WebGL:** aparece a foto do teclado no lugar do canvas, e a página continua legível (Task 3, verificação com `--disable-webgl` na Task 8).
5. **Teclado (Tab/setas):** trilho de camadas e abas operáveis sem mouse, com anel de foco visível (Tasks 5 e 6).

---

## Mapa de arquivos

| Arquivo | Responsabilidade |
|---|---|
| `index.html` | Entrada do app (fonte, favicon, `#root`) |
| `public/teclado.png` | Cópia de `refs/teclado.png`, para o fallback sem WebGL |
| `src/main.jsx` | Monta o React |
| `src/App.jsx` | Ordem da página: palco, barras, cenas e rodapé |
| `src/estilos/tokens.css` | Tokens (cores, tipo, sombra, curva) |
| `src/estilos/base.css` | Corpo, escala de tipo, botões, faixas, foco e seleção |
| `src/ui/Barras.jsx` + `barras.css` | Barra global (marca Mango) e barra do produto |
| `src/ui/Rodape.jsx` + `rodape.css` | Rodapé com o aviso de paródia |
| `src/3d/roteiro.js` | Funções puras: poses, estado da abertura, da cena 3 e das abas, e distância da câmera |
| `src/3d/roteiro.test.js` | Testes do roteiro |
| `src/3d/estado.js` | Estado único do palco + `definir()` |
| `src/3d/Palco.jsx` + `palco.css` | Canvas fixo, luz de estúdio (shadergradient) e fallback sem WebGL |
| `src/3d/Teclado.jsx` | Aplica o estado ao modelo e publica as âncoras na tela (variáveis CSS) |
| `src/cenas/Abertura.jsx` + `abertura.css` | Cena 1 |
| `src/cenas/porDentro/camadas.js` | Textos das 8 camadas |
| `src/cenas/porDentro/PorDentro.jsx` + `porDentro.css` | Cena 3 (a) e (b): camadas e cotas |
| `src/cenas/porDentro/Abas.jsx` + `abas.css` | Cena 3 (c): abas de vidro + som |
| `src/cenas/porDentro/Specs.jsx` | Cena 3 (d): tabela |
| `src/som/digitacao.js` | Som de digitação sintetizado (Web Audio) |
| `src/cenas/Reserva.jsx` + `reserva.css` | Cena 7 |

---

### Task 1: Base React com barras, abertura estática, reserva e rodapé

**Files:**
- Create: `index.html`, `public/teclado.png` (cópia), `src/main.jsx`, `src/App.jsx`, `src/estilos/tokens.css`, `src/estilos/base.css`, `src/ui/Barras.jsx`, `src/ui/barras.css`, `src/ui/Rodape.jsx`, `src/ui/rodape.css`, `src/cenas/Abertura.jsx`, `src/cenas/abertura.css`, `src/cenas/Reserva.jsx`, `src/cenas/reserva.css`
- Modify: `package.json` (script `test`)

**Interfaces:**
- Produces: as classes globais `.pill`, `.pill-ghost`, `.mais`, `.t-hero`, `.t-headline`, `.t-tile`, `.t-lead`, `.t-tagline`, `.t-legenda`, `.faixa`, `.faixa-tile`, `.faixa-escura`, `.sr-only`; os ids de seção `#visao-geral`, `#por-dentro`, `#especificacoes`, `#reservar`.

- [ ] **Step 1: Copiar a foto e criar `index.html`**

```bash
cp refs/teclado.png public/teclado.png
```

```html
<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Mango FORGE 75</title>
<meta name="description" content="Mango FORGE 75: teclado mecânico 75% em alumínio. Paródia de portfólio.">
<link rel="icon" href="/mango.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300..700&display=swap" rel="stylesheet">
</head>
<body>
<div id="root"></div>
<script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

- [ ] **Step 2: Tokens e base**

`src/estilos/tokens.css`:

```css
/* Tokens do DESIGN.md da Apple (.ferramentas/1-design-ui/awesome-design-md), com Inter no lugar da SF Pro. */
:root {
  --ink: #1d1d1f;
  --ink-2: #6e6e73;
  --ink-3: #86868b;
  --paper: #ffffff;
  --tile: #f5f5f7;
  --hairline: #e0e0e0;
  --action: #0066cc;
  --focus: #0071e3;
  --sky: #2997ff;
  --dark: #000000;
  --on-dark: #f5f5f7;
  --dark-2: #86868b;
  --dark-tile: #1d1d1f;
  --cobalt: #2563eb;
  --sombra-produto: 3px 5px 30px rgba(0, 0, 0, 0.22);
  --ease: cubic-bezier(0.28, 0.11, 0.32, 1);
  --gutter: max(22px, calc((100vw - 980px) / 2));
}
```

`src/estilos/base.css`:

```css
* { box-sizing: border-box; margin: 0; padding: 0; }
html { -webkit-text-size-adjust: 100%; overflow-x: clip; }
body {
  background: var(--paper); color: var(--ink);
  font: 400 17px/1.44 "Inter", system-ui, sans-serif; letter-spacing: -0.022em;
  font-optical-sizing: auto; font-feature-settings: "cv11", "ss01";
  -webkit-font-smoothing: antialiased;
}
::selection { background: rgba(0, 113, 227, 0.18); }
:focus-visible { outline: 2px solid var(--focus); outline-offset: 3px; border-radius: 6px; }
a { color: inherit; text-decoration: none; }
img { display: block; max-width: 100%; }
button { font: inherit; letter-spacing: inherit; color: inherit; background: none; border: 0; cursor: pointer; }
main { position: relative; z-index: 1; }
.sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }

/* escala de tipo: tracking fica mais fechado conforme o tamanho cresce */
.t-hero     { font-size: clamp(48px, 7.2vw, 80px); line-height: 1.05; font-weight: 600; letter-spacing: -0.03em; }
.t-headline { font-size: clamp(32px, 4.6vw, 56px); line-height: 1.07; font-weight: 600; letter-spacing: -0.028em; }
.t-tile     { font-size: clamp(28px, 3.2vw, 40px); line-height: 1.1;  font-weight: 600; letter-spacing: -0.024em; }
.t-lead     { font-size: clamp(21px, 2.4vw, 28px); line-height: 1.14; font-weight: 400; letter-spacing: -0.012em; }
.t-tagline  { font-size: 21px; line-height: 1.19; font-weight: 600; letter-spacing: -0.016em; }
.t-legenda  { font-size: 14px; line-height: 1.43; letter-spacing: -0.016em; color: var(--ink-2); }
h1, h2, h3 { text-wrap: balance; }

/* ações */
.pill {
  display: inline-block; background: var(--action); color: #fff; border: 1px solid var(--action);
  border-radius: 980px; padding: 11px 22px; font-size: 17px; line-height: 1.18;
  transition: background-color 0.2s var(--ease), transform 0.1s ease-out;
}
.pill:hover { background: #0058b0; border-color: #0058b0; }
.pill:active { transform: scale(0.95); }
.pill-ghost { background: transparent; color: var(--action); }
.pill-ghost:hover { background: var(--action); color: #fff; }
.faixa-escura .pill-ghost { color: var(--sky); border-color: var(--sky); }
.mais { color: var(--action); }
.mais:hover { text-decoration: underline; text-underline-offset: 0.18em; }
.mais::after { content: ""; display: inline-block; width: 0.42em; height: 0.42em; margin-left: 0.32em; vertical-align: 0.12em;
  border-right: 1.5px solid currentColor; border-top: 1.5px solid currentColor; transform: rotate(45deg); }
.faixa-escura .mais { color: var(--sky); }

/* faixas: a troca de cor separa as seções, sem linhas */
.faixa { padding: 120px var(--gutter); }
.faixa-tile { background: var(--tile); }
.faixa-escura { color: var(--on-dark); }
.faixa-escura .t-legenda { color: var(--dark-2); }
@media (max-width: 734px) { .faixa { padding: 80px var(--gutter); } }
```

- [ ] **Step 3: Barras**

`src/ui/Barras.jsx`:

```jsx
import './barras.css';

const GLOBAL = ['Teclados', 'Switches', 'Keycaps', 'Acessórios', 'Suporte'];

export default function Barras() {
  return (
    <>
      <nav className="barra-global" aria-label="Mango">
        <ul>
          <li><a className="marca" href="#visao-geral" aria-label="Mango, início" /></li>
          {GLOBAL.map((item) => <li key={item} className="opcional"><a href="#visao-geral">{item}</a></li>)}
          <li><a href="#reservar">Reservas</a></li>
        </ul>
      </nav>
      <nav className="barra-produto" aria-label="FORGE 75">
        <div>
          <strong>FORGE 75</strong>
          <a href="#visao-geral">Visão geral</a>
          <a href="#por-dentro">Por dentro</a>
          <a href="#especificacoes">Especificações</a>
          <a className="pill" href="#reservar">Reservar</a>
        </div>
      </nav>
    </>
  );
}
```

`src/ui/barras.css`:

```css
.barra-global {
  position: sticky; top: 0; z-index: 20; height: 44px;
  background: rgba(250, 250, 252, 0.8);
  backdrop-filter: saturate(180%) blur(20px); -webkit-backdrop-filter: saturate(180%) blur(20px);
}
.barra-global ul { list-style: none; height: 100%; max-width: 1024px; margin: 0 auto; padding: 0 22px;
  display: flex; align-items: center; justify-content: space-between; font-size: 12px; letter-spacing: -0.01em; }
.barra-global a { color: rgba(0, 0, 0, 0.8); transition: color 0.2s var(--ease); }
.barra-global a:hover { color: #000; }
.marca { display: block; width: 14px; height: 16px; background: currentColor;
  -webkit-mask: url(/mango.svg) center / contain no-repeat; mask: url(/mango.svg) center / contain no-repeat; }

.barra-produto {
  position: sticky; top: 44px; z-index: 19; height: 52px;
  background: rgba(255, 255, 255, 0.72);
  backdrop-filter: saturate(180%) blur(20px); -webkit-backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.08);
}
.barra-produto div { height: 100%; max-width: 1024px; margin: 0 auto; padding: 0 22px; display: flex; align-items: center; gap: 24px; }
.barra-produto strong { font-size: 21px; font-weight: 600; letter-spacing: -0.02em; margin-right: auto; }
.barra-produto a:not(.pill) { font-size: 12px; color: rgba(0, 0, 0, 0.72); }
.barra-produto a:not(.pill):hover { color: var(--action); }
.barra-produto .pill { font-size: 12px; padding: 4px 11px; }
@media (max-width: 734px) {
  .barra-produto a:not(.pill), .barra-global .opcional { display: none; }
}
```

- [ ] **Step 4: Rodapé**

`src/ui/Rodape.jsx`:

```jsx
import './rodape.css';

export default function Rodape() {
  return (
    <footer className="rodape">
      <p>Mango e FORGE 75 são uma paródia fictícia, criada como projeto de portfólio, sem relação com a Apple. Números, datas e reservas são ilustrativos.</p>
      <hr />
      <p>Copyright © 2026 Mango Inc. Todos os direitos reservados.</p>
    </footer>
  );
}
```

`src/ui/rodape.css`:

```css
.rodape { position: relative; z-index: 1; background: var(--tile); color: var(--ink-2);
  font-size: 12px; line-height: 1.34; letter-spacing: -0.01em; padding: 18px var(--gutter) 28px; }
.rodape hr { border: 0; border-top: 1px solid #d2d2d7; margin: 16px 0; }
```

- [ ] **Step 5: Abertura estática e reserva**

`src/cenas/Abertura.jsx`:

```jsx
import './abertura.css';

export default function Abertura() {
  return (
    <section id="visao-geral" className="abertura" aria-labelledby="abertura-titulo">
      <div className="abertura-fixo">
        <h1 id="abertura-titulo" className="t-hero">Pesado do jeito certo.</h1>
        <p className="t-lead">Mango FORGE 75. Alumínio inteiro, gasket mount, 8000 Hz.</p>
        <div className="abertura-acoes">
          <a className="pill" href="#reservar">Reservar</a>
          <a className="pill pill-ghost" href="#por-dentro">Saiba mais</a>
        </div>
      </div>
    </section>
  );
}
```

`src/cenas/abertura.css`:

```css
/* 200vh: a primeira tela mais uma tela de scroll para o teclado girar */
.abertura { height: 200vh; }
.abertura-fixo { position: sticky; top: 96px; display: grid; justify-items: center; gap: 10px;
  padding: 56px var(--gutter) 0; text-align: center; }
.abertura-acoes { display: flex; gap: 16px; margin-top: 18px; flex-wrap: wrap; justify-content: center; }
```

`src/cenas/Reserva.jsx`:

```jsx
import './reserva.css';

export default function Reserva() {
  return (
    <section id="reservar" className="faixa faixa-tile reserva" aria-labelledby="reserva-titulo">
      <h2 id="reserva-titulo" className="t-headline">O seu está esperando.</h2>
      <p className="t-lead">Reserve agora e receba entre os primeiros.</p>
      <a className="pill" href="#reservar">Reservar</a>
    </section>
  );
}
```

`src/cenas/reserva.css`:

```css
.reserva { position: relative; z-index: 1; display: grid; justify-items: center; gap: 18px; text-align: center; padding-block: 140px; }
.reserva .t-lead { color: var(--ink-2); }
.reserva .pill { margin-top: 8px; }
```

- [ ] **Step 6: Montar o app**

`src/main.jsx`:

```jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './estilos/tokens.css';
import './estilos/base.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(<StrictMode><App /></StrictMode>);
```

`src/App.jsx`:

```jsx
import Barras from './ui/Barras.jsx';
import Rodape from './ui/Rodape.jsx';
import Abertura from './cenas/Abertura.jsx';
import Reserva from './cenas/Reserva.jsx';

export default function App() {
  return (
    <>
      <Barras />
      <main>
        <Abertura />
        <Reserva />
      </main>
      <Rodape />
    </>
  );
}
```

Em `package.json`, dentro de `"scripts"`, acrescente:

```json
"test": "node --test \"src/**/*.test.js\""
```

- [ ] **Step 7: Build e captura**

Run: `npm run build`
Expected: termina sem erro e gera `dist/index.html`.

Com o `npm run dev` rodando, capture em 1440 e em 390 (o iframe evita a largura mínima do Chrome headless):

```bash
S="$TEMP"; C="/c/Program Files/Google/Chrome/Application/chrome.exe"
"$C" --headless=new --hide-scrollbars --virtual-time-budget=4000 --window-size=1440,1000 --screenshot="$S/t1-desk.png" http://localhost:5173/
printf '<body style="margin:0"><iframe src="/" style="width:390px;height:844px;border:0"></iframe>' > public/_390.html
"$C" --headless=new --hide-scrollbars --virtual-time-budget=4000 --window-size=600,900 --screenshot="$S/t1-mob.png" http://localhost:5173/_390.html
rm public/_390.html
```

Expected: as barras com a marca Mango, o título centralizado em Inter 600 e as pílulas azuis `#0066cc`; nada cortado em 390.

- [ ] **Step 8: Commit**

```bash
git add index.html public/teclado.png src/main.jsx src/App.jsx src/estilos src/ui src/cenas package.json
git commit -m "Base React: tokens, barras, abertura estática, reserva e rodapé"
```

---

### Task 2: Roteiro do 3D (funções puras, com testes)

**Files:**
- Create: `src/3d/roteiro.js`, `src/3d/roteiro.test.js`

**Interfaces:**
- Produces:
  - `POSES: Record<'frente'|'cima'|'explodido'|'lado'|'knob'|'portas', { cam: [x,y,z], alvo: [x,y,z], giro: number }>`
  - `N_CAMADAS = 8`
  - `FASES = { camadas: 0.72, junta: 0.82 }`
  - `clamp01(t: number): number`, `suave(t: number): number`
  - `type Estado3D = { cam: number[3], alvo: number[3], giro: number, camadas: number[8], ativa: number, cotas: number }`
  - `estadoAbertura(p: number): Estado3D`
  - `estadoPorDentro(p: number): Estado3D`
  - `ABAS = ['camadas', 'som', 'knob', 'portas']`, `estadoAba(aba: string): Estado3D`
  - `fatorDistancia(aspecto: number): number`

- [ ] **Step 1: Escrever os testes que falham**

`src/3d/roteiro.test.js`:

```js
import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  POSES, N_CAMADAS, FASES, estadoAbertura, estadoPorDentro, estadoAba, ABAS, fatorDistancia,
} from './roteiro.js';

const perto = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} != ${b}`);
const pertoV = (a, b) => a.forEach((v, i) => perto(v, b[i]));

test('abertura vai da frente para cima', () => {
  pertoV(estadoAbertura(0).cam, POSES.frente.cam);
  pertoV(estadoAbertura(1).cam, POSES.cima.cam);
  perto(estadoAbertura(1).giro, POSES.cima.giro);
  assert.deepEqual(estadoAbertura(0.5).camadas, Array(N_CAMADAS).fill(0));
});

test('por dentro começa montado, na camada 0', () => {
  const e = estadoPorDentro(0);
  assert.deepEqual(e.camadas, Array(N_CAMADAS).fill(0));
  assert.equal(e.ativa, 0);
  pertoV(e.cam, POSES.cima.cam);
});

test('metade da primeira fatia levanta só metade das keycaps', () => {
  const e = estadoPorDentro(FASES.camadas / N_CAMADAS / 2);
  perto(e.camadas[0], 0.5);
  assert.ok(e.camadas.slice(1).every((c) => c === 0));
  assert.equal(e.ativa, 0);
});

test('fim da fase de camadas: todas em cima, a última ativa', () => {
  const e = estadoPorDentro(FASES.camadas);
  assert.ok(e.camadas.every((c) => c === 1));
  assert.equal(e.ativa, N_CAMADAS - 1);
  pertoV(e.cam, POSES.explodido.cam);
});

test('a camada ativa nunca volta enquanto o scroll avança', () => {
  let anterior = -1;
  for (let i = 0; i <= 200; i++) {
    const { ativa } = estadoPorDentro((i / 200) * FASES.camadas);
    assert.ok(ativa >= anterior);
    anterior = ativa;
  }
});

test('junta as camadas e termina de lado, com as cotas', () => {
  assert.ok(estadoPorDentro(FASES.junta).camadas.every((c) => c === 0));
  const fim = estadoPorDentro(1);
  pertoV(fim.cam, POSES.lado.cam);
  perto(fim.cotas, 1);
  assert.equal(fim.ativa, -1);
});

test('progresso fora de 0..1 é limitado (pular por âncora ou rolar demais)', () => {
  assert.deepEqual(estadoPorDentro(-3), estadoPorDentro(0));
  assert.deepEqual(estadoPorDentro(7), estadoPorDentro(1));
  assert.deepEqual(estadoAbertura(-1), estadoAbertura(0));
});

test('mesmo progresso, mesmo estado (rolar para trás não acumula)', () => {
  assert.deepEqual(estadoPorDentro(0.4), estadoPorDentro(0.4));
});

test('cada aba tem uma pose, e a aba Som destaca os gaskets', () => {
  for (const aba of ABAS) assert.equal(estadoAba(aba).camadas.length, N_CAMADAS);
  assert.equal(estadoAba('som').ativa, 4);
  pertoV(estadoAba('knob').cam, POSES.knob.cam);
});

test('tela estreita afasta a câmera; tela larga não mexe', () => {
  perto(fatorDistancia(16 / 9), 1);
  assert.ok(fatorDistancia(390 / 844) > 2);
});
```

- [ ] **Step 2: Rodar e ver falhar**

Run: `npm test`
Expected: FAIL com `Cannot find module` apontando para `roteiro.js`.

- [ ] **Step 3: Implementar**

`src/3d/roteiro.js`:

```js
// Roteiro do palco 3D: funções puras de progresso (0 a 1) para estado do teclado.
// Unidade das poses: cm, a mesma do modelo. Ordem das camadas = PARTS de src/teclado/modelo.js.

export const POSES = {
  frente:    { cam: [0, 5, 70],     alvo: [0, 4, 0],   giro: -0.35 },
  cima:      { cam: [0, 58, 26],    alvo: [0, 0, 2],   giro: 0 },
  explodido: { cam: [-36, 30, 48],  alvo: [0, 8, 0],   giro: 0 },
  lado:      { cam: [-64, 9, 0.01], alvo: [0, 3, 0],   giro: 0 },
  knob:      { cam: [22, 9, 4],     alvo: [14, 3, -5], giro: 0 },
  portas:    { cam: [0, 7, -42],    alvo: [0, 1.5, 0], giro: 0 },
};

export const N_CAMADAS = 8;
// Fatias da cena "Por dentro": até 0.72 sobem as camadas; até 0.82 elas se juntam; o resto gira para o lado.
export const FASES = { camadas: 0.72, junta: 0.82 };
const GASKETS = 4;

export const clamp01 = (t) => Math.min(1, Math.max(0, t));
export const suave = (t) => { const x = clamp01(t); return x * x * (3 - 2 * x); };
const mix = (a, b, t) => a + (b - a) * t;
const mix3 = (a, b, t) => a.map((v, i) => mix(v, b[i], t));
const camadasIguais = (v) => Array(N_CAMADAS).fill(v);

function entrePoses(a, b, t) {
  const s = suave(t);
  return { cam: mix3(a.cam, b.cam, s), alvo: mix3(a.alvo, b.alvo, s), giro: mix(a.giro, b.giro, s) };
}

export function estadoAbertura(p) {
  return { ...entrePoses(POSES.frente, POSES.cima, clamp01(p)), camadas: camadasIguais(0), ativa: -1, cotas: 0 };
}

export function estadoPorDentro(progresso) {
  const p = clamp01(progresso);
  if (p <= FASES.camadas) {
    const f = (p / FASES.camadas) * N_CAMADAS; // 0..8: qual camada está subindo
    return {
      ...entrePoses(POSES.cima, POSES.explodido, f), // chega na pose explodida durante a 1ª camada
      camadas: camadasIguais(0).map((_, i) => clamp01(f - i)),
      ativa: Math.min(N_CAMADAS - 1, Math.floor(f)),
      cotas: 0,
    };
  }
  if (p <= FASES.junta) {
    const t = (p - FASES.camadas) / (FASES.junta - FASES.camadas);
    return { ...entrePoses(POSES.explodido, POSES.explodido, 0), camadas: camadasIguais(1 - suave(t)), ativa: -1, cotas: 0 };
  }
  const t = (p - FASES.junta) / (1 - FASES.junta);
  return { ...entrePoses(POSES.explodido, POSES.lado, t), camadas: camadasIguais(0), ativa: -1, cotas: clamp01((t - 0.6) / 0.4) };
}

export const ABAS = ['camadas', 'som', 'knob', 'portas'];

export function estadoAba(aba) {
  const base = { camadas: camadasIguais(0), ativa: -1, cotas: 0 };
  if (aba === 'camadas') return { ...entrePoses(POSES.explodido, POSES.explodido, 0), ...base, camadas: camadasIguais(1) };
  if (aba === 'som') return { ...entrePoses(POSES.explodido, POSES.explodido, 0), ...base, camadas: camadasIguais(0.6), ativa: GASKETS };
  return { ...entrePoses(POSES[aba], POSES[aba], 0), ...base };
}

// Telas mais estreitas que 16:10 afastam a câmera, para o teclado (32,5 cm) caber na largura.
export function fatorDistancia(aspecto) {
  return Math.max(1, 1.6 / aspecto);
}
```

- [ ] **Step 4: Rodar e ver passar**

Run: `npm test`
Expected: PASS, 10 testes.

- [ ] **Step 5: Commit**

```bash
git add src/3d/roteiro.js src/3d/roteiro.test.js
git commit -m "Roteiro do 3D: poses e estados por progresso, com testes"
```

---

### Task 3: Palco 3D fixo, teclado e luz de estúdio

**Files:**
- Create: `src/3d/estado.js`, `src/3d/Palco.jsx`, `src/3d/palco.css`, `src/3d/Teclado.jsx`
- Modify: `src/App.jsx`

**Interfaces:**
- Consumes: `POSES`, `fatorDistancia`, `N_CAMADAS` de `roteiro.js`; `createKeyboardModel`, `PARTS` de `src/teclado/modelo.js`.
- Produces:
  - `estado: Estado3D & { subida: number, balanco: number }`
  - `definir(parcial: Partial<typeof estado>): void`: grava e pede um quadro novo
  - `ligarInvalidar(fn: () => void): void`
  - Variáveis CSS no `<html>`, em px: `--ancora-x`, `--ancora-y` (borda esquerda da camada ativa); `--fb-x/y`, `--ft-x/y`, `--tb-x/y`, `--tt-x/y` (frente e trás, base e topo do case); e `--cotas` (0..1).
  - Elemento `.palco` (fundo animável pelas cenas) e `.palco-luz` (luz de estúdio, opacidade animável).

- [ ] **Step 1: Estado único**

`src/3d/estado.js`:

```js
// Estado único do palco 3D. As cenas escrevem com definir(); o Teclado lê a cada quadro.
import { POSES, N_CAMADAS } from './roteiro.js';

export const estado = {
  cam: [...POSES.frente.cam],
  alvo: [...POSES.frente.alvo],
  giro: POSES.frente.giro,
  camadas: Array(N_CAMADAS).fill(0),
  ativa: -1,
  cotas: 0,
  subida: 0,   // cm: deslocamento vertical da entrada
  balanco: 0,  // rad: giro lento enquanto ninguém rola
};

let invalidar = () => {};
export function ligarInvalidar(fn) { invalidar = fn; }
export function definir(parcial) {
  Object.assign(estado, parcial);
  invalidar();
}
```

- [ ] **Step 2: Teclado**

`src/3d/Teclado.jsx`:

```jsx
import { useEffect, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { createKeyboardModel, PARTS } from '../teclado/modelo.js';
import { estado, ligarInvalidar } from './estado.js';
import { fatorDistancia } from './roteiro.js';

const APAGADA = 0.18;
// Pontos de referência no espaço do teclado (cm): borda esquerda das camadas e os cantos do perfil lateral.
const BORDA_CAMADA = new THREE.Vector3(-15.5, 0.6, 0);
const CANTOS = {
  fb: new THREE.Vector3(0, 0.12, 6.85), ft: new THREE.Vector3(0, 2.12, 6.85),
  tb: new THREE.Vector3(0, 0.12, -6.85), tt: new THREE.Vector3(0, 3.45, -6.85),
};
const v = new THREE.Vector3();
const offset = new THREE.Vector3();
const raiz = document.documentElement.style;

export default function Teclado() {
  const modelo = useMemo(() => createKeyboardModel(), []);
  const { camera, invalidate, size } = useThree();

  useEffect(() => {
    ligarInvalidar(invalidate);
    return () => ligarInvalidar(() => {});
  }, [invalidate]);

  // Materiais de cada camada (já são cópias por peça no modelo), prontos para apagar as fora de foco.
  const materiais = useMemo(() => PARTS.map((p) => {
    const lista = [];
    modelo.nodes[p.id].traverse((o) => { if (o.material) lista.push(...[o.material].flat()); });
    lista.forEach((m) => { m.transparent = true; });
    return lista;
  }), [modelo]);

  function publicar(nome, ponto) {
    v.copy(ponto).project(camera);
    raiz.setProperty(`--${nome}-x`, `${((v.x + 1) / 2) * size.width}px`);
    raiz.setProperty(`--${nome}-y`, `${((1 - v.y) / 2) * size.height}px`);
  }

  useFrame(() => {
    // câmera: mais longe em telas estreitas, sem mudar para onde ela olha
    offset.set(...estado.cam).sub(v.set(...estado.alvo)).multiplyScalar(fatorDistancia(size.width / size.height));
    camera.position.set(...estado.alvo).add(offset);
    camera.lookAt(...estado.alvo);

    modelo.root.position.y = estado.subida;
    modelo.root.rotation.y = estado.giro + estado.balanco;
    PARTS.forEach((p, i) => {
      modelo.nodes[p.id].position.y = p.explode * estado.camadas[i];
      const opacidade = estado.ativa < 0 || estado.ativa === i ? 1 : APAGADA;
      for (const m of materiais[i]) { m.opacity = opacidade; m.depthWrite = opacidade === 1; }
    });
    modelo.root.updateMatrixWorld();

    if (estado.ativa >= 0) {
      publicar('ancora', modelo.nodes[PARTS[estado.ativa].id].localToWorld(BORDA_CAMADA.clone()));
    }
    raiz.setProperty('--cotas', String(estado.cotas));
    if (estado.cotas > 0) {
      for (const [nome, ponto] of Object.entries(CANTOS)) publicar(nome, modelo.root.localToWorld(ponto.clone()));
    }
  });

  return <primitive object={modelo.root} />;
}
```

- [ ] **Step 3: Palco com luz de estúdio e fallback**

`src/3d/Palco.jsx`:

```jsx
import { Canvas } from '@react-three/fiber';
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import * as THREE from 'three';
import Teclado from './Teclado.jsx';
import { POSES } from './roteiro.js';
import './palco.css';

const temWebGL = (() => {
  try { return Boolean(document.createElement('canvas').getContext('webgl2')); } catch { return false; }
})();

// Ambiente de estúdio para o alumínio ter o que refletir (o mesmo do visualizador).
function Estudio() {
  return (
    <>
      <hemisphereLight args={[0xffffff, 0xd0d2d6, 0.5]} />
      <directionalLight position={[-20, 40, 25]} intensity={1.5} castShadow
        shadow-mapSize={[2048, 2048]} shadow-radius={6}
        shadow-camera-left={-30} shadow-camera-right={30} shadow-camera-top={30} shadow-camera-bottom={-30} />
      <mesh rotation-x={-Math.PI / 2} receiveShadow>
        <planeGeometry args={[400, 400]} />
        <shadowMaterial opacity={0.12} />
      </mesh>
    </>
  );
}

function aoCriar({ gl, scene }) {
  gl.toneMapping = THREE.ACESFilmicToneMapping;
  scene.environment = new THREE.PMREMGenerator(gl).fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = 0.9;
}

export default function Palco() {
  return (
    <div className="palco" aria-hidden="true">
      {temWebGL ? (
        <>
          <div className="palco-luz">
            <ShaderGradientCanvas pixelDensity={1} pointerEvents="none" style={{ position: 'absolute', inset: 0 }}>
              <ShaderGradient control="props" type="sphere" animate="on" uSpeed={0.06} uStrength={0.3} uDensity={0.8}
                color1="#ffffff" color2="#dce6ff" color3="#f5f5f7" brightness={1.2} cDistance={3.6}
                lightType="3d" envPreset="city" grain="off" />
            </ShaderGradientCanvas>
          </div>
          <Canvas className="palco-canvas" shadows frameloop="demand" dpr={[1, 2]}
            gl={{ alpha: true, antialias: true }} onCreated={aoCriar}
            camera={{ fov: 30, near: 0.1, far: 500, position: POSES.frente.cam }}>
            <Estudio />
            <Teclado />
          </Canvas>
        </>
      ) : (
        <img className="palco-foto" src="/teclado.png" alt="" />
      )}
    </div>
  );
}
```

`src/3d/palco.css`:

```css
/* Fica atrás da página inteira; as cenas animam a cor de fundo (claro → escuro na cena 3). */
.palco { position: fixed; inset: 0; z-index: 0; background: var(--paper); pointer-events: none; }
.palco-luz { position: absolute; inset: 0; opacity: 0.9; }
.palco-canvas { position: absolute !important; inset: 0; }
.palco-foto { position: absolute; left: 50%; top: 58%; width: min(900px, 92vw); transform: translate(-50%, -50%); mix-blend-mode: multiply; }
```

- [ ] **Step 4: Ligar no App**

`src/App.jsx`:

```jsx
import Palco from './3d/Palco.jsx';
import Barras from './ui/Barras.jsx';
import Rodape from './ui/Rodape.jsx';
import Abertura from './cenas/Abertura.jsx';
import Reserva from './cenas/Reserva.jsx';

export default function App() {
  return (
    <>
      <Palco />
      <Barras />
      <main>
        <Abertura />
        <Reserva />
      </main>
      <Rodape />
    </>
  );
}
```

- [ ] **Step 5: Build, testes e captura com WebGL**

Run: `npm test && npm run build`
Expected: 10 testes PASS; build sem erro.

```bash
S="$TEMP"; C="/c/Program Files/Google/Chrome/Application/chrome.exe"
"$C" --headless=new --use-angle=swiftshader --enable-unsafe-swiftshader --hide-scrollbars --virtual-time-budget=6000 --window-size=1440,1000 --screenshot="$S/t3-desk.png" http://localhost:5173/
"$C" --headless=new --disable-webgl --hide-scrollbars --virtual-time-budget=4000 --window-size=1440,1000 --screenshot="$S/t3-sem-webgl.png" http://localhost:5173/
```

Expected: `t3-desk.png` mostra o teclado 3D de frente sob o título, com a luz azulada bem suave atrás; `t3-sem-webgl.png` mostra a foto no lugar.

- [ ] **Step 6: Commit**

```bash
git add src/3d src/App.jsx
git commit -m "Palco 3D fixo: teclado, luz de estúdio e fallback sem WebGL"
```

---

### Task 4: Abertura com scroll, entrada e balanço

**Files:**
- Modify: `src/cenas/Abertura.jsx`

**Interfaces:**
- Consumes: `estadoAbertura` (roteiro), `definir`, `estado` (estado).

- [ ] **Step 1: Ligar o scroll**

`src/cenas/Abertura.jsx` (substitui o arquivo):

```jsx
import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { estadoAbertura } from '../3d/roteiro.js';
import { definir, estado } from '../3d/estado.js';
import './abertura.css';

gsap.registerPlugin(ScrollTrigger);

export default function Abertura() {
  const secao = useRef(null);

  useLayoutEffect(() => {
    const reduzir = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduzir) {
      definir(estadoAbertura(1)); // pose final, sem movimento
      return undefined;
    }
    definir(estadoAbertura(0));
    const ctx = gsap.context(() => {
      // entrada: o teclado sobe e assenta (disparada, uma vez)
      gsap.from(estado, { subida: -8, duration: 1.4, ease: 'power3.out', delay: 0.15, onUpdate: () => definir({}) });
      gsap.from('.abertura-fixo > *', { y: 14, autoAlpha: 0, duration: 0.9, ease: 'power3.out', stagger: 0.06 });

      // balanço lento enquanto a abertura está na tela (ciclo de 14 s, longe dos 0,2 Hz que incomodam)
      const balanco = gsap.to(estado, { balanco: 0.12, duration: 7, ease: 'sine.inOut', yoyo: true, repeat: -1, onUpdate: () => definir({}) });

      // scroll: gira até a vista de cima (scrub)
      const proxy = { p: 0 };
      gsap.to(proxy, {
        p: 1, ease: 'none',
        scrollTrigger: {
          trigger: secao.current, start: 'top top', end: 'bottom bottom', scrub: 0.6,
          onToggle: (self) => (self.isActive ? balanco.play() : balanco.pause()),
        },
        onUpdate: () => definir(estadoAbertura(proxy.p)),
      });
      gsap.to('.abertura-fixo', { y: -120, autoAlpha: 0, ease: 'none',
        scrollTrigger: { trigger: secao.current, start: 'top top', end: '40% top', scrub: true } });
      // a luz fica fora da seção: passe o elemento (o contexto restringe seletores de texto à seção)
      gsap.to(document.querySelector('.palco-luz'), { autoAlpha: 0, ease: 'none',
        scrollTrigger: { trigger: secao.current, start: '30% top', end: 'bottom bottom', scrub: true } });
    }, secao);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secao} id="visao-geral" className="abertura" aria-labelledby="abertura-titulo">
      <div className="abertura-fixo">
        <h1 id="abertura-titulo" className="t-hero">Pesado do jeito certo.</h1>
        <p className="t-lead">Mango FORGE 75. Alumínio inteiro, gasket mount, 8000 Hz.</p>
        <div className="abertura-acoes">
          <a className="pill" href="#reservar">Reservar</a>
          <a className="pill pill-ghost" href="#por-dentro">Saiba mais</a>
        </div>
      </div>
    </section>
  );
}
```


- [ ] **Step 2: Verificar**

Run: `npm test && npm run build`
Expected: PASS e build sem erro.

```bash
S="$TEMP"; C="/c/Program Files/Google/Chrome/Application/chrome.exe"
"$C" --headless=new --use-angle=swiftshader --enable-unsafe-swiftshader --hide-scrollbars --virtual-time-budget=6000 --window-size=1440,1000 --screenshot="$S/t4-topo.png" http://localhost:5173/
"$C" --headless=new --use-angle=swiftshader --enable-unsafe-swiftshader --force-prefers-reduced-motion --hide-scrollbars --virtual-time-budget=6000 --window-size=1440,1000 --screenshot="$S/t4-reduzido.png" http://localhost:5173/
```

Expected: `t4-topo.png` com o teclado de frente e o título visível; `t4-reduzido.png` com o teclado já visto de cima (pose final) e sem entrada.

- [ ] **Step 3: Commit**

```bash
git add src/cenas/Abertura.jsx
git commit -m "Abertura: entrada, balanço lento e giro até a vista de cima no scroll"
```

---

### Task 5: Por dentro (a) e (b): camadas explicadas e vista lateral com cotas

**Files:**
- Create: `src/cenas/porDentro/camadas.js`, `src/cenas/porDentro/PorDentro.jsx`, `src/cenas/porDentro/porDentro.css`
- Modify: `src/App.jsx` (inserir `<PorDentro />` depois de `<Abertura />`)

**Interfaces:**
- Consumes: `estadoPorDentro`, `FASES`, `N_CAMADAS` (roteiro); `definir` (estado); as variáveis CSS `--ancora-x/y`, `--fb/ft/tb/tt-x/y` e `--cotas` (Teclado).
- Produces: `CAMADAS: { id, nome, funcao, dado }[]` (8 itens, na ordem de `PARTS`); a seção `#por-dentro`.

- [ ] **Step 1: Textos das camadas**

`src/cenas/porDentro/camadas.js`:

```js
// Uma entrada por camada, na mesma ordem de PARTS (src/teclado/modelo.js).
// Valores de refs/prompt-teclado-3d.md.
export const CAMADAS = [
  { id: 'keycaps', nome: 'Keycaps de PBT.', funcao: 'Plástico fosco que não fica brilhante com o uso. A altura muda de fileira em fileira para acompanhar os dedos.', dado: 'Perfil Cherry · 82 teclas' },
  { id: 'moldura', nome: 'Moldura e knob.', funcao: 'A parte de cima do case, com a faixa prateada polida no chanfro. O knob de alumínio escovado vai preso nela.', dado: 'Alumínio anodizado' },
  { id: 'switches', nome: 'Switches.', funcao: 'Corpo escuro, haste azul. Saem e entram sem solda, então você troca o som e o peso quando quiser.', dado: 'Hot-swap' },
  { id: 'plate', nome: 'Plate de alumínio.', funcao: 'A chapa que segura cada switch no lugar. É ela que define o quanto o teclado cede ao digitar.', dado: '1,5 mm' },
  { id: 'gaskets', nome: 'Gaskets de Poron.', funcao: 'Tiras de borracha entre a plate e o case. Seguram o impacto de cada tecla: a digitação fica macia e o som desce de tom.', dado: 'Em cima e embaixo da plate' },
  { id: 'pcb', nome: 'PCB.', funcao: 'A placa que lê as teclas, com um soquete para cada switch e o conector USB-C.', dado: '82 soquetes · 8000 Hz' },
  { id: 'espuma', nome: 'Espuma.', funcao: 'Preenche o vazio entre a placa e o fundo e tira o eco do case.', dado: '3,5 mm' },
  { id: 'base', nome: 'Base em cunha.', funcao: 'O fundo de alumínio já vem inclinado, com a faixa azul na frente, a USB-C atrás e quatro pés de borracha.', dado: '6° de inclinação' },
];
```

- [ ] **Step 2: Componente**

`src/cenas/porDentro/PorDentro.jsx`:

```jsx
import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { estadoPorDentro, FASES, N_CAMADAS } from '../../3d/roteiro.js';
import { definir } from '../../3d/estado.js';
import { CAMADAS } from './camadas.js';
import './porDentro.css';

gsap.registerPlugin(ScrollTrigger);

export default function PorDentro() {
  const secao = useRef(null);
  const gatilho = useRef(null);
  const [ativa, setAtiva] = useState(0);
  const [reduzir] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // fundo do palco: claro → preto ao entrar (scrub)
      gsap.to(document.querySelector('.palco'), { backgroundColor: '#000', ease: 'none',
        scrollTrigger: { trigger: secao.current, start: 'top 80%', end: 'top top', scrub: true } });

      if (reduzir) {
        // sem scrub: camadas separadas e paradas enquanto a seção está na tela
        ScrollTrigger.create({ trigger: secao.current, start: 'top 60%', end: 'bottom top',
          onToggle: (self) => self.isActive && definir({ ...estadoPorDentro(FASES.camadas), ativa: -1 }) });
        return;
      }
      const proxy = { p: 0 };
      const tween = gsap.to(proxy, {
        p: 1, ease: 'none',
        scrollTrigger: { trigger: secao.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
        onUpdate: () => {
          const e = estadoPorDentro(proxy.p);
          definir(e);
          if (e.ativa >= 0) setAtiva(e.ativa);
        },
      });
      gatilho.current = tween.scrollTrigger;
    }, secao);
    return () => ctx.revert();
  }, [reduzir]);

  // pular para a camada i: rola até o meio da fatia dela
  function irPara(i) {
    const st = gatilho.current;
    if (!st) return;
    const p = (FASES.camadas * (i + 0.5)) / N_CAMADAS;
    window.scrollTo({ top: st.start + (st.end - st.start) * p, behavior: 'smooth' });
  }

  function teclas(e, i) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); e.currentTarget.nextElementSibling?.focus(); irPara(Math.min(N_CAMADAS - 1, i + 1)); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); e.currentTarget.previousElementSibling?.focus(); irPara(Math.max(0, i - 1)); }
  }

  if (reduzir) {
    return (
      <section ref={secao} id="por-dentro" className="faixa faixa-escura pd pd-reduzido" aria-labelledby="pd-titulo">
        <h2 id="pd-titulo" className="t-headline">Por dentro.</h2>
        <ol className="pd-lista">
          {CAMADAS.map((c) => (
            <li key={c.id}><h3 className="t-tagline">{c.nome}</h3><p>{c.funcao}</p><span className="pd-dado">{c.dado}</span></li>
          ))}
        </ol>
      </section>
    );
  }

  const c = CAMADAS[ativa];
  return (
    <section ref={secao} id="por-dentro" className="pd faixa-escura" aria-labelledby="pd-titulo">
      <div className="pd-fixo">
        <h2 id="pd-titulo" className="t-headline pd-titulo">Por dentro.</h2>

        <div className="pd-texto" aria-live="polite">
          <h3 className="t-tile">{c.nome}</h3>
          <p>{c.funcao}</p>
          <span className="pd-dado">{c.dado}</span>
        </div>
        <span className="pd-linha" aria-hidden="true" />

        <nav className="pd-trilho" aria-label="Camadas">
          {CAMADAS.map((camada, i) => (
            <button key={camada.id} type="button" onClick={() => irPara(i)} onKeyDown={(e) => teclas(e, i)}
              className={i < ativa ? 'feita' : i === ativa ? 'atual' : ''} aria-current={i === ativa ? 'step' : undefined}>
              {camada.nome.replace('.', '')}
            </button>
          ))}
        </nav>

        <div className="pd-cotas" aria-hidden="true">
          <span className="cota cota-frente"><b>20 mm</b></span>
          <span className="cota cota-tras"><b>33 mm</b></span>
          <span className="cota cota-prof"><b>135 mm</b></span>
          <span className="cota-angulo">6°</span>
        </div>
        <p className="pd-legenda t-legenda">Vista de lado. A inclinação vem do próprio case: você não precisa de pés retráteis.</p>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Estilos**

`src/cenas/porDentro/porDentro.css`:

```css
/* 500vh de scroll para 8 camadas + juntar + girar; o conteúdo fica preso na tela */
.pd { height: 500vh; position: relative; }
.pd-fixo { position: sticky; top: 0; height: 100vh; }
.pd-titulo { position: absolute; left: var(--gutter); top: 120px; }

.pd-texto { position: absolute; left: var(--gutter); width: min(360px, 40vw);
  top: clamp(200px, calc(var(--ancora-y, 50vh) - 1.6em), calc(100vh - 320px));
  display: grid; gap: 10px; transition: top 0.4s var(--ease); }
.pd-texto p { color: #d1d1d6; font-size: 17px; line-height: 1.47; }
.pd-dado { justify-self: start; font-size: 14px; padding: 6px 14px; border-radius: 980px; background: rgba(255, 255, 255, 0.1); }

/* linha do texto até a borda da camada ativa (a âncora vem do Teclado) */
.pd-linha { position: absolute; height: 1px; background: var(--dark-2);
  left: calc(var(--gutter) + min(360px, 40vw) + 24px);
  top: var(--ancora-y, 50vh);
  width: max(0px, calc(var(--ancora-x, 0px) - var(--gutter) - min(360px, 40vw) - 24px)); }
.pd-linha::after { content: ""; position: absolute; right: -4px; top: -4px; width: 9px; height: 9px; border-radius: 50%; background: var(--on-dark); }

.pd-trilho { position: absolute; left: var(--gutter); bottom: 48px; display: grid; gap: 2px; }
.pd-trilho button { display: flex; align-items: center; gap: 10px; padding: 4px 0; font-size: 12px; color: #6e6e73; text-align: left; }
.pd-trilho button::before { content: ""; width: 14px; height: 2px; border-radius: 2px; background: #3a3a3c; transition: width 0.3s var(--ease), background-color 0.3s; }
.pd-trilho button.feita { color: #a1a1a6; }
.pd-trilho button.feita::before { background: #a1a1a6; }
.pd-trilho button.atual { color: var(--on-dark); font-weight: 600; }
.pd-trilho button.atual::before { width: 28px; background: var(--sky); }

/* (b) cotas sobre o perfil lateral: só aparecem quando --cotas > 0 */
.pd-cotas, .pd-legenda { opacity: var(--cotas, 0); transition: opacity 0.2s linear; }
.pd-texto, .pd-linha, .pd-trilho { opacity: calc(1 - var(--cotas, 0) * 4); }
.cota { position: absolute; border: 0 solid var(--dark-2); font-size: 14px; }
.cota b { position: absolute; font-weight: 600; white-space: nowrap; }
.cota-frente { left: calc(var(--fb-x) + 24px); top: var(--ft-y); height: calc(var(--fb-y) - var(--ft-y)); border-left-width: 1px; }
.cota-frente b { left: 10px; top: 50%; transform: translateY(-50%); }
.cota-tras { left: calc(var(--tb-x) - 24px); top: var(--tt-y); height: calc(var(--tb-y) - var(--tt-y)); border-left-width: 1px; }
.cota-tras b { right: 10px; top: 50%; transform: translateY(-50%); }
.cota-prof { left: var(--tb-x); top: calc(var(--fb-y) + 28px); width: calc(var(--fb-x) - var(--tb-x)); border-top-width: 1px; }
.cota-prof b { left: 50%; top: 8px; transform: translateX(-50%); color: #a1a1a6; font-weight: 400; }
.cota-angulo { position: absolute; left: calc(var(--tb-x) + 60px); top: calc(var(--tb-y) - 36px); color: var(--sky); font-weight: 600; font-size: 17px; }
.pd-legenda { position: absolute; left: var(--gutter); bottom: 48px; max-width: 46ch; }

.pd-reduzido .pd-lista { list-style: none; display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 32px; margin-top: 48px; }
.pd-reduzido .pd-lista p { color: #d1d1d6; margin: 6px 0 10px; }

@media (max-width: 734px) {
  .pd-texto { top: auto; bottom: 200px; width: auto; right: var(--gutter); }
  .pd-linha { display: none; }
}
```

- [ ] **Step 4: Inserir no App**

Em `src/App.jsx`, importe e coloque a seção entre a abertura e a reserva:

```jsx
import PorDentro from './cenas/porDentro/PorDentro.jsx';
```

```jsx
      <main>
        <Abertura />
        <PorDentro />
        <Reserva />
      </main>
```

- [ ] **Step 5: Verificar**

Run: `npm test && npm run build`
Expected: PASS e build sem erro.

Abra `http://localhost:5173/#por-dentro` e role a seção inteira. Esperado: o fundo escurece, as 8 camadas sobem uma por vez, o texto à esquerda troca e a linha encosta na borda da camada ativa; o trilho marca a camada atual, e clicar num item ou usar as setas pula para ela; no fim, as camadas se juntam, a câmera vai para a lateral e as cotas 20 mm / 33 mm / 135 mm / 6° aparecem sobre o perfil.

```bash
S="$TEMP"; C="/c/Program Files/Google/Chrome/Application/chrome.exe"
"$C" --headless=new --use-angle=swiftshader --enable-unsafe-swiftshader --force-prefers-reduced-motion --hide-scrollbars --virtual-time-budget=6000 --window-size=1440,1000 --screenshot="$S/t5-reduzido.png" "http://localhost:5173/#por-dentro"
```

Expected: `t5-reduzido.png` com a lista das 8 camadas em texto sobre fundo preto.

- [ ] **Step 6: Commit**

```bash
git add src/cenas/porDentro src/App.jsx
git commit -m "Por dentro: camadas explicadas uma a uma, trilho e vista lateral com cotas"
```

---

### Task 6: Por dentro (c): abas de vidro e som de digitação

**Files:**
- Create: `src/som/digitacao.js`, `src/cenas/porDentro/Abas.jsx`, `src/cenas/porDentro/abas.css`
- Modify: `src/cenas/porDentro/PorDentro.jsx` (renderizar `<Abas />` logo depois da seção)

**Interfaces:**
- Consumes: `ABAS`, `estadoAba` (roteiro); `definir` (estado).
- Produces: `PERFIS: { com, sem }`, `tocar(perfil: 'com' | 'sem'): void`.

- [ ] **Step 1: Som sintetizado**

`src/som/digitacao.js`:

```js
// Som de digitação gerado no navegador (Web Audio): ruído curto filtrado + um grave.
// ponytail: síntese aproximada; os PERFIS são o botão de calibração. Se soar falso, grave um áudio real.
export const PERFIS = {
  com: { tipo: 'lowpass',  freq: 900,  q: 0.7, decaimento: 0.05, grave: 110, eco: 0 },    // gasket + espuma
  sem: { tipo: 'bandpass', freq: 2600, q: 4,   decaimento: 0.2,  grave: 0,   eco: 0.35 }, // case vazio
};

let ctx;

function toc(p, t) {
  const dur = p.decaimento + 0.05;
  const buffer = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * dur), ctx.sampleRate);
  const dados = buffer.getChannelData(0);
  const queda = ctx.sampleRate * (p.decaimento / 5);
  for (let i = 0; i < dados.length; i++) dados[i] = (Math.random() * 2 - 1) * Math.exp(-i / queda);

  const fonte = ctx.createBufferSource();
  fonte.buffer = buffer;
  const filtro = ctx.createBiquadFilter();
  filtro.type = p.tipo; filtro.frequency.value = p.freq; filtro.Q.value = p.q;
  const ganho = ctx.createGain();
  ganho.gain.value = 0.5;
  fonte.connect(filtro).connect(ganho).connect(ctx.destination);
  if (p.eco) {
    const atraso = ctx.createDelay();
    atraso.delayTime.value = 0.045;
    const g = ctx.createGain();
    g.gain.value = p.eco;
    ganho.connect(atraso).connect(g).connect(ctx.destination);
  }
  fonte.start(t);

  if (p.grave) {
    const osc = ctx.createOscillator();
    osc.frequency.setValueAtTime(p.grave, t);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.35, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
    osc.connect(g).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.06);
  }
}

// Seis toques, como uma palavra digitada. Só toca em resposta a um clique.
export function tocar(perfil) {
  ctx ??= new AudioContext();
  const p = PERFIS[perfil];
  for (let i = 0; i < 6; i++) toc(p, ctx.currentTime + 0.02 + i * 0.16 + Math.random() * 0.03);
}
```

- [ ] **Step 2: Abas**

`src/cenas/porDentro/Abas.jsx`:

```jsx
import { useRef, useState } from 'react';
import LiquidGlass from 'liquid-glass-react';
import { ABAS, estadoAba } from '../../3d/roteiro.js';
import { definir } from '../../3d/estado.js';
import { tocar } from '../../som/digitacao.js';
import './abas.css';

const ROTULOS = { camadas: 'Camadas', som: 'Som', knob: 'Knob', portas: 'Portas' };
const TEXTOS = {
  camadas: { titulo: 'Oito camadas, uma montagem.', texto: 'Tudo o que você viu subir, separado ao mesmo tempo. Nenhuma peça é cola: tudo sai com parafuso.' },
  som: { titulo: 'Ouça a diferença.', texto: 'As camadas existem pelo som. Toque as duas versões e compare.' },
  knob: { titulo: 'Um knob de verdade.', texto: 'Alumínio escovado e serrilha fina. Gira o volume com cliques que você sente.' },
  portas: { titulo: 'Uma porta, no lugar certo.', texto: 'A USB-C fica atrás, no centro, longe das mãos e do mouse.' },
};

export default function Abas() {
  const [aba, setAba] = useState('camadas');
  const [tocando, setTocando] = useState(null);
  const botoes = useRef([]);

  function escolher(nova) {
    setAba(nova);
    definir(estadoAba(nova));
  }

  function teclas(e, i) {
    const passo = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!passo) return;
    e.preventDefault();
    const j = (i + passo + ABAS.length) % ABAS.length;
    botoes.current[j].focus();
    escolher(ABAS[j]);
  }

  function ouvir(perfil) {
    tocar(perfil);
    setTocando(perfil);
    setTimeout(() => setTocando(null), 1100);
  }

  return (
    <section className="pd-abas faixa-escura" aria-label="Explore os detalhes">
      <div className="pd-abas-barra">
        <LiquidGlass style={{ position: 'absolute', top: '50%', left: '50%' }} cornerRadius={999} padding="6px"
          displacementScale={40} blurAmount={0.08} saturation={140} elasticity={0.15}>
          <div role="tablist" aria-label="Detalhes" className="pd-abas-lista">
            {ABAS.map((id, i) => (
              <button key={id} ref={(el) => { botoes.current[i] = el; }} role="tab" type="button"
                id={`aba-${id}`} aria-controls="painel-aba" aria-selected={aba === id} tabIndex={aba === id ? 0 : -1}
                onClick={() => escolher(id)} onKeyDown={(e) => teclas(e, i)}>
                {ROTULOS[id]}
              </button>
            ))}
          </div>
        </LiquidGlass>
      </div>

      <div id="painel-aba" role="tabpanel" aria-labelledby={`aba-${aba}`} className="pd-abas-painel">
        <h3 className="t-tile">{TEXTOS[aba].titulo}</h3>
        <p>{TEXTOS[aba].texto}</p>
        {aba === 'som' && (
          <div className="pd-som">
            <button type="button" className={tocando === 'com' ? 'tocando' : ''} onClick={() => ouvir('com')}>
              <b>Com gasket e espuma</b><span>Curto e grave.</span>
            </button>
            <button type="button" className={tocando === 'sem' ? 'tocando' : ''} onClick={() => ouvir('sem')}>
              <b>Sem</b><span>Oco e agudo: o case vazio ressoa.</span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
```

`src/cenas/porDentro/abas.css`:

```css
/* Uma tela inteira: o teclado (no palco, atrás) fica no meio, abas em cima, texto embaixo */
.pd-abas { position: relative; min-height: 100vh; padding: 120px var(--gutter) 64px; display: grid; align-content: space-between; }
.pd-abas-barra { position: relative; height: 56px; }
.pd-abas-lista { display: flex; gap: 4px; }
.pd-abas-lista button { padding: 8px 18px; border-radius: 980px; font-size: 14px; color: #d1d1d6; transition: background-color 0.2s var(--ease), color 0.2s; }
.pd-abas-lista button[aria-selected="true"] { background: var(--on-dark); color: var(--ink); font-weight: 600; }
.pd-abas-lista button:active { transform: scale(0.95); }
.pd-abas-painel { display: grid; gap: 10px; max-width: 560px; }
.pd-abas-painel p { color: #d1d1d6; }
.pd-som { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 12px; }
.pd-som button { text-align: left; background: var(--dark-tile); border-radius: 18px; padding: 18px 20px; display: grid; gap: 4px; transition: transform 0.1s ease-out, box-shadow 0.2s; }
.pd-som button:active { transform: scale(0.95); }
.pd-som button span { font-size: 14px; color: var(--dark-2); }
.pd-som button.tocando { box-shadow: inset 0 0 0 2px var(--sky); }
@media (max-width: 734px) { .pd-som { grid-template-columns: 1fr; } }
```

- [ ] **Step 3: Renderizar depois da seção pinada**

Em `src/cenas/porDentro/PorDentro.jsx`, importe e envolva o retorno do modo normal num fragmento, com `<Abas />` logo após a `</section>`:

```jsx
import Abas from './Abas.jsx';
```

```jsx
  return (
    <>
      <section ref={secao} id="por-dentro" className="pd faixa-escura" aria-labelledby="pd-titulo">
        {/* ...conteúdo atual sem mudança... */}
      </section>
      <Abas />
    </>
  );
```

- [ ] **Step 4: Verificar**

Run: `npm test && npm run build`
Expected: PASS e build sem erro.

No navegador, role até as abas. Esperado:
- a barra de vidro fica centralizada e as setas ← → trocam de aba, com o foco acompanhando;
- cada aba move o teclado (Camadas: separadas; Som: gaskets acesos; Knob: close no knob; Portas: vista de trás);
- os dois botões da aba Som tocam sons claramente diferentes.

- [ ] **Step 5: Commit**

```bash
git add src/som src/cenas/porDentro
git commit -m "Por dentro: abas de vidro e som de digitação sintetizado"
```

---

### Task 7: Por dentro (d): tabela de especificações

**Files:**
- Create: `src/cenas/porDentro/Specs.jsx`
- Modify: `src/cenas/porDentro/PorDentro.jsx` (renderizar `<Specs />` depois de `<Abas />` e no fim do modo reduzido), `src/cenas/porDentro/porDentro.css`

**Interfaces:**
- Produces: a seção `#especificacoes`, opaca e branca (cobre o palco).

- [ ] **Step 1: Componente**

`src/cenas/porDentro/Specs.jsx`:

```jsx
// Valores de refs/prompt-teclado-3d.md e do ROTEIRO.md (ficção do produto).
const SPECS = [
  ['Layout', '75%, 82 teclas + knob'],
  ['Case', 'Alumínio usinado, 2 peças'],
  ['Montagem', 'Gasket mount, Poron'],
  ['Plate', 'Alumínio, 1,5 mm'],
  ['Switches', 'Hot-swap, sem solda'],
  ['Keycaps', 'PBT, perfil Cherry'],
  ['Dimensões', '325 × 135 mm'],
  ['Altura', '20 mm na frente, 33 mm atrás'],
  ['Inclinação', '6°'],
  ['Peso', '1,8 kg'],
  ['Polling', '8000 Hz'],
  ['Conexão', 'USB-C'],
];

export default function Specs() {
  return (
    <section id="especificacoes" className="faixa specs" aria-labelledby="specs-titulo">
      <h2 id="specs-titulo" className="t-headline">Especificações.</h2>
      <dl>
        {SPECS.map(([rotulo, valor]) => (
          <div key={rotulo}><dt>{rotulo}</dt><dd>{valor}</dd></div>
        ))}
      </dl>
    </section>
  );
}
```

- [ ] **Step 2: Estilos**

Acrescente ao fim de `src/cenas/porDentro/porDentro.css`:

```css
.specs { position: relative; background: var(--paper); color: var(--ink); display: grid; gap: 48px; }
.specs dl { display: grid; grid-template-columns: 1fr 1fr; column-gap: 48px; }
.specs dl div { display: grid; grid-template-columns: 160px 1fr; gap: 16px; padding: 16px 0; border-top: 1px solid var(--hairline); font-size: 17px; }
.specs dt { font-weight: 600; }
.specs dd { color: #333; font-variant-numeric: tabular-nums; }
@media (max-width: 734px) { .specs dl { grid-template-columns: 1fr; } .specs dl div { grid-template-columns: 120px 1fr; } }
```

- [ ] **Step 3: Renderizar**

Em `src/cenas/porDentro/PorDentro.jsx`: `import Specs from './Specs.jsx';`, coloque `<Specs />` depois de `<Abas />` no modo normal e, no modo reduzido, envolva o retorno num fragmento com `<Specs />` depois da seção. A cor do palco precisa voltar ao branco para a reserva, então acrescente dentro do `gsap.context`, logo depois do tween que escurece o fundo:

```jsx
      gsap.to(document.querySelector('.palco'), { backgroundColor: '#fff', ease: 'none', immediateRender: false,
        scrollTrigger: { trigger: '#especificacoes', start: 'top bottom', end: 'top 40%', scrub: true } });
```

- [ ] **Step 4: Verificar**

Run: `npm test && npm run build`
Expected: PASS e build sem erro.

Abra `http://localhost:5173/#especificacoes`. Esperado: uma tabela branca de duas colunas (uma no celular), e ao rolar até a reserva o fundo segue claro.

- [ ] **Step 5: Commit**

```bash
git add src/cenas/porDentro
git commit -m "Por dentro: tabela de especificações e volta ao fundo claro"
```

---

### Task 8: Verificação da parte 1

**Files:**
- Nenhum arquivo novo; correções nos arquivos das tasks anteriores, se a verificação mostrar defeitos.

- [ ] **Step 1: Testes e build**

Run: `npm test && npm run build`
Expected: 10 testes PASS; build sem erro.

- [ ] **Step 2: Capturas em lote (desktop, celular, movimento reduzido, sem WebGL)**

```bash
S="$TEMP"; C="/c/Program Files/Google/Chrome/Application/chrome.exe"; G="--use-angle=swiftshader --enable-unsafe-swiftshader"
for alvo in "" "#por-dentro" "#especificacoes" "#reservar"; do
  n=$(echo "${alvo:-topo}" | tr -d '#')
  "$C" --headless=new $G --hide-scrollbars --virtual-time-budget=6000 --window-size=1440,1000 --screenshot="$S/f-$n-desk.png" "http://localhost:5173/$alvo"
done
printf '<body style="margin:0"><iframe src="/" style="width:390px;height:844px;border:0"></iframe>' > public/_390.html
"$C" --headless=new $G --hide-scrollbars --virtual-time-budget=6000 --window-size=600,900 --screenshot="$S/f-topo-390.png" http://localhost:5173/_390.html
rm public/_390.html
"$C" --headless=new $G --force-prefers-reduced-motion --hide-scrollbars --virtual-time-budget=6000 --window-size=1440,1000 --screenshot="$S/f-reduzido.png" "http://localhost:5173/#por-dentro"
"$C" --headless=new --disable-webgl --hide-scrollbars --virtual-time-budget=6000 --window-size=1440,1000 --screenshot="$S/f-sem-webgl.png" http://localhost:5173/
```

Expected:
- **390px:** o teclado aparece inteiro, sem cortes nas laterais.
- **Movimento reduzido:** a lista das camadas aparece em texto.
- **Sem WebGL:** a foto aparece no lugar do canvas.
- **Em todas:** a marca Mango nas barras e o aviso de paródia no rodapé.

- [ ] **Step 3: Detector do impeccable**

Run: `sh ~/.claude/skills/impeccable/scripts/impeccable detect --json src/`
Expected: nenhum achado de severidade "error". Corrija os "warning" que forem defeito real e registre os que forem falso positivo.

- [ ] **Step 4: Commit das correções (se houver)**

```bash
git add -A src
git commit -m "Parte 1: correções da verificação"
```
