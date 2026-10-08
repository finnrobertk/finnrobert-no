import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { erPublisert } from '../lib/publisert';

// Maskinlesbar JSON-feed over publiserte blogginnlegg.
// Dette er kontrakten intello.no konsumerer ved build-tid.
// URL: https://finnrobert.no/feed.json
//
// Hvert innlegg: { tittel, ingress, url (absolutt), dato (ISO), pilar }
// Utkast og innlegg med dato fram i tid utelates (se lib/publisert.ts). Nyeste først.

const SITE = 'https://finnrobert.no';

export const GET: APIRoute = async () => {
  const innlegg = (await getCollection('blogg', ({ data }) => erPublisert(data))).sort(
    (a, b) => b.data.dato.valueOf() - a.data.dato.valueOf(),
  );

  const poster = innlegg.map((post) => ({
    tittel: post.data.tittel,
    ingress: post.data.ingress,
    url: `${SITE}/blogg/${post.id}`,
    dato: post.data.dato.toISOString(),
    pilar: post.data.pilar ?? null,
  }));

  return new Response(JSON.stringify(poster), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      // La konsumenter (og CDN) cache feeden en kort stund.
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
