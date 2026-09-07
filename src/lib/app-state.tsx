import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import { useReducedMotion, useSettings } from "@/lib/doomsday-store";
import { useWatchStatus } from "@/lib/watch-status";
import type { Settings } from "@/config";

interface AppState {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
  reducedMotion: boolean;
  /** True once the visitor has interacted (pressed ENTER) — enables audio. */
  activated: boolean;
  activate: () => void;
  watch: ReturnType<typeof useWatchStatus>;
}

const Ctx = createContext<AppState | null>(null);

export function DoomsdayProvider({ children }: { children: ReactNode }) {
  const { settings, update } = useSettings();
  const reducedMotion = useReducedMotion();
  const watch = useWatchStatus();
  const [activated, setActivated] = useState(false);

  const value = useMemo<AppState>(
    () => ({
      settings,
      update,
      reducedMotion,
      activated,
      activate: () => setActivated(true),
      watch,
    }),
    [settings, update, reducedMotion, activated, watch],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useDoomsday() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useDoomsday must be used inside DoomsdayProvider");
  return ctx;
}
