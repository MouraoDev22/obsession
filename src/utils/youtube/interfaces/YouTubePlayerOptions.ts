import type { YouTubePlayer } from "./YouTubePlayer";

/**
 * Opções passadas ao construtor `YT.Player` /
 * Options passed to the `YT.Player` constructor.
 */
export interface YouTubePlayerOptions {
  /** Callbacks de eventos do player / Player event callbacks. */
  events?: {
    /** Chamado quando o vídeo não pode ser reproduzido /
     * Called when the video cannot be played. */
    onError?: (event: { data: number }) => void;
    /** Chamado quando o player está pronto para uso /
     * Called when the player is ready to use. */
    onReady?: (event: { target: YouTubePlayer }) => void;
    /** Chamado a cada mudança de estado (tocando, pausado…) /
     * Called on every state change (playing, paused…). */
    onStateChange?: (event: { data: number; target: YouTubePlayer }) => void;
  };
  /** Altura do iframe oculto do player / Height of the hidden player iframe. */
  height?: string;
  /** Parâmetros avançados de reprodução (ex.: `autoplay`) /
   * Advanced playback parameters (e.g. `autoplay`). */
  playerVars?: Record<string, boolean | number | string>;
  /** ID do vídeo carregado inicialmente / Id of the video loaded initially. */
  videoId?: string;
  /** Largura do iframe oculto do player / Width of the hidden player iframe. */
  width?: string;
}
