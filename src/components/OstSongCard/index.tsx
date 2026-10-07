import type { OstSongCardProps } from "../../interfaces/OstSongCardProps";
import styles from "./OstSongCard.module.css";

export function OstSongCard({
  children,
  onPlay,
  song,
}: OstSongCardProps): React.JSX.Element {
  const handlePlay: () => void = (): void => {
    onPlay(song);
    return;
  };

  return (
    <button
      type="button"
      className={styles.song_card}
      onClick={handlePlay}
      aria-label={`Play ${song.title}`}
    >
      {children}
    </button>
  );
}
