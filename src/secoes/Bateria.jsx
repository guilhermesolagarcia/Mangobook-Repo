import { useEffect, useRef, useState } from 'react';
import { useApareceu } from '../ganchos/useApareceu.js';
import { useSemMovimento } from '../ganchos/useSemMovimento.js';
import './Bateria.css';

const MARCOS = [['7h', 'Café e e-mails', '100%'], ['10h', 'Aula e anotações', '82%'], ['14h', 'Trabalho e chamadas', '58%'], ['20h', 'Uma série no sofá', '31%'], ['1h', 'Ainda tem bateria', '12%']];

// Conta até 18 e enche o dia quando aparece (uma vez).
export default function Bateria() {
  const dia = useRef(null);
  const viu = useApareceu(dia, { limiar: 0.4 });
  const semMovimento = useSemMovimento();
  const [horas, setHoras] = useState(18);

  useEffect(() => {
    if (!viu || semMovimento) return;
    const ini = performance.now(), dur = 2600;
    let quadro;
    const passo = (t) => {
      const k = Math.min(1, (t - ini) / dur);
      setHoras(Math.round(18 * (1 - Math.pow(1 - k, 3))));
      if (k < 1) quadro = requestAnimationFrame(passo);
    };
    setHoras(0);
    quadro = requestAnimationFrame(passo);
    return () => cancelAnimationFrame(quadro);
  }, [viu, semMovimento]);

  return (
    <section className="sec branco centro" id="bateria" aria-labelledby="t-bateria">
      <p className="olho manga">Bateria</p>
      <h2 className="titulo" id="t-bateria">Carregue de manhã. Esqueça até amanhã.</h2>
      <p className="bat-num grad-manga"><span id="contador">{horas}</span><small> horas</small></p>
      <div className={`dia${viu ? ' viu' : ''}`} id="dia" ref={dia}>
        <div className="barra"><i></i></div>
        <div className="marcos">
          {MARCOS.map(([h, o, p]) => <div key={h}><b>{h}</b><span>{o}</span><br /><em>{p}</em></div>)}
        </div>
      </div>
    </section>
  );
}
