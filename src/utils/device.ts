/**
 * Utilitários de detecção leve de viewport e suporte a recursos de vídeo.
 * Preparação para a Etapa 3 e 4 (Hero Cinematográfico).
 */

export function isMobileViewport(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

export function isLowPowerModeRecommended(): boolean {
  if (typeof window === 'undefined') return false;
  // Detecção via Network Information API quando disponível
  const nav = navigator as unknown as { connection?: { saveData?: boolean; effectiveType?: string } };
  if (nav.connection?.saveData) return true;
  if (nav.connection?.effectiveType === 'slow-2g' || nav.connection?.effectiveType === '2g') return true;
  return false;
}
