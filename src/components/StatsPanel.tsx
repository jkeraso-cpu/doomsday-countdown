import { useCountdown } from "@/lib/doomsday-store";

interface Props {
  completed: number;
  total: number;
  percent: number;
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="panel relative px-4 py-5 text-center sm:px-6">
      <p className="label-hud">{label}</p>
      <p className="mt-2 font-mono text-2xl font-bold tabular-nums text-foreground sm:text-3xl">
        {value}
      </p>
    </div>
  );
}

export function StatsPanel({ completed, total, percent }: Props) {
  const t = useCountdown();
  return (
    <section className="mx-auto max-w-6xl px-4 pb-4 sm:px-6">
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <Stat label="Days remaining" value={String(t.days)} />
        <Stat label="Watched" value={String(completed)} />
        <Stat label="Remaining" value={String(total - completed)} />
        <Stat label="Progress" value={`${Math.round(percent)}%`} />
      </div>
    </section>
  );
}
