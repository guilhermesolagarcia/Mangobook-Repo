# Roteiro do scroll: FORGE 75

Produto fictício: **FORGE 75**, teclado mecânico 75%, case de alumínio, gasket mount, hot-swap.

Personalidade de movimento: **Premium** (motion-design-skill). Curva padrão `cubic-bezier(0.4, 0, 0.2, 1)`, durações 350–600ms, sem overshoot. Metal é material rígido: nada quica.

## Cenas

| # | Cena | O que acontece no scroll | Mensagem |
|---|---|---|---|
| 0 | **Hero** | Teclado inteiro em 3D, girando devagar sob uma luz que percorre o case. Título e subtítulo entram em sequência. | "Isso é sério." |
| 1 | **Exploded view** (seção fixa, scrub) | As camadas se separam na vertical, uma por vez: keycaps → switches → plate → gasket → PCB → espuma → case. Cada camada ganha um rótulo com linha. No fim, a câmera gira para mostrar o conjunto de lado. | "Cada camada tem um motivo." |
| 2 | **Switch** | Close-up num switch. Microinteração: segurar uma tecla (ou clicar) mostra a curva de força em tempo real e o curso até o acionamento. | "Você sente a diferença." |
| 3 | **Customização** | Seletor de cor do case e das keycaps. O modelo 3D troca o material com transição suave. | "É seu." |
| 4 | **Specs** | Números contam até o valor final quando entram na tela: polling 8000 Hz, 0,125 ms de latência, 1,8 kg de alumínio. | "Feito para competir." |
| 5 | **CTA** | Teclado volta montado, centralizado, botão de pré-venda. | "Reserve o seu." |

## Regras

- Animação ligada ao scroll usa `scrub`; animação disparada usa `toggleActions`. Nunca as duas no mesmo trigger.
- No máximo 1/3 dos elementos em movimento ao mesmo tempo.
- `prefers-reduced-motion`: as camadas aparecem já separadas, sem animação de scroll.
- Toda microinteração precisa responder em menos de 100ms.

## Skills de referência (`.ferramentas`)

- Scroll: `2-animacao-3d/gsap-skills/skills/gsap-scrolltrigger`
- 3D: `2-animacao-3d/threejs-skills/skills/threejs-*`
- Movimento: `2-animacao-3d/motion-design-skill`, `2-animacao-3d/emil-skills`
- Visual: `1-design-ui/taste-skill`, `1-design-ui/impeccable`
