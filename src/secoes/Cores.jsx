import { CORES } from '../dados/cores.js';
import { useAbas } from '../ganchos/useAbas.js';
import './Cores.css';

// Banho de cor: a seção tinge no tom do sabor e a foto troca com fade (radiogroup com setas).
export default function Cores() {
  const { ativa, props } = useAbas(CORES.length, { eixo: 'hv' });
  const cor = CORES[ativa];
  return (
    <section className="cores" id="cores" aria-labelledby="t-cores" style={{ backgroundColor: cor.tom }}>
      <h2 id="t-cores">Escolha o seu sabor.</h2>
      <p className="sub">Alumínio anodizado na cor, das bordas às teclas.</p>
      <div className="vitrine" id="vitrine">
        {CORES.map((c) => (
          <img key={c.id} className={`funde${c.id === cor.id ? ' on' : ''}`} src={c.foto} alt={`MangoBook Pure na cor ${c.nome}`} />
        ))}
      </div>
      <div className="seletor vidro" role="radiogroup" aria-label="Cor">
        <div className="chips">
          {CORES.map((c, i) => (
            <button key={c.id} className="chip" role="radio" aria-checked={i === ativa} aria-label={c.nome} style={{ background: `var(--${c.id})` }} {...props(i)} />
          ))}
        </div>
        <span className="rot" id="rot-cor" aria-live="polite">{cor.nome}</span>
      </div>
    </section>
  );
}
