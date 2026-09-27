import type { CollectionEntry } from 'astro:content';

type Innlegg = CollectionEntry<'blogg'>;

/**
 * Velger relaterte innlegg til «Les videre»-blokken.
 *
 * Rangering: samme pilar først, deretter antall delte tags, deretter nyest.
 * Uavgjort brytes på id, så resultatet er deterministisk fra bygg til bygg.
 * Innlegget selv og utkast tas aldri med. Er det få treff, fylles listen
 * opp med de nyeste innleggene (de har bare lavere score i samme sortering).
 */
export function relaterteInnlegg(post: Innlegg, alle: Innlegg[], antall = 3): Innlegg[] {
  const egneTags = new Set(post.data.tags);

  return alle
    .filter((kandidat) => kandidat.id !== post.id && !kandidat.data.utkast)
    .map((kandidat) => ({
      kandidat,
      sammePilar: post.data.pilar !== undefined && kandidat.data.pilar === post.data.pilar ? 1 : 0,
      delteTags: kandidat.data.tags.filter((t) => egneTags.has(t)).length,
    }))
    .sort(
      (a, b) =>
        b.sammePilar - a.sammePilar ||
        b.delteTags - a.delteTags ||
        b.kandidat.data.dato.valueOf() - a.kandidat.data.dato.valueOf() ||
        a.kandidat.id.localeCompare(b.kandidat.id),
    )
    .slice(0, antall)
    .map(({ kandidat }) => kandidat);
}
