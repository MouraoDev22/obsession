import type { OstSongListProps } from "../../interfaces/OstSongListProps";

import { OstSongCard } from "../OstSongCard";
import { OstSongCover } from "../OstSongCover";
import { OstSongTitle } from "../OstSongTitle";

import styles from "./OstSongList.module.css";

export function OstSongList({
  songs,
  onPlay,
}: OstSongListProps): React.JSX.Element {
  return (
    <ol className={styles.song_list}>
      {songs.map((song): React.JSX.Element => (
        <li key={song.id}>
          <OstSongCard song={song} onPlay={onPlay}>
            <OstSongCover cover={song.cover} />
            <OstSongTitle title={song.title} />
          </OstSongCard>
        </li>
      ))}
    </ol>
  );
}
