import type { ReactNode } from "react";

import type { OstSong } from "./OstSong";

export interface OstSongCardProps {
  children: ReactNode;
  onPlay: (song: OstSong) => void;
  song: OstSong;
}
