---
tittel: "CLAUDE.md: å gi et KI-verktøy stående kontekst"
ingress: "En liten markdown-fil i roten av prosjektet, lest automatisk hver gang verktøyet starter. Her er hva som bør stå der, hva som ikke bør, og fellene jeg har gått i selv."
dato: 2026-07-14
tags: [context-engineering, ki, claude-code, claude-md, oppsett]
pilar: context-engineering
utkast: false
---

Hvis du bruker et KI-verktøy (kunstig intelligens) til koding over tid, kjenner du nok
irritasjonen: du forklarer det samme på nytt i hver økt. Hvordan prosjektet er bygd opp. At dere
bruker pnpm, ikke npm. At testene kjøres på en bestemt måte. At den der mappen *ikke* skal røres.
Modellen er skarp, men den starter blank hver gang — den husker ingenting fra i går.

`CLAUDE.md` er svaret på akkurat det. Det er en helt vanlig markdown-fil du legger i roten av
prosjektet, som verktøyet leser automatisk hver gang det starter. Alt du skriver der, vet modellen
fra første sekund — uten at du må si det. Det er det jeg mener med *stående kontekst*: skrevet én
gang, lest hver gang.

Jeg nevnte fila kort i [Context engineering i praksis](/blogg/context-engineering-i-praksis). Dette
innlegget går rett på den: hva den faktisk er, hvorfor den virker, og hvordan du skriver en god en.

## Hva fila faktisk er

Ikke noe mystisk. En tekstfil, `CLAUDE.md`, vanligvis i roten av repoet. Claude Code leser den
automatisk inn i konteksten ved oppstart, så innholdet er en del av det modellen «vet» når den
jobber i prosjektet ditt. Du kan committe den til git, så deler hele teamet samme oppsett — den
versjoneres sammen med koden som alt annet.

Den hører til en bredere familie: Cursor har `.cursorrules`, andre verktøy har sine egne varianter,
og prinsippet er det samme overalt. En fast fil med prosjektets stående kontekst. Jeg holder meg til
`CLAUDE.md` her fordi det er det jeg bruker, men poenget overføres.

## Hvorfor det virker: kontekst slår smarte prompts

Det er lett å tro at en bedre prompt er løsningen når KI-en bommer. Ofte er den ikke det. Bommen
kommer som regel av at modellen manglet noe den ikke kunne vite — en konvensjon, en grense, en
kommando — ikke av at du formulerte deg dårlig.

Tenk på det som forskjellen på en fersk innleid og et fast teammedlem. Den innleide er like dyktig,
men du må brife henne på nytt hver morgen: hvor ting ligger, hvordan dere gjør det, hva hun skal
holde seg unna. Et fast teammedlem har det i ryggmargen. `CLAUDE.md` er det som gjør modellen til det
faste teammedlemmet i *ditt* prosjekt — den briefer seg selv, hver gang, på det som er konstant.

Og fordi det er stående kontekst, betaler det seg om og om igjen. Du skriver en linje om
test-kommandoen én gang; den sparer deg for en forklaring i hver eneste økt etterpå. Det er
context engineering i sin mest jordnære form: riktig kontekst på rett sted, så du slipper å bære den
manuelt hver gang.

## Hva som bør stå der

Tenk på det som onboarding-notatet du skulle ønske noen ga deg da du var ny i prosjektet. Det jeg
finner mest verdi i:

- **Hva prosjektet er.** To–tre setninger: hva dette er, hvilken stack, hvordan det henger sammen.
  Nok til at modellen har et kart.
- **Kommandoer som faktisk brukes.** Hvordan kjøre, bygge, teste, lint-e. Dette er gull — uten det
  gjetter modellen, og gjetter ofte feil (`npm test` når dere kjører noe annet).
- **Konvensjoner.** Mappestruktur, navngivning, mønstre dere holder på. «Vi bruker X til Y, ikke Z.»
- **Grenser og gjør/ikke-gjør.** Hva modellen *ikke* skal røre eller anta. Dette er ofte det mest
  verdifulle, og det jeg ser folk glemme. Grenser er ren context engineering — de bestemmer hva som
  er innenfor og utenfor synsfeltet.
- **Det ikke-åpenbare.** Den ene fellen alle nye går i. Den rekkefølgen som må holdes. Det som ikke
  står noe annet sted.

Et lite, anonymisert utdrag fra en `CLAUDE.md` for å vise tonen — korte, konkrete linjer, ikke en
roman:

