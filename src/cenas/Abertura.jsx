import './abertura.css';

export default function Abertura() {
  return (
    <section id="visao-geral" className="abertura" aria-labelledby="abertura-titulo">
      <div className="abertura-fixo">
        <h1 id="abertura-titulo" className="t-hero">Pesado do jeito certo.</h1>
        <p className="t-lead">Mango FORGE 75. Alumínio inteiro, gasket mount, 8000 Hz.</p>
        <div className="abertura-acoes">
          <a className="pill" href="#reservar">Reservar</a>
          <a className="pill pill-ghost" href="#por-dentro">Saiba mais</a>
        </div>
      </div>
    </section>
  );
}
