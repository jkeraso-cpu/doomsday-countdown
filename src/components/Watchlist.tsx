import { useState } from "react";
import { Check } from "lucide-react";
import { watchlist } from "@/data/watchlist";
import { ProgressBar } from "./ProgressBar";
import type { Progress } from "@/lib/doomsday-store";

const FILTERS = ["ALL", "MOVIES", "SERIES", "COMPLETED", "REMAINING"] as const;
type Filter = (typeof FILTERS)[number];

interface Props {
  progress: Progress;
  toggle: (id: number) => void;
  reset: () => void;
  completed: number;
  total: number;
  percent: number;
  effects: boolean;
}

export function Watchlist({
  progress,
  toggle,
  reset,
  completed,
  total,
  percent,
  effects,
}: Props) {
  const [filter, setFilter] = useState<Filter>("ALL");

  const isDone = (id: number) => Boolean(progress[`movie-${id}`]);

  const items = watchlist.filter((item) => {
    switch (filter) {
      case "MOVIES":
        return item.type === "Movie";
      case "SERIES":
        return item.type === "Series";
      case "COMPLETED":
        return isDone(item.id);
      case "REMAINING":
        return !isDone(item.id);
      default:
        return true;
    }
  });

  const onReset = () => {
    if (window.confirm("Reset your entire Doomsday preparation progress?")) reset();
  };

  return (
    <section id="watchlist" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-16 sm:px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold tracking-[0.2em] sm:text-xl">DOOMSDAY WATCHLIST</h2>
        <div className="hud-rule flex-1" />
      </div>
      <p className="label-hud mt-3">Complete the required Marvel prep</p>

      <div className="mt-8">
        <ProgressBar completed={completed} total={total} percent={percent} effects={effects} />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            type="button"
            onClick={() => setFilter(f)}
            aria-pressed={filter === f}
            className={`border px-3 py-2 font-mono text-[0.65rem] tracking-[0.2em] transition-all ${
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
          RESET PROGRESS
        </button>
      </div>

      <ul className="mt-6 space-y-3">
        {items.map((item, i) => {
          const done = isDone(item.id);
          return (
            <li
              key={item.id}
              className={`panel flex flex-col gap-4 p-4 transition-all sm:flex-row sm:items-center sm:p-5 ${
                done ? "opacity-60" : ""
              }`}
            >
              <span className="font-mono text-xs tabular-nums text-primary/80">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0 flex-1">
                <h3
                  className={`truncate font-display text-sm font-semibold tracking-[0.06em] sm:text-base ${
                    done ? "line-through decoration-primary/60" : ""
                  }`}
                >
                  {item.title}
                  {item.season ? ` — Season ${item.season}` : ""}
                </h3>
                <p className="label-hud mt-1.5 text-[0.6rem]">
                  {item.type} · {item.year}
                </p>
                {item.description && (
                  <p className="mt-2 text-xs text-muted-foreground">{item.description}</p>
                )}
              </div>
              <button
                type="button"
                onClick={() => toggle(item.id)}
                aria-pressed={done}
                aria-label={`${done ? "Mark incomplete" : "Mark complete"}: ${item.title}`}
                className={`flex shrink-0 items-center justify-center gap-2 border px-4 py-2.5 font-mono text-[0.62rem] tracking-[0.2em] transition-all ${
                  done
                    ? "border-accent/50 bg-accent/10 text-accent"
                    : "border-primary/60 text-foreground hover:bg-primary/15 hover:shadow-[var(--glow-red)]"
                }`}
              >
                {done ? (
                  <>
                    COMPLETED <Check className="h-3.5 w-3.5" />
                  </>
                ) : (
                  "MARK COMPLETE"
                )}
              </button>
            </li>
          );
        })}
        {items.length === 0 && (
          <li className="panel p-8 text-center">
            <p className="label-hud">No titles in this filter</p>
          </li>
        )}
      </ul>
    </section>
  );
}
