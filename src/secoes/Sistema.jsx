import { useState } from 'react';
import { CENAS_OS, ITENS_OS } from '../dados/sistema.js';
import './Sistema.css';

const pos = ([left, top, width, height]) => ({ left: left + '%', top: top + '%', width: width + '%', height: height + '%' });
const DOCA = ['linear-gradient(135deg,#ffd23f,#ff9f1c)', 'linear-gradient(135deg,#ff5e7e,#a46bff)', 'linear-gradient(135deg,#3ddc97,#22b5e8)', 'linear-gradient(135deg,#3aa0ff,#7b5cff)', '#f5f5f7'];

// Sanfona com uma aberta por vez; a tela ao lado muda de arrumação.
export default function Sistema() {
  const [aberta, setAberta] = useState(0);
  const cena = CENAS_OS[aberta];
  return (
    <section className="sec tile" id="sistema" aria-labelledby="t-sistema">
      <p className="olho manga">MangoOS</p>
      <h2 className="titulo" id="t-sistema">Simples desde o primeiro clique.</h2>
      <div className="sistema">
        <div className="sanfona" id="sanfona">
          {ITENS_OS.map((it, i) => (
            <div className="item" key={it.titulo}>
              <button aria-expanded={i === aberta} onClick={() => setAberta(i)}>{it.titulo}</button>
              <div className="resp"><p>{it.texto}</p></div>
            </div>
          ))}
        </div>
        <div className="tela-os" aria-hidden="true">
          <div className="area" id="os-area" style={{ background: cena.bg }}>
            <div className="janela-os" id="os-j1" style={pos(cena.a)}></div><div className="janela-os" id="os-j2" style={pos(cena.b)}></div>
            <div className="doca">{DOCA.map((bg) => <i key={bg} style={{ background: bg }}></i>)}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
