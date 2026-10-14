import type { LenisOptions } from "lenis";

import Lenis from "lenis";

/**
 * Scroll suave com inércia / Smooth scrolling with inertia.
 *
 * PT: cria uma instância do Lenis, que suaviza o scroll nativo da janela
 * (roda do mouse, trackpad e toque) sem sequestrar a barra de rolagem — o
 * Lenis envolve o scroll nativo, então `position: fixed` (grão de filme,
 * parallax, OstAudioPlayer), âncoras e acessibilidade continuam funcionando.
 * O loop de `requestAnimationFrame` é gerenciado internamente pelo Lenis
 * (`autoRaf: true`).
 *
 * EN: creates a Lenis instance that smooths the window's native scroll
 * (mouse wheel, trackpad and touch) without hijacking the scrollbar — Lenis
 * wraps the native scroll, so `position: fixed` (film grain, parallax,
 * OstAudioPlayer), anchors and accessibility keep working. The
 * `requestAnimationFrame` loop is managed internally by Lenis
 * (`autoRaf: true`).
 *
 * Respeita `prefers-reduced-motion: reduce` automaticamente: a suavização é
 * desativada e o scroll acompanha o input 1:1, sem recarregar a página. /
 * Honors `prefers-reduced-motion: reduce` automatically: smoothing is
 * disabled and scroll tracks the input 1:1, without a page reload.
 *
 * @param options Opções opcionais do Lenis (duração, multiplicadores…) /
 *   Optional Lenis options (duration, multipliers…).
 * @returns Função que destrói a instância e restaura o scroll nativo /
 *   Function that destroys the instance and restores native scrolling.
 */
export function initSmoothScroll(options: LenisOptions = {}): () => void {
  if (typeof document === "undefined") {
    return (): void => undefined;
  }

  const lenis: Lenis = new Lenis({ autoRaf: true, ...options });

  return (): void => {
    lenis.destroy();
    return;
  };
}
