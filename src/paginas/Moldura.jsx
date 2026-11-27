import { useEffect } from 'react';
import Icones from '../marca/Icones.jsx';
import Navbar from '../marca/Navbar.jsx';
import Rodape, { COLUNAS } from '../marca/Rodape.jsx';
import { MENU, PRODUTOS, rota } from '../catalogo/produtos.js';

// O que toda página da Mango tem em volta: ícones, navbar e rodapé lendo o catálogo.
const COLUNAS_SITE = [['Comprar e saber mais', [['Loja', '/loja'], ...PRODUTOS.map((p) => [p.nome, rota(p)])]], ...COLUNAS.slice(1)];

export default function Moldura({ titulo, children, ...navbar }) {
  useEffect(() => { document.title = titulo; }, [titulo]);
  return (
    <>
      <Icones />
      <Navbar links={MENU} {...navbar} />
      <main>{children}</main>
      <Rodape colunas={COLUNAS_SITE} />
    </>
  );
}
