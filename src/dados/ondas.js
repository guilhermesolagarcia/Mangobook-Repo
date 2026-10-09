// Barras de onda dos microfones: a voz (meio) acesa e o ruído (pontas) apagado.
export function ondas(n = 48) {
  return Array.from({ length: n }, (_, i) => {
    const on = Math.abs(i - n / 2) < 12;
    const altura = on ? 20 + Math.abs(Math.sin(i * 1.7)) * 80 : 8 + Math.abs(Math.sin(i * 2.3)) * 18;
    return { altura, on };
  });
}
