# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (localhost:3000)
npm run build    # Production build + type check
npm run lint     # ESLint
npx tsc --noEmit # Type check only (faster than build)
```

No test suite is configured.

## Architecture

**Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4, Framer Motion, Lucide React.

**Theme:** TikTok Live-stream aesthetic — dark background (`#0A0A0A`), neon red (`#FE2C55`), cyan (`#25F4EE`), gold (`#FFD700`). CSS variables and utility classes are defined in `src/app/globals.css` (`.glass-card`, `.live-badge`, `.tiktok-input`, `.btn-live`, `.right-control-btn`, etc.).

**Desktop layout:** The stream frame (`stream-frame` class) is capped at `480px` width, centered on desktop with phone-frame shadow/glow. Fixed overlays use `calc((100vw - 480px) / 2 + Npx)` to align into this frame.

**Fonts:** `--font-display` = Oswald (headings), `--font-body` = Nunito (body). Both support Vietnamese subsets.

**Data source:** All wedding content (couple info, venues, love story, photos, initial wishes) lives in `src/lib/weddingData.ts`. Edit this file to change wedding details — it is imported across multiple components.

**Guest personalization:** `/?guest=TênKháchMời` — read in `src/app/page.tsx` (server component), passed as `guestName: string | null` prop down to `MainContent` → `StreamIntro`.

### User flow

1. `StreamIntro` (onboarding) — 3D flip card wedding invitation. User taps to flip open, then taps "Vào xem ngay" to enter. Calls `onComplete()` → sets `showIntro = false` and `isLive = true` in `MainContent`.
2. `MainContent` — orchestrates all state (viewer count, hearts, live status). Fixed overlays (`LiveHeader`, right-side controls, `BackgroundMusic`, `GuestbookDonation`) render outside the scrollable `<main>` to avoid stacking context issues.
3. Scrollable sections render in order: `HeroSection` → `CoupleProfile` → `LoveStory` → `CountdownSection` → `PhotoAlbum` → `WeddingDetails` → `Footer`.

### Key implementation notes

**3D card blur on mobile:** CSS `transform-style: preserve-3d` causes blurriness on high-DPR narrow screens (e.g. iPhone 14 Pro Max at 393px) due to sub-pixel centering of the fixed-width card. Fix: after flip animation completes (`onAnimationComplete` + `phase === 'revealed'`), `flipDone` state becomes `true`, which replaces the entire 3D container with a plain `<div>` — no transforms at all.

**Floating elements positioning:** `GuestbookDonation` (wishes overlay + bottom bar) and `BackgroundMusic` use `max(Npx, calc((100vw - 480px) / 2 + Npx))` to stay pinned inside the 480px frame on desktop.

**Wishes API:** `src/app/api/wishes/route.ts` — in-memory store, resets on server restart. Supports `GET` (last 20, reversed) and `POST`. `GuestbookDonation` uses a rotating queue (`wishQueueRef`) that cycles through initial wishes + any newly submitted ones.

**Background music:** `BackgroundMusic` exposes a `MusicRef` (`toggle()`) via `forwardRef`/`useImperativeHandle`. Audio auto-starts on mount; falls back to first user interaction if browser blocks autoplay. Right-click on the disk button shows a vertical volume slider.
