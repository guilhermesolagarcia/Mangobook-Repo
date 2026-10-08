// Valores de refs/prompt-teclado-3d.md e do ROTEIRO.md (ficção do produto).
const SPECS = [
  ['Layout', '75%, 82 teclas + knob'],
  ['Case', 'Alumínio usinado, 2 peças'],
  ['Montagem', 'Gasket mount, Poron'],
  ['Plate', 'Alumínio, 1,5 mm'],
  ['Switches', 'Hot-swap, sem solda'],
  ['Keycaps', 'PBT, perfil Cherry'],
  ['Dimensões', '325 × 135 mm'],
  ['Altura', '20 mm na frente, 33 mm atrás'],
  ['Inclinação', '6°'],
  ['Peso', '1,8 kg'],
  ['Polling', '8000 Hz'],
  ['Conexão', 'USB-C'],
];

export default function Specs() {
  return (
    <section id="especificacoes" className="faixa specs" aria-labelledby="specs-titulo">
      <h2 id="specs-titulo" className="t-headline">Especificações.</h2>
      <dl>
        {SPECS.map(([rotulo, valor]) => (
          <div key={rotulo}><dt>{rotulo}</dt><dd>{valor}</dd></div>
        ))}
      </dl>
    </section>
  );
}
