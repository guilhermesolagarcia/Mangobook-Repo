import './Rodape.css';

const COLUNAS = [
  ['Comprar e saber mais', ['Loja', 'MangoBook', 'Mangopad', 'Mangophone', 'Acessórios']],
  ['Conta', ['Minha Mango ID', 'Pedidos', 'Mango na nuvem']],
  ['Loja Mango', ['Encontre uma loja', 'Parcelamento', 'Troca de aparelho', 'Status do pedido']],
  ['Para educação', ['Preço de estudante', 'Mango para escolas']],
  ['Valores', ['Acessibilidade', 'Meio ambiente', 'Privacidade']],
];

// Todo rodapé da Mango deixa claro que é paródia (ver MARCA.md).
export default function Rodape() {
  return (
    <footer className="rodape">
      <div className="notas">
        <p>Mango, MangoBook Pure, Mangophone, chip Palmer e MangoOS são uma paródia fictícia, criada como projeto de portfólio, sem nenhuma relação com a Apple.</p>
        <p>Preços, números de desempenho, bateria e meio ambiente são ilustrativos e não descrevem nenhum produto real.</p>
      </div>
      <div className="colunas">
        {COLUNAS.map(([titulo, links]) => (
          <div key={titulo}><b>{titulo}</b>{links.map((l) => <a key={l} href="#">{l}</a>)}</div>
        ))}
      </div>
      <div className="base"><span>Copyright © 2026 Mango Inc. (de mentirinha). Todos os direitos reservados.</span><span>Brasil</span></div>
    </footer>
  );
}