```markdown
# Prosjekt: betalings-API

Kotlin/Spring Boot-tjeneste som håndterer fakturabetalinger. Hexagonal arkitektur:
domenelogikken i `core/`, adaptere (web, db, kø) i `adapters/`.

## Kommandoer
- Bygg + test: `./gradlew build`
- Kjør én test: `./gradlew test --tests "KlasseNavn"`
- Lokal kjøring: `docker compose up` (krever Postgres på 5432)

## Konvensjoner
- TDD: skriv testen først. MockK til mocking, ikke Mockito.
- Domenekoden i `core/` har ingen Spring-avhengigheter — hold den ren.
- Pengebeløp er alltid `BigDecimal`, aldri `Double`.

## Gjør ikke
- Ikke rør `db/migrations/` — migreringer er append-only, aldri endre en eksisterende.
- Ikke logg hele request-body på betalingsendepunkter (PII).
```

Legg merke til at det ikke er mye. En halv skjerm. Hvert punkt er noe modellen ellers ville gjettet
på eller bommet på.

## Hva som ikke bør stå der

Like viktig, og lettere å overse. `CLAUDE.md` leses inn i konteksten *hver gang* — så alt du legger
der, koster oppmerksomhet i hver økt. Det er ikke et lager for alt du vet om prosjektet. Hold ute:

- **Engangsinfo.** Detaljer som hører til én oppgave, ikke til prosjektet som helhet. Det gir du i
  selve prompten, der og da.
- **Ting som endrer seg ofte.** Sprint-mål, midlertidige TODO-er, hvem som jobber med hva denne uka.
  Det blir utdatert raskt og forurenser konteksten (mer om den fellen under).
- **Hele dokumenter limt inn.** Lenk til arkitekturdokumentet eller API-spesifikasjonen i stedet for
  å kopiere det inn. En `CLAUDE.md` på flere hundre linjer drukner det viktige.
- **Hemmeligheter.** Aldri nøkler, passord eller tokens. Fila committes til git og leses av et KI-verktøy
  — behandle den som offentlig kildekode.

Tommelen: hører dette hjemme i *enhver* økt i prosjektet? Da inn. Gjelder det bare av og til, eller
bare nå? Da ut.

## To feller jeg har gått i

**For lang fil.** Den vanligste. Det føles produktivt å dokumentere alt, og fila vokser umerkelig
til en vegg av tekst. Problemet er at det undergraver seg selv: når alt er «viktig», er ingenting
det, og modellen mister det som faktisk teller i støyen. En `CLAUDE.md` skal være kortfattet og
skarp. Hvis den blir lang, er det som regel et tegn på at noe burde vært lenket til, ikke limt inn.
Jeg behandler den som noe som skal *trimmes* med jevne mellomrom, ikke bare fylles på.

**Utdatert innhold.** Den lumskeste. En `CLAUDE.md` som sier feil ting er verre enn ingen fil, fordi
modellen stoler på den. Skifter dere test-kommando uten å oppdatere fila, sender du modellen
selvsikkert i feil retning — hver gang, helt til noen fanger det opp. Stående kontekst som har blitt
løgn, er aktivt skadelig. Så når noe konstant endrer seg i prosjektet, hører `CLAUDE.md` med i samme
oppdatering — på linje med å oppdatere README.

Begge fellene har samme rot: fila er stående kontekst, ikke et notatfelt. Den fortjener samme stell
som koden den ligger ved siden av.

## Slik kommer du i gang

Du trenger ikke planlegge det. Lag en tom `CLAUDE.md` i roten, og skriv tre ting: hva prosjektet er,
kommandoene du bruker mest, og den ene tingen du er lei av å forklare på nytt. Det er nok til å gi
verdi fra dag én.

Resten vokser organisk. Hver gang du tar deg selv i å gjenforklare noe til modellen — eller å
korrigere den på noe den burde visst — er det en kandidat til fila. Over noen uker setter den seg på
et nivå som passer prosjektet. Og når du committer den, har du gitt resten av teamet det samme faste
teammedlemmet, ikke en fersk innleid hver morgen.

Det er ikke magi. Det er et tekstdokument du kan skrive på fem minutter og forbedre over tid. Men det
er noe av det med høyest avkastning du kan gjøre for å få et KI-verktøy til å jobbe godt i et reelt
prosjekt — nettopp fordi det flytter innsatsen fra å prompte smart hver gang, til å gi modellen
riktig kontekst én gang.
