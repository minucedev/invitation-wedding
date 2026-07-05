"use client";

import { useEffect, useRef, useState } from "react";
import { getDict, type Locale } from "@/lib/i18n";

// ⬇️ NHẠC NỀN: file lưu sẵn tại public/audio/canon-in-d.mp3
// ("Canon in D / Pachelbel's Canon" — Cello & Piano, bản wedding).
// Thay file đó để đổi bài, hoặc đổi đường dẫn này.
const MUSIC_SRC = "/audio/canon-in-d.mp3";

// Âm lượng nền mặc định (0–1). Để nhỏ cho nhẹ nhàng, không lấn tiếng.
const DEFAULT_VOLUME = 0.25;

/**
 * Floating play/pause control for soft background music.
 * Browsers block autoplay-with-sound until the visitor interacts with the page,
 * so we try to play on mount and otherwise start on the very first interaction
 * (click / scroll / tap / key) — which feels like autoplay.
 * Renders nothing until a track URL is provided in MUSIC_SRC.
 */
export default function MusicPlayer({ lang }: { lang: Locale }) {
  const t = getDict(lang).musicPlayer;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!MUSIC_SRC) return;
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = DEFAULT_VOLUME;

    const start = () => {
      audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    };

    // Try immediately (works if the browser already trusts this site).
    start();

    // Fallback: kick off on the first user interaction, then stop listening.
    const events: (keyof DocumentEventMap)[] = [
      "pointerdown",
      "keydown",
      "touchstart",
      "scroll",
    ];
    const onFirst = () => {
      start();
      events.forEach((e) => window.removeEventListener(e, onFirst));
    };
    events.forEach((e) =>
      window.addEventListener(e, onFirst, { once: true, passive: true })
    );

    return () => events.forEach((e) => window.removeEventListener(e, onFirst));
  }, []);

  if (!MUSIC_SRC) return null;

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      try {
        await audio.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    }
  };

  return (
    <>
      <audio ref={audioRef} src={MUSIC_SRC} loop preload="auto" />
      <button
        onClick={toggle}
        aria-label={playing ? t.pause : t.play}
        aria-pressed={playing}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-custom-light/90 backdrop-blur-md border border-custom-gold shadow-lg flex items-center justify-center text-custom-burgundy hover:bg-custom-gold/10 transition-colors duration-300"
      >
        {playing && (
          <span className="absolute inset-0 rounded-full border border-custom-gold animate-pulse-slow opacity-50"></span>
        )}
        <span className="material-symbols-outlined">
          {playing ? "music_note" : "music_off"}
        </span>
      </button>
    </>
  );
}
