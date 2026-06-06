# finnrobert.no

Personlig fag-/bloggside for **Finn-Robert** om KI — context engineering og praktisk agent-bruk,
på norsk. Personlig merkevare, holdt adskilt fra firmaet (intello.no).

> **Hub-notat** med strategi og milepæler ligger i PKA-lageret:
> `~/pka/10-prosjekter/finnrobert-no/hub.md`. Merkevare/tokens: `~/pka/brand/finnrobert/`.

## Tech stack
- **Astro 6** (statisk output), TypeScript strict.
- Innhold som **markdown** i `src/content/blogg/` via content collections (`src/content.config.ts`).
- Ingen UI-rammeverk; ren Astro + CSS. Fonter fra Google Fonts (Fraunces, Inter, JetBrains Mono).

## Struktur
- `src/styles/tokens.css` — design tokens (kopi fra `~/pka/brand/finnrobert/tokens.css`; oppdater begge).
- `src/styles/global.css` — basisstiler bygget på tokens.
- `src/layouts/BaseLayout.astro` — html-skall, SEO, fonter, tema (lys/mørk).
- `src/components/` — `Header.astro`, `Footer.astro`.
- `src/pages/` — `index.astro` (forside), `om.astro`, `kontakt.astro`, `blogg/index.astro`,
  `blogg/[...slug].astro` (innlegg-mal).
- `src/content/blogg/*.md` — blogginnlegg. Frontmatter: `tittel, ingress, dato, tags, pilar, utkast`.

## Skrive et nytt innlegg
Lag `src/content/blogg/ÅÅÅÅ-MM-DD-tittel.md` med frontmatter. Sett `utkast: true` for å holde det
ute av produksjon. Filnavnet (uten `.md`) blir URL-slug.

## Kommandoer
- `npm run dev` — lokal utvikling.
- `npm run build` — statisk bygg til `dist/`.
- `npm run preview` — forhåndsvis bygget.

## Innholdsføringer
Tone: praktisk, ærlig, rolig — «kollega, ikke guru». Norsk. Ingen hype. Se posisjoneringen i
hub-notatet. Fire pilarer: context-engineering, agent-bruk, senior-til-ki, ki-for-selskaper.

## Ikke gjort ennå
- GitHub-remote, Vercel-deploy og DNS-kobling av finnrobert.no.
- Endelig kontakt-e-post (venter på Fastmail — se `src/pages/kontakt.astro`).
