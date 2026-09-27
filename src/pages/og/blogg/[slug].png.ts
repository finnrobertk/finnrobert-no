// Delebilde per publisert innlegg: /og/blogg/<slug>.png (statisk, bygges ved `astro build`).
import type { APIRoute, GetStaticPaths } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { lagOgBilde, pngRespons } from '../../../lib/og';

export const getStaticPaths = (async () => {
  // Utkast får verken side eller delebilde.
  const innlegg = await getCollection('blogg', ({ data }) => !data.utkast);
  return innlegg.map((post) => ({ params: { slug: post.id }, props: { post } }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const { post } = props as { post: CollectionEntry<'blogg'> };
  const dato = post.data.dato.toLocaleDateString('nb-NO', { day: 'numeric', month: 'long', year: 'numeric' });
  return pngRespons(await lagOgBilde({ tittel: post.data.tittel, undertekst: dato }));
};
