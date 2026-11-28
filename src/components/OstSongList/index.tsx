import type { OstSongListProps } from "../../interfaces/OstSongListProps";
import type { OstSongSide } from "../../interfaces/OstSongSide";
import type { OstSongs } from "../../types/OstSongs";

import { useEffect, useRef } from "react";

import { SmoothScroll } from "../../utils/smoothScroll";

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
  const sides: OstSongSide[] = [
    { label: "A", tracks: songs.slice(0, midpoint) },
    { label: "B", tracks: songs.slice(midpoint) },
  ].filter((side: OstSongSide): boolean => {
    return side.tracks.length > 0;
  });

  const panelRefA: React.RefObject<HTMLElement | null> =
    useRef<HTMLElement>(null);
  const panelRefB: React.RefObject<HTMLElement | null> =
    useRef<HTMLElement>(null);

  useEffect((): (() => void) => {
    const desktop: MediaQueryList = window.matchMedia("(min-width: 64rem)");
    const destroyFns: (() => void)[] = [];

    function initPanels(): void {
      if (!desktop.matches) {
        return;
      }
      [panelRefA, panelRefB].forEach(
        (ref: React.RefObject<HTMLElement | null>): void => {
          const container: HTMLElement | null = ref.current;
          if (!container) {
            return;
          }
          destroyFns.push(SmoothScroll.initContainer(container));
          return;
        },
      );
      return;
    }

    initPanels();

    function handleChange(event: MediaQueryListEvent): void {
      destroyFns.forEach((destroy: () => void): void => {
        destroy();
        return;
      });
      destroyFns.length = 0;
      if (event.matches) {
        initPanels();
      }
      return;
    }

    desktop.addEventListener("change", handleChange);

    return (): void => {
      desktop.removeEventListener("change", handleChange);
      destroyFns.forEach((destroy: () => void): void => {
        destroy();
        return;
      });
      return;
    };
  }, []);

  return (
    <div className={styles.sides}>
      {sides.map((_side: OstSongSide, sideIndex: number): React.JSX.Element => {
        const side: OstSongSide | undefined = sides[sideIndex];
        if (!side) {
          return <></>;
        }
        const { label, tracks }: OstSongSide = side;
        const panelRef: React.RefObject<HTMLElement | null> =
          sideIndex === 0 ? panelRefA : panelRefB;
        return (
          <section
            key={label}
            ref={panelRef}
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
              {tracks.map(
                (song: OstSongs[number], index: number): React.JSX.Element => {
                  return (
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
                  );
                },
              )}
            </ol>
          </section>
        );
      })}
    </div>
  );
}
