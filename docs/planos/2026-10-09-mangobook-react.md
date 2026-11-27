# MangoBook Pure em React: plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Passar `design/prototipos/pure.html` para React + Vite, idêntico no visual e no comportamento, com as peças de marca separadas em `src/marca/`.

**Architecture:** Um componente por seção (`src/secoes/`), cada um com o seu `.css` copiado do protótipo; peças de marca em `src/marca/`; lógica repetida em `src/ganchos/`; dados e funções puras testáveis em `src/dados/`. O protótipo é a fonte da verdade: HTML vira JSX, CSS é copiado, o JS imperativo vira estado + efeitos.

**Tech Stack:** React 19, Vite 8, `@phosphor-icons/web` 2.1.1, `node --test`, Chrome headless via CDP (Node 24, WebSocket nativo) para a comparação visual.

**Spec:** `docs/specs/2026-10-09-mangobook-react-design.md`

## Global Constraints

- Nenhuma mudança de visual, texto ou imagem em relação a `design/prototipos/pure.html` (linhas citadas abaixo se referem a esse arquivo no commit `b4535b9`).
- Nomes de classe e ids do protótipo mantidos.
- Ordem do CSS: `marca.css` → `base.css` → `Navbar.css` → seções na ordem do DOM → `Rodape.css`. Dentro de cada arquivo, as regras na ordem do protótipo e as media queries da seção no fim do arquivo.
- Regras redefinidas mais adiante no protótipo (`.nav` transition na linha 234; `.motivos .mt` nas linhas 471–487) são fundidas na versão final dentro do arquivo dono.
- CSS morto do protótipo (sem elemento correspondente) fica de fora: `.ico-t`, `.g-*`, `.comparar`, `.modelo*`, `.glifo.c-*`, `.usos-arte svg`, `.ia-lista svg`, `.grade-6 .it svg`, `.motivos .mt svg`, `footer` (elemento; coberto por `.rodape`). `.mais` fica em `marca.css` (está no MARCA.md).
- Todo efeito limpa listeners, observers e timers (StrictMode).
- Commits conventional; nada de merge na `main`.

## Review Focus

- **Movimento reduzido:** carrossel sem auto-avanço, contador mostra 18 direto, IA mostra o texto inteiro, barras sem transição. Pinado por: `semMovimento` passado como argumento às funções puras de `dados/` e conferido na comparação visual com `--force-prefers-reduced-motion`.
- **Teclado nas abas e no radiogroup:** setas com volta, outras teclas ignoradas, foco vai junto. Pinado por: testes de `proximaAba` (Task 2).
- **Trocar de aba da IA no meio da digitação:** o timer anterior para e o texto novo começa do zero. Pinado por: o efeito depende de `[aba]` e limpa o intervalo; conferido no passo de interações (Task 6).
- **Bolha do comparador antes das fontes carregarem:** largura recalculada em `document.fonts.ready`. Conferido no print do comparador (Task 6).
- **Celular (390 px):** links `.opc` somem, preço da barra de compra some, grades viram uma coluna. Conferido nos prints 390×844 (Task 6).

---

### Task 1: Limpeza, dependências e base

**Files:**
- Delete: `src/3d/`, `src/cenas/`, `src/som/`, `src/teclado/`, `src/ui/`, `src/visualizador.js`, `src/estilos/`, `public/teclado.png`
- Move: `mango-book/` → `public/mango-book/` (`git mv`)
- Modify: `package.json` (name `mangobook-pure`; remove `three`, `@react-three/fiber`, `gsap`, `liquid-glass-react`, `@shadergradient/react`; add `@phosphor-icons/web@2.1.1`)
- Modify: `index.html` (título "MangoBook Pure", descrição "MangoBook Pure: notebook fictício da Mango. Paródia de portfólio.")
- Create: `src/main.jsx`, `src/App.jsx` (temporário, só `<main/>`), `src/marca/marca.css`, `src/base.css`, `src/marca/Logo.jsx`, `src/marca/Pilula.jsx`, `src/marca/Icones.jsx`

