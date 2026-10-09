import type { ParallaxOptions } from "./interfaces/ParallaxOptions";

/**
 * Efeito parallax no fundo da página / Parallax effect on the page background.
 *
 * PT: ao passar o mouse sobre o `body`, a imagem (`body::before`) se move na
 * direção oposta ao cursor. O pseudo-elemento não é acessível via JS, então o
 * deslocamento é exposto nas variáveis CSS `--parallax-x` e `--parallax-y`,
 * consumidas pelo `transform` definido em `App.css`.
 *
 * EN: hovering the `body` moves the image (`body::before`) in the direction
 * opposite to the cursor. Pseudo-elements are not reachable from JS, so the
 * offset is exposed through the CSS variables `--parallax-x` and
 * `--parallax-y`, consumed by the `transform` defined in `App.css`.
 *
 * Respeita `prefers-reduced-motion: reduce` /
 * Honors `prefers-reduced-motion: reduce`.
 *
 * @param options Configurações opcionais do efeito / Optional settings for the effect.
 * @returns Função que remove os listeners e restaura o estado inicial /
 *   Function that removes the listeners and restores the initial state.
 */
export function initParallax(options: ParallaxOptions = {}): () => void {
  const { maxOffset = 0.5 } = options;

  // Respeita prefers-reduced-motion: em sistemas com "animações/efeitos
  // visuais" desativados (comum no Windows), o efeito não é aplicado.
  // Honors prefers-reduced-motion: skips the effect when the OS option
  // "animations/visual effects" is turned off (common on Windows).
  if (
    typeof document === "undefined" ||
    window.matchMedia("(prefers-reduced-motion: false)").matches
  ) {
    return () => undefined;
  }

  const target = document.body;
  let frameId = 0;

  /** Aplica o deslocamento nas variáveis CSS `--parallax-x`/`--parallax-y` /
   * Writes the offset into the `--parallax-x`/`--parallax-y` CSS variables. */
  const applyOffset = (x: number, y: number): void => {
    target.style.setProperty("--parallax-x", `${x.toFixed(2)}%`);
    target.style.setProperty("--parallax-y", `${y.toFixed(2)}%`);
  };

  /** Cancela o quadro pendente e zera o deslocamento /
   * Cancels the pending frame and resets the offset. */
  const reset = (): void => {
    cancelAnimationFrame(frameId);
    applyOffset(0, 0);
  };

  /** Recalcula o deslocamento a partir da posição do cursor /
   * Recomputes the offset from the cursor position. */
  const handleMouseMove = (event: MouseEvent): void => {
    cancelAnimationFrame(frameId);

    frameId = requestAnimationFrame(() => {
      const width = Math.max(window.innerWidth, 1);
      const height = Math.max(window.innerHeight, 1);

      // Normaliza a posição do cursor para o intervalo -1..1.
      // Normalizes the cursor position to the -1..1 range.
      const normalizedX = (event.clientX / width) * 2 - 1;
      const normalizedY = (event.clientY / height) * 2 - 1;

      // Sinal invertido: a imagem se move na direção oposta ao mouse.
      // Inverted sign: the image moves opposite to the mouse.
      applyOffset(-normalizedX * maxOffset, -normalizedY * maxOffset);
    });
  };

  target.addEventListener("mousemove", handleMouseMove);
  target.addEventListener("mouseleave", reset);

  return () => {
    target.removeEventListener("mousemove", handleMouseMove);
    target.removeEventListener("mouseleave", reset);
    reset();
  };
}
