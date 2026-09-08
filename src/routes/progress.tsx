import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ProgressBar } from "@/components/ProgressBar";
import { StatusChip } from "@/components/StatusChip";
import { Footer } from "@/components/Footer";
import { useDoomsday } from "@/lib/app-state";
import { watchlist } from "@/data/watchlist";
import { STATUS_LABEL, type WatchStatus } from "@/lib/watch-status";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress — Doomsday Watch Terminal" },
      {
        name: "description",
        content:
          "Track your Marvel prep: completion percentage, in-progress titles and everything still ahead of Doomsday.",
      },
      { property: "og:title", content: "Doomsday Watch Progress" },
      {
        property: "og:description",
        content: "Completion percentage and per-title status for the full Doomsday watchlist.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgressPage;
});

const FILTERS = ["ALL", "NOT STARTED", "IN PROGRESS", "COMPLETED"] as const;
type Filter = (typeof FILTERS)[number];

function Stat({ label, value, tone }: { label: string; value: string; tone?: string }) {
  return (
    <div className="panel relative px-4 py-5 text-center">
      <p className="label-hud">{label}</p>
      <p className={`mt-2 font-mono text-2xl font-bold tabular-nums sm:text-3xl ${tone ?? ""}`}>
        {value}
      </p>
    </div>
  );
}

function ProgressPage() {
  const { settings, watch } = useDoomsday();
  const { statusOf, setStatus, reset, total, completed, inProgress, notStarted, percent } = watch;
  const [filter, setFilter] = useState<Filter>("ALL");

  const items = watchlist.filter((i) =>
    filter === "ALL" ? true : STATUS_LABEL[statusOf(i.id)] === filter,
  );

  const onReset = () => {
    if (window.confirm("Reset every watch status back to NOT STARTED?")) reset();
  };

  const opts: WatchStatus[] = ["not-started", "in-progress", "completed"];

  return (
    <>
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6">
        <section className="pt-6">
          <p className="label-hud text-silver/70">Preparation readout</p>
          <h1 className="mt-3 text-2xl font-black tracking-[0.14em] text-glow sm:text-4xl">
            PROGRESS
          </h1>
        </section>

        <div className="mt-8">
          <ProgressBar
            completed={completed}
            total={total}
            percent={percent}
            effects={settings.effects}
          />
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <Stat label="Completed" value={String(completed)} tone="text-accent" />
          <Stat label="In progress" value={String(inProgress)} tone="text-primary" />
          <Stat label="Not started" value={String(notStarted)} />
          <Stat label="Total titles" value={String(total)} />
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={`border px-3 py-2 font-mono text-[0.6rem] tracking-[0.2em] transition-all ${
                filter === f
                  ? "border-primary/70 bg-primary/15 text-foreground shadow-[var(--glow-red)]"
                  : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
          <button
            type="button"
            onClick={onReset}
            className="ml-auto border border-border/60 px-3 py-2 font-mono text-[0.6rem] tracking-[0.2em] text-muted-foreground/70 transition-colors hover:border-destructive/60 hover:text-destructive"
          >
            RESET ALL
          </button>
        </div>

        <ul className="mt-6 space-y-3">
          {items.map((item, i) => {
            const status = statusOf(item.id);
            return (
              <li
                key={item.id}
                className={`panel flex flex-col gap-4 p-4 transition-all sm:p-5 ${
                  status === "completed"
                    ? "border-l-2 border-l-accent/60"
                    : status === "in-progress"
                      ? "border-l-2 border-l-primary/70"
                      : "border-l-2 border-l-border"
                }`}
              >
                <div className="flex flex-wrap items-start gap-4">
                  <span className="font-mono text-xs tabular-nums text-primary/80">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <h2
                      className={`font-display text-sm font-semibold tracking-[0.06em] sm:text-base ${
                        status === "completed" ? "line-through decoration-accent/50" : ""
                      }`}
                    >
                      {item.title}
                      {item.season ? ` — Season ${item.season}` : ""}
                    </h2>
                    <p className="label-hud mt-1.5 text-[0.6rem]">
                      {item.type} · {item.year}
                    </p>
                    {item.description && (
                      <p className="mt-2 text-xs text-muted-foreground">{item.description}</p>
                    )}
                  </div>
                  <StatusChip status={status} />
                </div>
                <div className="flex flex-wrap gap-1">
                  {opts.map((o) => (
                    <button
                      key={o}
                      type="button"
                      onClick={() => setStatus(item.id, o)}
                      aria-pressed={status === o}
                      aria-label={`Set ${item.title} to ${STATUS_LABEL[o]}`}
                      className={`border px-2.5 py-1.5 font-mono text-[0.55rem] tracking-[0.18em] transition-all ${
                        status === o
                          ? "border-primary/70 bg-primary/15 text-foreground"
                          : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
                      }`}
                    >
                      {STATUS_LABEL[o]}
                    </button>
                  ))}
                </div>
              </li>
            );
          })}
          {items.length === 0 && (
            <li className="panel p-8 text-center">
              <p className="label-hud">No titles in this filter</p>
            </li>
          )}
        </ul>
        <p className="label-hud mt-6 text-[0.55rem] text-muted-foreground/60">
          Percentage counts completed titles fully and in-progress titles as half a step.
        </p>
      </main>
      <Footer />
    </>
  );
}
