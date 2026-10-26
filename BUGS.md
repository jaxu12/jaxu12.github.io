# Bugs

## 2026-10-26 — Portfolio card alignment and thumbnails — resolved

- Symptom: paired cards showed different image positions and uneven vertical spacing; status badges touched game titles; thumbnails had dark bars.
- Cause: implicit grid rows stretched the card contents differently according to each project’s field count, while `object-fit: contain` letterboxed wide banners inside 16:9 frames.
- Resolution: cards now use a vertical flex layout with bottom-aligned actions, a 0.75rem gap before status badges, consistent image dimensions and `object-fit: cover`. Polyrush uses its landscape feature graphic.
- Affected files: `styles/pages/portfolio.css`, `scripts/portfolio.js`, `data/projects.json`.
- Regression prevention: check paired card image/button positions, Polish and English titles, image loading and mobile overflow when changing project data or card styles.