- [ ] Apagar e mover os arquivos; `npm uninstall` das 5 libs; `npm install @phosphor-icons/web@2.1.1`.
- [ ] `marca.css`: `:root` das linhas 14–22 + `--mola`, `.vidro` (32–38), `.vidro-escuro` (254–255), `.marca` (40–41), `.ico` (42), `.pill` (43–46), `.mais` (47–49), `.chips`/`.chip` (50–53), `:focus-visible` (29).
- [ ] `base.css`: reset e elementos (23–28, 30), `.funde` (55–57), `sobe`/`surge`/`.entra`/`.produto` (59–63), `.destaques h2, .cores h2, .amor h2` (101), `.grad-manga`/`.grad-ia` (119–120), `.sec`…`.centro` (240–253), `.ico-l` e cores de acender (458–468), media 734 do `.sec` (433, primeira parte), reduced-motion de `.entra`/`.produto` (228).
- [ ] `main.jsx` importa `@phosphor-icons/web/light`, `@phosphor-icons/web/fill` (conferir os caminhos exportados no `package.json` do pacote), `marca.css`, `base.css`.
- [ ] `Logo.jsx`: `<a className="marca" href="#topo" aria-label="Mango, início" style={{marginRight: 8}}/>`; aceita `className`/props para o uso dentro do chip. `Pilula.jsx`: `<a className="pill" href={href}>{children}</a>`. `Icones.jsx`: o `<svg>` das linhas 533–538.
- [ ] `npm run build` passa. Commit: `chore: troca o site do teclado pela base do MangoBook Pure`.

### Task 2: Dados e lógica pura (TDD)

**Files:**
- Create: `src/dados/abas.js`, `src/dados/cores.js`, `src/dados/usos.js`, `src/dados/ia.js`, `src/dados/sistema.js`, `src/dados/comparador.js`, `src/dados/ondas.js`
- Test: `src/dados/dados.test.js`

**Interfaces (Produces):**
- `proximaAba(i: number, tecla: string, total: number, eixo?: 'h'|'hv'): number | null` — `ArrowRight`(+`ArrowDown` se `'hv'`) avança, `ArrowLeft`(+`ArrowUp`) volta, com volta; outra tecla → `null`.
- `CORES: {id, nome, tom, foto, alt}[]` (manga, rosa, folha, prata; tons `#fff3d1 #ffe8de #eaf6df #eef0f4`).
- `USOS: {aba, t, p, apps: string[], bg, icone}[]` (linhas 947–960; `icone` = nome Phosphor fill, ex. `'graduation-cap'`).
- `IA_ORIGINAL: string`, `IA_VERSOES: string[]` (1004–1009); `textoDigitado(versao: string, k: number): {texto: string, digitando: boolean}`.
- `CENAS_OS: {bg, a: number[4], b: number[4]}[]` (1034–1039); `ITENS_OS: {titulo, texto}[]` (736–739).
- `MODELOS`, `SPECS` (1063–1074, `fmt` incluso); `larguraBarra(v, max): string` → `` `${Math.max(28, v / max * 100)}%` ``.
- `ondas(n = 48): {altura: number, on: boolean}[]` (995–999).

- [ ] Escrever `dados.test.js`:

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { proximaAba } from './abas.js';
import { CORES } from './cores.js';
import { USOS } from './usos.js';
import { IA_VERSOES, textoDigitado } from './ia.js';
import { CENAS_OS, ITENS_OS } from './sistema.js';
import { MODELOS, SPECS, larguraBarra } from './comparador.js';
import { ondas } from './ondas.js';

test('proximaAba avança, volta e dá a volta', () => {
  assert.equal(proximaAba(0, 'ArrowRight', 4), 1);
  assert.equal(proximaAba(3, 'ArrowRight', 4), 0);
  assert.equal(proximaAba(0, 'ArrowLeft', 4), 3);
  assert.equal(proximaAba(1, 'Enter', 4), null);
  assert.equal(proximaAba(1, 'ArrowDown', 4), null);
  assert.equal(proximaAba(1, 'ArrowDown', 4, 'hv'), 2);
  assert.equal(proximaAba(0, 'ArrowUp', 4, 'hv'), 3);
});

test('cores batem com o MARCA.md', () => {
  assert.deepEqual(CORES.map((c) => [c.id, c.tom]), [
    ['manga', '#fff3d1'], ['rosa', '#ffe8de'], ['folha', '#eaf6df'], ['prata', '#eef0f4'],
  ]);
});

test('quantidades das listas', () => {
  assert.equal(USOS.length, 4);
  assert.equal(IA_VERSOES.length, 3);
  assert.equal(CENAS_OS.length, 4);
  assert.equal(ITENS_OS.length, 4);
});

