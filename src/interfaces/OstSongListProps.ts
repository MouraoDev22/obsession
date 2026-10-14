import type { OstSongs } from "../types/OstSongs";
import type { OstSong } from "./OstSong";

export interface OstSongListProps {
  activeSongId: string | null;
  songs: OstSongs;
  onPlay: (song: OstSong) => void;
}
