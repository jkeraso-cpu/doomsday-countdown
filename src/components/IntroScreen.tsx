interface Props {
  onEnter: () => void;
}

export function IntroScreen({ onEnter }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[oklch(0.04_0_0)] px-6 text-center">
      <div className="scanlines pointer-events-none absolute inset-0 opacity-30" />
      <p
        className="label-hud anim-fade-up text-silver/70"
        style={{ animationDelay: "0.1s" }}
      >
        Marvel Studios
      </p>
      <h1
        className="anim-fade-up mt-5 text-3xl font-black tracking-[0.18em] text-glow sm:text-5xl md:text-6xl"
        style={{ animationDelay: "0.55s" }}
      >
        AVENGERS: DOOMSDAY
      </h1>
      <p
        className="label-hud anim-fade-up mt-5 text-foreground/80"
        style={{ animationDelay: "1.1s" }}
      >
        Mission Control
      </p>
      <button
        type="button"
        onClick={onEnter}
        autoFocus
        className="anim-fade-up mt-12 border border-primary/70 px-10 py-3 font-mono text-sm tracking-[0.35em] text-foreground transition-all hover:bg-primary/15 hover:shadow-[var(--glow-red)]"
        style={{ animationDelay: "1.6s" }}
      >
        [ ENTER ]
      </button>
      <p className="label-hud mt-8 text-[0.6rem] text-muted-foreground/60">
        Fan-made. Not affiliated with Marvel Studios or Disney.
      </p>
    </div>
  );
}
