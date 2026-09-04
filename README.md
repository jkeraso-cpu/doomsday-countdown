# Avengers: Doomsday // Mission Control

A cinematic, fully client-side countdown dashboard for Marvel Studios' *Avengers: Doomsday* (theatrical release: **December 18, 2026**).

Fan-made project. Not affiliated with, endorsed by, or sponsored by Marvel Studios or The Walt Disney Company. All background artwork is original placeholder art.

## Features

- Live countdown to the release date in your local time
- Preparation watchlist with filters, completion tracking and progress bar
- Rotating cinematic media background (images/video) with controls
- Soundtrack player for audio files you load yourself from your own device
- Intro screen, stats and status panels
- Settings with background mode, effects toggles, JSON import/export and reset
- Everything persists in your browser via LocalStorage — no backend, no accounts

## Tech stack

- TanStack Start (React 19) + TanStack Router
- Vite 7
- TypeScript
- Tailwind CSS v4

## Requirements

- Node.js 20 or newer
- npm (or bun/pnpm)

## Install

```sh
git clone <your-repository-url>
cd doomsday-clock
npm install
```

## Run in development

```sh
npm run dev
```

The app starts on http://localhost:8080.

## Build for production

```sh
npm run build
```

## Customising content

All content lives in plain, editable files:

| File | Purpose |
| --- | --- |
| `src/config.ts` | Release date, labels, soundtrack source, storage keys, defaults |
| `src/data/media.ts` | Background images and videos |
| `src/data/watchlist.ts` | Watchlist entries (movies and series) |
| `src/assets/` | Artwork used by the background |

To add a soundtrack, either set `SOUNDTRACK_SRC` in `src/config.ts` to an audio file you own, or load a local file from the player in the app.

## Project structure

```
src/
  routes/        page routes (index.tsx is the dashboard)
  components/    UI sections (Hero, Countdown, Watchlist, ...)
  data/          editable media and watchlist data
  lib/           storage helpers and countdown logic
  styles.css     design tokens and HUD styling
```

## License

Personal fan project. Provided as-is for non-commercial use.
