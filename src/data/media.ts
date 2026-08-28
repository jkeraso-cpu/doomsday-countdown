import heroDoomsday from "@/assets/hero-doomsday.jpg";
import bgMultiverse from "@/assets/bg-multiverse.jpg";
import bgTerminal from "@/assets/bg-terminal.jpg";

/**
 * ============================================================
 * BACKGROUND MEDIA — ASSET SLOTS
 * ============================================================
 * Replace `src` with any image or video URL you have permission to use
 * (official promo art, posters, first-look stills, trailer files...).
 * `type: "video"` assets play muted, looped and inline.
 * Nothing here is scraped or downloaded automatically — the bundled art is
 * original, generated placeholder artwork.
 */
export interface MediaItem {
  type: "image" | "video";
  src: string;
  title: string;
}

export const media: MediaItem[] = [
  { type: "image", src: heroDoomsday, title: "DOOM // KEY ART (PLACEHOLDER)" },
  { type: "image", src: bgMultiverse, title: "MULTIVERSE BREACH (PLACEHOLDER)" },
  { type: "image", src: bgTerminal, title: "COMMAND PLATING (PLACEHOLDER)" },
  // { type: "video", src: "/media/teaser.mp4", title: "OFFICIAL TEASER" },
];

/** Hero background — always the first frame the user sees. */
export const heroImage = heroDoomsday;
