import type { OstSongCoverProps } from "../../interfaces/OstSongCoverProps";
import styles from "./OstSongCover.module.css";

/**
 * Imagem de capa da música / Song cover artwork image.
 *
 * Renderizada como elemento decorativo (`alt` vazio), pois o nome já é
 * anunciado pelo `OstSongTitle` / Rendered as a decorative element (empty
 * `alt`), since `OstSongTitle` already announces the name.
 */
export function OstSongCover({ cover }: OstSongCoverProps): React.JSX.Element {
  return <img src={cover} alt="" className={styles.song_cover} />;
}
