import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_SETTINGS,
  RELEASE_DATE_ISO,
  STORAGE,
  type Settings,
} from "@/config";
import { watchlist } from "@/data/watchlist";

/** Safe localStorage helpers — degrade gracefully if unavailable/corrupt. */
function readJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object") return { ...fallback, ...parsed } as T;
    return fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — run in-memory */
  }
}

export type Progress = Record<string, boolean>;

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({});

  useEffect(() => {
    setProgress(readJSON<Progress>(STORAGE.progress, {}));
  }, []);

  const persist = useCallback((next: Progress) => {
    setProgress(next);
    writeJSON(STORAGE.progress, next);
  }, []);

  const toggle = useCallback(
    (id: number) => {
      setProgress((prev) => {
        const key = `movie-${id}`;
        const next = { ...prev, [key]: !prev[key] };
        writeJSON(STORAGE.progress, next);
        return next;
      });
    },
    [],
  );

  const reset = useCallback(() => persist({}), [persist]);

  const total = watchlist.length;
  const completedCount = watchlist.filter((i) => progress[`movie-${i.id}`]).length;
  const percent = total ? (completedCount / total) * 100 : 0;

  return { progress, toggle, reset, persist, total, completedCount, percent };
}

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    setSettings(readJSON<Settings>(STORAGE.settings, DEFAULT_SETTINGS));
  }, []);

  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      writeJSON(STORAGE.settings, next);
      return next;
    });
  }, []);

  return { settings, update };
}

export interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  arrived: boolean;
}

export function getTimeLeft(target = new Date(RELEASE_DATE_ISO).getTime()): TimeLeft {
  const diff = target - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, arrived: true };
  const s = Math.floor(diff / 1000);
  return {
    days: Math.floor(s / 86400),
    hours: Math.floor((s % 86400) / 3600),
    minutes: Math.floor((s % 3600) / 60),
    seconds: s % 60,
    arrived: false,
  };
}

export function useCountdown() {
  const [time, setTime] = useState<TimeLeft>(() => getTimeLeft());
  useEffect(() => {
    const id = window.setInterval(() => setTime(getTimeLeft()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return time;
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}
