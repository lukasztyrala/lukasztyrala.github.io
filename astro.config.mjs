import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// Pages kept for reference but hidden from search engines (they also set `noindex`).
const UNLISTED_PAGES = /\/(test|gallery)\/$/;

// https://astro.build/config
export default defineConfig({
	site: 'https://lukasztyrala.pl',
	// Astro 7 defaults to JSX whitespace rules ('jsx'), which drop the spaces at line breaks
	// next to inline elements in hand-written HTML. `true` compresses losslessly instead.
	compressHTML: true,
	integrations: [mdx(), sitemap({ filter: (page) => !UNLISTED_PAGES.test(page) })],
});
