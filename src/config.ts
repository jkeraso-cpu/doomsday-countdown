/**
 * ============================================================
 * DOOMSDAY // MISSION CONTROL — CONFIGURATION
 * Edit everything here. No UI code needs to change.
 * ============================================================
 */

/** Theatrical release date (local time). Single source of truth. */
export const RELEASE_DATE_ISO = "2026-12-18T00:00:00";

/** Human readable labels */
export const RELEASE_LABEL = "DECEMBER 18, 2026";
export const RELEASE_SHORT = "18.12.2026";

/**
 * BUILT-IN SOUNDTRACK
 * Ships with the deployed app (served from the Lovable asset CDN), so every
 * visitor gets the same track with no upload required. Swap the pointer file
 * to change it.
 */
import soundtrack from "@/assets/the_avengers_-_alan_silvestri.mp3.asset.json";

export const SOUNDTRACK_SRC = soundtrack.url;
export const SOUNDTRACK_TITLE = "THE AVENGERS — ALAN SILVESTRI";

/** Storage keys */
export const STORAGE = {
  progress: "doomsday-progress",
  settings: "doomsday-settings",
  intro: "doomsday-intro-seen",
  backgrounds: "doomsday-backgrounds",
  status: "doomsday-status",
} as const;

export type BackgroundMode = "auto" | "images" | "video";

export interface Settings {
  background: BackgroundMode;
  musicEnabled: boolean;
  volume: number;
  muted: boolean;
  loop: boolean;
  effects: boolean;
  showIntro: boolean;
  /** Background slideshow rotation on/off */
  slideshow: boolean;
  /** Rotation interval in seconds (5 | 10 | 30 | 60) */
  slideshowInterval: number;
}

export const DEFAULT_SETTINGS: Settings = {
  background: "auto",
  musicEnabled: true,
  volume: 0.4,
  muted: false,
  loop: true,
  effects: true,
  showIntro: true,
  slideshow: true,
  slideshowInterval: 10,
};

/** Available slideshow intervals (seconds) */
export const SLIDESHOW_INTERVALS = [5, 10, 30, 60] as const;

/** Media rotation interval (ms) for image backgrounds */
export const IMAGE_INTERVAL = 8000;

