import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { estadoAbertura } from '../3d/roteiro.js';
import { definir, estado, assumir, escrever } from '../3d/estado.js';
import './abertura.css';

gsap.registerPlugin(ScrollTrigger);

export default function Abertura() {
  const secao = useRef(null);

  useLayoutEffect(() => {
    const reduzir = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const proxy = { p: 0 };
    // sem movimento: a pose de frente, a única em que o título e o teclado não se sobrepõem
    const pose = () => estadoAbertura(reduzir ? 0 : proxy.p);
    const ctx = gsap.context(() => {
      // dona do palco enquanto ocupa o meio da tela (também ao voltar por âncora ou rolando para cima)
      assumir('abertura');
      escrever('abertura', pose());
      ScrollTrigger.create({ trigger: secao.current, start: 'top center', end: 'bottom center',
        onToggle: (self) => { if (self.isActive) { assumir('abertura'); escrever('abertura', pose()); } } });

      if (reduzir) {
        // a luz some ao sair da abertura (disparada, só opacidade), senão ela cobre o fundo escuro da cena 3
        gsap.to(document.querySelector('.palco-luz'), { autoAlpha: 0, duration: 0.3,
          scrollTrigger: { trigger: secao.current, start: 'bottom bottom', toggleActions: 'play none none reverse' } });
        return;
      }

      // entrada: o teclado sobe e assenta (disparada, uma vez)
      gsap.from(estado, { subida: -8, duration: 1.4, ease: 'power3.out', delay: 0.15, onUpdate: () => definir({}) });
      gsap.from('.abertura-fixo > *', { y: 14, autoAlpha: 0, duration: 0.9, ease: 'power3.out', stagger: 0.06 });

      // balanço lento enquanto a abertura está na tela (ciclo de 14 s, longe dos 0,2 Hz que incomodam)
      const balanco = gsap.to(estado, { balanco: 0.12, duration: 7, ease: 'sine.inOut', yoyo: true, repeat: -1, onUpdate: () => definir({}) });

      // scroll: gira até a vista de cima (scrub)
      gsap.to(proxy, {
        p: 1, ease: 'none',
        scrollTrigger: {
          trigger: secao.current, start: 'top top', end: 'bottom bottom', scrub: 0.6,
          // ao sair por baixo, o balanço volta a zero (a cena seguinte espera o teclado sem giro extra);
          // ao voltar, recomeça do zero. Acima do início da seção (barras no fluxo) ele segue balançando.
          onLeave: () => {
            balanco.pause();
            ctx.add(() => gsap.to(estado, { balanco: 0, duration: 0.6, ease: 'power2.out', overwrite: 'auto', onUpdate: () => definir({}) }));
          },
          onEnterBack: () => balanco.restart(),
        },
        onUpdate: () => escrever('abertura', pose()),
      });
      gsap.to('.abertura-fixo', { y: -120, autoAlpha: 0, ease: 'none',
        scrollTrigger: { trigger: secao.current, start: 'top top', end: '40% top', scrub: true } });
      // a luz fica fora da seção: passe o elemento (o contexto restringe seletores de texto à seção)
      gsap.to(document.querySelector('.palco-luz'), { autoAlpha: 0, ease: 'none',
        scrollTrigger: { trigger: secao.current, start: '30% top', end: 'bottom bottom', scrub: true } });
    }, secao);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={secao} id="visao-geral" className="abertura" aria-labelledby="abertura-titulo">
      <div className="abertura-fixo">
        <h1 id="abertura-titulo" className="t-hero">Pesado do jeito certo.</h1>
        <p className="t-lead">Mango FORGE 75. Alumínio inteiro, gasket mount, 8000 Hz.</p>
        <div className="abertura-acoes">
          <a className="pill" href="#reservar">Reservar</a>
          <a className="pill pill-ghost" href="#por-dentro">Saiba mais</a>
        </div>
      </div>
    </section>
  );
}
