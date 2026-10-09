// Botão em pílula preto da Mango. Azul só em link de texto (.mais), nunca em botão.
export default function Pilula({ href = '#', className = '', children, ...props }) {
  return <a className={`pill ${className}`.trim()} href={href} {...props}>{children}</a>;
}
