import credits from "./data/credits.json" with { type: "json" };
import links from "./data/links.json" with { type: "json" };
import project from "./data/project.json" with { type: "json" };
import songs from "./data/songs.json" with { type: "json" };

import type { OstSong } from "./interfaces/OstSong";
import type { OstPlayRequest } from "./types/OstPlayRequest";
import type { OstPlayRequestState } from "./types/OstPlayRequestState";

import { useEffect, useRef, useState } from "react";

import { Footer } from "./components/Footer";
import { Main } from "./components/Main";
import { OstAudioPlayer } from "./components/OstAudioPlayer";
import { OstHero } from "./components/OstHero";
import { OstSongList } from "./components/OstSongList";
import { ErrorBoundary } from "./components/ErrorBoundary";

import { initParallax } from "./utils/parallax";
import { initSmoothScroll } from "./utils/smoothScroll";

import "./App.css";

function App(): React.JSX.Element {
  const errorFallbackStyle: React.CSSProperties = {
    position: "fixed",
    inset: "0",
    zIndex: 10000,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "1rem",
    padding: "2rem",
    background: "var(--color-surface)",
    border: "1px solid var(--color-border)",
    color: "var(--color-text-primary)",
    font: "400 var(--font-size-meta) var(--font-mono)",
    textAlign: "center",
  };

  const [playRequest, setPlayRequest]: OstPlayRequestState =
    useState<OstPlayRequest | null>(null);
  const [activeSongId, setActiveSongId] = useState<string | null>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  useEffect((): (() => void) => initParallax(), []);
  useEffect(
    (): (() => void) =>
      initSmoothScroll({
        duration: 1.2,
        wheelMultiplier: 0.8,
        touchMultiplier: 0.8,
      }),
    [],
  );

  const handlePlay = (song: OstSong): void => {
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setPlayRequest({ song });
    setActiveSongId(song.id);
    return;
  };

  const handleClose = (): void => {
    returnFocusRef.current?.focus();
    setPlayRequest(null);
    setActiveSongId(null);
    return;
  };

  const handlePlaybackChange = (isPlaying: boolean): void => {
    if (!playRequest) {
      return;
    }
    setActiveSongId(isPlaying ? playRequest.song.id : null);
    return;
  };

  return (
    <>
      <Main>
        <OstHero trackCount={songs.length} />
        <OstSongList
          activeSongId={activeSongId}
          songs={songs}
          onPlay={handlePlay}
        />
        {playRequest && (
          <ErrorBoundary
            fallback={
              <div style={errorFallbackStyle}>
                <p>Error loading the player. Close and try again.</p>
                <button type="button" onClick={handleClose}>
                  Close
                </button>
              </div>
            }
          >
            <OstAudioPlayer
              playRequest={playRequest}
              onClose={handleClose}
              onPlaybackChange={handlePlaybackChange}
            />
          </ErrorBoundary>
        )}
      </Main>
      <Footer
        about={project.about}
        author={project.author}
        copyright={project.copyright}
        credits={credits}
        officialLinks={links}
      />
    </>
  );
}

export default App;
