# PROJECT_STRUCTURE

```
normvis-site/
├── README.md               Setup and run instructions
├── package.json            Scripts and exact dependency versions
├── package-lock.json       Locked dependency tree
├── vite.config.js          Vite config (React plugin, VITE_BASE)
├── index.html              HTML entry (mounts #root)
├── .env.example            Optional environment variables
├── .gitignore
├── docs/                   Project documentation
├── tools/generate-hero-video.py  Re-renders the hero video and poster (optional)
├── public/                 Copied as-is to the build
│   ├── assets/videos/      hero-background.mp4, hero-poster.jpg
│   ├── favicon.svg
│   └── _redirects          SPA fallback for Netlify-style hosts
└── src/
    ├── main.jsx            React root: BrowserRouter + MotionConfig
    ├── App.jsx             Layout and routes
    ├── styles/global.css   Design tokens and all styles
    ├── data/content.js     Site copy, services, nav
    ├── data/projects.js    Demo project concepts
    ├── hooks/usePageMeta.js
    ├── components/         Reusable components (see COMPONENTS.md)
    └── pages/              Home, Services, About, Projects, ProjectDetail, Contact, NotFound
```
`node_modules/` and `dist/` are generated and git-ignored.
