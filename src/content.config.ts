import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blogginnlegg skrives som markdown i src/content/blogg/.
// Filnavn (uten .md) blir slug, f.eks. velkommen -> /blogg/velkommen
// Dateløse slugs med vilje: URL-en kobles ikke til dato, så `dato` (under) kan endres
// uten at permalenken blir stale. Publiseringsdato styres av frontmatter-feltet `dato`.
const blogg = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blogg' }),
  schema: z.object({
    tittel: z.string(),
    ingress: z.string(),
    dato: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    // Pilar: context-engineering | agent-bruk | senior-til-ki | ki-for-selskaper
    pilar: z.string().optional(),
    utkast: z.boolean().default(false),
  }),
});

export const collections = { blogg };
