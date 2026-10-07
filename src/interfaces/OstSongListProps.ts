import type { OstSongs } from "../types/OstSongs";
import type { OstSong } from "./OstSong";

export interface OstSongListProps {
  songs: OstSongs;
  onPlay: (song: OstSong) => void;
}
