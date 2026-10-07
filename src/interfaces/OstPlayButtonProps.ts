import type { OstSong } from "./OstSong";

export interface OstPlayButtonProps {
  onPlay: (song: OstSong) => void;
  song: OstSong;
}
