# Doomsday Countdown

PROJECT: AVENGERS: DOOMSDAY // PERSONAL COUNTDOWN DASHBOARD

Build a polished, cinematic single-page web dashboard called:

AVENGERS: DOOMSDAY // MISSION CONTROL

This is a personal fan dashboard for tracking preparation for Marvel Studios' Avengers: Doomsday, which is scheduled for theatrical release on December 18, 2026.

The goal is to create a visually impressive but technically simple dashboard that feels like a Marvel cinematic command center rather than a normal productivity app.

IMPORTANT:

Build the actual working application, not a mockup.

Keep the architecture simple.

Avoid unnecessary dependencies.

Do not create a backend unless genuinely necessary.

Store checklist/progress data locally in the browser using localStorage.

The application should work entirely client-side.

Do not require authentication.

Do not require a database.

Do not require an API key.

Do not require a paid service.

Do not add unnecessary features that consume development credits.

Prioritize a complete working MVP over elaborate architecture.

1. VISUAL IDENTITY

The entire dashboard should feel like:

Marvel Studios + Avengers + Doctor Doom + Multiverse + cinematic command center

Visual direction:

Dark cinematic interface.

Predominantly black / near-black background.

Deep red and metallic silver accents.

Subtle Doom-green accents where appropriate.

Large cinematic typography.

Thin glowing borders.

Subtle glassmorphism.

Very subtle animated particles.

Soft vignette around the entire page.

High contrast.

Premium movie-poster aesthetic.

Avoid making it look like a normal SaaS dashboard.

Avoid excessive rounded cards.

Avoid bright generic gradients.

Avoid cartoonish UI.

Avoid excessive animations that hurt performance.

The dashboard should feel like the user has opened a classified Marvel command terminal.

Use tasteful labels such as:

DOOMSDAY // MISSION CONTROL

COUNTDOWN ACTIVE

MULTIVERSE STATUS: MONITORING

PREPARATION PROGRESS

THE FINAL COUNTDOWN

Do not overuse Marvel terminology to the point that the interface becomes cheesy.

2. HERO SECTION

At the very top of the page, create a large cinematic hero section.

Include:

Avengers: Doomsday logo/title at the top.

Large title:
AVENGERS: DOOMSDAY

Smaller subtitle:
THE COUNTDOWN HAS BEGUN

Release date:
DECEMBER 18, 2026

The hero should occupy approximately 40-50% of the initial viewport on desktop.

Use a cinematic Doomsday image/poster as the hero background.

The background should have:

Dark overlay.

Gradient/vignette.

Slight blur behind UI elements.

Very subtle slow movement/parallax if inexpensive to implement.

Do NOT make the background interfere with readability.

If external copyrighted assets cannot legally be embedded, provide a clearly marked asset configuration section where the user can replace image URLs with assets they have permission to use.

3. LIVE COUNTDOWN

The countdown is the centerpiece of the dashboard.

Create a large live countdown to:

December 18, 2026

Display:

DAYS
HOURS
MINUTES
SECONDS

Example:

233
DAYS

14
HOURS

32
MINUTES

08
SECONDS

The numbers should update every second.

Requirements:

Use the user's local browser time.

Correctly account for timezone differences.

Target the theatrical release date.

Do not hard-code a remaining-days number.

Calculate the countdown dynamically from the target timestamp.

When the countdown reaches zero, replace the countdown with:

DOOMSDAY HAS ARRIVED

The countdown should have a subtle pulse/glow.

Use monospace or cinematic numeric typography for the numbers.

4. BACKGROUND MEDIA SYSTEM

Create a cinematic background media carousel.

The background should rotate between:

Avengers: Doomsday posters

Official promotional images

Official first-look images

Trailer thumbnails

Other user-provided Doomsday artwork

Support both:

IMAGE BACKGROUNDS

and

VIDEO BACKGROUNDS

