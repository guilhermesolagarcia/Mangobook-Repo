import Pilula from '../marca/Pilula.jsx';
import { useCorDaFoto } from '../ganchos/useCorDaFoto.js';
import './Abertura.css';

export default function Abertura() {
  useCorDaFoto('/mango-book/image-4.png', '--papel');
  return (
    <section className="abertura" id="topo" aria-labelledby="t-abertura">
      <div className="foto produto"><img className="funde" src="/mango-book/image-4.png" alt="MangoBook Pure amarelo-manga aberto sobre a palma de uma mão" /></div>
      <div className="titulo entra">
        <span className="nome">MangoBook Pure</span>
        <h1 id="t-abertura">Doce por fora.<br /><em>Rápido por dentro.</em></h1>
      </div>
      <div className="compra vidro">
        <b>MangoBook Pure</b>
        <div className="chips" aria-hidden="true"><span className="chip on" style={{ background: 'var(--manga)' }}></span><span className="chip" style={{ background: 'var(--rosa)' }}></span><span className="chip" style={{ background: 'var(--folha)' }}></span><span className="chip" style={{ background: 'var(--prata)' }}></span></div>
        <span className="preco">A partir de R$ 7.999</span>
        <Pilula href="#cores">Comprar</Pilula>
      </div>
    </section>
  );
}
