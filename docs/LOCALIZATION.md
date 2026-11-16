# Language and localization

The site includes a lightweight English/Persian language layer in `src/i18n.jsx`.

- The header language control displays `EN / PER` and switches the site copy between English and Persian.
- The selected language is saved in `localStorage` as `normvis-locale`.
- Persian mode sets the document language to `fa`, switches the document direction to RTL, and applies the Vazirmatn typeface while keeping the original English system font stack unchanged.
- The Persian dictionary is centralized in `src/i18n.jsx`; add new UI copy there when adding pages or components.
- The Persian font is loaded from Google Fonts. If the browser is offline, the system fallback (`Tahoma`) is used.
