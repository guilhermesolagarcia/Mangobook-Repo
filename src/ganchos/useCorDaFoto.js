import { useEffect } from 'react';

// Fundo da seção = cor do canto da foto dela, para a imagem se fundir sem emenda.
export function useCorDaFoto(src, variavel) {
  useEffect(() => {
    let vivo = true;
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (!vivo) return;
      const c = document.createElement('canvas'); c.width = c.height = 1;
      const g = c.getContext('2d'); g.drawImage(img, 4, 4, 1, 1, 0, 0, 1, 1);
      const [r, gr, b] = g.getImageData(0, 0, 1, 1).data;
      document.documentElement.style.setProperty(variavel, `rgb(${r} ${gr} ${b})`);
    };
    return () => { vivo = false; };
  }, [src, variavel]);
}
