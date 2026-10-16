# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev      # Start local dev server (localhost:4321)
bun run build    # Build production site to ./dist/
bun run preview  # Preview production build locally
```

No test or lint commands are configured. The package manager is **bun**, and the lockfile is the text `bun.lock`. Don't add a `package-lock.json` (it's gitignored): `withastro/action` would pick npm over bun if one existed. Astro 7 requires Node.js ≥ 22.12.

## Tech preferences

Keep the stack simple: vanilla CSS (modern native features are encouraged — container queries, `@layer`, `color-mix()`, cascade layers, etc.), semantic HTML, and vanilla JavaScript. Use TypeScript where it adds meaningful type safety (e.g. Astro components, content config, utilities).

## Deployment

The site is published via **GitHub Pages** with the custom domain `lukasztyrala.pl`. `.github/workflows/deploy.yml` builds every push to `main` with `withastro/action`, pinned to Node 24 and `bun@1.4.3`. When you upgrade bun locally, bump `package-manager` there too.

**Workflow files are edited in the GitHub web UI, not pushed.** Pushes from this machine use an HTTPS token that may lack the `workflow` scope, and GitHub rejects any push that touches `.github/workflows/`. Don't commit changes to `.github/workflows/` locally. Prepare the new file content, edit it on github.com, then `git pull`. Large static files (images, video, etc.) are served via **Backblaze B2** cloud storage — do not commit large binaries to the repo.

## Architecture

This is a personal portfolio/blog site built with **Astro 7** using plain CSS (no Tailwind). It generates a static site deployed to `https://lukasztyrala.pl`.

**Key integrations**: `@astrojs/mdx` for blog content, `@astrojs/rss` for the feed, `@astrojs/sitemap` for SEO.

### Content Collections

Blog posts live in `src/content/blog/` as `.md` or `.mdx` files. The collection schema (defined in `src/content.config.ts`) requires `title`, `description`, and `pubDate`; `author`, `updatedDate`, and `heroImage` are optional.

Files prefixed with `_` are excluded from the collection by the glob loader pattern `**/[^_]*.{md,mdx}` (e.g. the `_…markdown-style-guide.md` reference post). `author` defaults to `SITE_AUTHOR`.

### Layouts and Pages

- `src/layouts/Page.astro` — the single layout. Props: `title`, `description`, `image`, `type` (`website`/`article`), `noindex` (all passed to `BaseHead` for `<title>`, meta and Open Graph tags) and `bodyClass` (default `page`; blog posts use `page post`). It wraps the slot in `<main class="page-main">`, which is `display: contents` so `.page-name`, `.page-intro` and `.page-content` stay direct items of the body grid.
- `src/pages/` — static pages (`index`, `manifesto`, `now`, `portfolio`, `gallery`, `test`) plus dynamic blog routes (`blog/[...id].astro`) and `rss.xml.js`. `test` and `gallery` are unlisted: they set `noindex` and are filtered out of the sitemap in `astro.config.mjs`.
- `src/components/` — shared components: `BaseHead`, `Header`, `Footer`, `HeaderLink`, `SocialLinks` (profile icons used in both header and footer), `FormattedDate`, `Clock` (SVG clock with its own script)
- `src/styles/` — `normalize.css` (in `@layer reset`) and `main.css` (layers `base`, `layout`, `components`, `utilities`; palette as custom properties on `:root`)
- `src/consts.ts` — site-wide constants: `SITE_TITLE`, `SITE_DESCRIPTION`, `SITE_AUTHOR`, and build-time `YEARS_EXPERIENCE` / `YEARS_TEACHING`

`astro.config.mjs` sets `compressHTML: true`. Astro 7's default (`'jsx'`) drops the whitespace at line breaks next to inline elements, which breaks the hand-written HTML in the pages.
