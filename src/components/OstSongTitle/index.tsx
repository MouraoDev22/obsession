import type { OstSongTitleProps } from "../../interfaces/OstSongTitleProps";
import styles from "./OstSongData.module.css";

export function OstSongTitle({ title }: OstSongTitleProps): React.JSX.Element {
  return <h3 className={styles.ost_song_title}>{title}</h3>;
}
