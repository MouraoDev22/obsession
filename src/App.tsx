import songs from "./data/songs.json" with { type: "json" };

import type { OstSong } from "./interfaces/OstSong";
import type { OstPlayRequest } from "./types/OstPlayRequest";
import type { OstPlayRequestState } from "./types/OstPlayRequestState";

import { useEffect, useState } from "react";

import { OstAudioPlayer } from "./components/OstAudioPlayer";
import { OstSongList } from "./components/OstSongList";

import { initParallax } from "./utils/parallax";

import "./App.css";

function App(): React.JSX.Element {
  const [playRequest, setPlayRequest]: OstPlayRequestState =
    useState<OstPlayRequest | null>(null);

  useEffect(() => initParallax(), []);

  const handlePlay = (song: OstSong): void => {
    setPlayRequest({ song });
    return;
  };

  const handleClose = (): void => {
    setPlayRequest(null);
    return;
  };

  return (
    <main>
      <OstSongList songs={songs} onPlay={handlePlay} />
      {playRequest && (
        <OstAudioPlayer playRequest={playRequest} onClose={handleClose} />
      )}
    </main>
  );
}

export default App;
