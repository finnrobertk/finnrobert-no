---
tittel: "Context-filen: struktur, språk og rekkefølge"
ingress: "Alle skriver at du bør ha en instruksfil til KI-verktøyet ditt. Få skriver hvordan innholdet faktisk bør se ut. Her er rekkefølgen jeg lander på, hvordan reglene bør formuleres — og hva filen heter i de ulike verktøyene per august 2026."
dato: 2026-08-25
tags: [context-engineering, ki, claude-md, agents-md, oppsett]
pilar: context-engineering
utkast: true
---

I juli skrev jeg om [CLAUDE.md — å gi et KI-verktøy stående kontekst](/blogg/claude-md-staaende-kontekst):
hva en instruksfil til et verktøy for kunstig intelligens (KI) er, hvorfor den virker, og hva som
bør stå der. Det innlegget stoppet på et overordnet nivå. Det ga en liste over hva som hører hjemme i filen, men lite om *hvordan* du
faktisk skriver den ned.

Så fikk jeg et spørsmål på e-post som gikk rett på det som manglet: hva er anbefalt struktur, språk
og rekkefølge for innholdet — og hva kan, bør eller må filen hete i de forskjellige verktøyene?

Det er fire spørsmål, og de fortjener fire svar. Jeg tar dem i en annen rekkefølge enn de kom, for
rekkefølgen inne i filen er det som gjør størst forskjell — og det er den som oftest er tilfeldig.

## Rekkefølge: skriv en brief, ikke et oppslagsverk

Start med det viktigste. Det høres selvfølgelig ut, men de fleste instruksfiler jeg ser er
organisert som dokumentasjon — alfabetisk, eller etter hvilken rekkefølge ting ble lagt til. En
instruksfil er ikke et oppslagsverk noen slår opp i. Den leses ovenfra og ned, i sin helhet, hver
eneste gang.

Rekkefølgen jeg lander på:

1. **Hva dette er.** To–tre setninger. Hva slags prosjekt, hvilken stack, hva det gjør. Uten dette
   kartet tolker modellen alt som følger på feil premiss.
2. **Kommandoene.** Hvordan bygge, kjøre, teste. Det mest brukte, tidlig.
3. **Grenser og gjør-ikke.** Hva som ikke skal røres, og hva som er utenfor prosjektets ansvar.
4. **Konvensjoner.** Mønstre, navngivning, biblioteker dere har valgt bort.
5. **Det ikke-åpenbare.** Fellene. Rekkefølgen som må holdes. Det som ikke står noe annet sted.

Det som overrasket meg mest var hvor tidlig grensene bør ligge. Min første refleks var å legge dem
nederst, som en slags ansvarsfraskrivelse på slutten. Men grenser er ikke fotnoter — de bestemmer
hva modellen i det hele tatt vurderer som mulig. En grense som leses sent er en grense som allerede
er brutt i planen modellen la på linje ti.

Det er også en praktisk grunn til å bry seg om rekkefølgen: begynnelsen og slutten av en lang tekst
ser ut til å bli lest tyngre enn midten. Det er min erfaring over tid, ikke en måling jeg har gjort
— men det peker samme vei som det åpenbare rådet. Er filen kort nok, spiller rekkefølgen mindre
rolle. Blir den lang, er midten der ting forsvinner.

## Struktur: overskrifter er navigasjon, også for modellen

Hold det flatt. Vanlig markdown, `##` som eneste nivå under tittelen, ingen dyp hierarkisk
nøsting. Hver seksjon skal handle om én ting, og overskriften skal si hvilken.

Tre ting som gjør mest forskjell:

**Ett poeng per punkt.** Punktlister med tre sammenhengende påstander i hvert punkt leses dårlig av
både mennesker og modeller. Del dem opp.

**Lenk i stedet for å lime.** Har du et arkitekturdokument, en API-spesifikasjon eller en lang
kodestandard, pek på filen. Instruksfilen leses hver gang; det store dokumentet trenger bare leses
når det er relevant. Dette er hele skillet mellom stående kontekst og kontekst som hentes ved behov.

**Grupper etter når det gjelder, ikke etter tema.** Ting som gjelder alltid øverst. Ting som bare
gjelder i én mappe hører til i den mappen — flere verktøy leser instruksfiler i underkataloger,
og det er en bedre løsning enn å samle alt i én stor fil.

## Språk: spørsmålet har to lesninger

Da jeg fikk spørsmålet om «språk», leste jeg det først som *formulering*. Men på norsk betyr det
like gjerne *hvilket språk*. Begge er verdt et svar.

### Formuleringen

**Skriv imperativ.** «Bruk pnpm, ikke npm» er en instruksjon. «Vi pleier stort sett å bruke pnpm»
er en observasjon, og modellen behandler den deretter. Kutt «prøv å», «helst», «det er fint hvis».
Hvis noe er valgfritt, hører det som regel ikke hjemme i filen.

