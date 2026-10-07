import type { OstSong } from "../interfaces/OstSong";
import type { OstData } from "./OstData";

export type OstDataProps = {
  data: OstData;
  onPlay: (song: OstSong) => void;
};
