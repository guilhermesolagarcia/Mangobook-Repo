import { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { estadoPorDentro, FASES, N_CAMADAS } from '../../3d/roteiro.js';
import { definir } from '../../3d/estado.js';
import { CAMADAS } from './camadas.js';
import Abas from './Abas.jsx';
import Specs from './Specs.jsx';
import './porDentro.css';

gsap.registerPlugin(ScrollTrigger);

export default function PorDentro() {
  const secao = useRef(null);
  const gatilho = useRef(null);
  const [ativa, setAtiva] = useState(0);
  const [reduzir] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // fundo do palco: claro → preto ao entrar (scrub)
      gsap.to(document.querySelector('.palco'), { backgroundColor: '#000', ease: 'none',
        scrollTrigger: { trigger: secao.current, start: 'top 80%', end: 'top top', scrub: true } });
      // e volta ao branco nas specs, para a reserva (elemento direto: a seção fica fora do contexto)
      gsap.to(document.querySelector('.palco'), { backgroundColor: '#fff', ease: 'none', immediateRender: false,
        scrollTrigger: { trigger: document.querySelector('#especificacoes'), start: 'top bottom', end: 'top 40%', scrub: true } });

      if (reduzir) {
        // sem scrub: camadas separadas e paradas enquanto a seção está na tela
        ScrollTrigger.create({ trigger: secao.current, start: 'top 60%', end: 'bottom top',
          onToggle: (self) => self.isActive && definir({ ...estadoPorDentro(FASES.camadas), ativa: -1 }) });
        return;
      }
      const proxy = { p: 0 };
      const tween = gsap.to(proxy, {
        p: 1, ease: 'none',
        scrollTrigger: { trigger: secao.current, start: 'top top', end: 'bottom bottom', scrub: 0.6 },
        onUpdate: () => {
          const e = estadoPorDentro(proxy.p);
          definir(e);
          if (e.ativa >= 0) setAtiva(e.ativa);
        },
      });
      gatilho.current = tween.scrollTrigger;
    }, secao);
    return () => ctx.revert();
  }, [reduzir]);

  // pular para a camada i: rola até o meio da fatia dela
  function irPara(i) {
    const st = gatilho.current;
    if (!st) return;
    const p = (FASES.camadas * (i + 0.5)) / N_CAMADAS;
    window.scrollTo({ top: st.start + (st.end - st.start) * p, behavior: 'smooth' });
  }

  function teclas(e, i) {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); e.currentTarget.nextElementSibling?.focus(); irPara(Math.min(N_CAMADAS - 1, i + 1)); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); e.currentTarget.previousElementSibling?.focus(); irPara(Math.max(0, i - 1)); }
  }

  if (reduzir) {
    return (
      <>
      <section ref={secao} id="por-dentro" className="faixa faixa-escura pd pd-reduzido" aria-labelledby="pd-titulo">
        <h2 id="pd-titulo" className="t-headline">Por dentro.</h2>
        <ol className="pd-lista">
          {CAMADAS.map((c) => (
            <li key={c.id}><h3 className="t-tagline">{c.nome}</h3><p>{c.funcao}</p><span className="pd-dado">{c.dado}</span></li>
          ))}
        </ol>
      </section>
      <Abas />
      <Specs />
      </>
    );
  }

  const c = CAMADAS[ativa];
  return (
    <>
    <section ref={secao} id="por-dentro" className="pd faixa-escura" aria-labelledby="pd-titulo">
      <div className="pd-fixo">
        <h2 id="pd-titulo" className="t-headline pd-titulo">Por dentro.</h2>

        <div className="pd-texto" aria-live="polite">
          <h3 className="t-tile">{c.nome}</h3>
          <p>{c.funcao}</p>
          <span className="pd-dado">{c.dado}</span>
        </div>
        <span className="pd-linha" aria-hidden="true" />

        <nav className="pd-trilho" aria-label="Camadas">
          {CAMADAS.map((camada, i) => (
            <button key={camada.id} type="button" onClick={() => irPara(i)} onKeyDown={(e) => teclas(e, i)}
              className={i < ativa ? 'feita' : i === ativa ? 'atual' : ''} aria-current={i === ativa ? 'step' : undefined}>
              {camada.nome.replace('.', '')}
            </button>
          ))}
        </nav>

        <div className="pd-cotas" aria-hidden="true">
          <span className="cota cota-frente"><b>20 mm</b></span>
          <span className="cota cota-tras"><b>33 mm</b></span>
          <span className="cota cota-prof"><b>135 mm</b></span>
          <span className="cota-angulo">6°</span>
        </div>
        <p className="pd-legenda t-legenda">Vista de lado. A inclinação vem do próprio case: você não precisa de pés retráteis.</p>
      </div>
    </section>
    <Abas />
      <Specs />
    </>
  );
}