**Konkret slår generelt.** «Skriv god, ren kode» bærer null informasjon — modellen prøver allerede
på det. «Pengebeløp er alltid `BigDecimal`, aldri `Double`» er en regel den ikke kunne gjettet.
Tommelen: hvis instruksjonen ville passet like godt i et hvilket som helst annet prosjekt, ta den
ut.

**Grenser slår instruksjoner.** «Ikke rør `db/migrations/`» sparer deg for mer enn tre avsnitt om
hvordan migreringer bør skrives. Negative regler er skarpere fordi de er enklere å etterprøve.

**Begrunn det ikke-åpenbare, kort.** Én setning med hvorfor er ofte verdt det, fordi den lar
modellen generalisere riktig i tilfellene du ikke har beskrevet. «Ikke logg hele request-body på
betalingsendepunkter — de inneholder personopplysninger» dekker også endepunktet du glemte å nevne.
Men bare der det er behov. En begrunnelse per regel blir en roman.

**Vær konsekvent i ordbruken.** Kaller du det «modulen» ett sted og «tjenesten» et annet, har du
laget to begreper der du mente ett.

### Hvilket språk

Norsk går fint. Modellene håndterer norsk godt nok til at en instruksfil på norsk fungerer, og min
egen er skrevet på norsk. Det viktigste er at filen er skrevet på det språket dere faktisk snakker
om prosjektet på — instruksjoner du må oversette i hodet før du skriver dem ned, blir vagere.

To forbehold. Filstier, kommandoer, kodeeksempler og innarbeidede fagtermer holder du på
originalspråket uansett — ikke oversett `npm run build`. Og er teamet flerspråklig, eller
committer dere filen til et repo andre skal bruke, går engelsk foran; da er valget et
teamspørsmål, ikke et teknisk et.

Det som *ikke* fungerer er å blande vilkårlig. Min egen fil gjør nøyaktig den feilen, og jeg har
ikke ryddet opp ennå: de første seksjonene er på norsk, mens tre seksjoner nederst har engelske
overskrifter — `Git & PR Management`, `Data & ETL Workflows`, `Coaching & Persona Consultation`.
De kom til senere, lagt inn maskinelt etter hvert som jeg lærte noe nytt, og ingen stoppet opp og
spurte hvilket språk resten av filen var på. Det er ikke katastrofalt. Men det er et eksempel på
hvordan en instruksfil forfaller når den vokser uten stell.

## Et ekte eksempel

Her er skjelettet fra instruksfilen til min egen KI-kunnskapsbase. Bare overskriftene, for det er
strukturen som er poenget:

```markdown
# PKA — Personlig kunnskaps- og assistentlager
(tre linjer om hva dette er)

## Struktur
## Metadata-konvensjon (frontmatter)
## Arbeidsflyt
## Personaer
## Grenser (viktig)
## Git & PR Management
## Data & ETL Workflows
## Coaching & Persona Consultation
```

Hele filen er 83 linjer og rundt 640 ord. Det er kortere enn de fleste tror den bør være.

Og her er «Grenser»-seksjonen, som er den enkeltdelen som gjør mest nytte:

```markdown
## Grenser (viktig)
- **Jobbrelatert innhold er utenfor.** Ingenting fra arbeidsgiver hører hjemme her.
  Ikke hent inn, referer til eller lag slikt innhold herfra.
- **Ekte kodeprosjekter er egne repoer** med egen historikk. Dette lageret holder
  hub-notatet for hvert prosjekt og peker til kode-repoet via feltet `kode-repo:`.
  Selve koden skrives i kode-repoet, ikke her.
- **Privat økonomi ≠ firma-regnskap.** Aldri bland de to.
```

Legg merke til formen. Hver linje sier hva som ikke skal skje, og så én setning om hva som skal
skje i stedet. Uten det siste leddet får du en modell som stopper opp i stedet for å velge riktig.

Legg også merke til hva som ikke står der: ingen forklaring på *hvorfor* grensene går der de går.
Begrunnelsene finnes, men modellen trenger dem ikke for å følge reglene.

Og så innrømmelsen: seksjonen ligger som nummer seks av ni, altså midt i filen — stikk i strid med
rådet jeg ga over. Den burde flyttes opp. Filen er kort nok til at det går bra i praksis, men det
er tilfeldig, ikke gjennomtenkt.

## Hva filen heter

> **Verifisert 23. august 2026** mot hvert verktøys egen dokumentasjon. Dette er den delen av
> innlegget som eldes raskest — sjekk mot kilden før du stoler på den. Jeg har tatt med bare det
> jeg fikk bekreftet svart på hvitt.

Det korte svaret er at det holder på å bli ryddigere — men ikke helt.

