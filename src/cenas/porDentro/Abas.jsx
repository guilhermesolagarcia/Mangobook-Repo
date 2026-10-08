import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiquidGlass from 'liquid-glass-react';
import { ABAS, estadoAba } from '../../3d/roteiro.js';
import { assumir, escrever, transitar } from '../../3d/estado.js';
import { tocar } from '../../som/digitacao.js';
import './abas.css';

gsap.registerPlugin(ScrollTrigger);

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
  const secao = useRef(null);
  const abaAtual = useRef(aba);

  // dona do palco enquanto ocupa o meio da tela (descendo ou subindo): a pose da aba escolhida, misturada
  useLayoutEffect(() => {
    const st = ScrollTrigger.create({ trigger: secao.current, start: 'top center', end: 'bottom center',
      onToggle: (self) => { if (self.isActive) { assumir('abas'); escrever('abas', estadoAba(abaAtual.current)); } } });
    return () => st.kill();
  }, []);

  function escolher(nova) {
    setAba(nova);
    abaAtual.current = nova;
    transitar('abas', estadoAba(nova));
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
    <section ref={secao} className="pd-abas faixa-escura" aria-label="Explore os detalhes">
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
