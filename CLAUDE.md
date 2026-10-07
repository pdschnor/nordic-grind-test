# Nordic Grind — project guide

Website for **Nordic Grind**, a specialty coffee shop and small-batch roastery in Copenhagen.
This file is the source of truth for brand, design and workflow. Read it before every task.

---

## 1. Ground rules (always)

1. **Use the `frontend-design` skill** before designing or restyling any page, section or component.
2. **Test on localhost first.** Every change is checked in a local browser at desktop *and* mobile widths before it's called done.
3. **Never push to GitHub** (or any remote) until the owner explicitly says so. Local commits are fine when asked; pushing, creating remotes, or opening PRs are not.
4. **Use the content in section 7.** The owner asked us to write it ourselves; keep every fact (hours, prices, address) consistent with that section. If something new is needed, add it there first.
5. **Show, then build.** For any new page or major section, share the design plan (layout sketch + which tokens it uses) before writing code.

---

## 2. Brand

### Who we are
A neighbourhood coffee bar with its own roaster. Oak counters, limewashed brick, terracotta cups, plants on the shelves, low sun through big street windows. The brand should feel like the room: warm, quiet, hand-made, unhurried.

### Personality
- **Warm, not cosy-kitsch.** Natural materials, real light. No hygge clichés, no candles-and-blankets stock imagery.
- **Minimal, not empty.** Few elements, each one considered. Generous space, but every section has real content.
- **Crafted, not precious.** We talk about roasting and sourcing plainly, like a good barista would across the counter.

### Voice
- Plain, short sentences. Sentence case everywhere.
- Specific over clever: "Roasted on Tuesdays in the back room" beats "Passion in every cup".
- No marketing superlatives ("the best", "world-class", "elevate", "unlock").
- Buttons say exactly what they do: "See the menu", "Get directions", "Buy beans".

---

## 3. Design system

The palette and type are drawn from the shop's own materials (see `Inspiration/`): oak, fired clay, limewashed brick, sage-painted cabinetry and the dark roaster.

### Colour palette (5 colours, no more)

| Token | Name | Hex | Taken from | Use |
|---|---|---|---|---|
| `--kalk` | Limewash | `#EAE5DB` | Painted brick walls | Page background |
| `--roast` | Roast | `#2B2420` | Dark-roast beans, roaster body | Body text, headlines, dark sections |
| `--oak` | Oak | `#B98A55` | Counters, shelves, stools | Surfaces, image frames, dividers, secondary fills |
| `--ler` | Fired clay | `#9C4F32` | Terracotta cups and pots | The single accent: primary buttons, links, key highlights |
| `--salvie` | Sage | `#8C9A82` | Painted cabinets, plants | Quiet secondary accent: tags, hover states, small fills |

Rules:
- Tints/shades of these five (via opacity or `color-mix()`) are allowed; new hues are not.
- **No gradients** as decoration. The only "gradients" allowed are photographic light.
- `--ler` is used sparingly — roughly one accented thing per screen.
- Text contrast must meet WCAG AA. `--roast` on `--kalk` for body; `--kalk` on `--roast` for inverted sections. Don't set body text in `--oak` or `--salvie`.
- Pure white `#FFF` and pure black `#000` are not used.

### Typography

| Role | Typeface | Why |
|---|---|---|
| Headlines | **Young Serif** (Google Fonts) | Soft, slightly chunky serif with an old-print warmth — feels like stamped ceramic or a coffee-bag label rather than a tech brand. |
| Body & UI | **Familjen Grotesk** (Google Fonts) | A grotesk with Scandinavian roots and a bit of character in its curves; clean for menus and prices without being a default UI font. |

Rules:
- **Never use Inter**, Roboto, Arial, Helvetica, Open Sans, Poppins or the system UI stack as a visible face.
- Type scale (desktop → mobile, fluid with `clamp()`):
  - Display: 72–96px → 44–52px, line-height 1.0–1.05, Young Serif
  - H2: 44–56px → 32–36px, Young Serif
  - H3: 24–28px → 20–22px, Familjen Grotesk 600
  - Body: 18px → 17px, line-height 1.6, Familjen Grotesk 400
  - Small/meta: 14–15px, Familjen Grotesk 500
- Line length: 45–75 characters for running text.
- No all-caps labels, no tracked-out eyebrows above headings, no accenting a single word in a headline with italic/colour.
- Prices and times use tabular figures (`font-variant-numeric: tabular-nums`) in the body face — no monospace.

### Layout

