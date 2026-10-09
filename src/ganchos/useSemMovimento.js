import { useState } from 'react';

// prefers-reduced-motion, lido uma vez na montagem (como no protótipo).
export function useSemMovimento() {
  const [sem] = useState(() => typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches);
  return sem;
}
