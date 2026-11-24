# Design system e kit de imagens da Mango

Data: 24/11/2026 · Status: aguardando aprovação

## Por quê

Recrutador de front-end olha por poucos segundos. A Mango já tem um design system de verdade (`MARCA.md` + `src/marca/`), mas ele está escondido num `.md`. Este trabalho deixa o sistema **visível**: pranchas em HTML no estilo dos kits de marca de `refs/systems/` (Mastercard, Blazo, Lovable, ícones de app, Altitude), e imagens PNG tiradas delas para usar no README, em posts e na futura página Bastidores.

## Metas

- Pranchas em HTML, visuais, com as cores e o logo **iguais ao código**.
- Cada prancha tem **variações** para escolher, com o mesmo seletor do `escolhas/loja.html` (`proto-picker`).
- Um comando gera os PNGs do kit.

## Fora do escopo (hoje)

- A rota `/marca` em React (vem depois, com o React Router, a partir da prancha aprovada).
- A página Bastidores.
- Imagens geradas por IA.

## Anti-metas

- Cor ou logo "quase igual" ao site. Se não bate com o `MARCA.md`, falhou.
- Qualquer coisa da Apple (logo, SF Symbols, fotos). Ícones só Phosphor.
- Logo com degradê, sombra, contorno ou mordida (regra do manual).

## Abordagens consideradas

| | Abordagem | Troca |
|---|---|---|
| **A (escolhida)** | Pranchas HTML em `escolhas/marca/`, abertas pelo `npm run dev`, PNG via Playwright | rápido, ver antes de aprovar; depois precisa virar React |
| B | Direto em React (`/marca`) | já nasce no site, mas exige Router antes e só se vê no fim |
| C | Gerar com IA | bonito de cara, mas não bate com o código |

Escolhida A: segue o método do Âmbar (visual primeiro) e cabe no uso de hoje.

## Como fica

Arquivos em `escolhas/marca/`, servidos pelo Vite em `http://localhost:5173/escolhas/marca/<arquivo>.html`. Todos importam `/src/marca/marca.css` (tokens e peças) e usam `/mango.svg` como máscara do logo, então trocar uma cor no CSS muda as pranchas.

As 6 cores "todas" (`#ff9f1c #1fb57a #ff5e7e #2f7bff #7b5cff #22b5e8`) ainda não estão no `marca.css`; entram lá como `--c-manga`, `--c-verde`, `--c-rosa`, `--c-azul`, `--c-roxo`, `--c-ciano`, junto com os degradês do manual.

Todas as pranchas trocam entre os 6 temas de degradê (ver "Decisões"). A coluna abaixo é o que cada uma tem a mais.

| Ordem | Prancha | Ref | Conteúdo | Extra |
|---|---|---|---|---|
| 1 | `prancha.html` | Mastercard | capa (logo grande + "Nossa cor são todas"), 01 cores (base, as 6, degradês), 02 tipografia (escala real do manual), 03 peças (pílula, vidro, chips, cards, ícones Phosphor acesos nas 6 cores), 04 aplicações (navbar, card de produto, post, cartão de visita), 05 tom de voz | clara · escura |
| 2 | `logo.html` | Altitude + Blazo | o caroço em selo, empilhado, horizontal; sobre claro, escuro, foto e nas 6 cores; tamanho mínimo e "não fazer" | uma por cor de fundo |
| 3 | `peels.html` | Blazo | folha de adesivos Mango Peels (logo, glifos, frases curtas do tom de voz) com borda branca de adesivo | folha clara · folha escura |
| 4 | `cartoes.html` | Lovable | cartão-presente da Mango Store (R$ 50 / 100 / 300) com os degradês da marca | grade com 12 combinações |
| 5 | `apps.html` | ícones de app | ícones dos apps do MangoOS em squircle com degradê de malha | claro · escuro |

`escolhas/marca/index.html` lista as cinco.

Cada variação também abre pela URL (`prancha.html?v=escura`), para o print achar ela sem clicar.

**Kit de imagens:** `scripts/kit.mjs` chama o Chrome que já está instalado em modo headless (`--screenshot`, `--force-device-scale-factor=2`) para cada prancha e variação, com o `npm run dev` rodando, e salva em `docs/imagens/kit/<prancha>-<variacao>.png`. Sem dependência nova (o Playwright não está no `package.json`).

## Feito quando

- A prancha abre sem erro no console, a 1440 px e a 390 px sem rolagem lateral.
- Toda cor usada vem de uma variável do `marca.css`.
- `node scripts/kit.mjs` gera os PNGs.

## Decisões minhas (pode trocar)

- "Variações" = **temas de degradê** (decidido 24/11: "várias cores, tipo o system-3 com a nossa paleta"). Toda prancha troca de tema pelo seletor e pela URL (`?v=uva`). Temas, todos feitos só com as 6 cores + apoio do manual:

| Tema | Degradê |
|---|---|
| Manga | amarelo `#ffd23f` → manga `#ff9f1c` → rosa `#ff5e7e` |
| Arco-íris | manga → rosa → lilás `#a46bff` → azul-claro `#3aa0ff` |
| Uva | roxo `#7b5cff` → rosa `#ff5e7e` |
| Oceano | azul `#2f7bff` → ciano `#22b5e8` |
| Folha | verde `#1fb57a` → verde-água `#3ddc97` → ciano |
| Noite | fundo tinta `#1d1d1f` com malha de duas cores vizinhas acesa |

  O tema vira variáveis (`--g1 --g2 --g3`) num atributo `data-tema` no `<html>`; a prancha só usa as variáveis. Degradê suave e "derretido" como no system-3: `radial-gradient` em malha + leve `blur`, não faixa reta.

- Ordem das pranchas: prancha principal primeiro, porque é a que mais impressiona; hoje provavelmente cabem 1 a 3.
- PNGs em `docs/imagens/kit/` (junto das imagens do README).
- Apps do MangoOS inventados na hora (Fotos, Notas, Música, Mango ID...), com glifos Phosphor, sem mascote por enquanto.
