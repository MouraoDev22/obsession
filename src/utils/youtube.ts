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

interface YouTubeApi {
  Player: YouTubePlayerConstructor;
}

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}

let apiPromise: Promise<YouTubePlayerConstructor> | null = null;

/**
 * Extrai o ID de um vídeo a partir dos formatos mais comuns de link do YouTube /
 * Extracts a video id from the most common YouTube link formats.
 *
 * Suporta `youtu.be/<id>`, `/watch?v=<id>`, `/embed/<id>`, `/shorts/<id>` e
 * `/live/<id>` / Supports `youtu.be/<id>`, `/watch?v=<id>`, `/embed/<id>`,
 * `/shorts/<id>` and `/live/<id>`.
 *
 * @param link URL completa do vídeo / Full URL of the video.
 * @returns O ID do vídeo ou `null` quando o link é inválido /
 *   The video id, or `null` when the link is invalid.
 */
export function getYouTubeVideoId(link: string): string | null {
  try {
    const url = new URL(link);
    const hostname = url.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      return url.pathname.slice(1).split("/")[0] || null;
    }

    if (hostname === "youtube.com" || hostname === "youtube-nocookie.com") {
      if (url.pathname === "/watch") {
        return url.searchParams.get("v");
      }

      const match = url.pathname.match(/^\/(?:embed|shorts|live)\/([^/?#]+)/);
      if (match) {
        return match[1];
      }
    }
  } catch {
    return null;
  }

  return null;
}

/**
 * Carrega a IFrame API do YouTube uma única vez e reutiliza a mesma promessa
 * nas próximas chamadas /
 * Loads the YouTube IFrame API once and reuses the same promise on later calls.
 *
 * @returns Promessa resolvida com o construtor `YT.Player` /
 *   Promise resolved with the `YT.Player` constructor.
 * @throws Erro quando a API falha ao carregar ou inicializar /
 *   Error when the API fails to load or initialize.
 */
export function loadYouTubeIframeApi(): Promise<YouTubePlayerConstructor> {
  if (apiPromise) {
    return apiPromise;
  }

  apiPromise = new Promise<YouTubePlayerConstructor>((resolve, reject) => {
    if (window.YT?.Player) {
      resolve(window.YT.Player);
      return;
    }

    const previousOnReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      previousOnReady?.();

      if (window.YT?.Player) {
        resolve(window.YT.Player);
      } else {
        reject(
          new Error("A API do YouTube carregou sem inicializar o player."),
        );
      }
    };

    const script = document.createElement("script");
    script.src = "https://www.youtube.com/iframe_api";
    script.async = true;
    script.onerror = () =>
      reject(new Error("Não foi possível carregar a API do YouTube."));
    document.head.append(script);
  }).catch((error: unknown) => {
    apiPromise = null; // permite tentar carregar novamente na próxima reprodução
    throw error;
  });

  return apiPromise;
}
