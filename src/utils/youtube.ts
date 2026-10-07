export interface YouTubePlayer {
  destroy: () => void;
  loadVideoById: (videoId: string) => void;
  pauseVideo: () => void;
  playVideo: () => void;
}

export interface YouTubePlayerOptions {
  events?: {
    onError?: (event: { data: number }) => void;
    onReady?: (event: { target: YouTubePlayer }) => void;
    onStateChange?: (event: { data: number; target: YouTubePlayer }) => void;
  };
  height?: string;
  playerVars?: Record<string, boolean | number | string>;
  videoId?: string;
  width?: string;
}

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

/** Extrai o ID de um vídeo a partir dos formatos mais comuns de link do YouTube. */
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

/** Carrega a IFrame API do YouTube uma única vez e reutiliza a mesma promessa nas próximas chamadas. */
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
