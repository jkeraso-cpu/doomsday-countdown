import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { STORAGE } from "@/config";
import { media } from "@/data/media";
import {
  useCustomBackgrounds,
  useProgress,
  useReducedMotion,
  useSettings,
} from "@/lib/doomsday-store";

import { IntroScreen } from "@/components/IntroScreen";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { StatsPanel } from "@/components/StatsPanel";
import { Watchlist } from "@/components/Watchlist";
import { StatusPanel } from "@/components/StatusPanel";
import { SettingsPanel } from "@/components/SettingsPanel";
import { MediaBackground } from "@/components/MediaBackground";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Avengers: Doomsday // Mission Control — Countdown Dashboard" },
      {
        name: "description",
        content:
          "A cinematic fan dashboard: live countdown to December 18, 2026, Marvel prep watchlist, progress tracking and soundtrack controls.",
      },
      { property: "og:title", content: "Avengers: Doomsday // Mission Control" },
      {
        property: "og:description",
        content:
          "Live countdown to December 18, 2026 with a Marvel prep watchlist and progress tracker.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MissionControl,
});

function MissionControl() {
  const { settings, update } = useSettings();
  const { progress, toggle, reset, persist, total, completedCount, percent } = useProgress();
  const reducedMotion = useReducedMotion();

  const [ready, setReady] = useState(false);
  const [showIntro, setShowIntro] = useState(false);
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    let seen = false;
    try {
      seen = localStorage.getItem(STORAGE.intro) === "true";
    } catch {
      seen = false;
    }
    setShowIntro(!seen);
    setActivated(seen);
    setReady(true);
  }, []);

  const enter = () => {
    try {
      localStorage.setItem(STORAGE.intro, "true");
    } catch {
      /* ignore */
    }
    setShowIntro(false);
    setActivated(true);
  };

  const replayIntro = () => {
    try {
      localStorage.removeItem(STORAGE.intro);
    } catch {
      /* ignore */
    }
    setShowIntro(true);
  };

  const introVisible = ready && showIntro && (settings.showIntro || !activated);

  return (
    <>
      <MediaBackground
        mode={media.length ? settings.background : "auto"}
        effects={settings.effects}
        reducedMotion={reducedMotion}
        customImages={backgrounds}
        slideshow={settings.slideshow}
        intervalSeconds={settings.slideshowInterval}
      />


      {introVisible && <IntroScreen onEnter={enter} />}

      <div className={introVisible ? "pointer-events-none opacity-0" : "opacity-100"}>
        <Navbar />
        <main>
          <Hero />
          <Countdown />
          <StatsPanel completed={completedCount} total={total} percent={percent} />
          <Watchlist
            progress={progress}
            toggle={toggle}
            reset={reset}
            completed={completedCount}
            total={total}
            percent={percent}
            effects={settings.effects}
          />
          <StatusPanel completed={completedCount} total={total} />
          <SettingsPanel
            settings={settings}
            update={update}
            progress={progress}
            setProgress={persist}
            reset={reset}
            activated={activated}
            onReplayIntro={replayIntro}
            backgrounds={backgrounds}
            addBackgrounds={addBackgrounds}
            removeBackground={removeBackground}
            clearBackgrounds={clearBackgrounds}
          />

        </main>
        <Footer />
      </div>
    </>
  );
}
