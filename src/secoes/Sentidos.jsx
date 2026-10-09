import { ondas } from '../dados/ondas.js';
import './Sentidos.css';

const ONDAS = ondas();

export default function Sentidos() {
  return (
    <section className="sec tile" id="sentidos" aria-labelledby="t-sentidos">
      <p className="olho manga">Tela, câmera e som</p>
      <h2 className="titulo" id="t-sentidos">Uma festa pros sentidos.</h2>
      <div className="bento">
        <div className="bloco b-tela"><span className="rot">Tela Pure Retina</span><h3>Cores que dão água na boca.</h3><p>500 nits, 1 bilhão de cores e um brilho que encara a janela do café.</p><p className="grande">13,6<small>"</small></p></div>
        <div className="bloco b-cam"><span className="rot">Câmera</span><h3>1080p.<br />Você bem na foto.</h3><div className="lente" aria-hidden="true"></div><p>Enquadramento central acompanha você na chamada.</p></div>
        <div className="bloco b-som"><span className="rot">Som</span><h3>Quatro alto-falantes com Áudio Espacial.</h3><div className="eq" aria-hidden="true">{Array.from({ length: 18 }, (_, i) => <i key={i}></i>)}</div></div>
        <div className="bloco b-mic"><span className="rot">Microfones</span><h3>Sua voz chega limpa. O liquidificador, não.</h3>
          <div className="ondas" aria-hidden="true" id="ondas">{ONDAS.map((o, i) => <i key={i} className={o.on ? 'on' : ''} style={{ height: o.altura + '%' }}></i>)}</div></div>
      </div>
    </section>
  );
}
