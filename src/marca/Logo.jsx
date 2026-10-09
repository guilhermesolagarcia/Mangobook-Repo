// O logo "D · Caroço" pintado em currentColor (máscara do mango.svg; ver .marca em marca.css).
export default function Logo({ as: Tag = 'a', className = '', ...props }) {
  return <Tag className={`marca ${className}`.trim()} {...props} />;
}
