import { useLayoutEffect, useRef, useState } from 'react';
import Pilula from '../marca/Pilula.jsx';
import { MODELOS, SPECS, larguraBarra } from '../dados/comparador.js';
import { useAbas } from '../ganchos/useAbas.js';
import { useApareceu } from '../ganchos/useApareceu.js';
import { useCorDaFoto } from '../ganchos/useCorDaFoto.js';
import './Comparar.css';

const IDS = ['pure', 'prime'];

// O modelo escolhido vem pra frente, a bolha desliza até a aba e as barras crescem quando a seção aparece.
export default function Comparar() {
  useCorDaFoto('/mango-book/cor-manga.png', '--fundo-cmp'); // fundo do comparador = fundo das fotos, sem halo
  const { ativa, props, botoes } = useAbas(IDS.length);
  const m = IDS[ativa];
  const d = MODELOS[m];
  const barras = useRef(null);
  const cresceu = useApareceu(barras, { limiar: 0.3 });
  const bolha = useRef(null);

  useLayoutEffect(() => {
    const posicionar = () => {
      const b = botoes.current[ativa];
      if (!b || !bolha.current) return;
      bolha.current.style.width = b.offsetWidth + 'px';
      bolha.current.style.transform = `translateX(${b.offsetLeft - 5}px)`;
    };
    posicionar();
    document.fonts.ready.then(posicionar); // a largura da aba muda quando a Inter carrega
  }, [ativa, botoes]);

  return (
    <section className="sec centro" id="comparar" style={{ background: 'var(--fundo-cmp,#fff)' }} aria-labelledby="t-comparar">
      <h2 className="titulo" id="t-comparar">Qual MangoBook é o seu?</h2>
      <div className="cmp-seg vidro" role="tablist" aria-label="Modelo">
        <span className="bolha" aria-hidden="true" ref={bolha}></span>
        {IDS.map((id, i) => <button key={id} role="tab" aria-selected={i === ativa} data-m={id} {...props(i)}>{MODELOS[id].nome}</button>)}
      </div>
      <div className="cmp-palco" id="cmp-palco" data-m={m} aria-hidden="true" style={{ '--cmp-tom': d.tom }}>
        <img className={`pure ${m === 'pure' ? 'frente' : 'fundo'}`} src="/mango-book/cor-manga.png" alt="" />
        <img className={`prime ${m === 'prime' ? 'frente' : 'fundo'}`} src="/mango-book/cor-prata.png" alt="" />
      </div>
      <div className="cmp-info">
        <div className="cmp-nome" aria-live="polite">
          <h3 id="cmp-nome">{d.nome}</h3><p id="cmp-desc">{d.desc}</p>
          <div className="chips" id="cmp-chips">{d.cores.map((c) => <span key={c} className="chip" style={{ background: c }}></span>)}</div>
          <p className="preco" id="cmp-preco">{d.preco}<small>{d.parc}</small></p>
          <Pilula href="#cores">Comprar</Pilula>
        </div>
        <div className="cmp-barras" id="cmp-barras" ref={barras}>
          {SPECS.map((x) => (
            <div className="lin" key={x.rot}>
              <b>{x.rot}<span>{x.inverso ? 'menos é melhor' : ''}</span></b>
              <div className="par">
                {IDS.map((id) => (
                  <div key={id} className={`bar ${id === 'pure' ? 'p' : 'x'}${id !== m ? ' apagada' : ''}`}>
                    <i style={cresceu ? { width: larguraBarra(x[id], x.max) } : undefined}>{(id === 'pure' ? 'Pure · ' : 'Prime · ') + x.fmt(x[id])}</i>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
