// Símbolos usados com <svg><use href="#nome"/></svg>.
export default function Icones() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
      <symbol id="busca" viewBox="0 0 16 16"><circle cx="7" cy="7" r="5.2" fill="none" stroke="currentColor" strokeWidth="1.4" /><path d="M11 11l3.6 3.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></symbol>
      <symbol id="sacola" viewBox="0 0 16 16"><path d="M3 5.5h10l-.8 9H3.8z" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" /><path d="M5.6 5.5V4.4a2.4 2.4 0 014.8 0v1.1" fill="none" stroke="currentColor" strokeWidth="1.3" /></symbol>
      <symbol id="pausa" viewBox="0 0 16 16"><path d="M5 3.5v9M11 3.5v9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></symbol>
      <symbol id="play" viewBox="0 0 16 16"><path d="M5 3.2l8 4.8-8 4.8z" fill="currentColor" /></symbol>
    </svg>
  );
}
