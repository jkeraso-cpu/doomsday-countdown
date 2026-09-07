import { useEffect, useRef, useState } from "react";
import { Volume2 } from "lucide-react";
import { SOUNDTRACK_SRC } from "@/config";
import { useDoomsday } from "@/lib/app-state";

/**
 * Atmospheric background soundtrack. Deliberately NOT a music player:
 * no track title, no artist, no transport UI. Only an autoplay-safe
 * unmute affordance when the browser blocks playback.
 */
export function AmbientAudio() {
  const { settings, activated } = useDoomsday();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [blocked, setBlocked] = useState(false);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = settings.volume;
    el.muted = settings.muted;
    el.loop = true;
  }, [settings.volume, settings.muted]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !SOUNDTRACK_SRC) return;
    if (activated && settings.musicEnabled) {
      el.play()
        .then(() => setBlocked(false))
        .catch(() => setBlocked(true));
    } else {
      el.pause();
      setBlocked(false);
    }
  }, [activated, settings.musicEnabled]);

  const enable = () => {
    audioRef.current
      ?.play()
      .then(() => setBlocked(false))
      .catch(() => setBlocked(true));
  };

  return (
    <>
      <audio ref={audioRef} src={SOUNDTRACK_SRC} preload="auto" />
      {blocked && settings.musicEnabled && (
        <button
          type="button"
          onClick={enable}
          className="fixed bottom-4 left-4 z-30 flex items-center gap-2 border border-border bg-background/70 px-3 py-2 font-mono text-[0.6rem] tracking-[0.2em] text-muted-foreground backdrop-blur transition-colors hover:border-primary/60 hover:text-foreground"
        >
          <Volume2 className="h-3.5 w-3.5" /> ENABLE AMBIENCE
        </button>
      )}
    </>
  );
}
