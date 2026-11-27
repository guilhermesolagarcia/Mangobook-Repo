import { lazy, Suspense, useEffect } from 'react';
import { Routes, Route, useLocation, useParams } from 'react-router';
import { produto } from './catalogo/produtos.js';
import { EmBreve, NaoAchou } from './paginas/Aviso.jsx';

// Cada página carrega só o próprio código: quem abre a loja não paga pela página do MangoBook.
const MangoBookPure = lazy(() => import('./paginas/MangoBookPure.jsx'));
const LOJA = { nome: 'Mango Store', frase: 'Todos os aparelhos da Mango, num lugar só.' };

// /go-d1, /mangopad...: produto do catálogo ainda sem página cai no "em breve"; o resto é 404.
function Produto() {
  const p = produto(useParams().id);
  return p?.status === 'em-breve' ? <EmBreve key={p.id} produto={p} /> : <NaoAchou />;
}

// Trocar de página começa do topo (menos quando o endereço tem âncora, tipo #cores).
function VoltaAoTopo() {
  const { pathname, hash } = useLocation();
  useEffect(() => { if (!hash) scrollTo(0, 0); }, [pathname, hash]);
  return null;
}

// ponytail: / ainda é o MangoBook; quando a tela inicial da Mango existir, ela entra aqui.
export default function App() {
  return (
    <>
      <VoltaAoTopo />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<MangoBookPure />} />
          <Route path="/mangobook-pure" element={<MangoBookPure />} />
          <Route path="/loja" element={<EmBreve produto={LOJA} />} />
          <Route path="/:id" element={<Produto />} />
          <Route path="*" element={<NaoAchou />} />
        </Routes>
      </Suspense>
    </>
  );
}
