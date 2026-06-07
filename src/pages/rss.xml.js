import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

// RSS-feed for lesere (RSS-/Atom-klienter). For maskin-til-maskin-kobling
// med intello.no, se /feed.json — den er den primære kontrakten.

export async function GET(context) {
  const innlegg = (await getCollection('blogg', ({ data }) => !data.utkast)).sort(
    (a, b) => b.data.dato.valueOf() - a.data.dato.valueOf(),
  );

  return rss({
    title: 'finnrobert.no — blogg',
    description:
      'Praktiske tekster om KI, context engineering og agent-bruk — på norsk.',
    site: context.site,
    items: innlegg.map((post) => ({
      title: post.data.tittel,
      description: post.data.ingress,
      pubDate: post.data.dato,
      link: `/blogg/${post.id}/`,
      categories: post.data.pilar ? [post.data.pilar] : undefined,
    })),
    customData: '<language>nb-no</language>',
  });
}
