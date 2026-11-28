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

import { initParallax } from "./utils/parallax";
import { initSmoothScroll } from "./utils/smoothScroll";

import "./App.css";

function App(): React.JSX.Element {
  const [playRequest, setPlayRequest]: OstPlayRequestState =
    useState<OstPlayRequest | null>(null);
  const [activeSongId, setActiveSongId]: [
    string | null,
    React.Dispatch<React.SetStateAction<string | null>>,
  ] = useState<string | null>(null);
  const returnFocusRef: React.RefObject<HTMLElement | null> =
    useRef<HTMLElement | null>(null);

  useEffect((): (() => void) => {
    return initParallax();
  }, []);
  useEffect((): (() => void) => {
    return initSmoothScroll({
      duration: 1.2,
      wheelMultiplier: 0.8,
      touchMultiplier: 0.8,
    });
  }, []);

  function handlePlay(song: OstSong): void {
    returnFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    setPlayRequest({ song });
    setActiveSongId(song.id);
    return;
  }

  function handleClose(): void {
    returnFocusRef.current?.focus();
    setPlayRequest(null);
    setActiveSongId(null);
    return;
  }

  function handlePlaybackChange(isPlaying: boolean): void {
    if (!playRequest) {
      return;
    }
    setActiveSongId(isPlaying ? playRequest.song.id : null);
    return;
  }

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
          <OstAudioPlayer
            playRequest={playRequest}
            onClose={handleClose}
            onPlaybackChange={handlePlaybackChange}
          />
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
