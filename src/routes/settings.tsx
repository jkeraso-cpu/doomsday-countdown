import { useRef } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Footer } from "@/components/Footer";
import { useDoomsday } from "@/lib/app-state";
import { media } from "@/data/media";
import { SLIDESHOW_INTERVALS, STORAGE, type BackgroundMode } from "@/config";
import type { StatusMap } from "@/lib/watch-status";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — Doomsday Watch Terminal" },
      {
        name: "description",
        content:
          "Control the background slideshow, ambience, cinematic effects and your saved Doomsday watch data.",
      },
      { property: "og:title", content: "Doomsday Watch Settings" },
      {
        property: "og:description",
        content: "Background slideshow, ambience and data controls for the Doomsday watch terminal.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsPage,
});

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 py-4 last:border-0">
      <span className="label-hud">{label}</span>
      <div className="flex flex-wrap items-center gap-2">{children}</div>
    </div>
  );
}

function Toggle({
  options,
  value,
  onChange,
}: {
  options: { label: string; value: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex gap-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => onChange(o.value)}
          aria-pressed={value === o.value}
          className={`border px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.18em] transition-all ${
            value === o.value
              ? "border-primary/70 bg-primary/15 text-foreground"
              : "border-border text-muted-foreground hover:text-foreground"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function SettingsPage() {
  const { settings, update, watch } = useDoomsday();
  const fileRef = useRef<HTMLInputElement>(null);

  const exportData = () => {
    const blob = new Blob([JSON.stringify(watch.statuses, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "doomsday-watch-status.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importData = async (file?: File) => {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (parsed && typeof parsed === "object") watch.persist(parsed as StatusMap);
      else window.alert("That file doesn't contain valid watch data.");
    } catch {
      window.alert("Could not read that file.");
    }
  };

  const onReset = () => {
    if (window.confirm("Reset every watch status back to NOT STARTED?")) watch.reset();
  };

  return (
    <>
      <main className="mx-auto max-w-4xl px-4 pb-16 pt-24 sm:px-6">
        <section className="pt-6">
          <p className="label-hud text-silver/70">Terminal configuration</p>
          <h1 className="mt-3 text-2xl font-black tracking-[0.14em] text-glow sm:text-4xl">
            SETTINGS
          </h1>
        </section>

        <div className="panel corner-brackets relative mt-8 p-5 sm:p-6">
          <p className="label-hud pb-2 text-primary">Background slideshow</p>
          <Row label="Source">
            <Toggle
              value={settings.background}
              onChange={(v) => update({ background: v as BackgroundMode })}
              options={[
                { label: "AUTO", value: "auto" },
                { label: "IMAGES", value: "images" },
                { label: "VIDEO", value: "video" },
              ]}
            />
          </Row>
          <Row label="Slideshow">
            <Toggle
              value={settings.slideshow ? "on" : "off"}
              onChange={(v) => update({ slideshow: v === "on" })}
              options={[
                { label: "ON", value: "on" },
                { label: "OFF", value: "off" },
              ]}
            />
          </Row>
          <Row label="Rotation interval">
            <Toggle
              value={String(settings.slideshowInterval)}
              onChange={(v) => update({ slideshowInterval: Number(v) })}
              options={SLIDESHOW_INTERVALS.map((s) => ({ label: `${s}S`, value: String(s) }))}
            />
          </Row>
          <Row label="Built-in collection">
            <span className="label-hud text-[0.55rem] text-muted-foreground/60">
              {media.length} FRAMES SHIPPED WITH THE APP
            </span>
          </Row>
        </div>

        <div className="panel corner-brackets relative mt-4 p-5 sm:p-6">
          <p className="label-hud pb-2 text-primary">Ambience</p>
          <Row label="Background soundtrack">
            <Toggle
              value={settings.musicEnabled && !settings.muted ? "on" : "off"}
              onChange={(v) => update({ musicEnabled: v === "on", muted: false })}
              options={[
                { label: "ON", value: "on" },
                { label: "OFF", value: "off" },
              ]}
            />
          </Row>
          <Row label="Volume">
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(settings.volume * 100)}
              onChange={(e) => update({ volume: Number(e.target.value) / 100, muted: false })}
              aria-label="Ambience volume"
              className="h-1 w-40 cursor-pointer appearance-none bg-border accent-[oklch(0.52_0.21_25)]"
            />
            <span className="label-hud text-[0.55rem] text-muted-foreground/60">
              {Math.round(settings.volume * 100)}%
            </span>
          </Row>
          <Row label="Cinematic effects">
            <Toggle
              value={settings.effects ? "on" : "off"}
              onChange={(v) => update({ effects: v === "on" })}
              options={[
                { label: "ON", value: "on" },
                { label: "OFF", value: "off" },
              ]}
            />
          </Row>
        </div>

        <div className="panel corner-brackets relative mt-4 p-5 sm:p-6">
          <p className="label-hud pb-2 text-primary">Watch data</p>
          <Row label="Saved statuses">
            <button
              type="button"
              onClick={exportData}
              className="border border-border px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.18em] transition-colors hover:border-primary/60"
            >
              EXPORT
            </button>
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="border border-border px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.18em] transition-colors hover:border-primary/60"
            >
              IMPORT
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => importData(e.target.files?.[0])}
            />
            <button
              type="button"
              onClick={onReset}
              className="border border-border/60 px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.18em] text-muted-foreground/70 transition-colors hover:border-destructive/60 hover:text-destructive"
            >
              RESET
            </button>
          </Row>
          <p className="label-hud pt-4 text-[0.55rem] text-muted-foreground/60">
            Stored locally in this browser ({STORAGE.settings})
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