`AGENTS.md` har vokst fram som et felles format: samme idé som en README, bare skrevet for
KI-verktøy i stedet for mennesker. Den legges i repo-roten, og du kan legge flere utover i
katalogtreet — den nærmeste filen vinner. Codex, Cursor, Copilot, Junie, Cline og Windsurf leser
den i dag, og flere av dem er i ferd med å gjøre sitt eget format til legacy til fordel for den.

Så har vi de to unntakene, og det er de som gjør at folk bommer akkurat nå: **Claude Code og
Gemini CLI leser ikke `AGENTS.md`.** Claude Codes dokumentasjon sier det rett ut — den leser
`CLAUDE.md`, ikke `AGENTS.md`. Gemini CLI leser `GEMINI.md`, og plukker bare opp `AGENTS.md` hvis
du selv fører den opp i innstillingene.

| Verktøy | Hva den leser | Merknad |
| --- | --- | --- |
| Claude Code | `CLAUDE.md` i repo-rot eller `.claude/CLAUDE.md`; `~/.claude/CLAUDE.md` globalt | Leser **ikke** `AGENTS.md`. Kan trekke den inn med `@AGENTS.md` |
| GitHub Copilot | `.github/copilot-instructions.md`; `AGENTS.md` hvor som helst i repoet | Nærmeste `AGENTS.md` vinner. Mappespesifikt: `.github/instructions/*.instructions.md` |
| OpenAI Codex | `AGENTS.md` fra repo-rot og nedover; `~/.codex/AGENTS.md` globalt | Filene slås sammen; den nærmeste veier tyngst |
| Cursor | `AGENTS.md` i rot og underkataloger; `.cursor/rules/*.mdc` | `.cursorrules` er nå legacy. Leser også `CLAUDE.md` |
| Gemini CLI | `GEMINI.md`; `~/.gemini/GEMINI.md` globalt | Leser `AGENTS.md` bare hvis du lister den under `context.fileName` |
| Windsurf | `.devin/rules/*.md`, med `.windsurf/rules/*.md` som reserve; `AGENTS.md` | Produktet heter nå Devin Desktop. `.windsurfrules` leses fortsatt |
| Junie (JetBrains) | `.junie/AGENTS.md`, ellers `AGENTS.md` i rot | Gjelder Junie CLI. `.junie/guidelines.md` er nå legacy, men støttes |
| Cline | Katalogen `.clinerules/`; `AGENTS.md`, globalt `~/.agents/AGENTS.md` | Leser også andres filer, som `.cursorrules` |
| Aider | `CONVENTIONS.md` | Navnet er bare en vane — filen lastes ikke automatisk. Bruk `--read`, eller `read:` i `.aider.conf.yml` |

Så til spørsmålet om filen *kan*, *bør* eller *må* hete noe bestemt. Den **må** hete det verktøyet
ser etter — navnene er ikke forslag, og et verktøy som ikke finner filen sin sier ikke fra. Den
**bør** hete `AGENTS.md` hvis du vil treffe bredest.

Og det du **kan** gjøre, som er det jeg lander på selv: skriv innholdet én gang i `AGENTS.md`, og
legg en `CLAUDE.md` ved siden av som består av én linje — `@AGENTS.md`. Da har du én kilde å
vedlikeholde og to verktøy som leser den.

Én ærlig fotnote: i juli-innlegget skrev jeg at «Cursor har `.cursorrules`». Det stemte da jeg
skrev det. Seks uker senere står det i Cursors egen dokumentasjon at filen er legacy. Det er
omtrent den halveringstiden dette feltet har for øyeblikket, og grunnen til at avsnittet over har
en dato på seg.

## Når filen vokser

På et tidspunkt begynner filen å bli lang, og fristelsen er å skrive mer. Gjør det motsatte: del
den opp.

Har du et monorepo, legg en liten fil i hver del i stedet for én stor på toppen. De fleste
verktøyene leser instruksfiler i underkataloger når de jobber der, og det gir hver del akkurat den
konteksten den trenger. Har du personlige preferanser som gjelder alle prosjekter — hvordan du vil
at svar skal se ut, verktøy du alltid bruker — hører de hjemme i en brukerglobal fil, ikke i
prosjektets, som resten av teamet må dele.

Og trim med jevne mellomrom. Jeg leser gjennom mine hver gang jeg merker at noe har endret seg i
prosjektet, og spør: er dette fortsatt sant? Utdaterte instruksjoner er verre enn ingen, fordi
modellen stoler på dem.

## Den ene testen

Hvis du bare skal gjøre én ting med instruksfilen din: gi den til et menneske som ikke kjenner
prosjektet, og be dem gjøre en liten oppgave.

Hvert spørsmål de stiller underveis er et hull i filen. Det er den samme testen modellen gjør, bare
at du slipper å gjette deg til hvor den nølte.

Det finnes en kjappere variant også: be KI-verktøyet oppsummere hva det tror reglene i prosjektet
er, uten å se koden. Får du noe annet tilbake enn det du mente å skrive, er det filen som er
utydelig — ikke modellen.
