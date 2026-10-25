// De fire faglige pilarene. Slug matcher frontmatter-feltet `pilar` i innleggene.
export const pilarer = [
  { slug: 'context-engineering', tittel: 'Context engineering', tekst: 'Hvordan du faktisk gir KI riktig kontekst — det som skiller bra fra dårlig KI-bruk.' },
  { slug: 'agent-bruk', tittel: 'Praktisk agent-bruk', tekst: 'Claude Code-arbeidsflyt og ekte eksempler, vist gjennom mitt eget personlige KI-oppsett.' },
  { slug: 'senior-til-ki', tittel: 'Fra senior utvikler til KI-forsterket', tekst: 'For erfarne utviklere som vil endre måten de jobber på.' },
  { slug: 'ki-for-selskaper', tittel: 'KI for norske selskaper', tekst: 'Avmystifisering — hva som gir reell verdi, og hva som bare er støy.' },
];

export const pilarNavn = (slug?: string) => pilarer.find((p) => p.slug === slug)?.tittel;
