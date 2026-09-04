import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { IMAGE_INTERVAL, type BackgroundMode } from "@/config";
import { media } from "@/data/media";

interface Props {
  mode: BackgroundMode;
  effects: boolean;
  reducedMotion: boolean;
}

export function MediaBackground({ mode, effects, reducedMotion }: Props) {
  const items = useMemo(() => {
    const filtered =
      mode === "images"
        ? media.filter((m) => m.type === "image")
        : mode === "video"
          ? media.filter((m) => m.type === "video")
          : media;
    return filtered.length ? filtered : media;
  }, [mode]);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [failed, setFailed] = useState<Record<string, boolean>>({});

  useEffect(() => setIndex(0), [items]);

  useEffect(() => {
    if (paused || items.length < 2) return;
    const current = items[index];
    if (current?.type === "video") return;
    const id = window.setInterval(
      () => setIndex((i) => (i + 1) % items.length),
      IMAGE_INTERVAL,
    );
    return () => window.clearInterval(id);
  }, [paused, items, index]);

  const current = items[index];
  const animate = effects && !reducedMotion;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-background" aria-hidden="true">
      {items.map((item, i) => {
        const active = i === index;
        if (failed[item.src]) return null;
        return (
          <div
            key={item.src + i}
            className="absolute inset-0 transition-opacity duration-[1600ms]"
            style={{ opacity: active ? 1 : 0 }}
          >
            {item.type === "video" ? (
              active ? (
                <video
                  className="h-full w-full object-cover"
                  src={item.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  onError={() => setFailed((f) => ({ ...f, [item.src]: true }))}
                />
              ) : null
            ) : (
              <img
                src={item.src}
                alt=""
                loading={i === 0 ? "eager" : "lazy"}
                className={`h-full w-full object-cover ${animate && active ? "anim-drift" : "scale-105"}`}
                onError={() => setFailed((f) => ({ ...f, [item.src]: true }))}
              />
            )}
          </div>
        );
      })}

      {/* Overlays: darkening, vignette, scanlines, grain */}
      <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/60 to-background/95" />
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(ellipse_at_center,transparent_30%,oklch(0.04_0_0/0.7)_88%)]" />
      {effects && <div className="scanlines pointer-events-none absolute inset-0 opacity-40" />}
      {effects && <div className="grain pointer-events-none absolute inset-0" />}

      {effects && !reducedMotion && (
        <div className="pointer-events-none absolute inset-0">
          {Array.from({ length: 14 }).map((_, i) => (
            <span
              key={i}
              className="absolute block h-[2px] w-[2px] rounded-full bg-primary/70"
              style={{
                left: `${(i * 7.3 + 4) % 100}%`,
                bottom: "-4px",
                animation: `float-up ${22 + (i % 5) * 6}s linear ${i * 1.7}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* Minimal media controls */}
      <div className="pointer-events-auto absolute bottom-4 right-4 z-10 flex items-center gap-1 border border-border bg-background/60 px-1.5 py-1 backdrop-blur">
        <button
          type="button"
          aria-label="Previous background"
          onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
          className="p-1 text-muted-foreground transition-colors hover:text-primary"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        <button
          type="button"
          aria-label={paused ? "Resume background rotation" : "Pause background rotation"}
          onClick={() => setPaused((p) => !p)}
          className="p-1 text-muted-foreground transition-colors hover:text-primary"
        >
          {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
        </button>
        <button
          type="button"
          aria-label="Next background"
          onClick={() => setIndex((i) => (i + 1) % items.length)}
          className="p-1 text-muted-foreground transition-colors hover:text-primary"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
        <span className="label-hud ml-1 hidden max-w-[16ch] truncate sm:block">
          {current?.title ?? "NO SIGNAL"}
        </span>
      </div>
    </div>
  );
}
