import type { OstAudioPlayerProps } from "../../interfaces/OstAudioPlayerProps";
import type { YouTubePlayer } from "../../utils/youtube/interfaces/YouTubePlayer";
import type { YouTubePlayerConstructor } from "../../utils/youtube/types/YouTubePlayerConstructor";

import { useEffect, useRef, useState } from "react";

import { getYouTubeVideoId, loadYouTubeIframeApi } from "../../utils/youtube";

import styles from "./OstAudioPlayer.module.css";

const PLAYER_STATE_PLAYING: number = 1;
const PLAYER_STATE_BUFFERING: number = 3;

const PLAY_ICON: React.JSX.Element = (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M8 5v14l11-7z" />
  </svg>
);

const PAUSE_ICON: React.JSX.Element = (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
  </svg>
);

const CLOSE_ICON: React.JSX.Element = (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
  </svg>
);

/**
 * Player de áudio fixo no rodapé / Fixed audio player in the page footer.
 *
 * PT: cria um iframe oculto do YouTube e controla a reprodução da música
 * indicada em `playRequest`; alterna tocar/pausar ao receber a mesma música
 * novamente.
 *
 * EN: creates a hidden YouTube iframe and controls playback of the song given
 * in `playRequest`; toggles play/pause when the same song is requested again.
 */
export function OstAudioPlayer({
  onClose,
  playRequest,
}: OstAudioPlayerProps): React.JSX.Element {
  const embedRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YouTubePlayer | null>(null);
  const targetVideoIdRef = useRef<string | null>(null);
  const isReadyRef = useRef<boolean>(false);
  const isPlayingRef = useRef<boolean>(false);

  const [isReady, setIsReady] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 1) Mantém a música-alvo sincronizada: troca a faixa ou alterna tocar/pausar.
  useEffect((): void => {
    const videoId: string | null = getYouTubeVideoId(
      playRequest.song.youtubeUrl,
    );

    if (!videoId) {
      setError("Link do YouTube inválido.");
      return;
    }

    setError(null);

    const player: YouTubePlayer | null = isReadyRef.current
      ? playerRef.current
      : null;

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
    return;
  }, [playRequest]);

  // 2) Cria o iframe oculto uma única vez enquanto o player está montado.
  useEffect((): void | (() => void) => {
    const embed: HTMLDivElement | null = embedRef.current;
    if (!embed) {
      return;
    }

    let cancelled: boolean = false;
    const initialVideoId: string | null = targetVideoIdRef.current;
    const host: HTMLDivElement = document.createElement("div");
    embed.append(host);

    loadYouTubeIframeApi()
      .then((PlayerConstructor: YouTubePlayerConstructor): void => {
        if (cancelled) {
          return;
        }

        const player: YouTubePlayer = new PlayerConstructor(host, {
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
            onError: (): void => {
              if (!cancelled) {
                isPlayingRef.current = false;
                setIsPlaying(false);
                setError("Não foi possível reproduzir este vídeo.");
              }
              return;
            },
            onReady: (): void => {
              if (cancelled) {
                return;
              }
              isReadyRef.current = true;
              setIsReady(true);
              const target: string | null = targetVideoIdRef.current;
              if (target && target !== initialVideoId) {
                player.loadVideoById(target);
              }
              return;
            },
            onStateChange: (event: {
              data: number;
              target: YouTubePlayer;
            }): void => {
              const playing: boolean =
                event.data === PLAYER_STATE_PLAYING ||
                event.data === PLAYER_STATE_BUFFERING;
              isPlayingRef.current = playing;
              setIsPlaying(playing);
              return;
            },
          },
        });

        playerRef.current = player;
        return;
      })
      .catch((): void => {
        if (!cancelled) {
          setError("Não foi possível carregar o player do YouTube.");
        }
        return;
      });

    return (): void => {
      cancelled = true;
      isReadyRef.current = false;
      isPlayingRef.current = false;
      setIsReady(false);
      playerRef.current?.destroy();
      playerRef.current = null;
      host.remove();
      return;
    };
  }, []);

  const handleToggle = (): void => {
    const player: YouTubePlayer | null = playerRef.current;
    if (!player || error) {
      return;
    }

    if (isPlayingRef.current) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
    return;
  };

  const status: string = error
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
          <p className={styles.player_title}>{playRequest.song.title}</p>
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
          href={playRequest.song.youtubeUrl}
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
