import type { OstSongTitleProps } from "../../interfaces/OstSongTitleProps";
import styles from "./OstSongTitle.module.css";

/**
 * Título da música em estilo pôster / Song title rendered with poster styling.
 *
 * Exibe o nome da música como cabeçalho (`h3`) com a tipografia pôster /
 * Displays the song name as an `h3` heading using the poster typography.
 */
export function OstSongTitle({ title }: OstSongTitleProps): React.JSX.Element {
  return <h3 className={styles.song_title}>{title}</h3>;
}
