# MangoBook Pure em React: desenho

Data: 2026-10-09 · Branch: `mangobook-react` (a partir da `main`)

## Objetivo

Passar o protótipo aprovado `escolhas/pure.html` para o app React + Vite do projeto, **idêntico no visual e no comportamento**, com o código dividido em peças pequenas. As peças de marca ficam separadas para irem depois para o repositório da loja da Mango.

**Sucesso =** prints do React iguais aos do protótipo nas mesmas posições de rolagem (desktop e celular), todas as interações funcionando igual, `npm run build` e `npm test` passando.

**Fora do escopo:** qualquer mudança de visual, texto ou imagem. Melhorias vêm depois, já em cima do React. As imagens continuam as atuais (1024 px, `quatro-cores.png` provisória).

## Decisões

- **Substituir o site do teclado.** O código do FORGE 75 sai do `src/` (segue guardado na branch `site-parte-1` e nos backups).
- **Cópia fiel.** O CSS do protótipo é copiado quase linha por linha, só repartido entre arquivos. Nada de Tailwind ou CSS-in-JS.
- **Um componente por seção + peças de marca compartilhadas.**

## 1. Limpeza e base

- Remover de `src/`: `3d/`, `cenas/`, `som/`, `teclado/`, `ui/`, `visualizador.js`, `estilos/`.
- Remover do `package.json`: `three`, `@react-three/fiber`, `gsap`, `liquid-glass-react`, `@shadergradient/react`. Instalar `@phosphor-icons/web` (mesma versão 2.1.1 do protótipo, estilos `light` e `fill`), importado localmente no lugar do unpkg.
- `package.json`: `name` passa a `mangobook-pure`.
- `index.html`: título "MangoBook Pure", descrição nova (paródia de portfólio), mantém Inter e o favicon `mango.svg`.
- Imagens: `mango-book/` é movida para `public/mango-book/` (com a subpasta `mango-book/mango-book/`), para os caminhos `/mango-book/...` do protótipo continuarem valendo.
- `escolhas/pure.html` fica intocado, como referência. Como ele busca `/mango-book/...` na raiz, depois da mudança ele é servido pelo próprio Vite (a pasta `public/` responde nesses caminhos).
- `public/teclado.png` sai (era do FORGE 75).

## 2. Estrutura

```
src/
  main.jsx                 importa marca.css + base.css, renderiza <App/>
  App.jsx                  <Navbar/> + <main> com as 16 seções + <Rodape/>
  base.css                 reset, elementos globais e classes compartilhadas entre seções (.sec, .olho, .titulo, .lead, .funde, animações de entrada)
  marca/                   o que vai para a loja
    marca.css              variáveis do MARCA.md + .vidro, .vidro-escuro, .pill, .mais, .chip, foco
    Logo.jsx               máscara do mango.svg em currentColor
    Pilula.jsx             <a>/<button> com a classe .pill
    Navbar.jsx + .css      a ilha que encolhe e escurece sobre seção preta
    Rodape.jsx + .css      notas de paródia, colunas e copyright
    Icones.jsx             o <svg> de símbolos (busca, sacola, pausa, play) do topo do <body>; o segundo <svg> de <defs> (linha 641 do protótipo) vai junto da seção que o usa
  secoes/                  uma por seção, cada uma com o seu .css
    Abertura  Destaques  Amor  Cores  Desempenho  Bateria  Sentidos  Ia
    Sistema  Juntos  Seguranca  Motivos  Comparar  Ambiente  Final
  ganchos/
    useApareceu.js         IntersectionObserver: dispara uma vez (ou acompanha) quando o elemento entra na tela
    useAbas.js             abas com setas, roving tabindex e volta do fim ao começo
    useCorDaFoto.js        amostra o pixel (4,4) da imagem e grava uma variável CSS no :root
    useSemMovimento.js     lê prefers-reduced-motion
    useRolagem.js          inscrição passiva no scroll
  dados/
    usos.js  ia.js  sistema.js  comparador.js  cores.js
    *.test.js              testes da lógica pura
```

As 16 seções da lista contam a Navbar, as 15 seções do `<main>` e o Rodapé, na ordem do protótipo: abertura, destaques, amor, cores, desempenho, bateria, sentidos, ia, sistema, juntos, segurança, motivos, comparar, ambiente, final.

**Regra das classes:** os nomes de classe e ids do protótipo são mantidos, para o CSS copiado funcionar sem tradução e a comparação com o protótipo ser direta.

