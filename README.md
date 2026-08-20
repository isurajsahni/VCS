# Velly Chicken Spot — Landing Page

A demo restaurant / banquet landing page, built to match the reference design in
`Images/full design page.png` (1440 × 6481).

Plain HTML, CSS and JavaScript. No build step, no framework, no dependencies,
and no network access required at runtime.

## Running it

Double-click `index.html`.

That's it — there is nothing to install and nothing to compile. If you would
rather serve it over HTTP (recommended when testing, since it matches how the
page behaves once deployed), a dev-only server is bundled:

```bash
node .claude/serve.js
```

Then open <http://localhost:5173>. Any other static server works just as well
(`npx serve`, `python -m http.server 5173`, …) — none of them is a dependency
of the site itself.

## Files

| Path | Purpose |
| --- | --- |
| `index.html` | Page markup + inline SVG icon sprite |
| `styles.css` | `@font-face` rules, all styling, design tokens, responsive rules |
| `script.js` | Mobile nav, menu carousel, FAQ accordion, testimonial shuffle |
| `fonts/` | Self-hosted Inter + Poppins webfonts (woff2) |
| `Images/` | Design reference and all page imagery |

## Sections

Header → Hero → Stats/story → Signature menu carousel → Packages → Quote banner →
FAQ accordion → Testimonials → Footer

## Responsive

Verified from 320 px to 1920 px: no horizontal scrolling, nothing clipped, and
no element escaping the viewport at any width in that range.

Display headings scale fluidly with `clamp()` instead of stepping at each
breakpoint. Every clamp's upper bound is its reference value, so the 1440 px
design is still reproduced exactly — the page height lands at 6481 px, as it did
before.

| Breakpoint | What changes |
| --- | --- |
| ≤ 1439 px | FAQ columns rebalance; footer link columns narrow |
| ≤ 1199 px | Hero art shrinks; stat cards unstack and centre; packages, testimonial shots and the FAQ photo become fluid |
| ≤ 991 px | Hamburger nav; hero goes single-column; menu carousel becomes swipeable |
| ≤ 767 px | Packages stack; footer drops to two columns; smaller carousel cards |
| ≤ 479 px | Tighter gutters, smaller badges, arrows and accordion controls |

Two behaviours worth knowing:

- **The carousel changes mechanism, not just size.** Above 991 px it is a
  transform slider; below, `.menu__viewport` becomes a native scroll-snap
  container so it can be swiped on a phone, and the arrows drive `scrollLeft`.
  They assign it directly rather than animating — CSS scroll-snap cancels
  programmatic smooth scrolling, and a hand-rolled animation stalls whenever the
  tab is backgrounded and `requestAnimationFrame` pauses.
- **The booking CTA moves into the dropdown** on small screens rather than being
  hidden, so the primary action stays reachable on a phone.

## Fonts

Inter and Poppins are self-hosted in `fonts/` rather than loaded from the Google
Fonts CDN, so the page renders identically offline and makes zero third-party
requests.

| Family | Files | Notes |
| --- | --- | --- |
| Inter | `inter-latin.woff2`, `inter-latin-ext.woff2` | Variable font — one file covers weights 400–700 |
| Poppins | `poppins-{500,600,700,800}-{latin,latin-ext}.woff2` | Static weights, 8 files |

Only the `latin` and `latin-ext` subsets are bundled (~200 KB total). Each
`@font-face` keeps its original `unicode-range`, so browsers download only the
subsets a page actually uses — in practice 3 files / ~64 KB for this page.

To add a weight or subset, pull the corresponding file from the Google Fonts
CSS API and add a matching `@font-face` block at the top of `styles.css`.

## Design tokens

Sampled directly from the reference PNG:

| Token | Value | Used for |
| --- | --- | --- |
| `--yellow` | `#FFC62B` | Headings, accents, primary buttons |
| `--yellow-bright` | `#FCD201` | "Book a banquet" button |
| `--yellow-nav` | `#FCBC00` | Active nav item |
| `--red` | `#C31E26` | Hero button labels |
| `--red-icon` | `#D80202` | Stat-card icon tiles |
| `--ink` | `#181717` | Hero + signature-menu background |
| `--ink-soft` | `#262626` | Decorative background circles |
| `--ink-card` | `#0D0D0D` | Collapsed FAQ rows |
| `--gold` | `#806315` | Testimonial quote marks |

Type: **Poppins** for display headings, **Inter** for body and UI.

## Layout

Built to the reference's 1440 px frame with a 1200 px centred container
(120 px gutters). Every major element lands within ±3 px of the reference,
and the page height matches exactly at 6481 px. Breakpoints at 1440 / 1200 /
992 / 768 handle smaller viewports.

## Note on assets

`Images/testimonial image 1.png` was not part of the supplied asset set — it was
extracted at native resolution from `full design page.png` so the testimonial row
matches the reference. Swap it for the original if you have it.
