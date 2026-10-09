# Manual da marca Mango

Tudo o que define a Mango, para qualquer projeto dela (a página do MangoBook, a futura loja, o que vier) parecer da mesma empresa. Os valores saem do protótipo `escolhas/pure.html`; se os dois discordarem, o protótipo aprovado ganha e este arquivo é corrigido.

**O que é fixo:** logo, cores da marca, tipografia, peças visuais e tom de voz.
**O que é provisório:** os produtos e as cores de produto. Podem mudar a qualquer momento, inclusive o MangoBook.

---

## 1. O que é a Mango

- Paródia fictícia da Apple, feita como projeto de portfólio. Outra fruta, sem a mordida.
- **Todo rodapé** traz o aviso, com os nomes usados na página:
  > Mango, MangoBook Pure, Mangophone, chip Palmer e MangoOS são uma paródia fictícia, criada como projeto de portfólio, sem nenhuma relação com a Apple.
  >
  > Preços, números de desempenho, bateria e meio ambiente são ilustrativos e não descrevem nenhum produto real.
- Referência de qualidade: uma página de lançamento real da Apple (a do MacBook Neo foi o modelo do MangoBook). Impacto visual de lançamento, não "funciona e pronto".
- Idioma: **português do Brasil** no texto; **nomes de produto em inglês** (como a Apple Brasil faz).
- Base sempre **clara**, estilo Apple. Seções pretas existem como contraste, não como tema.

## 2. Logo

**"D · Caroço":** a manga cortada com o caroço vazado.

| Arquivo | Quando usar |
|---|---|
| `public/mango.svg` | Sobre fundo claro. Também serve de máscara CSS para pintar em qualquer cor (`mask: url(/mango.svg)` + `background: currentColor`). |
| `public/mango-branco.svg` | Sobre fundo escuro ou foto. |

Na navbar: 15 × 17 px.

**Não fazer:** mordida (é a Apple, não a gente), distorcer a proporção, degradê ou sombra no logo, contorno.

## 3. Cores

### Base (fixa)

| Nome | Valor | Uso |
|---|---|---|
| Tinta | `#1d1d1f` | Texto principal e **botões** |
| Tinta 2 | `#6e6e73` | Texto secundário, preços, notas |
| Cinza escuro | `#a1a1a6` | Texto secundário sobre preto |
| Branco | `#ffffff` | Fundo padrão |
| Azulejo | `#f5f5f7` | Fundo de seção alternada, rodapé |
| Papel | `#f5f2ec` | Fundo quente da abertura (o JS troca pela cor do fundo da foto) |
| Linha | `#d2d2d7` | Divisórias |
| Link | `#0066cc` | Links de texto ("Saiba mais ›"), **nunca botão** |
| Foco | `#0071e3` | Contorno de foco do teclado |

### "Nossa cor são todas" (fixa)

A Mango **não tem uma cor só**, e não é laranja. Destaques, ícones acesos no hover, degradês e glifos se revezam entre estas seis, nesta ordem:

| Manga | Verde | Rosa | Azul | Roxo | Ciano |
|---|---|---|---|---|---|
| `#ff9f1c` | `#1fb57a` | `#ff5e7e` | `#2f7bff` | `#7b5cff` | `#22b5e8` |

Cores de apoio para degradês: amarelo `#ffd23f`, lilás `#a46bff`, azul-claro `#3aa0ff`, verde-água `#3ddc97`.

Degradês que já existem:
- **Manga:** `linear-gradient(95deg, #ffd23f, #ff9f1c 40%, #ff5e7e)` (números grandes, barra de bateria)
- **Arco-íris (IA):** `linear-gradient(95deg, #ff9f1c, #ff5e7e 35%, #a46bff 70%, #3aa0ff)`
- **Título da abertura:** `linear-gradient(100deg, #e8890c, #f4b41a 45%, #ef7d6d)` aplicado no texto
- **Malha (cards de glifo):** dois `radial-gradient` de cores vizinhas sobre uma cor média, ex.: `radial-gradient(circle at 25% 25%, #3aa0ff, transparent 50%), radial-gradient(circle at 80% 75%, #7b5cff, transparent 55%), #5b7cff`

