// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Absolutt base for feeds (feed.json, rss.xml) og kanoniske URL-er.
  site: 'https://finnrobert.no',
  redirects: {
    // Gammel slug (innlegget var publisert som «KI-lager») → ny dateløs «KI-kunnskapsbase»
    '/blogg/2026-06-07-personlig-ki-lager-med-agenter':
      '/blogg/personlig-ki-kunnskapsbase-med-agenter',
  },
});
