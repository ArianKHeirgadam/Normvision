# DESIGN_SYSTEM

Source of truth: `src/styles/global.css` (`:root` tokens). Light theme only.

## Colors
| Token | HEX | Use |
|---|---|---|
| `--primary` | #245BDB | Buttons, links, accents |
| `--secondary` | #7048E8 | Gradient accents |
| `--bg` | #F7F9FC | Page background |
| `--surface` | #FFFFFF | Cards, panels, bands |
| `--text` | #101B3D | Primary text |
| `--muted` | #64748B | Secondary text |
| `--border` | #E5EAF3 | Thin borders and dividers |
Brand gradient: #245BDB to #7048E8 (logo, bullets, CTA band). Primary hover: #1c4bb8.

## Typography
Font family: `--font` (SF Pro system stack, see TECH_STACK.md). Body 1.0625rem / line-height 1.6.
| Role | Size | Weight | Letter spacing |
|---|---|---|---|
| Hero h1 (home) | clamp(2.75rem, 8vw, 5.5rem) | 700 | -0.045em |
| Hero h1 (inner pages) | clamp(2.5rem, 6.5vw, 4.5rem) | 700 | -0.045em |
| Section h2 (`.h2`) | clamp(2rem, 4.5vw, 3.25rem) | 600 | -0.03em |
| Service title (`.svc h3`) | clamp(1.6rem, 3vw, 2.25rem) | 600 | -0.03em |
| Card title | 1.375rem | 600 | -0.03em |
| Lead (`.lead`) | clamp(1.0625rem, 1.6vw, 1.25rem) | 400 | normal |
| Buttons | 1rem (small: 0.9375rem) | 500 | normal |

## Spacing, radius, shadow
- Spacing: `--s1` 0.5rem, `--s2` 1rem, `--s3` 1.5rem, `--s4` 2.5rem, `--s5` 5rem. Sections use `--s5` vertical padding. Container `--wrap` 1120px.
- Radius: cards `--r` 14px; icon tile 12px; illustration panel 22px; CTA band 28px; buttons and chips pill (999px).
- Shadow: `--shadow` = `0 1px 2px rgba(16,27,61,.04), 0 8px 24px rgba(16,27,61,.06)`; card hover adds a blue-tinted shadow.

## Buttons
`.btn` min-height 48px, padding 0 1.5rem, pill. Variants: `btn-primary` (blue fill), `btn-ghost` (white, thin border, blue on hover), `btn-white` (on the CTA band), `btn-sm` (40px, header).

## Cards and panels
`.card`: white, 1px border, 14px radius, soft shadow, hover lifts 3px. `.panel`: same surface for service capability lists. `.chip`: pill for technologies.

## Breakpoints (mobile-first, min-width)
700px two-column card grids; 760px footer columns, why-grid, mission/vision; 880px desktop nav and horizontal timeline; 900px split layouts; 960px two-column hero; 1000px five-value six-column grid.

## Animation conventions
- Hero: staggered fade-up, 0.12s stagger, 0.8s, ease [0.2, 0.7, 0.2, 1] (`motionVariants.js`).
- Scroll reveal (`Reveal`): once, 16px rise, 0.6s, 0.06 to 0.08s delay steps.
- Page change: 0.3s fade on `<main>`.
- CSS: hero illustration float 7s/9s; hover and header transitions 0.2 to 0.3s.
- Reduced motion: Framer via `MotionConfig reducedMotion="user"`, CSS via `prefers-reduced-motion`.
- Do not put hover transforms on `Reveal` wrappers (Framer writes inline transforms).

## Accessibility
Skip link, visible 3px focus ring, semantic landmarks, `aria-current` on active nav, aria-labelled illustrations.

## v2 additions
- **Hero video layers:** media (poster + video, `object-fit: cover`) at z -2, `.hero-overlay` at z -1 (95% to 30% light gradient left to right, fading to `--bg` at the bottom; flat 74 to 88% on screens under 700px), content above. The video fades in over 1.4s once playing.
- **Hero height:** `clamp(560px, 86vh, 820px)`; the hero extends under the transparent header.
- **Hover:** nav underline grows (0.25s); primary button lifts 1px with a blue shadow; cards and project cards lift 3px; project art scales 1.03.
- **New components:** `.pcard` (project card), `.badge` (demo label), `.tags`, `.filters`/`.fbtn`, `.art` illustration frame, `.form`/`.field` inputs (12px radius, blue focus ring), `.note`, `.page-head`.
- **Video:** muted, looping, `playsInline`, no controls; never blocks clicks (`pointer-events: none`).


## Dark Theme Update
The website now uses the supplied dark palette:
- Background: `#000000`
- Surface: `#1F150C`
- Elevated surface: `#412D15`
- Text: `#E1DCC9`
- Wordmark highlight: warm champagne `#B7A77F` on `ORM` in `NORMVIS`

The `NORMVIS` wordmark uses a separate highlighted color for `ORM`. The dark theme is currently the default theme.


## Theme modes
The site supports persistent Light and Dark themes through the header theme switch. The selected theme is stored in `localStorage` under `normvis-theme`; the default is Dark. The Dark palette uses `#000000`, `#1F150C`, `#412D15`, and `#E1DCC9`. The Light palette uses `#F7F9FC`, `#FFFFFF`, `#245BDB`, and `#101B3D`. The wordmark highlights `ORM` in warm gold in Dark mode and blue in Light mode.

## Theme-aware brand mark and hero video
- The logo mark uses theme tokens: `--brand-mark-bg` and `--brand-mark-fg`.
- Dark theme: warm ivory mark with deep-brown monogram.
- Light theme: brand-blue mark with a white monogram; the wordmark keeps `ORM` highlighted in blue.
- Dark-theme hero video is intentionally desaturated, warm-shifted, darkened, and contrast-adjusted so bright blue particles do not overpower the warm dark palette.
- Light-theme hero video retains its brighter neutral-blue treatment.


## Theme-aware illustration tokens

All inline SVG illustrations (services, about, architecture, and project/service artwork) use CSS custom properties so their surfaces and accents adapt to the selected theme. In Dark Mode, illustration panels use the brand's dark brown surfaces, point accents use muted bronze `#B7A77F`, and connector lines use a darker bronze `#8F7952`. Light Mode retains the original blue/violet accents and white surfaces.


### About illustration motion
The About page visual uses slow, staggered looping motion to add depth without distracting from content. Interface panels float independently, the central abstract core gently rises and settles, and data nodes pulse softly. Keep the animation subtle and avoid fast rotation, bounce, or high-frequency movement.
