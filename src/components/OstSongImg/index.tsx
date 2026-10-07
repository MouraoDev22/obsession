import type { OstSongImgProps } from "../../interfaces/OstSongImgProps";
import styles from "./OstSongImg.module.css";

export function OstSongImg({ img }: OstSongImgProps): React.JSX.Element {
  return <img src={img} alt="" className={styles.img} />;
}
