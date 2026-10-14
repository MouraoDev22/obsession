import styles from "./FooterCredits.module.css";

const CREDITS: { label: string; value: string }[] = [
  { label: "Filme", value: "Obsession (2026) · 1h49 · R" },
  { label: "Direção", value: "Curry Barker" },
  { label: "Trilha", value: "Rock Burwell" },
  { label: "Estúdios", value: "Blumhouse · Capstone · Tea Shop" },
  { label: "Distribuição", value: "Focus Features · Universal" },
  { label: "Estreia", value: "15 de maio de 2026 (EUA)" },
];

/**
 * Ficha técnica do filme / Movie credits.
 *
 * PT: lista em uma lista de definições os dados principais de Obsession —
 * filme, direção, trilha sonora, estúdios, distribuição e estreia.
 *
 * EN: lists the key Obsession data — film, director, soundtrack, studios,
 * distribution and release date — in a definition list.
 */
export function FooterCredits(): React.JSX.Element {
  return (
    <section className={styles.section} aria-label="Ficha técnica">
      <h2 className={styles.title}>Ficha técnica</h2>
      <dl className={styles.credits}>
        {CREDITS.map(({ label, value }: { label: string; value: string }) => (
          <div key={label} className={styles.credit}>
            <dt className={styles.term}>{label}</dt>
            <dd className={styles.value}>{value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
