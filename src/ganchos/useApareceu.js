import { useEffect, useState } from 'react';

// true quando o elemento entra na tela. umaVez: desliga o observer depois da primeira vez.
export function useApareceu(ref, { limiar = 0.5, raiz = null, umaVez = true } = {}) {
  const [viu, setViu] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (e.isIntersecting) { setViu(true); if (umaVez) io.disconnect(); }
      else if (!umaVez) setViu(false);
    }), { threshold: limiar, root: raiz?.current ?? null });
    io.observe(el);
    return () => io.disconnect();
  }, [ref, limiar, raiz, umaVez]);
  return viu;
}
