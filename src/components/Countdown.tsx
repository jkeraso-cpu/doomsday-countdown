import { RELEASE_LABEL } from "@/config";
import { useCountdown } from "@/lib/doomsday-store";

function Unit({ value, label }: { value: number; label: string }) {
  return (
    <div className="panel corner-brackets relative flex flex-col items-center px-3 py-5 sm:px-8 sm:py-7">
      <span className="font-mono text-4xl font-bold leading-none tabular-nums text-foreground text-glow anim-pulse-glow sm:text-6xl lg:text-7xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="label-hud mt-3 text-[0.6rem] sm:text-[0.68rem]">{label}</span>
    </div>
  );
}

export function Countdown() {
  const t = useCountdown();

  return (
    <section id="countdown" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold tracking-[0.2em] sm:text-xl">THE FINAL COUNTDOWN</h2>
        <div className="hud-rule flex-1" />
        <span className="label-hud hidden text-primary sm:block">COUNTDOWN ACTIVE</span>
      </div>

      {t.arrived ? (
        <div className="panel panel-glow corner-brackets relative mt-8 px-6 py-16 text-center">
          <h3 className="text-2xl font-black tracking-[0.15em] text-glow sm:text-5xl">
            DOOMSDAY HAS ARRIVED
          </h3>
          <p className="label-hud mt-4">{RELEASE_LABEL}</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          <Unit value={t.days} label="Days" />
          <Unit value={t.hours} label="Hours" />
          <Unit value={t.minutes} label="Minutes" />
          <Unit value={t.seconds} label="Seconds" />
        </div>
      )}
    </section>
  );
}
