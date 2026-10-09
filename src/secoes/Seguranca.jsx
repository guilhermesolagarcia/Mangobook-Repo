const ITENS = [
  ['fingerprint', 'Toque Mango', 'Sua digital destrava tudo, inclusive compras.'],
  ['shield-check', 'Antivírus embutido', 'Proteção que vem de fábrica e se atualiza sozinha.'],
  ['map-pin', 'Buscar', 'Perdeu? Veja no mapa e toque um som pra achar.'],
  ['key', 'Senhas', 'Todas guardadas, preenchidas e protegidas.'],
  ['eye-slash', 'Navegar sem rastro', 'Os sites não seguem você de aba em aba.'],
  ['cloud-arrow-down', 'Atualizações grátis', 'Novidades por anos, sem pagar nada a mais.'],
];

export default function Seguranca() {
  return (
    <section className="sec preto" id="seguranca" aria-labelledby="t-seguranca">
      <p className="olho manga">Privacidade e segurança</p>
      <h2 className="titulo" id="t-seguranca">Seguro da casca ao caroço.</h2>
      <div className="grade-6">
        {ITENS.map(([ico, t, s]) => <div className="it" key={t}><i className={`ico-l ph-light ph-${ico}`} aria-hidden="true"></i><b>{t}</b><span>{s}</span></div>)}
      </div>
    </section>
  );
}
