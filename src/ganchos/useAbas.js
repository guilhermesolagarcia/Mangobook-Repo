import { useRef, useState } from 'react';
import { proximaAba } from '../dados/abas.js';

// Abas acessíveis: roving tabindex, setas com volta e foco acompanhando a aba nova.
// props(i) espalha nos botões; o chamador decide o atributo de estado (aria-selected ou aria-checked).
export function useAbas(total, { inicial = 0, eixo = 'h', aoMudar } = {}) {
  const [ativa, setAtiva] = useState(inicial);
  const botoes = useRef([]);

  const escolher = (i, focar = false) => {
    setAtiva(i);
    aoMudar?.(i);
    if (focar) botoes.current[i]?.focus();
  };

  const props = (i) => ({
    ref: (el) => { botoes.current[i] = el; },
    tabIndex: i === ativa ? 0 : -1,
    onClick: () => escolher(i),
    onKeyDown: (e) => {
      const nova = proximaAba(i, e.key, total, eixo);
      if (nova === null) return;
      e.preventDefault();
      escolher(nova, true);
    },
  });

  return { ativa, escolher, props, botoes };
}
