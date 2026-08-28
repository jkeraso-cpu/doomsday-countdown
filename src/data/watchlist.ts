/**
 * ============================================================
 * DOOMSDAY WATCHLIST — EDITABLE DATA FILE
 * ============================================================
 * These are real, released Marvel Studios titles commonly grouped as
 * multiverse / Doomsday-adjacent viewing. The official Disney+
 * "Countdown to Avengers: Doomsday" collection could not be verified
 * programmatically, so treat this as a starting slate: add, remove or
 * reorder freely. The UI is fully data-driven.
 */
export interface WatchItem {
  id: number;
  title: string;
  type: "Movie" | "Series";
  year: number;
  season?: number;
  description?: string;
}

export const watchlist: WatchItem[] = [
  { id: 1, title: "Avengers: Infinity War", type: "Movie", year: 2018, description: "The scale of an Avengers-level threat." },
  { id: 2, title: "Avengers: Endgame", type: "Movie", year: 2019, description: "Time travel opens the branching timelines." },
  { id: 3, title: "WandaVision", type: "Series", year: 2021, season: 1, description: "Reality warping, first cracks." },
  { id: 4, title: "Loki", type: "Series", year: 2021, season: 1, description: "The Sacred Timeline and the man behind it." },
  { id: 5, title: "Spider-Man: No Way Home", type: "Movie", year: 2021, description: "The multiverse becomes public knowledge." },
  { id: 6, title: "Doctor Strange in the Multiverse of Madness", type: "Movie", year: 2022, description: "Incursions introduced." },
  { id: 7, title: "Ant-Man and the Wasp: Quantumania", type: "Movie", year: 2023, description: "Quantum Realm and the Conqueror." },
  { id: 8, title: "Loki", type: "Series", year: 2023, season: 2, description: "The timelines are set loose." },
  { id: 9, title: "The Marvels", type: "Movie", year: 2023, description: "A tear in space and a familiar family." },
  { id: 10, title: "Deadpool & Wolverine", type: "Movie", year: 2024, description: "The TVA, anchor beings and the Void." },
  { id: 11, title: "Captain America: Brave New World", type: "Movie", year: 2025, description: "Earth's new political battlefield." },
  { id: 12, title: "Thunderbolts*", type: "Movie", year: 2025, description: "A reluctant new team assembles." },
  { id: 13, title: "The Fantastic Four: First Steps", type: "Movie", year: 2025, description: "Marvel's First Family arrives." },
  { id: 14, title: "What If...?", type: "Series", year: 2021, season: 1, description: "Optional context on divergent realities." },
  { id: 15, title: "Ms. Marvel", type: "Series", year: 2022, season: 1, description: "Optional. Bangles, and where they lead." },
];