The application should automatically detect whether an asset is an image or video based on its configuration.

For video:

autoplay

muted

loop

playsinline

cover the entire background

dark overlay above video

never allow video audio to interfere with the music player

For images:

crossfade between images

approximately 6-10 seconds per image

smooth transition

Add subtle navigation controls:

Previous | Pause | Next

But keep them visually minimal.

Create an assets.js or equivalent configuration file where media can easily be added:

media = [
{
type: "image",
src: "...",
title: "Doomsday Poster"
},
{
type: "video",
src: "...",
title: "Official Trailer"
}
]

Do NOT scrape Marvel's website automatically.

Do NOT download copyrighted media automatically.

Allow the user to replace/add their own assets.

5. WATCHLIST / DOOMSDAY PREPARATION

Create the main interactive section:

DOOMSDAY WATCHLIST

Subtitle:

COMPLETE THE REQUIRED MARVEL PREP

Create a checklist containing the official Disney+/Marvel-recommended Doomsday preparation titles.

IMPORTANT:

Do not invent titles.

Make the watchlist data-driven so it can easily be edited in one configuration file.

Each item should have:

number

title

type

year

optional description

completed boolean

Example structure:

{
id: 1,
title: "Movie Title",
type: "Movie",
year: 2026,
description: "Optional short context.",
completed: false
}

For TV seasons, allow:

type: "Series"

and optionally:

season: 1

The interface should support both movies and series.

6. CHECKBOX / COMPLETE BUTTON

Each watchlist item must have a clear:

MARK COMPLETE

button.

When clicked:

Mark the item completed.

Visually cross out the title.

Reduce its opacity slightly.

Change the button to:
COMPLETED ✓

Update the progress bar immediately.

Save the completed state to localStorage.

If the user refreshes the browser, completed items must remain completed.

Clicking a completed item should allow the user to undo it.

Use:

COMPLETED ✓

instead of permanently disabling the item.

7. PROGRESS SYSTEM

At the top of the watchlist, display:

DOOMSDAY PREPARATION

Then:

X / TOTAL COMPLETED

and a large progress bar.

Example:

7 / 15 COMPLETE

██████████░░░░░

46.7%

Calculate this dynamically.

The progress bar must update whenever a checklist item changes.

When everything is completed:

Display:

100%

and a special completion state:

DOOMSDAY READY

Subtitle:

THE MULTIVERSE HAS BEEN PREPARED.

Do not make the completion animation excessive.

A subtle cinematic effect is enough.

8. WATCHLIST FILTERS

Add simple filters:

ALL
MOVIES
SERIES
COMPLETED
REMAINING

These should filter the displayed items instantly.

Do not reload the page.

9. RESET PROGRESS

Add a small secondary control:

RESET PROGRESS

When clicked, show a browser confirmation:

"Reset your entire Doomsday preparation progress?"

If confirmed:

reset every checklist item to incomplete

update progress to 0%

update localStorage

Make this button visually secondary so it is not accidentally clicked.

10. AVENGERS THEME MUSIC PLAYER

Add a cinematic music player.

The dashboard should support a user-provided audio file.

Do NOT attempt to automatically download copyrighted Avengers music.

Create an audio player that can load a local/user-provided audio file.

Required controls:

▶ Play / Pause
🔊 Mute
🔁 Loop
Volume

Default:

loop enabled

volume around 35-45%

Display:

DOOMSDAY SOUNDTRACK

and:

NOW PLAYING

The music should continue while the user navigates through the dashboard.

IMPORTANT BROWSER RULE:

Modern browsers often block automatic audio playback.

Therefore:

Do not attempt to bypass browser autoplay restrictions.

Show a cinematic "ENTER MISSION CONTROL" / "ACTIVATE SOUNDTRACK" button on first load.

When the user clicks it, initialize the audio player and begin playback.

Remember the user's mute preference in localStorage.

If no audio file has been configured, show:

