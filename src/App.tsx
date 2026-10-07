import { useState } from "react";

import "./App.css";

import { OstAudioPlayer } from "./components/OstAudioPlayer";
import { OstData } from "./components/OstData";
import ostData from "./data/ost.json" with { type: "json" };
import type { OstSong } from "./interfaces/OstSong";
import type { OstPlayRequest } from "./types/OstPlayRequest";

function App(): React.JSX.Element {
  const [playRequest, setPlayRequest] = useState<OstPlayRequest | null>(null);

  const handlePlay = (song: OstSong): void => {
    setPlayRequest({ song });
  };

  const handleClose = (): void => {
    setPlayRequest(null);
  };

  return (
    <main>
      <OstData data={ostData} onPlay={handlePlay} />
      {playRequest && (
        <OstAudioPlayer request={playRequest} onClose={handleClose} />
      )}
    </main>
  );
}

export default App;
