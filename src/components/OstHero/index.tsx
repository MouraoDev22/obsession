import styles from "./OstHero.module.css";

export function OstHero(): React.JSX.Element {
  return (
    <header className={styles.hero}>
      <p className={styles.hero_kicker}>Original Motion Picture Soundtrack</p>
      <h1 className={styles.hero_title}>Obsession</h1>
      <p className={styles.hero_meta}>
        <span>Rock Burwell</span>
        <span aria-hidden="true">·</span>
        <span>26 Faixas</span>
      </p>
    </header>
  );
}