test('texto da IA digita 2 letras por passo e para no fim', () => {
  const v = IA_VERSOES[1];
  assert.deepEqual(textoDigitado(v, 4), { texto: v.slice(0, 4), digitando: true });
  assert.deepEqual(textoDigitado(v, v.length + 1), { texto: v, digitando: false });
});

test('specs formatadas como no protótipo', () => {
  const por = Object.fromEntries(SPECS.map((s) => [s.rot, s]));
  assert.equal(por['Tela'].fmt(13.6), '13,6"');
  assert.equal(por['Bateria'].fmt(18), '18 horas');
  assert.equal(por['Núcleos da CPU'].fmt(8), '8 núcleos');
  assert.equal(por['Leveza'].fmt(1.2), '1,2 kg');
  assert.equal(MODELOS.pure.preco, 'A partir de R$ 7.999');
});

test('largura da barra tem piso de 28%', () => {
  assert.equal(larguraBarra(24, 24), '100%');
  assert.equal(larguraBarra(1, 100), '28%');
});

test('ondas: 48 barras, 23 do meio acesas', () => {
  const o = ondas();
  assert.equal(o.length, 48);
  assert.equal(o.filter((b) => b.on).length, 23);
});
```

(Nota: `Math.abs(i - 24) < 12` acende i = 13…35, 23 barras; o teste fixa o comportamento real do protótipo.)

- [ ] `npm test` → falha (módulos não existem).
- [ ] Implementar os módulos copiando os dados das linhas citadas.
- [ ] `npm test` → passa. Commit: `feat: dados e lógica pura do MangoBook Pure`.

### Task 3: Ganchos

**Files:** Create `src/ganchos/useApareceu.js`, `useAbas.js`, `useCorDaFoto.js`, `useSemMovimento.js`, `useRolagem.js`

**Interfaces (Produces):**
- `useApareceu(ref, {limiar = 0.5, raiz = null, umaVez = true} = {}): boolean`
- `useAbas(total, {inicial = 0, eixo = 'h', aoMudar} = {}): {ativa, escolher(i), props(i) → {role, 'aria-selected', tabIndex, onClick, onKeyDown, ref}}` (usa `proximaAba`, foca a aba nova no teclado). Para o radiogroup: `useAbas(4, {eixo: 'hv'})` com `aria-checked` montado na seção.
- `useCorDaFoto(src, variavel)`: amostra o pixel (4,4) e faz `document.documentElement.style.setProperty(variavel, 'rgb(r g b)')` (linhas 850–858).
- `useSemMovimento(): boolean` (lê `matchMedia` uma vez).
- `useRolagem(fn)`: `addEventListener('scroll', fn, {passive: true})` + chama `fn()` ao montar; remove ao desmontar.

- [ ] Implementar. `npm run build` passa. Commit: `feat: ganchos de aparição, abas, cor da foto e rolagem`.

### Task 4: Navbar, rodapé e as 4 primeiras seções

**Files:** Create `src/marca/Navbar.jsx` + `.css` (65–84, 234–239, media 222), `src/marca/Rodape.jsx` + `.css` (414–420, media 430), `src/secoes/Abertura.jsx` + `.css` (86–97, media 223), `Destaques.jsx` + `.css` (99–200 menos o 101 e 119–120, media 224–225, reduced 229–230), `Amor.jsx` + `.css` (213–217), `Cores.jsx` + `.css` (202–211, reduced 229); Modify `src/App.jsx`.

- [ ] Navbar: JSX das linhas 540–550; `useRolagem` liga `.compacta` (`scrollY > 80`) e `.sobre-escuro` (regra das linhas 917–922, y = 40, sobre `document.querySelectorAll('.sec.preto')`).
- [ ] Abertura: JSX 554–566; `useCorDaFoto('/mango-book/image-4.png', '--papel')`.
- [ ] Destaques: JSX 569–607; estado `atual`, `tocando` (inicial `!semMovimento`); `useEffect` com `IntersectionObserver` para `.viu` (limiar 0,5) e para marcar o ponto (raiz = trilho, limiar 0,6); `setInterval` de 8 s chamando `ir((atual + 1) % 7)`; `pointerdown` no trilho pausa; botão alterna `tocando` e troca o ícone `#pausa`/`#play` e o `aria-label`.
- [ ] Amor: JSX 611–616. Cores: JSX 619–637 a partir de `CORES`; estado da cor, `backgroundColor` inline com o tom, setas pelo `useAbas(4, {eixo: 'hv'})`.
- [ ] Rodapé: JSX 833–846.
- [ ] `App.jsx`: `<Icones/><Navbar/><main>Abertura, Destaques, Amor, Cores …</main><Rodape/>`.
- [ ] `npm run build` passa. Commit: `feat: navbar, rodapé, abertura, destaques, amor e cores em React`.

