import Ir from './Ir.jsx';
import './Rodape.css';

// [título, [rótulo ou [rótulo, endereço]]]; rótulo sozinho ainda não tem página.
export const COLUNAS = [
  ['Comprar e saber mais', ['Loja', 'MangoBook', 'Mangopad', 'Go D1', 'Acessórios']],
  ['Conta', ['Minha Mango ID', 'Pedidos', 'Mango na nuvem']],
  ['Loja Mango', ['Encontre uma loja', 'Parcelamento', 'Troca de aparelho', 'Status do pedido']],
  ['Para educação', ['Preço de estudante', 'Mango para escolas']],
  ['Valores', ['Acessibilidade', 'Meio ambiente', 'Privacidade']],
];

// Todo rodapé da Mango deixa claro que é paródia (ver MARCA.md).
export default function Rodape({ colunas = COLUNAS }) {
  return (
    <footer className="rodape">
      <div className="notas">
        <p>Mango, MangoBook, Go D1, Mangopad, chip Palmer e MangoOS são uma paródia fictícia, criada como projeto de portfólio, sem nenhuma relação com a Apple.</p>
        <p>Preços, números de desempenho, bateria e meio ambiente são ilustrativos e não descrevem nenhum produto real.</p>
      </div>
      <div className="colunas">
        {colunas.map(([titulo, links]) => (
          <div key={titulo}><b>{titulo}</b>{links.map((l) => { const [rotulo, href = '#'] = [].concat(l); return <Ir key={rotulo} href={href}>{rotulo}</Ir>; })}</div>
        ))}
      </div>
      <div className="base"><span>Copyright © 2026 Mango Inc. (de mentirinha). Todos os direitos reservados.</span><span>Brasil</span></div>
    </footer>
  );
}
