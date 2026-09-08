import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Countdown } from "@/components/Countdown";
import { StatsPanel } from "@/components/StatsPanel";
import { StatusPanel } from "@/components/StatusPanel";
import { StatusChip } from "@/components/StatusChip";
import { Footer } from "@/components/Footer";
import { useDoomsday } from "@/lib/app-state";
import { STATUS_LABEL, type WatchStatus } from "@/lib/watch-status";
import type { WatchItem } from "@/data/watchlist";
import { heroImage } from "@/data/media";

export const Route = createFileRoute("/watch")({
  head: () => ({
    meta: [
      { title: "Watch Dashboard — Doomsday Watch Terminal" },
      {
        name: "description",
        content:
          "Live countdown to Avengers: Doomsday with your ongoing watch, next title and completed viewing log.",
      },
      { property: "og:title", content: "Doomsday Watch Dashboard" },
      {
        property: "og:description",
        content: "Ongoing watch, next title and completed log beside the live Doomsday countdown.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: WatchDashboard,
});

function SectionHead({ title, note }: { title: string; note?: string }) {
  return (
    <div className="flex items-center gap-4">
      <h2 className="text-base font-bold tracking-[0.2em] sm:text-lg">{title}</h2>
      <div className="hud-rule flex-1" />
      {note && <span className="label-hud hidden text-[0.55rem] sm:block">{note}</span>}
    </div>
  );
}

function StatusButtons({
  item,
  status,
  onSet,
}: {
  item: WatchItem;
  status: WatchStatus;
  onSet: (s: WatchStatus) => void;
}) {
  const opts: WatchStatus[] = ["not-started", "in-progress", "completed"];
  return (
    <div className="flex flex-wrap gap-1">
      {opts.map((o) => (
        <button
          key={o}
          type="button"
          onClick={() => onSet(o)}
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
  );
}

function WatchDashboard() {
  const { watch } = useDoomsday();
  const { ongoing, next, previously, completed, total, percent, inProgress, setStatus } = watch;

  return (
    <>
      <main className="pt-24">
        <section className="mx-auto max-w-6xl px-4 pt-6 sm:px-6">
          <p className="label-hud text-silver/70">Doomsday watch terminal</p>
          <h1 className="mt-3 text-2xl font-black tracking-[0.14em] text-glow sm:text-4xl">
            WATCH DASHBOARD
          </h1>
          <p className="label-hud mt-4 text-[0.6rem] text-accent/80">
            Monitoring {total} titles · {inProgress} in progress · {completed} logged
          </p>
        </section>

        <Countdown />
        <StatsPanel completed={completed} total={total} percent={percent} />

        <section className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
          <SectionHead title="ONGOING WATCH" note="LIVE FEED" />
          <div className="mt-6">
            {ongoing ? (
              <article className="panel panel-glow corner-brackets relative flex flex-col gap-5 p-5 sm:flex-row sm:p-6">
                <img
                  src={heroImage}
                  alt=""
                  className="h-40 w-28 shrink-0 border border-border object-cover sm:h-48 sm:w-32"
                />
                <div className="min-w-0 flex-1">
                  <StatusChip status="in-progress" />
                  <h3 className="mt-3 font-display text-lg font-bold tracking-[0.08em] sm:text-2xl">
                    {ongoing.title}
                    {ongoing.season ? ` — Season ${ongoing.season}` : ""}
                  </h3>
                  <p className="label-hud mt-2 text-[0.6rem]">
                    {ongoing.type} · {ongoing.year}
                  </p>
                  {ongoing.description && (
                    <p className="mt-3 max-w-xl text-xs leading-relaxed text-muted-foreground">
                      {ongoing.description}
                    </p>
                  )}
                  <div className="mt-5">
                    <StatusButtons
                      item={ongoing}
                      status="in-progress"
                      onSet={(s) => setStatus(ongoing.id, s)}
                    />
                  </div>
                </div>
              </article>
            ) : (
              <div className="panel p-8 text-center">
                <p className="label-hud">No active watch — select a title below to begin</p>
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
          <SectionHead title="NEXT WATCH" note="QUEUED" />
          <div className="mt-6">
            {next ? (
              <article className="panel corner-brackets relative flex flex-wrap items-center justify-between gap-4 p-5 sm:p-6">
                <div className="min-w-0">
                  <StatusChip status="not-started" />
                  <h3 className="mt-3 font-display text-base font-semibold tracking-[0.06em] sm:text-lg">
                    {next.title}
                    {next.season ? ` — Season ${next.season}` : ""}
                  </h3>
                  <p className="label-hud mt-2 text-[0.6rem]">
                    {next.type} · {next.year}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setStatus(next.id, "in-progress")}
                  className="flex items-center gap-2 border border-primary/60 px-4 py-2.5 font-mono text-[0.6rem] tracking-[0.2em] transition-all hover:bg-primary/15 hover:shadow-[var(--glow-red)]"
                >
                  START WATCH <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </article>
            ) : (
              <div className="panel p-8 text-center">
                <p className="label-hud">Queue clear</p>
              </div>
            )}
          </div>
        </section>

        <section className="mx-auto mt-12 max-w-6xl px-4 sm:px-6">
          <SectionHead title="PREVIOUSLY WATCHED" note={`${previously.length} LOGGED`} />
          <ul className="mt-6 space-y-3">
            {previously.map((item, i) => (
              <li
                key={item.id}
                className="panel flex flex-wrap items-center gap-4 p-4 opacity-80 sm:p-5"
              >
                <span className="font-mono text-xs tabular-nums text-accent/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate font-display text-sm font-semibold tracking-[0.06em] line-through decoration-accent/50">
                    {item.title}
                    {item.season ? ` — Season ${item.season}` : ""}
                  </h3>
                  <p className="label-hud mt-1.5 text-[0.6rem]">
                    {item.type} · {item.year}
                  </p>
                </div>
                <StatusChip status="completed" />
                <button
                  type="button"
                  onClick={() => setStatus(item.id, "not-started")}
                  className="border border-border/60 px-3 py-1.5 font-mono text-[0.55rem] tracking-[0.18em] text-muted-foreground/70 transition-colors hover:border-primary/60 hover:text-foreground"
                >
                  CLEAR
                </button>
              </li>
            ))}
            {previously.length === 0 && (
              <li className="panel p-8 text-center">
                <p className="label-hud">No completed titles yet</p>
              </li>
            )}
          </ul>
          <p className="label-hud mt-6 text-[0.55rem] text-muted-foreground/60">
            Full watchlist and status control lives on the{" "}
            <Link to="/progress" className="text-primary hover:underline">
              progress page
            </Link>
            .
          </p>
        </section>

        <div className="mt-12">
          <StatusPanel completed={completed} total={total} />
        </div>
      </main>
      <Footer />
    </>
  );
}
