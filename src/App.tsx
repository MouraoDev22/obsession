import { useEffect, useState } from "react";

import "./App.css";

import { OstAudioPlayer } from "./components/OstAudioPlayer";
import { OstSongList } from "./components/OstSongList";
import songs from "./data/songs.json" with { type: "json" };
import type { OstSong } from "./interfaces/OstSong";
import type { OstPlayRequest } from "./types/OstPlayRequest";
import type { OstPlayRequestState } from "./types/OstPlayRequestState";
import { initParallax } from "./utils/parallax";

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
