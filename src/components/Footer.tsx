import { RELEASE_LABEL } from "@/config";

export function Footer() {
  return (
    <footer className="border-t border-border px-4 py-14 text-center sm:px-6">
      <p className="font-display text-base font-bold tracking-[0.18em] sm:text-xl">
        AVENGERS: DOOMSDAY
      </p>
      <p className="mt-3 font-mono text-xs tracking-[0.3em] text-primary">{RELEASE_LABEL}</p>
      <p className="label-hud mt-4">The countdown continues.</p>
      <p className="mx-auto mt-8 max-w-xl text-[0.65rem] leading-relaxed text-muted-foreground/70">
        Personal fan-made dashboard. Not affiliated with Marvel Studios, Disney, or Disney+.
        All artwork shown is original placeholder art; replace the asset slots with media you
        have permission to use.
      </p>
    </footer>
  );
}
