import Pilula from '../marca/Pilula.jsx';
import { useCorDaFoto } from '../ganchos/useCorDaFoto.js';
import './Final.css';

export default function Final() {
  useCorDaFoto('/mango-book/hero-manga.png', '--papel-final');
  return (
    <section className="sec papel final" aria-labelledby="t-final">
      <h2 className="titulo" id="t-final" style={{ marginInline: 'auto' }}>O seu sabor está esperando.</h2>
      <div className="acoes"><Pilula href="#cores">Comprar</Pilula><span className="preco" style={{ color: 'var(--ink-2)' }}>A partir de R$ 7.999 ou 12x de R$ 666,58</span></div>
      <img className="funde" src="/mango-book/hero-manga.png" alt="MangoBook Pure equilibrado na palma de uma mão" />
    </section>
  );
}