### Task 5: Seções de desempenho até o final

**Files:** Create em `src/secoes/`: `Desempenho` (257–281, media 431), `Bateria` (283–296, reduced 436–437), `Sentidos` (298–325, media 425–428), `Ia` (327–343), `Sistema` (345–363), `Juntos` (365–372), `Seguranca` (sem CSS próprio: usa `.grade-6` de Juntos → mover `.grade-6` para `base.css`), `Motivos` (374–382 fundido com 470–487), `Comparar` (489–528), `Ambiente` (400–405), `Final` (407–411). Media 900 (423–424) e 734 (433, `.usos-abas`) e reduced (435, 528) distribuídas no arquivo dono de cada seletor. O `<svg>` de `<defs>` (641–646) vai em `Desempenho.jsx` (primeira seção depois dele).

- [ ] Desempenho: JSX 649–677; `useAbas(4)` + `USOS`; arte com `background` inline e `<i className={`ph-fill ph-${icone}`}/>`.
- [ ] Bateria: JSX 680–694; `useApareceu(ref, {limiar: 0.4})` liga `.viu` e dispara o contador (`requestAnimationFrame`, 2,6 s, `18 * (1 - (1 - k)^3)`); com movimento reduzido fica 18.
- [ ] Sentidos: JSX 697–706; `ondas()` vira `<i className={on ? 'on' : ''} style={{height: altura + '%'}}/>`.
- [ ] Ia: JSX 709–728; `useAbas(3)`; estado `k`; efeito por aba: `k = 0`, `setInterval` de 22 ms somando 2 até o fim, limpo na troca; com movimento reduzido `k = Infinity`. Renderiza `<span className="antes">{IA_ORIGINAL}</span>{texto}{digitando && <span className="cursor"/>}`.
- [ ] Sistema: JSX 731–748; estado `aberta`; `ITENS_OS` e `CENAS_OS` (posições das janelas em `%`).
- [ ] Juntos e Seguranca: JSX 751–776. Motivos: JSX 779–788; `Set` de abertos.
- [ ] Comparar: JSX 791–811; `useAbas(2)`; `useCorDaFoto('/mango-book/cor-manga.png', '--fundo-cmp')`; `cresceu` liga com `useApareceu(barrasRef, {limiar: 0.3})`; bolha medida num `useLayoutEffect` com `ref` da aba ativa (`width = offsetWidth`, `translateX(offsetLeft - 5px)`) e de novo em `document.fonts.ready`; barras com `larguraBarra` só depois de `cresceu`.
- [ ] Ambiente e Final: JSX 814–829; `useCorDaFoto('/mango-book/hero-manga.png', '--papel-final')`.
- [ ] `npm run build` + `npm test` passam. Commit: `feat: seções de desempenho ao final em React`.

### Task 6: Comparação visual e correções

**Files:** Create (scratchpad, fora do repositório) `compara.mjs`.

- [ ] Script CDP: sobe nada (usa `npm run dev` já rodando em background), abre `chrome --headless=new --remote-debugging-port=9333`, para cada página (`/design/prototipos/pure.html` e `/`) e cada tamanho (1440×900, 390×844): rola até cada `section`/`footer`, espera 1,5 s, salva `pure-<tamanho>-<n>.png` e `react-<tamanho>-<n>.png`. Depois executa as interações (clicar chip Rosa, aba Criar, aba Resumir, segundo item da sanfona, primeiro "+", aba Prime, pausar carrossel) e salva prints de cada uma nos dois lados. Uma rodada extra com movimento reduzido (`Emulation.setEmulatedMedia` com `prefers-reduced-motion: reduce`).
- [ ] Olhar os pares; listar diferenças; corrigir; repetir até não sobrar diferença além do conteúdo animado no momento do print.
- [ ] Commit(s): `fix: <diferença> igual ao protótipo`.
- [ ] Final: `npm test`, `npm run build`, atualizar a memória do projeto.
