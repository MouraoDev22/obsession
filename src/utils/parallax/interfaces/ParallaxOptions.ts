/**
 * Opções do efeito parallax / Options for the parallax effect.
 */
export interface ParallaxOptions {
  /**
   * Intensidade máxima do deslocamento, em porcentagem do viewport /
   * Maximum displacement intensity, as a percentage of the viewport.
   *
   * O `body::before` tem `scale(1.2)`, o que deixa uma margem de 10%; o padrão
   * de 5% mantém a imagem sempre cobrindo a tela. Valores acima de 10% expõem
   * as bordas — aumente o `scale` em `App.css`.
   *
   * The `body::before` uses `scale(1.2)`, leaving a 10% margin; the 5% default
   * keeps the image covering the screen at all times. Values above 10% expose
   * the edges — increase `scale` in `App.css`.
   *
   * @default 0.5
   */
  maxOffset?: number;
}
