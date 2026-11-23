# .ferramentas

Cópia local (sem `.git`) dos repositórios de skills e ferramentas usados no projeto, organizados por categoria. Servem de consulta e backup; a instalação que o Claude Code usa fica em `~/.claude`.

Cada pasta foi enxugada: ficaram só as skills, comandos, hooks, README e licença (sem testes, benchmarks, imagens, docs e traduções).

## 1-design-ui: identidade visual e interface

| Pasta | Origem | Para que serve |
|---|---|---|
| `ui-ux-pro-max-skill` | nextlevelbuilder/ui-ux-pro-max-skill | Base de design: estilos, paletas, fontes, guidelines de UX e gráficos. 7 skills: `ui-ux-pro-max`, `design-system`, `design`, `brand`, `ui-styling`, `banner-design`, `slides`. |
| `impeccable` | pbakaus/impeccable | Comandos de design: layout, tipografia, espaçamento, acessibilidade, `audit`, `polish`. Inclui 4 agentes (`finish-reviewer`, `documenter`, `asset-producer`, `manual-edit-applier`). |
| `taste-skill` | Leonxlnx/taste-skill | `design-taste-frontend`: regras contra o visual "genérico de IA". Variações de estilo: `minimalist`, `brutalist`, `soft`, `brandkit`, `redesign`, `image-to-code`, `stitch`. |
| `design-dna` | zanwei/design-dna | Extrai tokens, estilo e efeitos de uma referência (print/URL) em JSON e gera design a partir dele. |
| `awesome-design-md` | voltagent/awesome-design-md | 74 `DESIGN.md` de sites conhecidos. Copie um para o projeto e peça "faça uma página nesse estilo". Não é skill, é referência. |

## 2-animacao-3d: movimento e 3D

| Pasta | Origem | Para que serve |
|---|---|---|
| `emil-skills` | emilkowalski/skills | Polimento e animação de interface: easing, mola, movimento fluido (`emil-design-eng`, `animate`, `review-animations`, `improve-animations`, `apple-design`). |
| `motion-design-skill` | lottiefiles/motion-design-skill | Princípios de movimento: timing, easing, coreografia (CSS, Framer Motion, GSAP, Lottie). |
| `gsap-skills` | greensock/gsap-skills | Skills oficiais do GSAP: core, timeline, ScrollTrigger, React, plugins, performance. |
| `threejs-skills` | CloudAI-X/threejs-skills | 10 skills de Three.js: cena, câmera, geometria, materiais, luz, shaders, texturas, pós-processamento. |
| `genjutsu` | AThevon/genjutsu | Skills `bunshin`, `cast`, `paint` e técnicas de motion/design (GSAP, Framer Motion, CSS nativo, auditoria). |
| `img2threejs` | img2threejs/img2threejs | Recria o objeto de uma imagem de referência como modelo Three.js feito só em código (Python 3.10+, sem dependências). |

## 3-engenharia: processo de desenvolvimento

| Pasta | Origem | Para que serve |
|---|---|---|
| `agent-skills` | addyosmani/agent-skills | 25 skills de engenharia e comandos `/spec`, `/plan`, `/build`, `/test`, `/review`, `/ship`, `/webperf`. Inclui agentes `code-reviewer`, `security-auditor`, `test-engineer`, `web-performance-auditor` e checklists (a11y, segurança, performance, definition of done). |
| `ponytail` | dietrichgebert/ponytail | Faz o agente escolher a solução mais simples e escrever menos código (`/ponytail-audit`, `/ponytail-debt`, `/ponytail-review`). |

## 4-infra: infraestrutura e contexto

| Pasta | Origem | Para que serve |
|---|---|---|
| `graphify` | Graphify-Labs/graphify | Transforma o projeto num grafo de conhecimento consultável (`/graphify .`). |
| `omniroute` | diegosouzapw/OmniRoute | Gateway de IA (servidor proxy) para rotear por provedores gratuitos. Só README e licença; **não instalado**. |

## 5-globais: skills de uso geral (escopo global)

| Pasta | Origem | Para que serve |
|---|---|---|
| `superpowers` | obra/superpowers | 15 skills de método: `brainstorming`, `writing-plans`, `executing-plans`, `systematic-debugging`, `test-driven-development`, `verification-before-completion`, code review, git worktrees, subagentes. |
| `vercel-react-best-practices` | vercel-labs/agent-skills | 40+ regras de performance React/Next.js (waterfalls, bundle, re-render, Server Components), priorizadas por impacto. |
| `web-design-guidelines` | vercel-labs/agent-skills | Revisa UI contra as Web Interface Guidelines da Vercel (a11y, UX), saída no formato `arquivo:linha`. |
| `llm-council` | Ole Lehmann (método do LLM Council de Karpathy) | Roda uma decisão difícil por 5 "conselheiros" com ângulos diferentes, revisão cruzada e veredito final. |
| `example-skills` | anthropics/skills | 19 skills oficiais de exemplo: `frontend-design`, `webapp-testing`, `skill-creator`, `mcp-builder`, `theme-factory`, `brand-guidelines`, `docx`/`pdf`/`pptx`/`xlsx` e outras. |

## Sobreposições (escolha uma por tarefa)

Skills que cobrem o mesmo assunto podem dar instruções conflitantes. Ao pedir algo, nomeie qual usar:

- **TDD:** `agent-skills/test-driven-development` × `superpowers/test-driven-development`.
- **Planejamento:** `agent-skills` (`/spec`, `/plan`) × `superpowers` (`brainstorming`, `writing-plans`).
- **Direção visual:** `ui-ux-pro-max` × `taste-skill` × `example-skills/frontend-design` × `impeccable`.
- **Auditoria de UI/a11y:** `impeccable audit` × `web-design-guidelines` × `genjutsu design-audit`.
- **Animação:** `emil-skills` × `motion-design-skill` × `genjutsu` × `gsap-skills`.
- `genjutsu/_jutsu/ui-ux-pro-max` é uma cópia embutida da `ui-ux-pro-max`.

## Fora desta pasta

- **Chrome DevTools MCP**: instalado, controla e inspeciona o Chrome (console, rede, performance).
- **shadcn MCP**: registrado, mas não conectou ainda.
- **Magic MCP (21st.dev)**: não instalado, precisa de API key.
