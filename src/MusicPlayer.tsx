import { useState, useRef, useCallback } from "react";
import { useLang } from "./LanguageContext";

const MUSIC_MUTED_KEY = "alyazouri_music_muted";
const YOUTUBE_VIDEO_ID = "x-DJKKK8kns";
const MUSIC_VOLUME = 15;

declare global {
  interface Window {
    YT: {
      Player: new (
        elementId: string,
        options: {
          videoId: string;
          playerVars: Record<string, unknown>;
          events: Record<string, (e: { data: number }) => void>;
        }
      ) => YTPlayer;
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTPlayer {
  setVolume: (v: number) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
}

export function MusicPlayer() {
  const { lang } = useLang();
  const isAr = lang === "ar";
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(() => {
    try { return localStorage.getItem(MUSIC_MUTED_KEY) === "true"; } catch { return false; }
  });
  const [loaded, setLoaded] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const initPlayer = useCallback(() => {
    if (loaded) return;
    setLoaded(true);

    const div = document.createElement("div");
    div.id = "yt-music-player";
    div.style.cssText = "position:fixed;top:-9999px;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none;";
    document.body.appendChild(div);
    containerRef.current = div;

    const create = (PC: typeof window.YT.Player) => {
      if (playerRef.current) return;
      const p = new PC("yt-music-player", {
        videoId: YOUTUBE_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          loop: 1,
          playlist: YOUTUBE_VIDEO_ID,
          controls: 0,
          disablekb: 1,
          fs: 0,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3,
          origin: window.location.origin
        },
        events: {
          onReady: () => {
            playerRef.current = p;
            p.setVolume(MUSIC_VOLUME);
            unmute(p);
          },
          onStateChange: (e: { data: number }) => {
            if (e.data === 0) {
              p.seekTo(0, true);
              p.playVideo();
            }
          },
        },
      });
    };

    window.onYouTubeIframeAPIReady = () => {
      if (window.YT) create(window.YT.Player);
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(tag);
    }

    const check = () => {
      if (window.YT?.Player) create(window.YT.Player);
      else setTimeout(check, 200);
    };
    check();
  }, [loaded]);

  const unmute = useCallback((p?: YTPlayer) => {
    const player = p ?? playerRef.current;
    if (!player) return;
    try {
      player.setVolume(MUSIC_VOLUME);
      player.playVideo();
    } catch { /* */ }
    setMuted(false);
    setPlaying(true);
    try { localStorage.setItem(MUSIC_MUTED_KEY, "false"); } catch { /* */ }
  }, []);

  const mute = useCallback(() => {
    const player = playerRef.current;
    if (!player) {
      setMuted(true);
      try { localStorage.setItem(MUSIC_MUTED_KEY, "true"); } catch { /* */ }
      return;
    }
    try { player.pauseVideo(); } catch { /* */ }
    setMuted(true);
    setPlaying(false);
    try { localStorage.setItem(MUSIC_MUTED_KEY, "true"); } catch { /* */ }
  }, []);

  const toggle = () => {
    if (!loaded) {
      initPlayer();
      return;
    }
    if (muted) unmute();
    else mute();
  };

  return (
    <button
      onClick={toggle}
      className={`fixed bottom-4 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full border shadow-lg transition-all ${
        playing && !muted
          ? "border-emerald-400/50 bg-emerald-500/20 text-emerald-300"
          : "border-white/20 bg-black/50 text-white/50 hover:text-white"
      }`}
      title={isAr ? (muted ? "تشغيل الموسيقى" : "إيقاف الموسيقى") : (muted ? "Play Music" : "Mute Music")}
    >
      <span className="text-xl">{playing && !muted ? "🎵" : "🔇"}</span>
    </button>
  );
}
