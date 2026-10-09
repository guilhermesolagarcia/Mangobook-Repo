import './Amor.css';

export default function Amor() {
  return (
    <section className="amor" aria-labelledby="t-amor">
      <h2 id="t-amor">Amor à primeira fruta.</h2>
      <p>Fino, leve e colorido do jeito que um notebook deveria ser desde sempre.</p>
      <span className="provisorio">imagem provisória: trocar por um conceito nosso</span>
      <img className="funde" src="/mango-book/quatro-cores.png" alt="Quatro MangoBook Pure, um em cada cor" />
    </section>
  );
}
