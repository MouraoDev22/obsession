import type { YouTubePlayerConstructor } from "./types/YouTubePlayerConstructor";

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
    const url: URL = new URL(link);
    const hostname: string = url.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      return url.pathname.slice(1).split("/")[0] || null;
    }

    if (hostname === "youtube.com" || hostname === "youtube-nocookie.com") {
      if (url.pathname === "/watch") {
        return url.searchParams.get("v");
      }

      const match: RegExpMatchArray | null = url.pathname.match(
        /^\/(?:embed|shorts|live)\/([^/?#]+)/,
      );
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

  apiPromise = new Promise<YouTubePlayerConstructor>(
    (
      resolve: (
        value: YouTubePlayerConstructor | PromiseLike<YouTubePlayerConstructor>,
      ) => void,
      reject: (reason?: unknown) => void,
    ): void => {
      if (window.YT?.Player) {
        resolve(window.YT.Player);
        return;
      }

      const previousOnReady: (() => void) | undefined =
        window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = (): void => {
        previousOnReady?.();

        if (window.YT?.Player) {
          resolve(window.YT.Player);
        } else {
          reject(
            new Error("A API do YouTube carregou sem inicializar o player."),
          );
        }
        return;
      };

      const script: HTMLScriptElement = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.onerror = (): void => {
        reject(new Error("Não foi possível carregar a API do YouTube."));
        return;
      };
      document.head.append(script);
      return;
    },
  ).catch((error: unknown): never => {
    apiPromise = null; // permite tentar carregar novamente na próxima reprodução
    throw error;
  });

  return apiPromise;
}
