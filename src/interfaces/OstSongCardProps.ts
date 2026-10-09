import type { OstSong } from "./OstSong";
import type { ReactNode } from "react";

export interface OstSongCardProps {
  children: ReactNode;
  onPlay: (song: OstSong) => void;
  song: OstSong;
}