SOUNDTRACK OFFLINE

with instructions for adding a local audio file.

11. CINEMATIC ENTRY SCREEN

Before showing the full dashboard, show a very short intro screen.

Black background.

Centered:

MARVEL STUDIOS

Then:

AVENGERS: DOOMSDAY

Then:

MISSION CONTROL

Then:

[ ENTER ]

The animation should take approximately 2 seconds.

Clicking ENTER opens the dashboard.

Do not make the intro mandatory after the user has already entered once.

Store:

missionControlEntered = true

in localStorage.

Add a small setting allowing the intro to be replayed.

12. TOP NAVIGATION

Create a minimal fixed navigation bar.

Left:

DOOMSDAY // MISSION CONTROL

Right:

COUNTDOWN

WATCHLIST

PROGRESS

SETTINGS

Clicking navigation items smoothly scrolls to the relevant section.

On mobile, convert the navigation into a compact menu.

13. STATS PANEL

Create a compact cinematic statistics panel.

Show:

DAYS REMAINING
WATCHED
REMAINING
PROGRESS

Example:

DAYS REMAINING
111

WATCHED
7

REMAINING
8

PROGRESS
46%

The values must be dynamic.

14. OPTIONAL "DOOMSDAY STATUS" PANEL

Create a small section displaying:

MULTIVERSE STATUS

STATUS: ACTIVE

DOOM THREAT

LEVEL: UNKNOWN

PREPARATION

IN PROGRESS

RELEASE

18.12.2026

This is purely cosmetic.

Do not imply these are official Marvel classifications.

15. SETTINGS

Create a simple settings panel.

Settings:

Background

Auto

Images only

Video only

Music

Enable

Disable

Volume

Effects

Cinematic animations ON/OFF

Intro

Show intro on startup ON/OFF

Data

Export progress

Import progress

Reset progress

Export progress as a small JSON file.

Import progress from a JSON file.

This should make the dashboard portable without requiring an account.

16. RESPONSIVE DESIGN

The application MUST work well on:

desktop

laptop

tablet

mobile

Desktop:

cinematic full-width layout

two-column sections where appropriate

Mobile:

single column

countdown numbers remain readable

watchlist cards become compact

background media remains visually strong

buttons remain easy to tap

Do not let the watchlist become horizontally scrollable on mobile.

17. PERFORMANCE

Keep the application lightweight.

Avoid:

unnecessary npm packages

heavy animation libraries

unnecessary state-management libraries

backend services

databases

authentication

analytics

external APIs unless absolutely necessary

Prefer:

React

CSS

simple JavaScript

localStorage

Use CSS transitions rather than a large animation framework.

Lazy-load background media where possible.

Do not load every large video simultaneously.

Only preload the current background and possibly the next image.

18. ACCESSIBILITY

Include:

keyboard navigation

visible focus states

semantic buttons

ARIA labels where appropriate

readable text contrast

prefers-reduced-motion support

If the user has reduced motion enabled:

disable background parallax

disable excessive particle effects

reduce transitions

19. DATA ARCHITECTURE

Keep the watchlist in a single editable data file.

Example:

src/data/watchlist.js

Keep background media in:

src/data/media.js

Keep configuration in:

src/config.js

This allows the user to update titles, images, videos, release date, etc. without touching the UI.

Release date:

2026-12-18

Make this a single configuration constant.

20. COMPONENT STRUCTURE

Use a clean but simple structure.

Suggested:

src/
components/
IntroScreen
Navbar
Hero
Countdown
StatsPanel
MediaBackground
Watchlist
WatchlistItem
ProgressBar
MusicPlayer
StatusPanel
Settings
Footer

data/
watchlist.js
media.js

config.js

App.jsx
main.jsx

Do not create components unnecessarily.

21. LOCAL STORAGE

Use localStorage for:

doomsday-progress

doomsday-settings

doomsday-intro-seen

