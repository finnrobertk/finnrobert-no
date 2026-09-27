// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // Absolutt base for feeds (feed.json, rss.xml) og kanoniske URL-er.
  site: 'https://finnrobert.no',
  // Sitemap til Google Search Console (sitemap-index.xml). OG-bildene er ikke sider og kommer ikke med.
  // URL-ene skrives uten avsluttende skråstrek, samme form som canonical/og:url i BaseLayout.
  integrations: [
    sitemap({
      serialize: (item) => ({ ...item, url: item.url.replace(/(?<=[^/])\/$/, '') }),
    }),
  ],
  redirects: {
    // Gammel slug (innlegget var publisert som «KI-lager») → ny dateløs «KI-kunnskapsbase»
    '/blogg/2026-06-07-personlig-ki-lager-med-agenter':
      '/blogg/personlig-ki-kunnskapsbase-med-agenter',
  },
});
