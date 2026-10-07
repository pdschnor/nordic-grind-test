# Nordic Grind

One-page website for Nordic Grind, a coffee bar and small roastery on Blågårdsgade, Copenhagen.

Static HTML, CSS and vanilla JS, with no build step.

## Run locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Structure

- `index.html`: the whole site
- `assets/css/tokens.css`: colours, type, spacing (design tokens)
- `assets/css/site.css`: layout, sections and scroll motion
- `assets/js/site.js`: live opening status, mobile menu, scroll effects, hero video
- `assets/images/`, `assets/video/`: optimised photos, logo, hero loop
- `CLAUDE.md`: brand, design rules and site content (source of truth)
