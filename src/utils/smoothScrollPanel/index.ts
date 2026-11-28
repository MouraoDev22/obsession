import type { LenisOptions } from "lenis";

import Lenis from "lenis";

/**
 * Scroll suave com inércia para um container específico / Smooth scrolling with inertia for a specific container.
 *
 * PT: cria uma instância do Lenis vinculada a um elemento wrapper (container),
 * suavizando apenas o scroll desse container (ex.: painéis Lado A / Lado B).
 * Cada container deve ter sua própria instância; destrua-a quando o componente
 * desmontar ou quando sair do breakpoint de desktop.
 *
 * EN: creates a Lenis instance bound to a specific wrapper element, smoothing
 * only that container's scroll (e.g. Side A / Side B panels). Each container
 * needs its own instance; destroy it when the component unmounts or leaves the
 * desktop breakpoint.
 *
 * Respeita `prefers-reduced-motion: reduce` automaticamente: a suavização é
 * desativada e o scroll acompanha o input 1:1. /
 * Honors `prefers-reduced-motion: reduce` automatically: smoothing is disabled
 * and scroll tracks the input 1:1.
 *
 * @param container Elemento wrapper do Lenis / Lenis wrapper element.
 * @param options Opções opcionais do Lenis (duração, multiplicadores…) /
 *   Optional Lenis options (duration, multipliers…).
 * @returns Função que destrói a instância do Lenis para esse container /
 *   Function that destroys the Lenis instance for this container.
 */
export function initSmoothScrollPanel(
  container: HTMLElement,
  options: LenisOptions = {},
): () => void {
  if (typeof document === "undefined") {
    return (): void => {
      return undefined;
    };
  }

  const lenis: Lenis = new Lenis({
    autoRaf: true,
    wrapper: container,
    ...options,
  });

  return (): void => {
    lenis.destroy();
    return;
  };
}
