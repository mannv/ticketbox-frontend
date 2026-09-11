---
name: figma-to-web
description: Convert Figma designs into a responsive mobile-web UI (Next.js App Router + React + Tailwind), NOT a native mobile app. Use when reading a Figma file/node, translating a Figma frame into components, extracting design tokens, or implementing any screen from the Cinemax movie-app design. Enforces dropping OS chrome (status bar, virtual keyboard, home indicator), responsive layout over fixed 375px, web navigation via routes, hover/focus states, and accessible tap targets.
metadata:
  origin: project
---

# Figma → Mobile Web

Rules for turning Figma frames into a **responsive mobile web** UI with **Next.js 16 App Router + React 19 + Tailwind CSS 4**. The design source is a mobile (iPhone 375×812) UI kit, but the target is a **web app opened in a mobile browser** — never a native mobile app. Translate accordingly.

## When to Activate

- Reading Figma data (`get_figma_data`) or downloading Figma assets (`download_figma_images`)
- Turning a Figma frame/node into React components
- Extracting design tokens (colors, typography, spacing, radius) from Figma
- Implementing any screen from the Cinemax design (Home, Login, Movie Detail, Search, Profile, etc.)
- Reviewing UI code that originated from a Figma design

## Core Principle

The Figma canvas is a **mobile mockup**, not a spec for pixel-cloning a phone app. Reproduce the *visual design* (colors, type, spacing, components), but implement it with **web semantics and responsive layout**. When the mockup and the web platform disagree, the web platform wins.

## Hard Rules

### 1. Drop OS chrome — never rebuild it

These Figma elements are the phone's operating system, NOT app UI. **Do not implement them:**

- **`status_bar`** — the top bar showing time (e.g. `19:27`), signal, wifi, battery (`Symbols`, `Bars/Status/_/Time`). The browser and OS render this.
- **Virtual keyboard** — the QWERTY `Keypad` instance (e.g. on the Verification/OTP screen). Web uses real `<input>`; the browser/OS shows the keyboard.
- **Home Indicator** — the iOS bottom gesture bar.

Rendering these on web is wrong and wastes space. Skip the nodes entirely.

### 2. Responsive layout, not fixed 375px

- Never hardcode `width: 375px` on the page root. Use a centered container with `max-width` (≈ `420–480px`) for the mobile-web view.
- Convert absolute-positioned Figma layouts (`layout mode: none` with x/y coordinates) into **flexbox/grid + normal document flow**. Absolute positioning from Figma is a layout artifact, not a requirement.
- Use `rem`, `%`, `flex`, `grid`, `gap` instead of fixed pixel offsets. Reserve `px` for borders, hairlines, and small fixed radii.
- Consider wider breakpoints: at `md+` the layout may widen (e.g. movie cards in a multi-column grid) rather than staying locked at phone width.

### 3. Web navigation, not a mobile navigator

- Each Figma frame/screen maps to a **Next.js App Router route**, not a native stack/tab navigator.
  - Examples: `/`, `/login`, `/signup`, `/movie/[id]`, `/search`, `/genre`, `/download`, `/wishlist`, `/profile`, `/profile/edit`.
- **Bottom Navigation** (Home / Search / Download / Account) → a `position: fixed; bottom: 0` bar constrained to the container width, with safe `padding-bottom`. Wire items with `next/link` and highlight the active route with `usePathname()`.
- "Back" arrows → `router.back()` or an explicit `<Link>`, not a native pop.

### 4. Add web-only interaction states

The mobile mockup has no hover. On web you must add:

- `:hover` and `:focus-visible` states for every interactive element (buttons, links, cards, tabs, inputs).
- Keyboard operability — all actions reachable via Tab/Enter/Space.
- Tap/click targets ≥ 44×44px (aligns with the `accessibility` skill).

### 5. Semantics over pixel divs

- Use `<button>`, `<a>`/`<Link>`, `<nav>`, `<main>`, `<form>`, `<input>`, `<label>` — not `<div>` with click handlers.
- Figma "Input" frames → real `<input>` + `<label>` (visible or `aria-label`). Password fields → `type="password"` with a working show/hide toggle (the `eye-off` icon).
- Figma "Checkbox"/"Radio"/"Switch" components → native inputs or accessible ARIA widgets, not static icons.

