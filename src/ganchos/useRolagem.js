import { useEffect, useRef } from 'react';

// Chama fn ao montar e a cada scroll (listener passivo).
export function useRolagem(fn) {
  const ref = useRef(fn);
  ref.current = fn;
  useEffect(() => {
    const ver = () => ref.current();
    addEventListener('scroll', ver, { passive: true });
    ver();
    return () => removeEventListener('scroll', ver);
  }, []);
}
