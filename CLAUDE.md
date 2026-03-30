# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal website for 黎碎 (Li Sui), a hand-drawn/watercolor-themed portfolio site with heavy animation effects. Deployed to GitHub Pages at `https://znight802313-ui.github.io/personal-website`.

## Commands

- `npm run dev` — Start dev server (access at `http://localhost:5173/personal-website/` — trailing slash required)
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview production build
- `npm run deploy` — Build and deploy to GitHub Pages via gh-pages

No test framework or linter is configured.

## Architecture

**Stack:** React 18 + Vite 5 + Tailwind CSS 3 + Framer Motion 11, React Router DOM v6.

**Routing:** `BrowserRouter` with `basename="/personal-website"` (matches Vite's `base: '/personal-website/'`). Home is eagerly loaded; About, Articles, Portfolio, ImageGeneratorTest are lazy-loaded via `React.lazy`.

**Global layers** (rendered in App.jsx above all routes):
- `SVGFilters` — SVG `<filter>` definitions (rough, pencil, marker, watercolor) used via `filter: url(#rough)` throughout the site
- `MouseTrail` — Canvas-based cursor trail effect using requestAnimationFrame
- `Navigation` — Fixed top navbar

**Home page** (`src/pages/Home.jsx`) is the most complex page. It manages:
- Interactive hover effects with sound (audio lazy-loaded on first play, requires user click to unlock browser audio policy)
- Three toggle modes: roseMode, sunsetMode, starMode — each triggers different BackgroundEffects
- Polaroid photo frame with video toggle
- Typewriter text effect, spotlight following mouse via `useMotionValue`

**Home sub-components** (`src/components/Home/`):
- `BackgroundEffects` — Falling leaves, petals, meteors, decorative emojis (counts vary by mode)
- `InteractiveTags` — Four hover-interactive tags with unique animations and sound effects
- `PolaroidFrame` — Photo/video frame with hover sparkle effects
- `AudioController` — Fixed volume control panel

**Assets:**
- `src/assets/generatedAssets.js` — External CDN URLs (ibyteimg.com) for background images. These URLs have expiration signatures (`x-expires`).
- `src/assets/images/` — Local profile photo (JPG)
- `src/assets/sounds/` — MP3 audio files for tag hover effects
- `src/assets/videos/` — Profile video loaded via dynamic URL (`new URL(..., import.meta.url)`)

## Design System (Tailwind)

Custom colors: `cream` (#FFF8F0), `warmOrange` (#FF9B71), `earthBrown` (#8B6F47), `sageGreen` (#9CAF88).
Custom fonts: `font-handwriting` (Klee One), `font-rounded` (M PLUS Rounded 1c) — loaded from Google Fonts in `index.html`.
Custom cursors defined in `src/index.css` (hand-drawn flower for default, heart for interactive elements).

## Performance Notes

- Prefer CSS animations or `opacity`/`transform` over `boxShadow` keyframe animations (causes repaint)
- Background uses a `position: fixed` div layer instead of `backgroundAttachment: 'fixed'` (avoids mobile repaint)
- SVG-filtered elements use `willChange: 'transform'` for layer promotion
- Audio is lazy-created on first play, not on component mount
- The site is animation-heavy; be cautious adding more Framer Motion nodes with `repeat: Infinity`
