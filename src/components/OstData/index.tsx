import type { OstDataProps } from "../../types/OstDataProps";
import styles from "./Ost.module.css";

export function OstData({ data }: OstDataProps): React.JSX.Element {
  return <div className={styles.ost}>{data}</div>;
}
