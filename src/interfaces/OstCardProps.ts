import type { ReactNode } from "react";

import type { OstSong } from "./OstSong";

export interface OstCardProps {
  children: ReactNode;
  onPlay: (song: OstSong) => void;
  song: OstSong;
}
