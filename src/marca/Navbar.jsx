import { useRef } from 'react';
import Logo from './Logo.jsx';
import Pilula from './Pilula.jsx';
import { useRolagem } from '../ganchos/useRolagem.js';
import './Navbar.css';

// Ilha de vidro: encolhe para nome + Comprar depois de 80 px e escurece sobre seções pretas.
export default function Navbar({ produto = 'MangoBook Pure' }) {
  const nav = useRef(null);
  useRolagem(() => {
    const el = nav.current;
    if (!el) return;
    el.classList.toggle('compacta', scrollY > 80);
    const y = 40;
    const pretas = document.querySelectorAll('.sec.preto');
    el.classList.toggle('sobre-escuro', [...pretas].some((p) => { const r = p.getBoundingClientRect(); return r.top < y && r.bottom > y; }));
  });

  return (
    <nav className="nav vidro" id="nav" aria-label="Mango" ref={nav}>
      <Logo href="#topo" aria-label="Mango, início" style={{ marginRight: 8 }} />
      <span className="nav-nome" aria-hidden="true">{produto}</span>
      <div className="cheia">
        <a className="opc" href="#">Loja</a><a href="#topo">MangoBook</a><a className="opc" href="#">Mangopad</a><a className="opc" href="#">Mangophone</a><a className="opc" href="#">Suporte</a>
        <span className="esp"></span>
        <a href="#" aria-label="Buscar"><svg className="ico"><use href="#busca" /></svg></a>
        <a href="#" aria-label="Sacola"><svg className="ico"><use href="#sacola" /></svg></a>
      </div>
      <Pilula href="#cores">Comprar</Pilula>
    </nav>
  );
}
