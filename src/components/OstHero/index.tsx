import styles from "./OstHero.module.css";

export function OstHero({
  trackCount,
}: {
  trackCount: number;
}): React.JSX.Element {
  return (
    <header className={styles.hero}>
      <h1 className={styles.hero_title}>Obsession</h1>
      <p className={styles.hero_subtitle}>Original Motion Picture Soundtrack</p>
      <p className={styles.hero_meta}>
        <span>Rock Burwell</span>
        <span aria-hidden="true">·</span>
        <span>{trackCount} Faixas</span>
      </p>
    </header>
  );
}
