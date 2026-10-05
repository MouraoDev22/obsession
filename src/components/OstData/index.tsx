import type { OstDataProps } from "../../types/OstDataProps";
import styles from "./OstData.module.css";

export function OstData({ data }: OstDataProps): React.JSX.Element {
  return <div className={styles.ost}>{data}</div>;
}
