import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blogginnlegg skrives som markdown i src/content/blogg/.
// Filnavn (uten .md) blir slug, f.eks. 2026-06-07-velkommen -> /blogg/2026-06-07-velkommen
const blogg = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blogg' }),
  schema: z.object({
    tittel: z.string(),
    ingress: z.string(),
    dato: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    // Pilar: context-engineering | agent-bruk | senior-til-ai | ki-for-selskaper
    pilar: z.string().optional(),
    utkast: z.boolean().default(false),
  }),
});

export const collections = { blogg };