- **Asymmetric, left-aligned by default.** Content sits on a 12-column grid with deliberate offsets (e.g. text in columns 1–6, image bleeding from 7 to the edge). Centring is reserved for rare, intentional moments.
- **Photography leads.** Large, real images of the space, the roaster and the coffee. Images can bleed off the grid edge; let them be big.
- **Varied section rhythm.** Don't repeat the same block shape down the page. Mix full-bleed images, text-heavy columns, a menu list, a map.
- **Shapes from the room**: soft radius (4–8px) on images where it helps, not one radius on everything. No floating "cards with soft shadows" grids.
- Generous whitespace, but sections should still feel full of real content.

### Imagery

- Use the shop's own photography. The photos in `Inspiration/` (`hero-interior.jpg`, `room-interior.jpg`, `roastery-detail.jpg`) are the owner's and **approved for use on the site**: copy optimised versions into `assets/images/`. The furniture-studio screenshot is mood reference only, not for use.
- Generated detail shots (Higgsfield, GPT Image 2.5): `pour-*`, `window-bar-*`, `beans-cooling-*` in `assets/images/`. They must match the real photos: low warm morning light, oak, terracotta, limewash, sage, no people's faces, no text or logos.
- **Higgsfield credits:** spend sparingly. Always preflight with `get_cost`, prefer low or medium quality at 1k for detail shots, and agree a budget with the owner before any video. This site has used 6.5 credits so far.
- Warm, natural light; real textures (wood grain, burlap, ceramics, steam).
- No generic stock (laptop-and-latte, smiling-barista-with-thumbs-up, coffee-bean-splash renders).
- Always provide `alt` text describing what's actually in the picture.
- Serve responsive images (`srcset`/`sizes`, modern formats like AVIF/WebP with JPEG fallback), lazy-load below the fold.

### Icons

- **No emojis as icons. Ever.**
- Use simple line icons, either one consistent set (e.g. Phosphor or Lucide, thin/regular weight) or hand-drawn SVGs. Only where an icon truly helps (map pin, clock, Instagram).
- Icons inherit `currentColor`.

### Motion

- Scroll motion is cinematic but quiet, and limited to this set (owner-approved, October 2026):
  - Hero: a silent 5 s ambient loop (`assets/video/hero-loop.mp4`, generated from the real hero photo) fades in over the still. Loaded after page load, skipped on data saver, paused off-screen.
  - Photographs: a curtain-up reveal (`data-reveal`) and a slow drift inside the frame (`data-parallax`).
  - The room panorama opens from framed to full bleed as it scrolls in (`data-widen`).
  - The roastery "week" timeline highlights the day at the centre of the screen (`data-week`).
- Text never fades or slides in, and there are no hover animations on everything. Don't add new effects outside this set without asking.
- All scroll motion lives behind the `.motion` class, which site.js only sets when `prefers-reduced-motion` allows it.
- Interaction feedback (menu opening, accordion expanding) is welcome and quick (150–250ms).
- Respect `prefers-reduced-motion`.

---

## 4. Anti-patterns — the "generic AI website" look

The owner supplied examples of what to avoid (dark SaaS landing pages for "Synapse", "Helix AI", "Vertex AI", "Cortex"). Never ship any of these:

- Inter or similar default sans as the main typeface
- Gradient text, gradient buttons, rainbow/neon or purple-to-blue palettes, glowing shadows
- Everything centred: centred hero headline + centred subtext + two centred buttons
- Pill badges above the headline ("NEW — Introducing…", "LIVE")
- "Trusted by" logo rows, fake stats strips, testimonial carousels with avatars
- Identical rounded cards in a 3-up grid with soft grey shadows
- Headlines with one word highlighted in a different colour or italic
- Arrows appended to every button ("Get started →")
- ALL-CAPS tracked eyebrow labels above every section
- Middle-dot meta strings ("Coffee · Pastries · Wi-Fi")
- Emoji icons, stock photography, dark mode by default
- The cream-background + terracotta-accent + high-contrast-serif template look, used without thought. Our palette shares materials with it, so we earn the difference through layout, real photography and restraint.

Before shipping a section, ask: *would this look the same on a SaaS or any other café's site?* If yes, redesign it.

---

## 5. Responsive design

Design mobile and desktop **as separate compositions**, not one layout squeezed down.

