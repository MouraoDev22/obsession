/**
 * Instância mínima do player do YouTube exposta pela IFrame API /
 * Minimal YouTube player instance exposed by the IFrame API.
 */
export interface YouTubePlayer {
  /** Destrói o player e remove o iframe /
   * Destroys the player and removes the iframe. */
  destroy: () => void;
  /** Troca a faixa em reprodução pelo ID do vídeo informado /
   * Switches the currently playing video to the given video id. */
  loadVideoById: (videoId: string) => void;
  /** Pausa a reprodução / Pauses playback. */
  pauseVideo: () => void;
  /** Inicia a reprodução / Starts playback. */
  playVideo: () => void;
}
