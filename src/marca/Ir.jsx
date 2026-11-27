import { Link } from 'react-router';

// Link da Mango: endereço do site ("/loja") troca de página sem recarregar; âncora ("#cores") e externo ficam <a>.
export default function Ir({ href = '#', ...props }) {
  return href.startsWith('/') ? <Link to={href} {...props} /> : <a href={href} {...props} />;
}
