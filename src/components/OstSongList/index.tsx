import type { OstSongListProps } from "../../interfaces/OstSongListProps";
import type { OstSongs } from "../../types/OstSongs";

import { OstSongCard } from "../OstSongCard";
import { OstSongCover } from "../OstSongCover";
import { OstSongTitle } from "../OstSongTitle";

import styles from "./OstSongList.module.css";

export function OstSongList({
  songs,
  onPlay,
}: OstSongListProps): React.JSX.Element {
  const midpoint: number = Math.ceil(songs.length / 2);
  const sides: { label: string; tracks: OstSongs }[] = [
    { label: "A", tracks: songs.slice(0, midpoint) },
    { label: "B", tracks: songs.slice(midpoint) },
  ].filter((side): boolean => side.tracks.length > 0);

  return (
    <div className={styles.sides}>
      {sides.map(({ label, tracks }): React.JSX.Element => (
        <section
          key={label}
          className={styles.side}
          aria-label={`Lado ${label}`}
        >
          <h2 className={styles.side_label}>
            <span>Lado {label}</span>
          </h2>
          <ol className={styles.song_list}>
            {tracks.map((song, index): React.JSX.Element => (
              <li key={song.id}>
                <OstSongCard song={song} onPlay={onPlay}>
                  <OstSongCover cover={song.cover} />
                  <OstSongTitle
                    title={song.title}
                    trackLabel={`${label}${String(index + 1).padStart(2, "0")}`}
                  />
                </OstSongCard>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
