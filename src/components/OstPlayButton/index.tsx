import type { OstPlayButtonProps } from "../../interfaces/OstPlayButtonProps";
import styles from "./OstPlayButton.module.css";

export function OstPlayButton({ link }: OstPlayButtonProps): React.JSX.Element {
  console.log(link);
  return <button className={styles.play_btn}></button>;
}
