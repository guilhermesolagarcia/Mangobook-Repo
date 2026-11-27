# Projeto Mango

- **O projeto principal é o MangoBook Pure** (React 19 + Vite). `npm run dev` abre a página dele na raiz (`/`).
- O teclado **FORGE 75 está arquivado**: o código fica nas branches `site-parte-1` e `backup/site-parte-1`. O que sobrou dele na main (protótipos, modelo 3D, `PRODUCT.md`, `ROTEIRO.md`) está em `arquivo/teclado/`; não use como referência do projeto atual.
- Marca: `MARCA.md` (vale para tudo da Mango).
- Planejamento do ecossistema (produtos, loja, nomes, fases): o doc "Ecossistema Mango: o livro do planejamento", https://claude.ai/artifact/LBZ1UayACwT2wKjmCyuLsT
- **Regra de ordem: páginas de produto antes da loja.** Cada produto ganha a sua página, uma por uma, no molde do MangoBook Pure, e cada página define preço e opções do produto no catálogo (`src/catalogo/produtos.js`). A loja vem depois, como vitrine que manda pra essas páginas (o kit e a sacola dependem desses preços e opções). Adesivos ficam pro fim.
- Protótipo da loja: `design/prototipos/loja.html` (visual aprovado: Galeria 2.0). No React vai em duas levas: 1) campanha, categorias, lançamentos, kit, acessórios e sacola; 2) o resto.
- Mais pra frente, a raiz vira a tela inicial da Mango e o MangoBook ganha a própria rota.
- Onde fica cada coisa (mapa completo no README, "Onde está cada coisa"):
  - `src/` + `public/` = o site; `design/` = escolhas, protótipos (`design/prototipos/`) e kit da marca (`design/marca/`);
  - `arte-ia/` = gerado por nós com IA (Mangy, adesivos, prompts); `referencias/` = inspiração de fora;
  - `docs/RETOMAR.md` = onde paramos; specs novas em `docs/specs/`, planos em `docs/planos/` (não em `docs/superpowers/`).
- Nomes de pasta e arquivo em português, minúsculas, com hífen, sem espaço.
