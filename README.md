# youssef.oussaid.net

Portfolio + learning log for Youssef OUSSAID — built with [Astro](https://astro.build),
deployed to GitHub Pages via GitHub Actions.

## Stack

- **Astro** static site generator
- **Content Collections** for the blog (type-safe Markdown front-matter)
- Bilingual portfolio (EN/FR toggle), English-only blog
- Dark / light theme, no runtime framework — ships ~0 JS

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # output to ./dist
npm run preview    # serve the built site
```

## Writing a blog post

1. Create a Markdown file under the matching category folder:

   ```
   src/content/blog/<category>/<my-post>.md
   ```

   Categories (folder names):
   `rhcsa`, `kubernetes`, `azure`, `iac`,
   `configuration-management`, `monitoring-observability`

2. Add front-matter:

   ```yaml
   ---
   title: "Your title"
   description: "One-line summary shown in listings and meta tags."
   category: kubernetes        # must match one of the categories above
   date: 2026-06-14
   tags: [scheduling, nodes]   # optional
   draft: false                # true hides it from the build
   ---
   ```

3. Write Markdown below. Fenced code blocks get syntax highlighting.

4. Commit and push to `main`:

   ```bash
   git add .
   git commit -m "post: kubernetes taints"
   git push
   ```

   The GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and
   deploys automatically. No manual steps.

## Editing the portfolio

The single-page portfolio lives in `src/pages/index.astro`. Bilingual text uses
paired `<span class="en">` / `<span class="fr">` elements. Site-wide details
(name, email, links) live in `src/consts.ts`, which also defines the blog
categories.

## Deployment notes

- Custom domain is set via `public/CNAME` (`youssef.oussaid.net`).
- `public/.nojekyll` stops GitHub Pages from running Jekyll.
- In the GitHub repo: **Settings → Pages → Build and deployment → Source =
  GitHub Actions**.
