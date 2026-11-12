# Bryan Reyes — Portfolio / CV

Live site: **https://reyescoding.github.io/**

A scroll-driven, project-first personal portfolio built to showcase full-stack
work for a 2026–2027 international job search. No framework, no build step —
just HTML, CSS, and JS, deployed straight to GitHub Pages from this repo
(`ReyesCoding.github.io`, so it publishes automatically at the repo's root URL).

## Stack

- **HTML5** — single-page semantic markup
- **CSS3** — custom properties for theming, CSS Grid/Flexbox for layout,
  `scroll-snap` for the mobile project track
- **Vanilla JavaScript** — no framework; handles the custom cursor, smooth
  in-page scrolling, and wiring up the scroll animations
- **[GSAP 3.12.5](https://gsap.com/) + ScrollTrigger** (via cdnjs) — hero
  intro timeline, parallax, section reveals, and the pinned horizontal
  project track on desktop. Everything still works and lays out correctly
  if the CDN is slow or blocked — the layout-critical code never depends on
  GSAP being available.
- **Google Fonts** — Space Grotesk (headings) and Inter (body)

## Structure

```
.
├── index.html       # all markup: hero, work, about, stack, experience, education, contact
├── css/
│   └── style.css    # design tokens (:root), layout, responsive rules
└── js/
    └── main.js       # cursor, project-track layout, GSAP animations, nav
```

## Sections

- **Hero** — name, role, one-line pitch
- **Work** — featured projects, each linking to its GitHub repo (and a live
  demo or demo video where one exists):
  - **Aula SAPM** — full-stack school administration platform (the primary project)
  - **Pensum Planner** (`medicina-pwa-final`) — PWA for academic planning
  - **Role-Based Auth System** (`sistema-autenticacion`) — JWT-based auth with role permissions
- **About** — short summary of what I build
- **Stack** — core technologies
- **Experience** — current role plus a condensed summary of prior
  operations/support experience
- **Education** — degree
- **Contact** — email, [GitHub](https://github.com/ReyesCoding?tab=repositories), [LinkedIn](https://www.linkedin.com/in/bryan-reyes-96bb0738a/)

## Running locally

No build step needed. Either open `index.html` directly in a browser, or
serve it so relative paths behave exactly like production:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Deployment

This repo is named `ReyesCoding.github.io`, so GitHub Pages publishes it
automatically at `https://reyescoding.github.io/` on every push to `main` —
no extra Pages configuration required.