### Cores de produto (provisórias)

As cores do MangoBook Pure, chamadas de "sabores". Cada uma tem um **tom** claro para o "banho de cor" da seção.

| Sabor | Cor | Tom de fundo |
|---|---|---|
| Manga | `#f4b41a` | `#fff3d1` |
| Rosa | `#f3b49c` | `#ffe8de` |
| Folha | `#a8d58a` | `#eaf6df` |
| Prata | `#d9dadc` | `#eef0f4` |

Regra que fica mesmo se os sabores mudarem: **um card ou seção que mostra um produto usa a cor daquele produto.**

## 4. Tipografia

**Inter** (Google Fonts, `opsz 14..32`, pesos 300–700), com `font-feature-settings: "cv11", "ss01"` e `-webkit-font-smoothing: antialiased`. Títulos com `text-wrap: balance`.

Quanto maior o texto, mais apertado o espaço entre as letras:

| Papel | Tamanho | Peso | Letter-spacing | Altura de linha |
|---|---|---|---|---|
| Título de abertura / seção grande | `clamp(40px, 6vw, 84px)` | 600 | `-0.045em` | 1.02 |
| Título de seção | `clamp(32px, 4.6vw, 56px)` | 600 | `-0.035em` | 1.07 |
| Título de card | 28px | 600 | `-0.025em` | 1.14 |
| Número gigante | 112px (até 240px) | 700 | `-0.06em` | 0.9 |
| Olho (rótulo acima do título) | 21px | 600 | `-0.016em` | — |
| Lead (texto de apoio) | `clamp(19px, 1.7vw, 24px)` | 400 | padrão | 1.38 |
| Corpo | 17px | 400 | `-0.022em` | 1.47 |
| Rótulo / nota | 14px | 600 / 400 | padrão | — |
| Navbar | 13px | 400 | padrão | — |
| Rodapé | 12px | 400 | padrão | — |

## 5. Peças visuais

### Botão em pílula
**Preto**, nunca azul. `background: #1d1d1f`, texto branco, `border-radius: 980px`, `padding: 12px 22px`, 17px. Hover `#3a3a3c`; clique encolhe para `scale(.95)`. Versões menores: navbar 13px / `8px 16px`; barra de compra 15px / `10px 18px`.

### Vidro
Desfoque + saturação + brilho na borda, como luz vinda de cima.

- **Claro:** fundo `rgba(255,255,255,.46)`, `backdrop-filter: blur(22px) saturate(190%)`, sombras internas brancas e sombra externa quente `0 8px 32px rgba(60,40,0,.10)`.
- **Escuro:** fundo `rgba(40,40,44,.45)`, `blur(22px) saturate(180%)`, sombra `0 10px 40px rgba(0,0,0,.4)`.
- Com `prefers-reduced-transparency: reduce`, o vidro vira sólido (`#fbfaf7`), sem desfoque.

### Navbar: "ilha que encolhe"
Pílula de vidro flutuante (52 px de altura, até 900 px de largura, 14 px do topo). No topo mostra tudo. Ao rolar, encolhe para 330 px com **nome do produto + Comprar**. Hover ou foco por Tab abre de novo, para os links nunca ficarem inalcançáveis.
A transição é em etapas: os links somem (0,2 s), a pílula fecha (0,75 s) e o nome entra no fim. Ao abrir, a largura vem primeiro e os links aparecem quando já há espaço.

### Banho de cor
Ao trocar de cor, a **seção inteira tinge no tom** da cor escolhida (0,6 s) e a foto troca com um fade de 0,4 s. Sem blur. A foto usa `mix-blend-mode: multiply`, para o fundo claro dela sumir no tom.

### Ícones
**Phosphor Light** (traço fino, uma cor só), via `@phosphor-icons/web`. Preto no claro, branco no escuro, e no hover acendem numa das seis cores da marca (cada ícone de uma grade numa cor diferente).
SF Symbols não pode (licença da Apple).

