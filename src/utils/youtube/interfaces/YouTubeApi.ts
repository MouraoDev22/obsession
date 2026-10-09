import type { YouTubePlayerConstructor } from "../types/YouTubePlayerConstructor";

/**
 * Namespace global `window.YT` exposto pela IFrame API do YouTube /
 * Global `window.YT` namespace exposed by the YouTube IFrame API.
 */
export interface YouTubeApi {
  Player: YouTubePlayerConstructor;
}

declare global {
  interface Window {
    YT?: YouTubeApi;
    onYouTubeIframeAPIReady?: () => void;
  }
}
