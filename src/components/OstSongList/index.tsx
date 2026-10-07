import type { OstSongListProps } from "../../interfaces/OstSongListProps";
import { OstSongCard } from "../OstSongCard";
import { OstSongCover } from "../OstSongCover";
import { OstSongTitle } from "../OstSongTitle";
import styles from "./OstSongList.module.css";

/**
 * Lista de músicas da trilha sonora / Soundtrack song list.
 *
 * Renderiza cada música como um card clicável que pede a reprodução via
 * `onPlay` / Renders each song as a clickable card that requests playback
 * through `onPlay`.
 */
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
