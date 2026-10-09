import './reserva.css';

export default function Reserva() {
  return (
    <section id="reservar" className="faixa faixa-tile reserva" aria-labelledby="reserva-titulo">
      <h2 id="reserva-titulo" className="t-headline">O seu está esperando.</h2>
      <p className="t-lead">Reserve agora e receba entre os primeiros.</p>
      <a className="pill" href="#reservar">Reservar</a>
    </section>
  );
}
