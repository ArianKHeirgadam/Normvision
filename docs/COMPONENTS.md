# COMPONENTS

All in `src/components/` unless noted. Copy lives in `src/data/content.js`.

| Component | Purpose | Used by |
|---|---|---|
| `Header.jsx` | Sticky header, nav, mobile menu (Esc closes), scroll background | `App.jsx` (all pages) |
| `Footer.jsx` | Brand, nav, services, contact placeholders, legal | `App.jsx` |
| `Brand.jsx` | Logo mark + name, links home | Header, Footer |
| `Button.jsx` | Link-based button; variants primary, ghost, white; size sm | Header, Hero actions, CTA, service detail |
| `HeroVideo.jsx` | Home hero: poster + looping video, light overlay, staggered content. Video loads after first paint; skipped for reduced motion/data saver; pauses off-screen; poster stays if autoplay is blocked | Home |
| `Hero.jsx` | Inner-page hero with illustration and staggered entrance (`page` prop) | Services, About |
| `visuals.jsx` | `ServicesVisual`, `AboutVisual`, `ArchitectureVisual` SVGs (the old home hero illustration was removed) | Inner heroes, Home About band |
| `ServiceArt.jsx` | Per-category illustration (web, infrastructure, custom, support) | Service blocks, project cards and details |
| `ProjectCard.jsx` | Demo project card (art, badge, category, tags), links to `/projects/:slug` | Home (featured), Projects |
| `SectionHead.jsx` | Animated section title + optional lead | All pages |
| `Section.jsx` | Band + centered container (`className`, `id`, `wrap`) | Every page |
| `ServiceCard.jsx` | Home service card (icon, text, Learn More) | Home |
| `ServiceDetail.jsx` | Large service block with capability list and CTA | Services |
| `Steps.jsx` | Process timeline (horizontal desktop, vertical mobile) | Home, Services |
| `WhyGrid.jsx` | Title + optional description grid | Home, Services, About (expertise) |
| `CtaBand.jsx` | Closing CTA; button opens `/contact` | Home, Services, About, Projects, detail |
| `Reveal.jsx` | One-time scroll reveal wrapper | Cards, steps, values |
| `Icon.jsx` | Maps names in content.js to Lucide icons | Cards, values |
| `GradientDefs.jsx` | Defines SVG gradient `#lg` once | `App.jsx` |
| `ScrollManager.jsx` | Scroll to hash or top on navigation | `App.jsx` |
| `motionVariants.js` | Shared hero variants | Hero, visuals |

Pages are in `src/pages/` (`Home`, `Services`, `About`, `Projects`, `ProjectDetail`, `Contact`, `NotFound`) and set title/description with `src/hooks/usePageMeta.js`.

Responsive behavior is in `global.css` (breakpoints in DESIGN_SYSTEM.md).

Adding a page: create `src/pages/X.jsx`, add a `<Route>` in `App.jsx`, add a nav entry in `content.js`.

## Notes
- **Contact form** (`pages/Contact.jsx`): name, email, company (optional), service (pre-selected from `?service=`), description, and a hidden honeypot. Submits to the Django API; successful inquiries are saved in PostgreSQL and reviewed in Django Admin.
- **Project pages** (`pages/Projects.jsx`, `pages/ProjectDetail.jsx`): load published project data from the Django API, with bundled demo data as an offline fallback.
- **Services page** (`pages/Services.jsx`): loads active service content from the Django API, with bundled copy as an offline fallback.
- **Projects data** (`src/data/projects.js`) holds clearly labelled **demo concepts**; replace with real projects when supplied.
- **Animations:** hero stagger and video fade-in, `Reveal` scroll reveals, nav underline, button lift, card/thumbnail hover. Reduced motion is respected.


### AboutVisual
An original abstract technology illustration for the About page. It combines layered platform geometry, floating interface panels, orbital paths, and connected data nodes. Its colors are driven by the shared `--ill-*` theme variables, so it adapts to both light and dark themes. It intentionally avoids a letterform, hexagonal company emblem, or logo-like centerpiece.


## About page visual motion
The About page `AboutVisual` illustration uses Framer Motion for restrained ambient movement: floating interface panels, a gently drifting platform/core, subtle orbit movement, and softly pulsing data nodes. Motion is decorative and does not block interaction. The existing `framer-motion` dependency is reused; no new package is required.
