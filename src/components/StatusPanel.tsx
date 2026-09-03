import { RELEASE_SHORT } from "@/config";

interface Props {
  completed: number;
  total: number;
}

export function StatusPanel({ completed, total }: Props) {
  const prep =
    completed === 0 ? "NOT STARTED" : completed === total ? "COMPLETE" : "IN PROGRESS";

  const rows = [
    { label: "Multiverse status", value: "ACTIVE", tone: "accent" as const },
    { label: "Doom threat", value: "LEVEL: UNKNOWN", tone: "primary" as const },
    { label: "Preparation", value: prep, tone: "default" as const },
    { label: "Release", value: RELEASE_SHORT, tone: "default" as const },
  ];

  return (
    <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold tracking-[0.2em] sm:text-xl">MULTIVERSE STATUS</h2>
        <div className="hud-rule flex-1" />
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {rows.map((r) => (
          <div key={r.label} className="panel corner-brackets relative px-4 py-5">
            <p className="label-hud">{r.label}</p>
            <p
              className={`mt-2 font-mono text-sm tracking-[0.12em] ${
                r.tone === "accent"
                  ? "text-accent"
                  : r.tone === "primary"
                    ? "text-primary"
                    : "text-foreground"
              }`}
            >
              {r.value}
            </p>
          </div>
        ))}
      </div>
      <p className="label-hud mt-4 text-[0.55rem] text-muted-foreground/60">
        Cosmetic readouts only — not official Marvel classifications.
      </p>
    </section>
  );
}
