import type { OstSongCardProps } from "../../interfaces/OstSongCardProps";
import styles from "./OstSongCard.module.css";

/**
 * Card clicável de uma música / Clickable card for a single song.
 *
 * Exibe o conteúdo recebido (capa + título) e, ao ser clicado, solicita a
 * reprodução da música via `onPlay` / Shows the received content (cover +
 * title) and requests playback through `onPlay` when clicked.
 */
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