## 3. Interações

| Protótipo | React |
|---|---|
| Amostrar a cor do fundo da foto (`--papel`, `--papel-final`, `--fundo-cmp`) | `useCorDaFoto(src, variavel)` chamado na seção dona da foto |
| Carrossel: pontos seguem a rolagem, avança a cada 8 s, pausa no botão e ao tocar no trilho, cards ganham `.viu` | Estado `atual` e `tocando` em `Destaques`; `useApareceu` para o `.viu` e para marcar o ponto (raiz = trilho, limiar 0,6); `setInterval` limpo no efeito. Sem auto-avanço com movimento reduzido. |
| Navbar `.compacta` após 80 px; `.sobre-escuro` sobre `.sec.preto` | `useRolagem` em `Navbar`; as seções pretas são achadas por `document.querySelectorAll('.sec.preto')` depois de montar (mesma regra do protótipo, y = 40) |
| Seletor de cor (radiogroup, setas, tom da seção, fade da foto, rótulo) | Estado `cor` em `Cores`; tons e nomes vêm de `dados/cores.js`; setas via a mesma lógica de `useAbas` em modo radiogroup |
| Abas de usos (fundo, ícone, título, texto, apps) | `useAbas` + `dados/usos.js` renderizados como JSX |
| Bateria: conta até 18 em 2,6 s com easing cúbico, uma vez | `useApareceu` (limiar 0,4) + `requestAnimationFrame`; com movimento reduzido mostra 18 direto |
| Ondas dos microfones (48 barras) | Gerado em `dados/` (função pura) e renderizado em JSX |
| IA reescrevendo o texto, 2 letras a cada 22 ms | `useAbas` + estado `k`; `setInterval` limpo ao trocar de aba e ao desmontar; com movimento reduzido mostra o texto inteiro |
| Sanfona do sistema (uma aberta, tela muda de arrumação) | Estado `aberta` em `Sistema` + `dados/sistema.js` |
| Motivos: "+" abre o card | Estado por card (conjunto de abertos) em `Motivos` |
| Comparador: modelo vem pra frente, bolha desliza, barras crescem ao aparecer, recalcula após as fontes carregarem | `useAbas` (2 abas), estado `modelo` e `cresceu`; bolha medida com `ref` em efeito de layout e de novo em `document.fonts.ready`; specs e formatação em `dados/comparador.js` |

Todo efeito limpa o que criou (listeners, observers, timers), o que é necessário com o `StrictMode` montando duas vezes em desenvolvimento.

## 4. Verificação

1. **Testes `node --test`** (já é o `npm test`) para `dados/` e para a lógica de `useAbas` separada numa função pura (`proximaAba(i, tecla, total)`):
   - formatação das specs (`13,6"`, `1,2 kg`, `18 horas`, `8 núcleos`);
   - largura das barras (`max(28, v/max*100)%`);
   - setas com volta (último → primeiro e vice-versa) e teclas ignoradas;
   - 4 usos, 3 versões da IA, 4 cenas do sistema, 4 cores com os tons do `MARCA.md`;
   - ondas: 48 barras, as 24 do meio acesas.
2. **Comparação visual** com um script Node via CDP (Chrome headless, WebSocket nativo do Node 24): abre `pure.html` e o app React no mesmo servidor Vite, em 1440×900 e 390×844, rola até cada seção, espera as animações de entrada e salva os pares de prints no scratchpad. Os pares são comparados olhando; as diferenças viram uma lista e são corrigidas.
3. **Interações nos dois lados**, pelo mesmo script: trocar cor, aba de usos, aba da IA, sanfona, abrir um motivo, trocar o modelo do comparador, pausar o carrossel. Print depois de cada ação.
4. `npm run build` sem erros nem avisos novos.

## 5. Commits

Conventional, um por etapa: `chore` (limpeza e dependências), `feat` (marca + base), `feat` (seções em grupos), `test`, `fix` (diferenças da comparação visual). Nada de merge na `main` sem o usuário pedir.

## Riscos

- **Ordem do CSS:** no protótipo tudo está num `<style>` só, e a ordem decide empates. Repartir pode inverter regras. Mitigação: importar os `.css` na ordem do protótipo e conferir pela comparação visual.
- **Seletores entre seções** (ex.: `.destaques h2, .cores h2, .amor h2`): ficam em `base.css` quando cruzam seções.
- **StrictMode monta os efeitos duas vezes em desenvolvimento:** todo efeito precisa ser idempotente e ter limpeza.
