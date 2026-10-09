import { USOS } from '../dados/usos.js';
import { useAbas } from '../ganchos/useAbas.js';
import './Desempenho.css';

export default function Desempenho() {
  const { ativa, props } = useAbas(USOS.length);
  const uso = USOS[ativa];
  return (
    <section className="sec preto" id="desempenho" aria-labelledby="t-desempenho">
      <p className="olho manga">Desempenho</p>
      <h2 className="titulo" id="t-desempenho">Feito pra fazer e acontecer.</h2>
      <p className="lead">O chip <b>Palmer</b> abre tudo na hora e aguenta o dia sem esquentar. Sem ventoinha, sem barulho, <b>só a fruta trabalhando</b>.</p>
      <div className="palco-foto">
        <img src="/mango-book/image-1.png" alt="MangoBook Pure amarelo numa mesa, ao lado de uma caneca" />
        <div className="flut vidro-escuro f1"><b>2x</b><span>mais rápido no dia a dia</span></div>
        <div className="flut vidro-escuro f2"><b>0 dB</b><span>sem ventoinha, silêncio total</span></div>
        <div className="flut vidro-escuro f3"><b>16 GB</b><span>de memória unificada</span></div>
      </div>
      <div className="numeros">
        <div><b className="grad-manga">2x</b><span>mais rápido que o notebook com processador de entrada mais vendido.</span></div>
        <div><b className="grad-manga">3x</b><span>mais desempenho gráfico para editar foto e vídeo.</span></div>
        <div><b className="grad-manga">18 h</b><span>de bateria, porque eficiência também é velocidade.</span></div>
      </div>

      <div className="usos">
        <div className="usos-abas vidro-escuro" role="tablist" aria-label="Para que serve">
          {USOS.map((u, i) => <button key={u.aba} role="tab" aria-selected={i === ativa} {...props(i)}>{u.aba}</button>)}
        </div>
        <div className="usos-painel" role="tabpanel" aria-live="polite">
          <div className="usos-arte" id="usos-arte" style={{ background: uso.bg }}><i className={`ph-fill ph-${uso.icone}`} aria-hidden="true"></i></div>
          <div className="usos-texto">
            <h3 id="usos-titulo">{uso.t}</h3><p id="usos-texto">{uso.p}</p>
            <div className="apps" id="usos-apps">{uso.apps.map((a) => <span key={a}>{a}</span>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