### Cards
Cantos de 28 px (palcos de foto: 32 px). Alternam claro (`#fff`), escuro (`#000`) e degradê. Cada card tem uma peça própria: foto, número em degradê ou ícone desenhado. Só o card de cores leva foto do produto; os de glifo usam **glifo branco sobre degradê de malha**. Hover: `scale(1.01)`. Carrossel com snap, avançando a cada 8 s, com o ponto ativo enchendo.

### Movimento

| Nome | Curva | Uso |
|---|---|---|
| `--ease` | `cubic-bezier(0.28, 0.11, 0.32, 1)` | Padrão (entradas, hover) |
| `--chegada` | `cubic-bezier(0.16, 1, 0.3, 1)` | Coisas que chegam e assentam (troca de cor, barras enchendo) |
| `--mola` | `cubic-bezier(0.32, 0.72, 0, 1)` | Navbar: entra devagar e assenta longo, "gesto, não estalo" |

Entrada de texto: sobe 18 px com fade em 0,9 s, em cascata de 0,1 s. Com `prefers-reduced-motion`, transições desligadas.

### Layout
Margem lateral `max(22px, calc((100vw - 1024px) / 2))`: conteúdo em até 1024 px, nunca colado na borda. Seções com 100–120 px de respiro vertical.

## 6. Tom de voz

**Regra:** páginas de produto contidas, microtextos com graça.

**Páginas de produto e lançamento:** cara de Apple. Frases curtas, diretas, afirmativas. O trocadilho fica nos **nomes** (produto, chip, sabores) e em **no máximo uma frase de destaque por seção**, de preferência no título.

| Certo | Errado |
|---|---|
| "Doce por fora. Rápido por dentro." | "Um notebook suculento que vai deixar você com água na boca!" |
| "Chip Palmer. Rápido até o caroço." | "O chip mais frutástico do pomar." |
| "Carregue de manhã. Esqueça até amanhã." | "Bateria que dura mais que manga madura." |
| O texto de apoio é sério: "O chip Palmer abre tudo na hora e aguenta o dia sem esquentar." | Trocadilho em toda frase do parágrafo. |

**Microtextos (loja, estados, avisos):** é onde a graça entra, porque ninguém espera. Carrinho vazio, página 404, confirmação de pedido, carregando, erros leves.

| Momento | Exemplo |
|---|---|
| Carrinho vazio | "Sua fruteira está vazia." |
| 404 | "Essa página caiu do pé." |
| Pedido confirmado | "Pedido feito. Já estamos escolhendo as mais maduras." |
| Carregando | "Descascando…" |

Mesmo nos microtextos: uma piada por tela, e a informação útil sempre clara ("Sua fruteira está vazia. Ver produtos ›").

**Sempre:** "pra" no lugar de "para" no texto falado; números e preços no formato brasileiro (`R$ 7.999`, `12x de R$ 666,58`).

## 7. Produtos atuais (provisórios)

Nada aqui é definitivo. Serve para manter os nomes consistentes enquanto existirem.

| Nome | O que é | Frase |
|---|---|---|
| **MangoBook Pure** | Notebook leve e colorido ("Pure" vem de purê). A partir de R$ 7.999. | "Doce por fora. Rápido por dentro." |
| **MangoBook Prime** | Notebook maior e mais forte. A partir de R$ 12.999. Cores: prata e grafite. | "Pra quem edita, compila e renderiza." |
| **Chip Palmer** | O chip dos MangoBooks (Palmer é uma variedade de manga). | "Rápido até o caroço." |
| **Mangophone** | Celular | — |
| **Mangopad** | Tablet (só citado no rodapé) | — |
| **MangoOS** | Sistema operacional | "Simples desde o primeiro clique." |
| **MangoDrop** | Mandar arquivos pra quem está perto | — |
| **Mango ID** / **Mango na nuvem** | Conta e armazenamento (só no rodapé) | — |

Padrão dos nomes até agora: "Mango" + palavra em inglês, colado (MangoBook, MangoOS) ou "Mango" + sufixo (Mangophone). Variedades de manga servem para chips e coisas internas.

