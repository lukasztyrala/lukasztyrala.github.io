# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start local dev server (localhost:4321)
npm run build    # Build production site to ./dist/
npm run preview  # Preview production build locally
```

No test or lint commands are configured.

## Tech preferences

Keep the stack simple: vanilla CSS (modern native features are encouraged — container queries, `@layer`, `color-mix()`, cascade layers, etc.), semantic HTML, and vanilla JavaScript. Use TypeScript where it adds meaningful type safety (e.g. Astro components, content config, utilities).

## Deployment

The site is published via **GitHub Pages** with the custom domain `lukasztyrala.pl`. Large static files (images, video, etc.) are served via **Backblaze B2** cloud storage — do not commit large binaries to the repo.

## Architecture

This is a personal portfolio/blog site built with **Astro 6** using plain CSS (no Tailwind). It generates a static site deployed to `https://lukasztyrala.pl`.

**Key integrations**: `@astrojs/mdx` for blog content, `@astrojs/rss` for the feed, `@astrojs/sitemap` for SEO.

### Content Collections

Blog posts live in `src/content/blog/` as `.md` or `.mdx` files. The collection schema (defined in `src/content.config.ts`) requires `title`, `description`, and `pubDate`; `author`, `updatedDate`, and `heroImage` are optional.

Files prefixed with `_` are excluded from the collection by the glob loader pattern `**/[^_]*.{md,mdx}`.

### Layouts and Pages

- `src/layouts/` — three layouts: `Page` (generic), `Post` (blog posts), `Gallery`
- `src/pages/` — static pages (`index`, `manifesto`, `now`, `portfolio`, `gallery`, `test`) plus dynamic blog routes (`blog/[...id].astro`) and `rss.xml.js`
- `src/components/` — shared components: `BaseHead`, `Header`, `Footer`, `HeaderLink`, `FormattedDate`, `Clock`
- `src/styles/` — `main.css`, `gallery.css`, `normalize.css`
- `src/js/clock.js` — client-side clock utility
- `src/consts.ts` — site-wide `SITE_TITLE` and `SITE_DESCRIPTION` constants
