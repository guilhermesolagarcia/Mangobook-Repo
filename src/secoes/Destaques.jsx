import { useEffect, useRef, useState } from 'react';
import Logo from '../marca/Logo.jsx';
import { useSemMovimento } from '../ganchos/useSemMovimento.js';
import './Destaques.css';

const TOTAL = 7;

// Carrossel: os pontos acompanham a rolagem; avança sozinho a cada 8 s (o ponto ativo enche no mesmo tempo), com pausa.
export default function Destaques() {
  const semMovimento = useSemMovimento();
  const trilho = useRef(null);
  const [atual, setAtual] = useState(0);
  const [tocando, setTocando] = useState(!semMovimento);
  const atualRef = useRef(0);
  atualRef.current = atual;

  const ir = (i) => {
    const cards = trilho.current.children;
    trilho.current.scrollTo({ left: cards[i].offsetLeft - cards[0].offsetLeft, behavior: semMovimento ? 'auto' : 'smooth' });
  };

  // .viu nos cards que aparecem (a pilha enche) e o ponto do card que ocupa o trilho
  useEffect(() => {
    const cards = [...trilho.current.children];
    const viu = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) e.target.classList.add('viu'); }), { threshold: 0.5 });
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.intersectionRatio > 0.6) setAtual(cards.indexOf(e.target)); }), { root: trilho.current, threshold: [0.6] });
    cards.forEach((c) => { viu.observe(c); io.observe(c); });
    return () => { viu.disconnect(); io.disconnect(); };
  }, []);

  // o reinício do timer acompanha cada clique num ponto, como no protótipo
  const [volta, setVolta] = useState(0);
  useEffect(() => {
    if (!tocando) return;
    const timer = setInterval(() => ir((atualRef.current + 1) % TOTAL), 8000);
    return () => clearInterval(timer);
  }, [tocando, volta]);

  const parar = () => setTocando(false);

  return (
    <section className="destaques" aria-labelledby="t-destaques">
      <h2 id="t-destaques">Comece pelos destaques.</h2>
      <div className="trilho" id="trilho" tabIndex={0} aria-label="Destaques" ref={trilho} onPointerDown={parar}>
        <article className="card cores-c"><span className="sobre">Cores e design</span><h3>Quatro cores.<br />Nenhuma sem graça.</h3>
          <img src="/mango-book/cor-manga.png" alt="" />
          <div className="amostras" aria-hidden="true"><i style={{ background: 'var(--manga)' }}></i><i style={{ background: 'var(--rosa)' }}></i><i style={{ background: 'var(--folha)' }}></i><i style={{ background: 'var(--prata)' }}></i></div></article>
        <article className="card escuro"><span className="sobre">Bateria</span><h3>Dura o dia.<br />E a noite também.</h3>
          <div className="peca"><div className="pilha" aria-hidden="true"><span></span></div><p className="grande grad-manga">18<small> h</small></p><p className="nota">de bateria com uma carga só.</p></div></article>
        <article className="card escuro chip-c"><span className="sobre">Desempenho</span><h3>Chip Palmer.<br />Rápido até o caroço.</h3>
          <div className="peca"><div className="chip-art" aria-hidden="true"><div className="miolo"><Logo as="span" /><span className="nome-chip">PALMER</span></div></div><p className="nota">Até 2x mais rápido que o notebook que você tem hoje.</p></div></article>
        <article className="card tela-c"><span className="sobre">Tela</span><h3>Cores que dão<br />água na boca.</h3>
          <div className="peca"><p className="grande">13,6<small>"</small></p><p className="nota">Tela Pure Retina, 500 nits.</p></div></article>
        <article className="card claro"><span className="sobre">Mango Intelligence</span><h3>Inteligente.<br />E <span className="grad-ia">bem docinha</span>.</h3>
          <div className="peca"><div className="ia-art" aria-hidden="true"><svg viewBox="0 0 96 96"><defs><linearGradient id="g-ia" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#ff9f1c" /><stop offset=".45" stopColor="#ff5e7e" /><stop offset="1" stopColor="#7b5cff" /></linearGradient></defs><path d="M48 8c3 18 10 27 28 30-18 3-25 12-28 30-3-18-10-27-28-30 18-3 25-12 28-30z" fill="url(#g-ia)" /><path d="M76 58c1.5 8 4.5 11.5 12 13-7.5 1.5-10.5 5-12 13-1.5-8-4.5-11.5-12-13 7.5-1.5 10.5-5 12-13z" fill="url(#g-ia)" opacity=".8" /></svg></div><p className="nota">Escreve, resume e organiza, sem tirar nada do seu notebook.</p></div></article>
        <article className="card juntos-c glifo"><span className="sobre">Mango + Mangophone</span><h3>Juntos, ficam<br />ainda mais doces.</h3>
          <div className="peca"><svg className="juntos-art" viewBox="0 0 260 190" aria-hidden="true">
            {/* notebook */}
            <rect x="10" y="40" width="160" height="104" rx="12" fill="#fff" />
            <rect x="20" y="50" width="140" height="84" rx="5" fill="#8fdcb6" opacity=".45" />
            <path d="M0 150h180l-10 12H10z" fill="#fff" />
            {/* celular */}
            <rect x="196" y="74" width="56" height="104" rx="14" fill="#fff" />
            <rect x="203" y="84" width="42" height="84" rx="8" fill="#8fdcb6" opacity=".45" />
            {/* "copiado" saindo do celular */}
            <g className="bolha"><rect x="192" y="110" width="64" height="26" rx="13" fill="#1d1d1f" /><text x="224" y="127.5" fontSize="11" fontWeight="600" fill="#fff" textAnchor="middle" fontFamily="Inter, system-ui">copiado</text></g>
          </svg><p className="nota">Copie no Mangophone, cole no MangoBook.</p></div></article>
        <article className="card priv-c glifo"><span className="sobre">Privacidade</span><h3>O que é seu<br />fica com você.</h3>
          <div className="peca"><svg className="priv-art" viewBox="0 -34 100 150" aria-hidden="true">
            {/* alça do cadeado no lugar da folha; a manga é o corpo, com o caroço vazado */}
            <path d="M36 40V12a16 16 0 0132 0v28" fill="none" stroke="#fff" strokeWidth="11" strokeLinecap="butt" />
            <path fill="#fff" fillRule="evenodd" d="M47 27 C67 21 88 35 89 59 C90 86 74 108 50 112 C33 115 16 105 13 87 C11 73 19 66 23 56 C28 43 32 31 47 27 Z M53 56 C61 56 66 65 65 76 C64 87 58 93 52 92 C46 91 43 84 44 75 C45 65 48 56 53 56 Z" />
          </svg><p className="nota">Tudo que dá, roda no próprio notebook.</p></div></article>
      </div>
      <div className="controle">
        <div className={`pontos vidro${tocando ? ' tocando' : ''}`} id="pontos">
          {Array.from({ length: TOTAL }, (_, i) => (
            <button key={i} className={`ponto${i === atual ? ' on' : ''}`} aria-label={`Destaque ${i + 1}`} onClick={() => { ir(i); setVolta((v) => v + 1); }} />
          ))}
          <button className="pausa" id="pausar" aria-label={tocando ? 'Pausar' : 'Tocar'} onClick={() => setTocando((t) => !t)}>
            <svg className="ico"><use href={tocando ? '#pausa' : '#play'} /></svg>
          </button>
        </div>
      </div>
    </section>
  );
}
