import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { RELEASE_LABEL } from "@/config";
import { useDoomsday } from "@/lib/app-state";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Doomsday Watch — Classified Countdown Terminal" },
      {
        name: "description",
        content:
          "Enter the Doomsday Watch: a cinematic fan terminal counting down to Avengers: Doomsday on December 18, 2026.",
      },
      { property: "og:title", content: "Doomsday Watch — Classified Countdown Terminal" },
      {
        property: "og:description",
        content: "A cinematic fan terminal counting down to Avengers: Doomsday.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomeEntry;
});

function HomeEntry() {
  const navigate = useNavigate();
  const { activate, reducedMotion, settings } = useDoomsday();
  const [entering, setEntering] = useState(false);

  const enter = () => {
    activate();
    if (reducedMotion || !settings.effects) {
      navigate({ to: "/watch" });
      return;
    }
    setEntering(true);
    window.setTimeout(() => navigate({ to: "/watch" }), 1050);
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="label-hud anim-fade-up text-silver/70" style={{ animationDelay: "0.1s" }}>
        Classified · Multiverse monitoring
      </p>
      <h1
        className="anim-fade-up mt-5 text-3xl font-black tracking-[0.16em] text-glow sm:text-5xl md:text-6xl"
        style={{ animationDelay: "0.5s" }}
      >
        DOOMSDAY WATCH
      </h1>
      <div className="hud-rule anim-fade-up mt-6 w-40 sm:w-72" style={{ animationDelay: "0.8s" }} />
      <p
        className="label-hud anim-fade-up mt-6 text-foreground/80"
        style={{ animationDelay: "1s" }}
      >
        The timeline ends {RELEASE_LABEL}
      </p>
      <p
        className="anim-fade-up mt-3 max-w-md font-mono text-[0.7rem] leading-relaxed text-muted-foreground"
        style={{ animationDelay: "1.2s" }}
      >
        Incursion activity rising. This terminal tracks the viewing dossier required before
        contact.
      </p>

      <button
        type="button"
        onClick={enter}
        autoFocus
        disabled={entering}
        className="anim-fade-up mt-12 border border-primary/70 px-10 py-3 font-mono text-sm tracking-[0.35em] text-foreground transition-all hover:bg-primary/15 hover:shadow-[var(--glow-red)] disabled:opacity-60"
        style={{ animationDelay: "1.5s" }}
      >
        {entering ? "[ ACCESSING ]" : "[ ENTER ]"}
      </button>

      <p className="label-hud mt-10 text-[0.55rem] text-muted-foreground/60">
        Fan-made. Not affiliated with Marvel Studios or Disney.
      </p>

      {entering && (
        <div className="pointer-events-none fixed inset-0 z-50" aria-hidden="true">
          <div className="anim-terminal-flicker absolute inset-0 bg-[oklch(0.03_0_0)]" />
          <div className="scanlines absolute inset-0 opacity-60" />
          <div className="anim-hud-sweep-down absolute inset-x-0 top-0 h-24 bg-[linear-gradient(180deg,transparent,oklch(0.52_0.21_25/0.35),transparent)]" />
          <p className="absolute inset-x-0 top-1/2 text-center font-mono text-[0.6rem] tracking-[0.4em] text-primary">
            ESTABLISHING LINK…
          </p>
        </div>
      )}
    </main>
  );
}
