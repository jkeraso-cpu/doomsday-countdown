import { useEffect, useRef, useState } from "react";
import { Pause, Play, Repeat, Volume2, VolumeX } from "lucide-react";
import { SOUNDTRACK_SRC, SOUNDTRACK_TITLE, type Settings } from "@/config";

interface Props {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
  activated: boolean;
}

export function MusicPlayer({ settings, update, activated }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [blocked, setBlocked] = useState(false);

  const src = SOUNDTRACK_SRC;
  const hasTrack = Boolean(src);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    el.volume = settings.volume;
    el.muted = settings.muted;
    el.loop = settings.loop;
  }, [settings.volume, settings.muted, settings.loop, src]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el || !hasTrack) return;
    if (activated && settings.musicEnabled) {
      el.play()
        .then(() => {
          setPlaying(true);
          setBlocked(false);
        })
        .catch(() => {
          setPlaying(false);
          setBlocked(true);
        });
    } else {
      el.pause();
      setPlaying(false);
      setBlocked(false);
    }
  }, [activated, settings.musicEnabled, hasTrack, src]);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) {
      el.pause();
      setPlaying(false);
    } else {
      el.play()
        .then(() => {
          setPlaying(true);
          setBlocked(false);
        })
        .catch(() => {
          setPlaying(false);
          setBlocked(true);
        });
    }
  };


  return (
    <div className="panel corner-brackets relative p-5 sm:p-6">
      <div className="flex items-center gap-4">
        <p className="label-hud">Doomsday soundtrack</p>
        <div className="hud-rule flex-1" />
      </div>

      {hasTrack ? (
        <>
          <p className="mt-4 font-mono text-xs tracking-[0.18em] text-primary">
            {playing ? "NOW PLAYING" : blocked ? "TAP PLAY TO START AUDIO" : "PAUSED"}
          </p>
          <p className="mt-1.5 truncate font-display text-sm tracking-[0.08em]">
            {SOUNDTRACK_TITLE}
          </p>


          <audio ref={audioRef} src={src} preload="metadata" />

          <div className="mt-5 flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={togglePlay}
              aria-label={playing ? "Pause soundtrack" : "Play soundtrack"}
              className="border border-primary/60 p-2.5 transition-all hover:bg-primary/15 hover:shadow-[var(--glow-red)]"
            >
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => update({ muted: !settings.muted })}
              aria-label={settings.muted ? "Unmute" : "Mute"}
              aria-pressed={settings.muted}
              className={`border p-2.5 transition-all ${settings.muted ? "border-destructive/60 text-destructive" : "border-border hover:border-primary/60"}`}
            >
              {settings.muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <button
              type="button"
              onClick={() => update({ loop: !settings.loop })}
              aria-label="Toggle loop"
              aria-pressed={settings.loop}
              className={`border p-2.5 transition-all ${settings.loop ? "border-accent/60 text-accent" : "border-border hover:border-primary/60"}`}
            >
              <Repeat className="h-4 w-4" />
            </button>
            <label className="ml-1 flex flex-1 items-center gap-3">
              <span className="label-hud text-[0.55rem]">Vol</span>
              <input
                type="range"
                min={0}
                max={100}
                value={Math.round(settings.volume * 100)}
                onChange={(e) => update({ volume: Number(e.target.value) / 100 })}
                aria-label="Volume"
                className="h-1 w-full min-w-24 flex-1 cursor-pointer appearance-none bg-border accent-[oklch(0.52_0.21_25)]"
              />
            </label>
          </div>
        </>
      ) : (
        <p className="mt-4 font-mono text-xs tracking-[0.2em] text-muted-foreground">
          SOUNDTRACK OFFLINE
        </p>
      )}
    </div>

  );
}