- Breakpoints (guideline): mobile < 640px, tablet 640–1024px, desktop > 1024px. Use fluid type/spacing between them.
- **Mobile is a first-class layout.** Typical phone visitors want: open now? where? menu? Put hours, address and a "Get directions" action within the first screen on mobile.
- Re-order and re-crop on mobile: different image crops (`<picture>` with art direction), stacked-but-reconsidered sections, tap-friendly menu lists.
- Navigation: a proper mobile menu (full-height panel), not a shrunk desktop nav. Tap targets ≥ 44×44px.
- No horizontal scroll at any width from 320px up.
- Test at minimum: 375px, 768px, 1280px, 1440px.

---

## 6. Technical setup

- **Stack:** static site — semantic HTML, modern CSS (custom properties, grid, `clamp()`), minimal vanilla JS. No framework or build step unless we agree to add one.
- **Structure:**
  ```
  index.html        # the whole site: one page, English only (lang="en")
  assets/css/       # tokens.css (design tokens), site.css (base, layout, sections)
  assets/js/
  assets/images/
  assets/fonts/     # self-hosted woff2 if we move off Google Fonts
  Inspiration/      # reference only, not shipped
  ```
- All colours, fonts, spacing and radii live as CSS custom properties in `assets/css/tokens.css`. No hard-coded hex values elsewhere.
- **Local dev server:** `python3 -m http.server 8000` from the project root, then open http://localhost:8000.
- **Quality floor:** semantic landmarks, visible keyboard focus, AA contrast, `lang` attribute, meta description and Open Graph tags, sensible page weight (hero image optimised, fonts subset/preloaded).

### Definition of done (per change)
1. Built using the design tokens and rules above.
2. Viewed on localhost at mobile and desktop widths (screenshots checked).
3. No console errors; keyboard navigation works.
4. Checked against the anti-pattern list in section 4.
5. **Not pushed** — wait for the owner's go-ahead.

---

## 7. Site scope and content

Decisions from the owner: **one-page site**, **English only**, content and logo **written/designed by us**, photos in `Inspiration/` **usable**. No online shop: beans are sold over the counter.

### Page sections (in order; anchor links in the nav)
1. **Hero:** the room in morning light (`hero-interior.jpg`), the wordmark, one plain line about what we are, and on mobile, today's hours plus "Get directions".
2. **The roastery** (`#roastery`): we roast in the back room, small batches, once a week. Uses `roastery-detail.jpg`.
3. **Menu** (`#menu`): a clean price list, not cards.
4. **Beans** (`#beans`): current roasts available to take home.
5. **Visit** (`#visit`): address, hours, map link, `room-interior.jpg`.
6. **Footer:** address, hours, Instagram, copyright.

### Fixed facts (fictional, invented for the site; keep consistent everywhere)
- **Address:** Blågårdsgade 14, 2200 København N
- **Hours:** Mon–Fri 07:30–17:00 · Sat–Sun 09:00–16:00 *(in the UI, write these as separate lines, not middle-dot strings)*
- **Instagram:** @nordicgrind.cph
- **Email:** hej@nordicgrind.dk
- **Roast day:** Tuesday, on a 5 kg drum roaster in the room behind the bar. Beans rest Wednesday–Sunday and go on the bar from Monday.
- **The room:** twenty seats, a window bar facing the street, a bench at the back. No laptops at the window on weekends.
- **Buns:** baked each morning by the bakery two doors down.

### Menu (DKK)
| Coffee | | Food | |
|---|---|---|---|
| Espresso | 32 | Cardamom bun | 35 |
| Cortado | 38 | Cinnamon snail | 32 |
| Cappuccino | 45 | Rye toast with butter and cheese | 55 |
| Flat white | 45 | Seasonal porridge | 65 |
| Caffè latte | 48 | | |
| Filter, by the cup | 38 | | |
| Batch brew, refills free | 35 | | |

Oat milk at no extra charge.

### Beans (250 g, DKK)
- **Huila, Colombia:** red apple, panela, cocoa. 125
- **Sidama, Ethiopia:** bergamot, apricot, black tea. 145
- **Nordic Grind House:** our everyday espresso; hazelnut, milk chocolate. 115

### Logo
There is no existing logo; we design one.
- A **wordmark** "Nordic Grind" set in Young Serif, with custom spacing tuned by hand. It's the primary logo.
- An optional small **mark** for the favicon and social avatar: a simple, hand-drawn-feeling SVG drawn from the shop (e.g. a coffee bean or cup outline in a single line weight). No generic coffee-cup clip art, no circle-badge "EST. 20XX" template.
- Delivered as SVG in `assets/images/logo/` in `--roast`, plus `--kalk` for dark backgrounds. Favicon generated from the mark.

### Still open
- Hosting target once we're ready to publish.
