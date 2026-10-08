import Barras from './ui/Barras.jsx';
import Rodape from './ui/Rodape.jsx';
import Abertura from './cenas/Abertura.jsx';
import Reserva from './cenas/Reserva.jsx';

export default function App() {
  return (
    <>
      <Barras />
      <main>
        <Abertura />
        <Reserva />
      </main>
      <Rodape />
    </>
  );
}