## 8. Já rejeitado (não repetir)

- **Botões azuis.** Botão é preto; azul só em link de texto.
- **Laranja como "a cor da marca".** A Mango é todas as cores.
- **Glifo em quadrado com degradê** (estilo ícone de app): "muito comum".
- **Cópia literal da Apple:** a imagem `mango-book/quatro-cores.png` ficou parecida demais com o Neo e é provisória.
- **Navbar simples, sem vidro.**
- **Abertura sem impacto** e seções sem foco no produto (o erro da primeira versão do teclado FORGE 75).
- **Som sintetizado.**
- **Hero com card azul e sequência de frames** (`escolhas/hero.html`).

## 9. Variáveis CSS para copiar

```css
:root {
  /* base */
  --ink: #1d1d1f; --ink-2: #6e6e73; --ink-3: #a1a1a6;
  --branco: #fff; --tile: #f5f5f7; --papel: #f5f2ec; --linha: #d2d2d7;
  --action: #0066cc; --focus: #0071e3; --botao: #1d1d1f; --botao-hover: #3a3a3c;

  /* nossa cor são todas */
  --c-manga: #ff9f1c; --c-verde: #1fb57a; --c-rosa: #ff5e7e;
  --c-azul: #2f7bff; --c-roxo: #7b5cff; --c-ciano: #22b5e8;
  --c-amarelo: #ffd23f; --c-lilas: #a46bff; --c-azul-claro: #3aa0ff; --c-verde-agua: #3ddc97;
  --grad-manga: linear-gradient(95deg, #ffd23f 0%, #ff9f1c 40%, #ff5e7e 100%);
  --grad-ia: linear-gradient(95deg, #ff9f1c, #ff5e7e 35%, #a46bff 70%, #3aa0ff);

  /* sabores do produto (provisórios) e seus tons */
  --manga: #f4b41a; --rosa: #f3b49c; --folha: #a8d58a; --prata: #d9dadc;
  --tom-manga: #fff3d1; --tom-rosa: #ffe8de; --tom-folha: #eaf6df; --tom-prata: #eef0f4;

  /* movimento */
  --ease: cubic-bezier(0.28, 0.11, 0.32, 1);
  --chegada: cubic-bezier(0.16, 1, 0.3, 1);
  --mola: cubic-bezier(0.32, 0.72, 0, 1);

  /* forma e layout */
  --pilula: 980px; --raio-card: 28px; --raio-palco: 32px;
  --gutter: max(22px, calc((100vw - 1024px) / 2));
}

body {
  font: 400 17px/1.47 "Inter", system-ui, sans-serif; letter-spacing: -0.022em;
  color: var(--ink); background: var(--branco);
  font-feature-settings: "cv11", "ss01"; -webkit-font-smoothing: antialiased;
}
:focus-visible { outline: 2px solid var(--focus); outline-offset: 3px; border-radius: 8px; }

.vidro {
  background: rgba(255, 255, 255, 0.46);
  backdrop-filter: blur(22px) saturate(190%); -webkit-backdrop-filter: blur(22px) saturate(190%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.9), inset 0 -1px 0 rgba(255,255,255,.25),
              inset 0 0 0 1px rgba(255,255,255,.4), 0 8px 32px rgba(60,40,0,.10);
}
.vidro-escuro {
  background: rgba(40, 40, 44, .45);
  backdrop-filter: blur(22px) saturate(180%); -webkit-backdrop-filter: blur(22px) saturate(180%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.18), inset 0 0 0 1px rgba(255,255,255,.08), 0 10px 40px rgba(0,0,0,.4);
}
@media (prefers-reduced-transparency: reduce) {
  .vidro { background: #fbfaf7; backdrop-filter: none; -webkit-backdrop-filter: none; }
}

.pill {
  display: inline-flex; align-items: center; border-radius: var(--pilula); padding: 12px 22px; font-size: 17px;
  background: var(--botao); color: #fff; transition: transform .12s ease-out, background-color .2s;
}
.pill:hover { background: var(--botao-hover); }
.pill:active { transform: scale(.95); }
```