### 6. Assets

- Icons (`IMAGE-SVG` nodes: search, home, star, calendar, film, play, download, etc.) → export as **SVG** into `public/` (or an icon component). Prefer inline SVG for icons that change color with state (use `currentColor`).
- Photos / posters (`imageRef` fills) → `next/image` with width/height and `alt`. Treat design posters as placeholders unless real assets are provided.
- Use `download_figma_images` to pull assets; save under `public/` with kebab-case names.

## Design Tokens (Cinemax)

Map these into the Tailwind theme once, then reference by name — do not re-hardcode hex values in components.

### Colors

| Name | Value | Usage |
|---|---|---|
| `dark` (Primary/dark) | `#1F1D2B` | Page background |
| `soft` (Primary/soft) | `#252836` | Cards, inputs, surfaces |
| `black` | `#171725` | Deeper background |
| `blue-accent` | `#12CDD9` | Primary CTA, active state, links |
| `orange` | `#FF8700` | Rating, "Premium" label |
| `red` | `#FB4141` | Errors / validation |
| `white` | `#FFFFFF` | Primary text on dark |
| `white-grey` | `#EBEBEF` | Slightly muted text |
| `grey` | `#92929D` | Secondary text, placeholders |
| `dark-grey` | `#696974` | Tertiary text |

Theme is **dark by default**.

### Typography

Primary family **Montserrat** (some **Poppins**). Load via `next/font`.

| Token | Size | Weight |
|---|---|---|
| H1 | 28px | 600 |
| H2 | 24px | 600 |
| H3 | 18px | 600 |
| H4 | 16px | 500/600 |
| H5 | 14px | 400/500/600 |
| H6 | 12px | 500/600 |
| H7 | 10px | 500 |

### Radius & shape

- Button: `32px` (pill)
- Card / surface: `12–16px`
- Input: `24px`
- Poster/thumbnail image: `8px`

### Spacing

Screen horizontal padding ≈ `24px`. Common gaps: `8px`, `12px`, `16px`.

## Reusable Components (build these first)

The design repeats a small set of components across ~30 screens. Build them once.
For **where to put** each component (shared vs page-local co-location), follow the
"File & Component Organization" section of the `frontend-patterns` skill.

- **Button** — pill, variants: primary (blue), secondary (orange), outline; sizes; icon+label.
- **MovieCard** — poster + title + genre + `Rate` badge (portrait card used in Home/Search).
- **MovieListItem** — horizontal row (poster left, title/meta right) used in Search Result / Most Popular.
- **Rate** — small star + score badge (blurred background).
- **Tab** — category tabs (All / Comedy / Animation / Documentary) with active/inactive.
- **BottomNav** — fixed bottom navigation (Home/Search/Download/Account).
- **Input** — labeled field + optional leading icon + optional trailing action (search, password toggle).
- **TopBar** — back button + centered title (+ optional wishlist action).
- **Avatar**, **GenreCard**, **EmptyState** (folder + message, used by empty Download/Wishlist).

## Screen → Route Map (reference)

Auth: `/` (splash) · `/onboarding` · `/login` · `/signup` · `/reset-password` · `/new-password` · `/verification`
Premium: `/premium` · `/premium/payment` · payment-completed as modal
Core: `/` (home) · `/search` · `/search/results` · `/popular` · `/genre`
Detail: `/movie/[id]` · `/series/[id]` · `/movie/[id]/trailer` · share as modal
User: `/download` · `/wishlist` · `/profile` · `/profile/edit` · `/profile/language` · `/profile/notifications` · `/privacy-policy`

## Workflow When Implementing a Screen

1. Read the Figma node with `get_figma_data` (use the specific `node-id`).
2. Identify which reusable components the frame uses; build/reuse them.
3. Strip OS chrome (rule 1).
4. Rebuild layout with flow + flex/grid inside a `max-width` container (rule 2).
5. Wire navigation via routes/links (rule 3).
6. Add hover/focus/keyboard + tap sizing (rules 4, 5).
7. Export needed assets (rule 6).
8. Verify against the project's build/lint before finishing.

## Related

- Skills: `nextjs-turbopack`, `react-patterns`, `frontend-patterns`, `react-performance`, `accessibility`, `coding-standards`
- Rules: `.kiro/rules/react/`
