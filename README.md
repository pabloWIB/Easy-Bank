# Easy-Bank

Landing page for a fictional digital bank, built to a supplied design, with no build step and no dependencies.

[![Live demo](https://img.shields.io/badge/demo-easybank.wib.digital-2ea44f)](https://easybank.wib.digital)
[![Hire me on Fiverr](https://img.shields.io/badge/Hire%20me%20on-Fiverr-1DBF73?style=for-the-badge&logo=fiverr&logoColor=white)](https://www.fiverr.com/pablonietop)
![Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## Description

A marketing page for *Easybank*, a bank that does not exist. It was built against a supplied
design rather than an invented one — the four comps it was matched to ship in
[`docs/design/`](docs/design), which makes this a fidelity exercise more than a design one.

The page argues four features — online banking, simple budgeting, fast onboarding and an open
API — and closes with an article grid. What carries it is the motion: sections fade and lift
into place as they enter the viewport, staggered inside each grid.

Everything is served as written. There is no bundler, no preprocessor, no package manager and
no runtime dependency: three CSS files, three scripts and the images. Total transferred weight
is about 340 KB, most of it the four article photographs.

Because the bank is fictional, nothing on the page pretends to work. Every link resolves to a
section that exists, and anything that had no real destination — the invite form, the social
icons, the About/Contact/Careers pages — was removed rather than left as a dead end. The
reasoning for each removal is in [`docs/cambios.md`](docs/cambios.md).

## Features

- Scroll-triggered reveals via a single `IntersectionObserver`, staggered in CSS.
- Mobile-first layout at 480 / 768 / 1024, verified free of horizontal scroll from 320 px up.
- Mobile menu that closes on link click, on `Escape` (returning focus), on backdrop click and
  on resize past the desktop breakpoint, and locks background scroll while open.
- Header that compacts past the hero, throttled with `requestAnimationFrame`.
- Honours `prefers-reduced-motion`, and degrades to fully visible content without JavaScript.
- Design tokens in `:root`: one type scale, one 4→96 spacing scale, one font family.

## Tech stack

| Layer | Technology | Role in project |
|---|---|---|
| Markup | HTML5 | `index.html` and `404.html` |
| Styling | CSS3 custom properties | `base.css`, `layout.css`, `components.css` — 18.5 KB |
| Scripting | Vanilla JavaScript | One entry point, two modules — 4.1 KB |
| Typography | Public Sans, via Google Fonts | `font-display: swap`, preconnected |
| Hosting | Vercel | Static, no build command |

## Project structure

```
.
├── index.html                     # The whole site
├── 404.html                       # Standalone error page, noindex
├── robots.txt                     # Points at the sitemap
├── sitemap.xml                    # One URL
├── assets/
│   ├── css/
│   │   ├── base.css               # Tokens, reset, base typography
│   │   ├── layout.css             # Container, header, hero, sections, footer
│   │   └── components.css         # Button, nav, mobile menu, cards, reveal
│   ├── js/
│   │   ├── main.js                # Entry point; calls the modules
│   │   └── modules/
│   │       ├── nav.js             # Header compaction and mobile menu
│   │       └── reveal.js          # IntersectionObserver reveals
│   └── img/
│       ├── logo/                  # Wordmark, dark and light
│       ├── icons/                 # Feature icons and favicon
│       └── content/               # Hero shapes, app mockups, article photos, og:image
├── docs/
│   ├── auditoria.md               # State of the project before the reorganisation
│   ├── cambios.md                 # What changed and why, by phase
│   ├── style-guide.md             # Supplied palette, type scale and breakpoints
│   └── design/                    # The four comps the page was built against
└── LICENSE
```

## Running it locally

The page opens straight from disk — the scripts are classic, not ES modules, precisely so that
it does:

```bash
git clone https://github.com/pabloWIB/Easy-Bank.git
cd Easy-Bank
```

Then open `index.html` in a browser. To serve it over HTTP instead:

```bash
npx serve .
```

There is nothing to install and nothing to build.

## Design reference

[`docs/design/`](docs/design) holds the four comps this page was matched against, and
[`docs/style-guide.md`](docs/style-guide.md) the supplied colour values, type scale and
breakpoints. Check any change against those files rather than against the rendered page.

Two colours deliberately depart from the supplied palette, because the originals failed
WCAG AA:

| Element | Supplied | Ratio | Used here | Ratio |
|---|---|---|---|---|
| Secondary text | `hsl(233, 8%, 62%)` on white | 2.9:1 | `hsl(233, 8%, 45%)` | 5.2:1 |
| Button label | white on the brand gradient | 2.0:1 | `hsl(233, 26%, 24%)` | 5.4–6.2:1 |

The brand gradient itself is unchanged; only the text on top of it is.

## Deployment

Deployed on Vercel at [easybank.wib.digital](https://easybank.wib.digital). Static: upload the
repository root as-is, with no build command and no output directory. The canonical URL,
`og:url` and `sitemap.xml` all point at that domain and need editing if it changes.

## License

MIT — see [LICENSE](LICENSE).

## Author

**Pablo Nieto Pérez** — [wib.digital](https://wib.digital)
GitHub: [@pabloWIB](https://github.com/pabloWIB)

## Hire me

I build **custom internal tools, CRMs and dashboards** for small teams, and
**conversion-focused websites** for businesses.

- [Custom internal tool, CRM or dashboard](https://www.fiverr.com/pablonietop/build-a-custom-internal-app-for-your-business) — from $45
- [Conversion-focused website](https://www.fiverr.com/pablonietop/convert-your-landing-page-design-to-code) — from $80
- [All my services on Fiverr](https://www.fiverr.com/pablonietop)
- [wib.digital](https://wib.digital)
