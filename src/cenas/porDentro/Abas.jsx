import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LiquidGlass from 'liquid-glass-react';
import { ABAS, estadoAba } from '../../3d/roteiro.js';
import { definir, estado } from '../../3d/estado.js';
import { tocar } from '../../som/digitacao.js';
import './abas.css';

gsap.registerPlugin(ScrollTrigger);

const mix = (a, b, t) => a + (b - a) * t;
const mixV = (a, b, t) => a.map((v, i) => mix(v, b[i], t));
let transicaoAtual;

// Vai do estado atual do palco até o da aba em 0,8 s, sem pular a câmera.
function transicao(alvo) {
  transicaoAtual?.kill();
  const de = { cam: [...estado.cam], alvo: [...estado.alvo], giro: estado.giro, lateral: estado.lateral, camadas: [...estado.camadas] };
  definir({ ativa: alvo.ativa, cotas: alvo.cotas });
  const reduzir = matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduzir) { definir(alvo); return; }
  const t = { v: 0 };
  transicaoAtual = gsap.to(t, { v: 1, duration: 0.8, ease: 'power2.inOut', onUpdate: () => definir({
    cam: mixV(de.cam, alvo.cam, t.v), alvo: mixV(de.alvo, alvo.alvo, t.v),
    giro: mix(de.giro, alvo.giro, t.v), lateral: mix(de.lateral, alvo.lateral, t.v), camadas: mixV(de.camadas, alvo.camadas, t.v),
  }) });
}

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

  // ao entrar na seção (descendo ou subindo), o palco assume a pose da aba escolhida (disparada)
  useLayoutEffect(() => {
    const st = ScrollTrigger.create({ trigger: secao.current, start: 'top 55%', end: 'bottom 45%',
      onEnter: () => transicao(estadoAba(abaAtual.current)),
      onEnterBack: () => transicao(estadoAba(abaAtual.current)) });
    return () => { st.kill(); transicaoAtual?.kill(); };
  }, []);

  function escolher(nova) {
    setAba(nova);
    abaAtual.current = nova;
    transicao(estadoAba(nova));
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
