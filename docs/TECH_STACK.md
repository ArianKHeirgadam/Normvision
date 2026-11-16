# TECH_STACK

| Area | Technology | Purpose |
|---|---|---|
| Frontend framework | React 18.3.1 | Reusable components; content-driven pages |
| Build tool | Vite 5.4.11 + @vitejs/plugin-react 4.3.3 | Dev server, HMR, production bundle |
| Routing | react-router-dom 6.28.0 | Real routes `/`, `/services`, `/about`, hash scrolling |
| Animation | framer-motion 11.11.17 | Hero stagger, one-time scroll reveals, page fade; `MotionConfig reducedMotion="user"` |
| Animation (CSS) | Plain CSS keyframes/transitions | Floating hero illustration, hover and header transitions |
| Icons | lucide-react 0.454.0 | Service and value icons, menu/close |
| Illustrations | Inline SVG (custom) | Hero and About artwork, logo; no image files |
| CSS framework | None | Hand-written CSS with design tokens as CSS variables (`src/styles/global.css`) |
| UI component library | None | Own components (see COMPONENTS.md) |
| Fonts | System SF Pro stack | `-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", "Helvetica Neue", Arial, sans-serif`; no font files are bundled or downloaded |
| Backend | Django 5.2 + Django REST Framework | Public JSON API, contact inquiry validation, staff admin |
| Database | PostgreSQL 16 | Stores service content, bilingual project records, and contact inquiries |
| Backend infrastructure | Gunicorn, Docker Compose, psycopg 3 | WSGI serving and local PostgreSQL development |
| Dev tools | Node.js >= 18, npm | Install and scripts. No linter or test runner is configured |

## Decisions

- **Migration from the static HTML prototype to React + Vite.** The prototype was one HTML file with three hash-switched views. React was compatible, so it was ported: shared header/footer, data-driven sections, real routes, and reusable animation wrappers. The CSS and SVG artwork were carried over unchanged, so the visual design is identical.
- **Django is a separate API service.** React/Vite remains a static frontend; Django REST Framework exposes services, projects, and contact inquiry endpoints. PostgreSQL is the primary database.
- **No Next.js / SSR.** Not needed for this phase; Vite keeps the stack small. Pre-rendering can be added later if SEO needs grow.
- **React Native is not used.** It targets native mobile apps. If a mobile app is needed, build it as a separate project; the copy in `src/data/content.js` and the tokens in `:root` are the pieces to share.
- **Animation is deliberately light.** Framer Motion is used only for entrance and reveal effects.

## v2 additions
- **Hero video:** a 10 s H.264 MP4 loop plus JPEG poster, served from `public/assets/videos/`. Native `<video>` element; no video library.
- **Video tooling (optional, not a site dependency):** `tools/generate-hero-video.py` uses Python 3, numpy, Pillow and imageio-ffmpeg to re-render the loop.
- **New routes:** `/projects`, `/projects/:slug`, `/contact`.
- **Contact form:** React posts to Django at `VITE_API_BASE_URL/contact/`; inquiries are stored in PostgreSQL and reviewed in Django Admin.