Store only simple JSON.

Example progress:

{
"movie-1": true,
"movie-2": false,
"movie-3": true
}

The application should recover gracefully if localStorage is unavailable or corrupted.

22. FOOTER

At the bottom:

AVENGERS: DOOMSDAY

DECEMBER 18, 2026

THE COUNTDOWN CONTINUES.

Small text:

"Personal fan-made dashboard. Not affiliated with Marvel Studios, Disney, or Disney+."

Do not use official Marvel branding in a way that suggests this is an official Marvel application.

23. IMPORTANT COPYRIGHT / ASSET HANDLING

The dashboard is a personal fan project.

Do not automatically scrape, download, or redistribute Marvel Studios assets.

Instead:

Create clearly labeled asset slots.

Allow image/video URLs to be configured manually.

Allow the user to add local assets.

Use official publicly available trailer embeds where technically and legally appropriate.

For music, support a local audio file supplied by the user.

Never attempt to bypass DRM, copyright protection, paywalls, or platform restrictions.

If an external asset cannot be loaded, gracefully display a fallback background.

24. INITIAL DATA

Populate the watchlist with the currently verified official Disney+ "Countdown to Avengers: Doomsday" recommendations available at development time.

IMPORTANT:

Do not blindly use an internet article's list.

Verify the current Disney+ / Marvel official collection first.

If the official list cannot be accessed programmatically, create the watchlist configuration with clearly marked placeholder entries and make it extremely easy to replace them manually.

The UI itself must not depend on the list being hard-coded.

25. DESIGN DETAILS

Use a sophisticated cinematic font pairing.

Suggested:

Heading:
Orbitron / Space Grotesk / similar futuristic font

Body:
Inter / system sans-serif

Numbers:
Roboto Mono / JetBrains Mono / similar monospace

Do not use more than 2-3 font families.

Use subtle visual effects:

scanline texture

film grain

vignette

faint particles

thin HUD lines

subtle glow

occasional flicker

All effects must be low intensity.

The dashboard should feel premium, not like a gaming website from 2014.

26. MAIN PAGE ORDER

The final page should flow approximately like this:

INTRO

↓

HERO

AVENGERS: DOOMSDAY

THE COUNTDOWN HAS BEGUN

DECEMBER 18, 2026

↓

LIVE COUNTDOWN

DAYS | HOURS | MINUTES | SECONDS

↓

STATS

DAYS REMAINING | WATCHED | REMAINING | PROGRESS

↓

DOOMSDAY WATCHLIST

Progress bar

Filters

Checklist

↓

MULTIVERSE STATUS

↓

MEDIA / TRAILER AREA

↓

SETTINGS

↓

FOOTER

27. MOST IMPORTANT REQUIREMENT

DO NOT over-engineer this.

This is a personal dashboard, not a commercial SaaS platform.

The first version must be completely functional with:

Live countdown

Cinematic background

Watchlist

Click-to-complete checklist

Persistent progress

Progress bar

Music player

Responsive design

Basic settings

LocalStorage

Everything else is secondary.

If development credits are limited, prioritize these ten features and finish them completely before adding optional effects.

28. FINAL BUILD REQUIREMENT

After generating the application:

install required dependencies

run the application

fix build errors

fix console errors

verify countdown works

verify checklist works

verify progress persists after refresh

verify filters work

verify music controls work

verify responsive layout

verify the app works without a backend

verify there are no broken asset URLs

verify the release date is December 18, 2026

verify all important functionality works before stopping

DO NOT simply describe how the application could be built.

ACTUALLY BUILD THE WORKING APPLICATION.

The finished result should feel like:

A personal Avengers: Doomsday countdown terminal sitting on the bridge of a multiversal warship.

Clean. Dark. Cinematic. Functional.

MISSION STATUS: PREPARATION IN PROGRESS.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/eab3f15a-631c-44aa-b040-501b30192941).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
