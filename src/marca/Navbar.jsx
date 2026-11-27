import { useRef } from 'react';
import Ir from './Ir.jsx';
import Logo from './Logo.jsx';
import Pilula from './Pilula.jsx';
import { useRolagem } from './useRolagem.js';
import './Navbar.css';

// Ilha de vidro: encolhe para nome + Comprar depois de 80 px e escurece sobre seções escuras.
// Quem usa precisa montar <Icones/> (busca e sacola), ter /mango.svg em public/ e carregar a Inter.
// Os padrões das props são os da página do MangoBook Pure. links: [rótulo, endereço, fica no celular?]
export default function Navbar({
  produto = 'MangoBook Pure',
  inicio = '#topo',
  comprar = '#cores',
  secoesEscuras = '.sec.preto',
  links = [['MangoBook', inicio, true]],
}) {
  const nav = useRef(null);
  const escuras = useRef(null);
  useRolagem(() => {
    const el = nav.current;
    if (!el) return;
    el.classList.toggle('compacta', scrollY > 80);
    const y = 40;
    escuras.current ??= [...document.querySelectorAll(secoesEscuras)];
    el.classList.toggle('sobre-escuro', escuras.current.some((p) => { const r = p.getBoundingClientRect(); return r.top < y && r.bottom > y; }));
  });

  return (
    <nav className="nav vidro" id="nav" aria-label="Mango" ref={nav}>
      <Logo as={Ir} href={inicio} aria-label="Mango, início" style={{ marginRight: 8 }} />
      <span className="nav-nome" aria-hidden="true">{produto}</span>
      <div className="cheia">
        {links.map(([rotulo, href, fixo]) => <Ir key={href + rotulo} className={fixo ? undefined : 'opc'} href={href}>{rotulo}</Ir>)}
        <span className="esp"></span>
        <a href="#" aria-label="Buscar"><svg className="ico"><use href="#busca" /></svg></a>
        <a href="#" aria-label="Sacola"><svg className="ico"><use href="#sacola" /></svg></a>
      </div>
      <Pilula href={comprar}>Comprar</Pilula>
    </nav>
  );
}
