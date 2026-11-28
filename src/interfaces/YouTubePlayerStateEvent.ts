import type { YouTubePlayer } from "../utils/youtube/interfaces/YouTubePlayer";

export interface YouTubePlayerStateEvent {
  data: number;
  target: YouTubePlayer;
}
