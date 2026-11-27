import type { OstSongListProps } from "../../interfaces/OstSongListProps";
import type { OstSongs } from "../../types/OstSongs";

import { useEffect, useRef } from "react";

import { initSmoothScrollPanel } from "../../utils/smoothScrollPanel";

import { OstSongCard } from "../OstSongCard";
import { OstSongCover } from "../OstSongCover";
import { OstSongTitle } from "../OstSongTitle";

import styles from "./OstSongList.module.css";

export function OstSongList({
  activeSongId,
  onPlay,
  songs,
}: OstSongListProps): React.JSX.Element {
  const midpoint: number = Math.ceil(songs.length / 2);
  const sides: { label: string; tracks: OstSongs }[] = [
    { label: "A", tracks: songs.slice(0, midpoint) },
    { label: "B", tracks: songs.slice(midpoint) },
  ].filter((side): boolean => side.tracks.length > 0);

  const panelRefs = [useRef<HTMLElement>(null), useRef<HTMLElement>(null)];

  useEffect((): (() => void) => {
    const desktop: MediaQueryList = window.matchMedia("(min-width: 64rem)");
    const destroyFns: (() => void)[] = [];

    const initPanels = (): void => {
      if (!desktop.matches) {
        return;
      }
      panelRefs.forEach((ref): void => {
        const container: HTMLElement | null = ref.current;
        if (!container) {
          return;
        }
        destroyFns.push(initSmoothScrollPanel(container));
      });
    };

    initPanels();

    const handleChange = (event: MediaQueryListEvent): void => {
      destroyFns.forEach((destroy): void => destroy());
      destroyFns.length = 0;
      if (event.matches) {
        initPanels();
      }
    };

    desktop.addEventListener("change", handleChange);

    return (): void => {
      desktop.removeEventListener("change", handleChange);
      destroyFns.forEach((destroy): void => destroy());
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={styles.sides}>
      {sides.map((_, sideIndex): React.JSX.Element => {
        const { label, tracks } = sides[sideIndex];
        return (
          <section
            key={label}
            ref={panelRefs[sideIndex]}
            className={`${styles.side} ${styles.side_scroll}`}
            data-track-scroll
            aria-labelledby={`side-${label}`}
            tabIndex={0}
          >
            <header className={styles.side_header}>
              <h2 className={styles.side_label} id={`side-${label}`}>
                <span className={styles.side_letter}>{label}</span>
                <span>Lado {label}</span>
              </h2>
              <span className={styles.side_count}>{tracks.length} faixas</span>
            </header>
            <ol className={styles.song_list}>
              {tracks.map((song, index): React.JSX.Element => (
                <li key={song.id}>
                  <OstSongCard
                    isActive={song.id === activeSongId}
                    onPlay={onPlay}
                    song={song}
                  >
                    <OstSongCover cover={song.cover} />
                    <OstSongTitle
                      title={song.title}
                      trackLabel={`${label}${String(index + 1).padStart(2, "0")}`}
                    />
                  </OstSongCard>
                </li>
              ))}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
