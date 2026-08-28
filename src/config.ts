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
 * ASSET SLOT — SOUNDTRACK
 * Put your own legally-obtained audio file in `public/audio/` and point to it,
 * e.g. "/audio/theme.mp3". Leave empty to show "SOUNDTRACK OFFLINE".
 * You can also load a local file at runtime from the music player.
 */
export const SOUNDTRACK_SRC = "";
export const SOUNDTRACK_TITLE = "USER-PROVIDED TRACK";

/** Storage keys */
export const STORAGE = {
  progress: "doomsday-progress",
  settings: "doomsday-settings",
  intro: "doomsday-intro-seen",
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
}

export const DEFAULT_SETTINGS: Settings = {
  background: "auto",
  musicEnabled: true,
  volume: 0.4,
  muted: false,
  loop: true,
  effects: true,
  showIntro: true,
};

/** Media rotation interval (ms) for image backgrounds */
export const IMAGE_INTERVAL = 8000;
