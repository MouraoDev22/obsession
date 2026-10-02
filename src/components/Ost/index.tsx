import type { OstProps } from "../../types/OstProps";
import styles from "./Ost.module.css";

export function Ost({ data }: OstProps): React.JSX.Element {
  return <div className={styles.ost}>{data}</div>;
}
