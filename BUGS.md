# Bugs

## 2026-10-26 — Portfolio card alignment and thumbnails — resolved

- Symptom: paired cards showed different image positions and uneven vertical spacing; status badges touched game titles; thumbnails had dark bars.
- Cause: implicit grid rows stretched the card contents differently according to each project’s field count, while `object-fit: contain` letterboxed wide banners inside 16:9 frames.
- Resolution: cards now use a vertical flex layout with bottom-aligned actions, a 0.75rem gap before status badges, consistent image dimensions and `object-fit: cover`. Polyrush uses its landscape feature graphic.
- Affected files: `styles/pages/portfolio.css`, `scripts/portfolio.js`, `data/projects.json`.
- Regression prevention: check paired card image/button positions, Polish and English titles, image loading and mobile overflow when changing project data or card styles.

## 2026-10-26 — Missing site favicon in search results — resolved

- Symptom: the site displayed a generic globe instead of a brand icon in Google search results.
- Cause: no favicon asset or icon link was provided on the home page.
- Resolution: use the existing Infograf Puzzle panda icon as the site favicon, with a 96 × 96 PNG, a multi-size ICO and a 180 × 180 Apple touch icon; declare the same stable root URLs on all eight HTML pages.
- Affected files: root favicon assets and all HTML page heads.
- Regression prevention: verify the square PNG dimensions, ICO sizes, declared asset paths and public HTTP availability. Google must recrawl the home page before search appearance can update; display is controlled by Google.

## 2026-10-26 — Website portfolio thumbnail shows the old design — resolved

- Symptom: the website project card still showed the previous Polyrush-era home page instead of the current design.
- Cause: the project catalogue continued to reference the old `assets/strona.png` screenshot.
- Resolution: capture the current home page in its light theme and use `assets/site-preview-light.webp`, fitted to 1280 × 720 with the browser scrollbar removed; refresh the portfolio script and catalogue cache versions.
- Affected files: `data/projects.json`, `scripts/portfolio.js`, `portfolio/index.html` and the new screenshot asset.
- Regression prevention: update this screenshot when changing the home page design and verify the website project card in both interface themes.
