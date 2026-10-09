import { useState } from 'react';
import './Motivos.css';

const MOTIVOS = [
  ['credit-card', 'Até 12x ', 'sem juros.', 'Ou 10% de desconto à vista no Pix. Parcele no cartão de qualquer banco, sem consulta extra.'],
  ['truck', 'Frete grátis ', 'pra todo o Brasil.', 'Entrega em até 2 dias nas capitais. Ou compre online e retire na loja em 1 hora.'],
  ['swap', 'Troque o seu ', 'notebook antigo.', 'Avaliamos na hora e o valor vira desconto no MangoBook novo. O antigo é reciclado.'],
  ['student', 'Preço de ', 'estudante.', 'Desconto pra quem estuda e pra quem dá aula, com fone de presente na volta às aulas.'],
  ['chats-circle', 'Fale com ', 'um especialista.', 'Tire dúvidas por chat ou vídeo, monte a configuração ideal e compre sem sair de casa.'],
];

// O "+" abre o detalhe do card; vários podem ficar abertos.
export default function Motivos() {
  const [abertos, setAbertos] = useState(() => new Set());
  const alternar = (i) => setAbertos((s) => {
    const n = new Set(s);
    if (n.has(i)) n.delete(i); else n.add(i);
    return n;
  });

  return (
    <section className="sec tile" id="motivos" aria-labelledby="t-motivos">
      <h2 className="titulo" id="t-motivos">Motivos pra comprar na Mango.</h2>
      <div className="motivos">
        {MOTIVOS.map(([ico, b, em, extra], i) => {
          const aberto = abertos.has(i);
          return (
            <div className={`mt${aberto ? ' aberto' : ''}`} key={ico}>
              <i className={`glifo ph-light ph-${ico}`} aria-hidden="true"></i><b>{b}<em>{em}</em></b>
              <div className="extra"><span>{extra}</span></div>
              <button className="abre" aria-expanded={aberto} aria-label={aberto ? 'Fechar' : 'Saber mais'} onClick={() => alternar(i)}></button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
