interface Props {
  completed: number;
  total: number;
  percent: number;
  effects: boolean;
}

export function ProgressBar({ completed, total, percent, effects }: Props) {
  const done = total > 0 && completed === total;

  return (
    <div id="progress" className="panel corner-brackets relative scroll-mt-24 p-5 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p className="label-hud">Doomsday preparation</p>
          <p className="mt-2 font-mono text-xl font-bold tabular-nums sm:text-2xl">
            {completed} / {total} COMPLETE
          </p>
        </div>
        <p
          className={`font-mono text-3xl font-bold tabular-nums sm:text-4xl ${
            done ? "text-accent" : "text-primary"
          } text-glow-silver`}
        >
          {percent.toFixed(1)}%
        </p>
      </div>

      <div
        className="relative mt-5 h-3 w-full overflow-hidden border border-border bg-[oklch(0.14_0.008_250)]"
        role="progressbar"
        aria-valuenow={Math.round(percent)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Doomsday preparation progress"
      >
        <div
          className={`h-full transition-[width] duration-700 ease-out ${
            done
              ? "bg-gradient-to-r from-accent/70 to-accent shadow-[var(--glow-doom)]"
              : "bg-gradient-to-r from-primary/60 to-primary shadow-[var(--glow-red)]"
          }`}
          style={{ width: `${percent}%` }}
        >
          {effects && percent > 0 && (
            <span className="anim-sweep block h-full w-1/3 bg-[linear-gradient(90deg,transparent,oklch(1_0_0/0.35),transparent)]" />
          )}
        </div>
      </div>

      {done && (
        <div className="anim-fade-up mt-6 border border-accent/40 bg-accent/5 px-4 py-5 text-center">
          <p className="font-display text-lg font-bold tracking-[0.2em] text-accent sm:text-2xl">
            DOOMSDAY READY
          </p>
          <p className="label-hud mt-2">The multiverse has been prepared.</p>
        </div>
      )}
    </div>
  );
}
