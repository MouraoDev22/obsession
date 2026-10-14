import type { FooterCredit } from "../../interfaces/FooterCredit";
import type { FooterCreditsProps } from "../../interfaces/FooterCreditsProps";

import styles from "./FooterCredits.module.css";

export function FooterCredits({
  credits,
}: FooterCreditsProps): React.JSX.Element {
  return (
    <section className={styles.section} aria-label="Ficha técnica">
      <h2 className={styles.title}>Ficha técnica</h2>
      <dl className={styles.credits}>
        {credits.map(({ label, value }: FooterCredit): React.JSX.Element => (
          <div key={label} className={styles.credit}>
            <dt className={styles.term}>{label}</dt>
            <dd className={styles.value}>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
