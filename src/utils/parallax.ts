export interface ParallaxOptions {
  /**
   * Intensidade máxima do deslocamento, em porcentagem do viewport.
   * O `body::before` tem `scale(1.2)`, o que deixa uma margem de 10%;
   * o padrão de 5% mantém a imagem sempre cobrindo a tela.
   * Valores acima de 10% expõem as bordas — aumente o `scale` em `App.css`.
   */
  maxOffset?: number;
}

/**
 * Efeito parallax no fundo da página: ao passar o mouse sobre o `body`,
 * a imagem (`body::before`) se move na direção oposta ao cursor.
 *
 * O pseudo-elemento não é acessível via JS, então o deslocamento é exposto
 * nas variáveis CSS `--parallax-x` e `--parallax-y`, consumidas pelo
 * `transform` definido em `App.css`.
 *
 * Retorna uma função que remove os listeners e restaura o estado inicial.
 */
export function initParallax(options: ParallaxOptions = {}): () => void {
  const { maxOffset = 0.5 } = options;

  // Respeita prefers-reduced-motion: em sistemas com "animações/efeitos
  // visuais" desativados (comum no Windows), o efeito não é aplicado.
  if (
    typeof document === "undefined" ||
    window.matchMedia("(prefers-reduced-motion: false)").matches
  ) {
    return () => undefined;
  }

  const target = document.body;
  let frameId = 0;

  const applyOffset = (x: number, y: number): void => {
    target.style.setProperty("--parallax-x", `${x.toFixed(2)}%`);
    target.style.setProperty("--parallax-y", `${y.toFixed(2)}%`);
  };

  const reset = (): void => {
    cancelAnimationFrame(frameId);
    applyOffset(0, 0);
  };

  const handleMouseMove = (event: MouseEvent): void => {
    cancelAnimationFrame(frameId);

    frameId = requestAnimationFrame(() => {
      const width = Math.max(window.innerWidth, 1);
      const height = Math.max(window.innerHeight, 1);

      // Normaliza a posição do cursor para o intervalo -1..1.
      const normalizedX = (event.clientX / width) * 2 - 1;
      const normalizedY = (event.clientY / height) * 2 - 1;

      // Sinal invertido: a imagem se move na direção oposta ao mouse.
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
