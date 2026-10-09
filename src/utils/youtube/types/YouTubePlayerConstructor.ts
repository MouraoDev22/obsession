import type { YouTubePlayer } from "../interfaces/YouTubePlayer";
import type { YouTubePlayerOptions } from "../interfaces/YouTubePlayerOptions";

/**
 * Construtor da classe `YT.Player` / Constructor of the `YT.Player` class.
 *
 * @param target Elemento do DOM que hospeda o iframe / DOM element that hosts the iframe.
 * @param options Opções de inicialização do player / Player initialization options.
 */
export type YouTubePlayerConstructor = new (
  target: HTMLElement,
  options?: YouTubePlayerOptions,
) => YouTubePlayer;
