import { useCorDaFoto } from '../ganchos/useCorDaFoto.js';
import './Amor.css';

export default function Amor() {
  useCorDaFoto('/mango-book/fatias.png', '--fundo-amor');
  return (
    <section className="amor" aria-labelledby="t-amor">
      <h2 id="t-amor">Amor à primeira fruta.</h2>
      <p>Fino, leve e colorido do jeito que um notebook deveria ser desde sempre.</p>
      <img className="funde" src="/mango-book/fatias.png" alt="Quatro MangoBook Pure abertos, vistos de cima, um em cada cor, arrumados como fatias de manga" />
    </section>
  );
}
