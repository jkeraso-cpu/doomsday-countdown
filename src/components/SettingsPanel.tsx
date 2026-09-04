import { useRef } from "react";
import { X } from "lucide-react";
import { SLIDESHOW_INTERVALS, STORAGE, type BackgroundMode, type Settings } from "@/config";
import type { CustomBackground, Progress } from "@/lib/doomsday-store";
import { MusicPlayer } from "./MusicPlayer";

interface Props {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
  progress: Progress;
  setProgress: (p: Progress) => void;
  reset: () => void;
  activated: boolean;
  onReplayIntro: () => void;
  backgrounds: CustomBackground[];
  addBackgrounds: (files: File[]) => void;
  removeBackground: (src: string) => void;
  clearBackgrounds: () => void;
}


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

export function SettingsPanel({
  settings,
  update,
  progress,
  setProgress,
  reset,
  activated,
  onReplayIntro,
}: Props) {
  const fileRef = useRef<HTMLInputElement>(null);

  const exportProgress = () => {
    const blob = new Blob([JSON.stringify(progress, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "doomsday-progress.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const importProgress = async (file?: File) => {
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      if (parsed && typeof parsed === "object") setProgress(parsed as Progress);
      else window.alert("That file doesn't contain valid progress data.");
    } catch {
      window.alert("Could not read that file.");
    }
  };

  const onReset = () => {
    if (window.confirm("Reset your entire Doomsday preparation progress?")) reset();
  };

  return (
    <section id="settings" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-16 sm:px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold tracking-[0.2em] sm:text-xl">SETTINGS</h2>
        <div className="hud-rule flex-1" />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="panel corner-brackets relative p-5 sm:p-6">
          <Row label="Background">
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
          <Row label="Music">
            <Toggle
              value={settings.musicEnabled ? "on" : "off"}
              onChange={(v) => update({ musicEnabled: v === "on" })}
              options={[
                { label: "ENABLE", value: "on" },
                { label: "DISABLE", value: "off" },
              ]}
            />
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
          <Row label="Intro on startup">
            <Toggle
              value={settings.showIntro ? "on" : "off"}
              onChange={(v) => update({ showIntro: v === "on" })}
              options={[
                { label: "ON", value: "on" },
                { label: "OFF", value: "off" },
              ]}
            />
            <button
              type="button"
              onClick={onReplayIntro}
              className="border border-border px-3 py-1.5 font-mono text-[0.6rem] tracking-[0.18em] text-muted-foreground transition-colors hover:border-primary/60 hover:text-foreground"
            >
              REPLAY
            </button>
          </Row>
          <Row label="Data">
            <button
              type="button"
              onClick={exportProgress}
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
              onChange={(e) => importProgress(e.target.files?.[0])}
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

        <MusicPlayer settings={settings} update={update} activated={activated} />
      </div>
    </section>
  );
}
