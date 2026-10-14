import styles from "./FooterAbout.module.css";

/**
 * Finalidade do projeto / Project purpose.
 *
 * PT: explica o objetivo do site — um player de fã, não oficial e sem fins
 * lucrativos, que apresenta a trilha completa de *Obsession* — e o seu
 * propósito como estudo de caso de frontend moderno.
 *
 * EN: explains the goal of the site — an unofficial, non-commercial fan
 * player for the complete *Obsession* soundtrack — and its purpose as a
 * modern frontend case study.
 */
export function FooterAbout(): React.JSX.Element {
  return (
    <section className={styles.section} aria-label="Sobre o projeto">
      <h2 className={styles.title}>Sobre o projeto</h2>
      <p className={styles.text}>
        Projeto de fã, não oficial e sem fins lucrativos, criado para apresentar
        a trilha sonora original completa do filme Obsession — 26 faixas de Rock
        Burwell — como uma capa de disco virtual, com Lado A/B, player integrado
        e fundo com efeito parallax.
      </p>
      <p className={styles.text}>
        Também serve como estudo de caso de frontend moderno: React 19 com React
        Compiler, TypeScript estrito, Vite 8 e CSS Modules feitos à mão, sem
        frameworks de UI.
      </p>
    </section>
  );
}
