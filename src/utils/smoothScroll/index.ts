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
 * Os containers das faixas de música (Lado A / Lado B) possuem instâncias
 * (veja `initContainer`) e são excluídos dessa
 * instância global via `data-track-scroll` + `prevent()`.
 *
 * EN: creates a Lenis instance that smooths the window's native scroll
 * (mouse wheel, trackpad and touch) without hijacking the scrollbar — Lenis
 * wraps the native scroll, so `position: fixed` (film grain, parallax,
 * OstAudioPlayer), anchors and accessibility keep working. The
 * `requestAnimationFrame` loop is managed internally by Lenis
 * (`autoRaf: true`).
 *
 * Music track containers (Side A / Side B) have dedicated Lenis instances
 * (see `initContainer`) and are excluded from this global instance
 * via `data-track-scroll` + `prevent()`.
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
export class SmoothScroll {
  public static initPage(options: LenisOptions = {}): () => void {
    if (typeof document === "undefined") {
      return (): void => {
        return undefined;
      };
    }

    // Keep this breakpoint aligned with OstSongList.module.css.
    // Mantém o breakpoint alinhado com OstSongList.module.css.
    const desktop: MediaQueryList = window.matchMedia("(min-width: 64rem)");
    const lenis: Lenis = new Lenis({
      autoRaf: true,
      ...options,
      prevent: (node: HTMLElement): boolean => {
        return (
          (desktop.matches && node.hasAttribute("data-track-scroll")) ||
          (options.prevent?.(node) ?? false)
        );
      },
    });

    // Stop residual page inertia before native scrolling takes over a panel.
    // Interrompe a inércia da página antes de rolar um painel nativamente.
    function handlePanelWheel(event: WheelEvent): void {
      if (
        event.ctrlKey ||
        !desktop.matches ||
        !(event.target instanceof Element) ||
        !event.target.closest("[data-track-scroll]")
      ) {
        return;
      }
      lenis.scrollTo(window.scrollY, { immediate: true });
      return;
    }

    window.addEventListener("wheel", handlePanelWheel, {
      capture: true,
      passive: true,
    });

    return (): void => {
      window.removeEventListener("wheel", handlePanelWheel, true);
      lenis.destroy();
      return;
    };
  }

  /** Creates a Lenis instance scoped to one scrollable container. */
  public static initContainer(
    container: HTMLElement,
    options: LenisOptions = {},
  ): () => void {
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
}

/** @deprecated Use `SmoothScroll.initPage` instead. */
export function initSmoothScroll(options: LenisOptions = {}): () => void {
  return SmoothScroll.initPage(options);
}
