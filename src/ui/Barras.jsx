import './barras.css';

const GLOBAL = ['Teclados', 'Switches', 'Keycaps', 'Acessórios', 'Suporte'];

export default function Barras() {
  return (
    <>
      <nav className="barra-global" aria-label="Mango">
        <ul>
          <li><a className="marca" href="#visao-geral" aria-label="Mango, início" /></li>
          {GLOBAL.map((item) => <li key={item} className="opcional"><a href="#visao-geral">{item}</a></li>)}
          <li><a href="#reservar">Reservas</a></li>
        </ul>
      </nav>
      <nav className="barra-produto" aria-label="FORGE 75">
        <div>
          <strong>FORGE 75</strong>
          <a href="#visao-geral">Visão geral</a>
          <a href="#por-dentro">Por dentro</a>
          <a href="#especificacoes">Especificações</a>
          <a className="pill" href="#reservar">Reservar</a>
        </div>
      </nav>
    </>
  );
}
