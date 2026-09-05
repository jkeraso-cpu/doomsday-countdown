import heroDoomsday from "@/assets/hero-doomsday.jpg";
import bgMultiverse from "@/assets/bg-multiverse.jpg";
import bgTerminal from "@/assets/bg-terminal.jpg";

import poster from "@/assets/avengers_doomsday_new_official_poster.jpg.asset.json";
import doomProfile from "@/assets/33284484742592806.jpg.asset.json";
import doctorDoom from "@/assets/doctor_doom.jpg.asset.json";
import doomStorm from "@/assets/dr_doom_avengers_dooms_day_wallpaper.jpg.asset.json";
import doomSun from "@/assets/doom.jpg.asset.json";
import doomHall from "@/assets/dr_doom.jpg.asset.json";
import doomThrone from "@/assets/throne.jpg.asset.json";
import doomMural from "@/assets/doomsday_doctor_doom.jpg.asset.json";
import doomLegion from "@/assets/dr_doom_wallpaper.jpg.asset.json";

/**
 * ============================================================
 * BACKGROUND MEDIA — BUILT-IN ASSET COLLECTION
 * ============================================================
 * These images ship with the deployed app (served from the Lovable asset CDN),
 * so every visitor sees the same slideshow with no uploads required.
 * Add or remove entries here to change the built-in collection.
 * `type: "video"` assets play muted, looped and inline.
 */
export interface MediaItem {
  type: "image" | "video";
  src: string;
  title: string;
}

export const media: MediaItem[] = [
  { type: "image", src: poster.url, title: "12.18.26 IS DOOMSDAY" },
  { type: "image", src: doomThrone.url, title: "THE THRONE OF LATVERIA" },
  { type: "image", src: doomStorm.url, title: "STORMBREAKER // ARC SURGE" },
  { type: "image", src: doomSun.url, title: "DOOMBOT ESCORT" },
  { type: "image", src: doomHall.url, title: "GREEN CATHEDRAL" },
  { type: "image", src: doctorDoom.url, title: "RUNE CHAMBER" },
  { type: "image", src: doomMural.url, title: "MOTHER // MEMORY" },
  { type: "image", src: doomProfile.url, title: "MASK // LENS FLARE" },
  { type: "image", src: doomLegion.url, title: "LEGION RISING" },
  { type: "image", src: heroDoomsday, title: "DOOM // KEY ART" },
  { type: "image", src: bgMultiverse, title: "MULTIVERSE BREACH" },
  { type: "image", src: bgTerminal, title: "COMMAND PLATING" },
];

/** Hero background — always the first frame the user sees. */
export const heroImage = poster.url;
