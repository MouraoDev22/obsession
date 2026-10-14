import type { FooterLink } from "../../interfaces/FooterLink";

import styles from "./FooterLinks.module.css";

const LINKS: FooterLink[] = [
  {
    hint: "Álbum oficial · 26 faixas",
    href: "https://open.spotify.com/album/295aVJ1pcfkOGRMODulEYs",
    label: "Ouvir no Spotify",
  },
  {
    hint: "Vinil · CD · Fita — Waxwork Records",
    href: "https://waxworkrecords.com/products/obsession",
    label: "Comprar o álbum",
  },
  {
    hint: "Digital — Back Lot Music",
    href: "https://backlotmusic.ffm.to/obsession",
    label: "Álbum digital",
  },
  {
    hint: "Apple TV — compra ou aluguel",
    href: "https://tv.apple.com/us/movie/obsession/umc.cmc.5n9tcj7azek0g9igds7ybcc0s",
    label: "Comprar o filme",
  },
];

/**
 * Links oficiais de escuta e compra / Official listening and purchase links.
 *
 * PT: lista os links para ouvir a trilha no Spotify e para comprar o álbum
 * (físico e digital) e o filme.
 *
 * EN: lists the links to stream the soundtrack on Spotify and to buy the
 * album (physical and digital) and the movie.
 */
export function FooterLinks(): React.JSX.Element {
  return (
    <section className={styles.section} aria-label="Links oficiais">
      <h2 className={styles.title}>Links oficiais</h2>
      <ul className={styles.list}>
        {LINKS.map(({ hint, href, label }: FooterLink): React.JSX.Element => (
          <li key={href}>
            <a
              className={styles.link}
              href={href}
              target="_blank"
              rel="noreferrer"
            >
              <span className={styles.link_label}>{label}</span>
              <span className={styles.link_hint}>{hint}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
