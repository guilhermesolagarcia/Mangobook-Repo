import { useEffect, useState } from 'react';
import { IA_ABAS, IA_ORIGINAL, IA_VERSOES, textoDigitado } from '../dados/ia.js';
import { useAbas } from '../ganchos/useAbas.js';
import { useSemMovimento } from '../ganchos/useSemMovimento.js';
import './Ia.css';

// O texto é reescrito 2 letras a cada 22 ms; trocar de aba recomeça do zero.
export default function Ia() {
  const { ativa, props } = useAbas(IA_ABAS.length);
  const semMovimento = useSemMovimento();
  const [k, setK] = useState(0);
  const versao = IA_VERSOES[ativa];

  useEffect(() => {
    if (semMovimento) { setK(Infinity); return; }
    let n = 0;
    setK(0);
    const timer = setInterval(() => {
      n += 2;
      setK(n);
      if (n >= versao.length) clearInterval(timer);
    }, 22);
    return () => clearInterval(timer);
  }, [versao, semMovimento]);

  const { texto, digitando } = textoDigitado(versao, k);
  return (
    <section className="sec branco centro" id="ia" aria-labelledby="t-ia">
      <p className="olho"><span className="grad-ia">Mango Intelligence</span></p>
      <h2 className="titulo" id="t-ia">Pede que ele faz.</h2>
      <p className="lead">Reescreve, resume e revisa em qualquer app. E faz tudo isso <b>no próprio notebook</b>, sem mandar seus textos pra lugar nenhum.</p>
      <div className="ia-demo">
        <div className="dentro">
          <div className="ia-abas" role="tablist" aria-label="Ferramentas de escrita">
            {IA_ABAS.map((a, i) => <button key={a} role="tab" aria-selected={i === ativa} {...props(i)}>{a}</button>)}
          </div>
          <p className="ia-texto" id="ia-texto" aria-live="polite"><span className="antes">{IA_ORIGINAL}</span>{texto}{digitando && <span className="cursor"></span>}</p>
        </div>
      </div>
      <div className="ia-lista">
        <div><i className="ico-l ph-light ph-pencil-simple-line" aria-hidden="true"></i><b>Ferramentas de escrita</b><span>Revise o tom de um e-mail com um clique.</span></div>
        <div><i className="ico-l ph-light ph-smiley" aria-hidden="true"></i><b>Mangoji</b><span>Descreva e ganhe um emoji que não existia.</span></div>
        <div><i className="ico-l ph-light ph-magic-wand" aria-hidden="true"></i><b>Limpar foto</b><span>Some com quem passou atrás na hora do clique.</span></div>
      </div>
    </section>
  );
}
