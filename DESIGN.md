# Portfolio redesign package

The portfolio landing page is packaged as a **self-contained, fully-controllable
surface** so it can be redesigned without touching the rest of the MkDocs site.

## The two files to edit

| File | What it is |
| --- | --- |
| `overrides/home.html` | All portfolio **markup** — a Material theme template (`{% extends "main.html" %}`) that replaces the page's `content` block. Hero, stats, about, skills, experience, learning-log topics, contact. |
| `docs/stylesheets/home.css` | All portfolio **styles**, scoped under `.portfolio` so they never leak into the blog or docs pages. |

That's it. A design pass changes those two files and nothing else.

## How it's wired

- `docs/index.md` is empty except front matter: `template: home.html` selects the
  custom template, and `hide: [navigation, toc]` gives the page full width.
- `mkdocs.yml` → `theme.custom_dir: overrides` and `extra_css` loads `home.css`.
- The rest of the theme (top bar, tabs, footer, dark/light toggle) comes from
  Material via `main.html`, so the portfolio keeps site-wide navigation for free.

## Design tokens (available in home.css)

```
--md-accent-fg-color              signature chartreuse accent
--md-default-fg-color             body text
--md-default-fg-color--light      muted text
--md-default-fg-color--lightest   hairline borders
--md-default-bg-color             page background
--yo-mono                         JetBrains Mono stack
```

These adapt automatically to dark/light mode. Prefer them over hard-coded colors
so the redesign works in both schemes.

## Preview a redesign

```bash
. .venv/bin/activate
mkdocs serve --watch-theme      # --watch-theme picks up overrides/ changes live
```

Open http://localhost:8000/ — the home page reflects `home.html` + `home.css`.

## Scope rules for a redesign

- Keep everything inside the `.portfolio` wrapper and `pf-` class prefix.
- Don't restyle bare Material selectors (`.md-*`) in `home.css` — that affects the
  whole site. Site-wide tweaks belong in `docs/stylesheets/extra.css`.
- Content (the actual text, jobs, skills) lives in the Jinja arrays at the top of
  each section in `home.html` — edit there to change copy.
