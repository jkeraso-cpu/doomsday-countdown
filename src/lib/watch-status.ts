import { useCallback, useEffect, useState } from "react";
import { STORAGE } from "@/config";
import { watchlist } from "@/data/watchlist";

/**
 * ============================================================
 * WATCH STATUS SYSTEM
 * ============================================================
 * Every watchlist entry has one of three states. Legacy boolean
 * progress (doomsday-progress) is migrated on first read so nothing
 * a visitor already ticked off is lost.
 */
export type WatchStatus = "not-started" | "in-progress" | "completed";

export const STATUS_ORDER: WatchStatus[] = ["not-started", "in-progress", "completed"];

export const STATUS_LABEL: Record<WatchStatus, string> = {
  "not-started": "NOT STARTED",
  "in-progress": "IN PROGRESS",
  completed: "COMPLETED",
};

export type StatusMap = Record<string, WatchStatus>;

const key = (id: number) => `movie-${id}`;

function readStatuses(): StatusMap {
  try {
    const raw = localStorage.getItem(STORAGE.status);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") return parsed as StatusMap;
    }
    // Migrate legacy boolean progress → completed
    const legacyRaw = localStorage.getItem(STORAGE.progress);
    if (legacyRaw) {
      const legacy = JSON.parse(legacyRaw);
      if (legacy && typeof legacy === "object") {
        const migrated: StatusMap = {};
        for (const [k, v] of Object.entries(legacy as Record<string, boolean>)) {
          if (v) migrated[k] = "completed";
        }
        localStorage.setItem(STORAGE.status, JSON.stringify(migrated));
        return migrated;
      }
    }
  } catch {
    /* storage unavailable */
  }
  return {};
}

export function useWatchStatus() {
  const [statuses, setStatuses] = useState<StatusMap>({});

  useEffect(() => setStatuses(readStatuses()), []);

  const persist = useCallback((next: StatusMap) => {
    setStatuses(next);
    try {
      localStorage.setItem(STORAGE.status, JSON.stringify(next));
    } catch {
      /* in-memory only */
    }
  }, []);

  const statusOf = useCallback(
    (id: number): WatchStatus => statuses[key(id)] ?? "not-started",
    [statuses],
  );

  const setStatus = useCallback(
    (id: number, status: WatchStatus) => {
      const next = { ...statuses };
      if (status === "not-started") delete next[key(id)];
      else next[key(id)] = status;
      persist(next);
    },
    [statuses, persist],
  );

  const cycleStatus = useCallback(
    (id: number) => {
      const current = statuses[key(id)] ?? "not-started";
      const idx = STATUS_ORDER.indexOf(current);
      setStatus(id, STATUS_ORDER[(idx + 1) % STATUS_ORDER.length]!);
    },
    [statuses, setStatus],
  );

  const reset = useCallback(() => persist({}), [persist]);

  const total = watchlist.length;
  const completed = watchlist.filter((i) => statuses[key(i.id)] === "completed").length;
  const inProgress = watchlist.filter((i) => statuses[key(i.id)] === "in-progress").length;
  const notStarted = total - completed - inProgress;
  /** Completed items count fully, in-progress counts as half a step. */
  const percent = total ? ((completed + inProgress * 0.5) / total) * 100 : 0;

  /** Currently watching (first in-progress item), and the next unstarted one. */
  const ongoing = watchlist.find((i) => statuses[key(i.id)] === "in-progress") ?? null;
  const next =
    watchlist.find(
      (i) => (statuses[key(i.id)] ?? "not-started") === "not-started" && i.id !== ongoing?.id,
    ) ?? null;
  const previously = watchlist.filter((i) => statuses[key(i.id)] === "completed");

  return {
    statuses,
    statusOf,
    setStatus,
    cycleStatus,
    persist,
    reset,
    total,
    completed,
    inProgress,
    notStarted,
    percent,
    ongoing,
    next,
    previously,
  };
}
