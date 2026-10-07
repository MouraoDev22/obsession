import { useEffect, useRef, useState } from "react";

import type { OstAudioPlayerProps } from "../../interfaces/OstAudioPlayerProps";
import {
  getYouTubeVideoId,
  loadYouTubeIframeApi,
  type YouTubePlayer,
} from "../../utils/youtube";
import styles from "./OstAudioPlayer.module.css";

const PLAYER_STATE_PLAYING = 1;
const PLAYER_STATE_BUFFERING = 3;

const PLAY_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PAUSE_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
  </svg>
);

const CLOSE_ICON = (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

export function OstAudioPlayer({
  onClose,
  request,
}: OstAudioPlayerProps): React.JSX.Element {
  const embedRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const targetVideoIdRef = useRef<string | null>(null);
  const isReadyRef = useRef(false);
  const isPlayingRef = useRef(false);

  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 1) Mantém a música-alvo sincronizada: troca a faixa ou alterna tocar/pausar.
  useEffect(() => {
    const videoId = getYouTubeVideoId(request.song.link);

    if (!videoId) {
      setError("Link do YouTube inválido.");
      return;
    }

    setError(null);

    const player = isReadyRef.current ? playerRef.current : null;

    if (player && targetVideoIdRef.current === videoId) {
      if (isPlayingRef.current) {
        player.pauseVideo();
      } else {
        player.playVideo();
      }
      return;
    }

    targetVideoIdRef.current = videoId;
    player?.loadVideoById(videoId);
  }, [request]);

  // 2) Cria o iframe oculto uma única vez enquanto o player está montado.
  useEffect(() => {
    const embed = embedRef.current;
    if (!embed) {
      return;
    }

    let cancelled = false;
    const initialVideoId = targetVideoIdRef.current;
    const host = document.createElement("div");
    embed.append(host);

    loadYouTubeIframeApi()
      .then((PlayerConstructor) => {
        if (cancelled) {
          return;
        }

        const player = new PlayerConstructor(host, {
          height: "1",
          width: "1",
          ...(initialVideoId ? { videoId: initialVideoId } : {}),
          playerVars: {
            autoplay: 1,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            onError: () => {
              if (!cancelled) {
                isPlayingRef.current = false;
                setIsPlaying(false);
                setError("Não foi possível reproduzir este vídeo.");
              }
            },
            onReady: () => {
              if (cancelled) {
                return;
              }
              isReadyRef.current = true;
              setIsReady(true);
              const target = targetVideoIdRef.current;
              if (target && target !== initialVideoId) {
                player.loadVideoById(target);
              }
            },
            onStateChange: (event) => {
              const playing =
                event.data === PLAYER_STATE_PLAYING ||
                event.data === PLAYER_STATE_BUFFERING;
              isPlayingRef.current = playing;
              setIsPlaying(playing);
            },
          },
        });

        playerRef.current = player;
      })
      .catch(() => {
        if (!cancelled) {
          setError("Não foi possível carregar o player do YouTube.");
        }
      });

    return () => {
      cancelled = true;
      isReadyRef.current = false;
      isPlayingRef.current = false;
      setIsReady(false);
      playerRef.current?.destroy();
      playerRef.current = null;
      host.remove();
    };
  }, []);

  const handleToggle = (): void => {
    const player = playerRef.current;
    if (!player || error) {
      return;
    }

    if (isPlayingRef.current) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const status = error
    ? error
    : !isReady
      ? "Carregando…"
      : isPlaying
        ? "Tocando agora"
        : "Pausado";

  return (
    <aside className={styles.player} aria-label="Player de áudio">
      <div ref={embedRef} className={styles.player_embed} aria-hidden="true" />

      <div className={styles.player_meta}>
        <span
          className={`${styles.player_indicator} ${
            isPlaying ? styles.player_indicator_active : ""
          }`}
          aria-hidden="true"
        />
        <div className={styles.player_text}>
          <p className={styles.player_title}>{request.song.name}</p>
          <p
            className={
              error ? styles.player_status_error : styles.player_status
            }
          >
            {status}
          </p>
        </div>
      </div>

      {error && (
        <a
          className={styles.player_link}
          href={request.song.link}
          target="_blank"
          rel="noreferrer"
        >
          Abrir no YouTube
        </a>
      )}

      <div className={styles.player_controls}>
        <button
          type="button"
          className={styles.player_btn}
          onClick={handleToggle}
          disabled={error !== null}
          aria-label={isPlaying ? "Pausar" : "Tocar"}
        >
          {isPlaying ? PAUSE_ICON : PLAY_ICON}
        </button>
        <button
          type="button"
          className={styles.player_btn}
          onClick={onClose}
          aria-label="Fechar player"
        >
          {CLOSE_ICON}
        </button>
      </div>
    </aside>
  );
}
