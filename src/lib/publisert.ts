import type { CollectionEntry } from 'astro:content';

type Innleggsdata = CollectionEntry<'blogg'>['data'];

/**
 * Et innlegg er publisert når det ikke er utkast OG publiseringsdatoen er nådd.
 *
 * Siden er statisk, så «nå» betyr byggetidspunktet. Et innlegg med `dato` fram i tid
 * og `utkast: false` ligger klart i repoet og dukker opp ved første bygg etter datoen —
 * det daglige nybygget (.github/workflows/planlagt-publisering.yml) sørger for det.
 * `dato` uten klokkeslett tolkes som midnatt UTC, dvs. kl. 01/02 norsk tid samme dag.
 */
export function erPublisert(data: Innleggsdata, naa: Date = new Date()): boolean {
  return !data.utkast && data.dato.valueOf() <= naa.valueOf();
}
