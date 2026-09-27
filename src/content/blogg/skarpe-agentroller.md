---
tittel: "Skarpe agentroller: én jobb, tydelige grenser"
ingress: "En agentrolle i Claude Code er en kort fil med to felt som betyr noe: beskrivelsen som avgjør når den brukes, og instruksen den får når den kjører. Her er fem ekte roller fra mitt oppsett, og det jeg fant da jeg leste gjennom dem: overlapp og grenser jeg aldri hadde bestemt meg for."
dato: 2026-10-13
tags: [agenter, sub-agenter, claude-code, oppsett, agent-bruk]
pilar: agent-bruk
utkast: true
---

To ganger har jeg skrevet at smale agentroller slår brede: i
[innlegget om KI-kunnskapsbasen min](/blogg/personlig-ki-kunnskapsbase-med-agenter) og i
[Context engineering i praksis](/blogg/context-engineering-i-praksis). Begge gangene sa jeg *hvorfor*,
men ingen av dem viste hvordan en slik rolle faktisk ser ut. Det gjør jeg her, med filene jeg bruker.

Da jeg gikk gjennom filene for å skrive dette, fant jeg mer enn jeg ventet. Rollene overlapper noen
steder, og flere av grensene i oppsettet er ikke valg jeg har tatt, bare noe som ble sånn. Det har
ikke gitt meg problemer så langt. Men det er verdt å vise, fordi det er slik et oppsett ser ut etter
en stund i bruk.

Eksemplene er mine utviklingsagenter i Claude Code: en for arkitektur, en for backend, en for
frontend, en for UX og en for designsystem. De ligger i `~/.claude/agents/` og er tilgjengelige i
alle repoene mine. Alt nedenfor gjelder Claude Code slik dokumentasjonen beskriver det per
september 2026. Andre verktøy har lignende mekanismer, men andre navn og regler.

## Hva en agentrolle er, konkret

En agent (Claude Code kaller dem *subagents*) er én markdown-fil. Øverst står en blokk med
metadata, under står instruksen agenten får. Dette er hele arkitektur-agenten min:

```markdown
---
name: aksel-arkitektur
description: Ekspert på programvarearkitektur og Domain-Driven Design. Bruk for
  arkitekturvalg, bounded contexts, domenemodellering, ADR-er og avveininger ved
  hard-å-reversere beslutninger.
color: purple
---

Du er **Aksel** 🏛️ — senior programvarearkitekt med tung DDD-bakgrunn.
- Tenk i bounded contexts, ubikvitøst språk, aggregater og invarianter.
- Foreslå en ADR når en beslutning er vesentlig og vanskelig å reversere.
- Vei alternativer eksplisitt (fordeler / ulemper / konsekvenser) fremfor å lande for raskt.
- Norsk. Vær konkret og kritisk, ikke høflig-vag.
```

(Linjeskiftene i `description` er mine, for lesbarhetens skyld. I filen står den på én linje.)

Bare `name` og `description` er påkrevd. Resten av feltene er valgfrie, blant annet `tools`, som
jeg kommer tilbake til. Legger du filen i `~/.claude/agents/`, gjelder den i alle prosjektene dine.
Legger du den i `.claude/agents/` i et repo, gjelder den bare der, og kan sjekkes inn så resten av
teamet får den.

Instruksen er fire linjer. Mer trengs ikke, fordi agenten også leser prosjektets `CLAUDE.md` når
den starter, og konvensjonene for repoet står der. Agentfilen trenger bare å si hva som er spesielt
med *rollen*.

## Beskrivelsen er det som ruter

Feltet som gjør mest arbeid, er `description`. Dokumentasjonen definerer det som «når Claude bør
delegere til denne subagenten». Claude Code leser beskrivelsene til alle agentene dine og bruker
dem, sammen med det du ber om, til å avgjøre om en oppgave skal sendes videre og til hvem.

To ting følger av det.

For det første er beskrivelsen en ruteregel. Den skal si *når* agenten skal brukes. Alle fem utviklingsagentene mine følger samme mønster: én setning om hva agenten er,
og én setning som starter med «Bruk for» og lister oppgavene som skal havne der. Backend-agenten:

```text
Ekspert på backend i Kotlin/Spring Boot med sterk TDD/BDD-praksis. Bruk for backend-design,
testdrevet utvikling, teststrategi, MockK og ryddig domenekode.
```

Ordene i «Bruk for»-lista bør være de samme som du bruker når du ber om noe. Ber du om en
teststrategi, er det ikke tvil om hvor oppgaven hører hjemme.

For det andre er beskrivelsene alltid lastet, mens instruksen bare lastes når agenten faktisk
kjører. Dokumentasjonen sier det rett ut: hold beskrivelsene korte, og flytt detaljene inn i
instruksen. En lang beskrivelse koster kontekst i hver eneste økt, også de øktene der agenten
aldri brukes.

## Én jobb

En agent starter blank. Den ser ikke samtalen du har hatt, filene som er lest, eller hva dere
bestemte for ti minutter siden. Den får instruksen sin, prosjektets instruksfiler og en
oppgavebeskrivelse som Claude skriver når den delegerer. Det er alt.

Det er grunnen til at én jobb fungerer bedre enn fem. En agent med ett ansvar trenger lite for å
gjøre det riktig, og det lille får plass i en kort instruks. En agent som skal kunne arkitektur,
backend og UX, trenger regler for alle tre, og de trekker i ulik retning. Arkitekten skal veie
alternativer eksplisitt og ikke lande for raskt. Backend-agenten skal vise kode og forklare valg
kort. Begge er riktige regler for sin jobb. Står de i samme instruks, må modellen avgjøre
hvilken som gjelder, hver gang, uten å vite hvilken jobb du egentlig ba om.

Rollene hos meg har ikke stått stille. Jeg har lagt til en ny, mer spesialisert agent fordi noen
oppgaver trengte en smalere rolle enn de eksisterende ga, og den nye tok over en del av jobben til
én eller to av de andre. Det som er lett å glemme da, er de gamle beskrivelsene. Oppgavene den nye
agenten tok over, kan fortsatt stå i «Bruk for»-lista til de gamle.

En enkel test for en ny rolle er derfor om «Bruk for»-lista kan skrives uten at den overlapper en
agent som finnes fra før. Går ikke det, må du enten flytte oppgavene fra den gamle rollen, eller
vurdere om det egentlig er en utvidelse av den.

## Grensene: der to roller møtes

Å skrive hva en agent skal gjøre, er den enkle delen. Grensene er vanskeligere, og i mine egne
filer fant jeg to steder der de ikke er så skarpe som tittelen lover.

Frontend-agenten skal brukes for «komponentdesign». Designsystem-agenten skal brukes for
«komponentbibliotek». Spør jeg om en ny knappekomponent, passer begge. UX-agenten skal gjøre
«funksjoner enkle å bruke», mens frontend-agenten har «tilgjengelighet». Det er beslektet nok til
at en forespørsel om et skjema kan gå begge veier.

Jeg lar Claude velge agent selv, og jeg kan ikke huske at en oppgave har havnet hos feil agent.
Overlappene har altså ikke kostet meg noe jeg har merket. Men de betyr at valget i de tilfellene
hviler på hvordan Claude tolker forespørselen, ikke på en grense jeg har satt.

Ingen av de fem utviklingsagentene sier hva de *ikke* skal gjøre. Grensene er underforstått, ut fra
hva som står i «Bruk for»-lista. Det virker så lenge listene ikke overlapper, og det gjør de altså
litt.

Skribent-agenten som hjelper meg med denne bloggen, er skrevet annerledes. Beskrivelsen hennes
slutter med en eksplisitt grense:

```text
... Leser posisjonering og brand-guide i lageret, skriver innlegg som .md i kode-repoet.
IKKE for visuell merkevare (Stella) eller inntektsstrategi (Viktor).
```

Den siste setningen sier både hva som er utenfor og hvem som eier det i stedet. Det gjør to ting.
Rutingen får et signal om hva som *ikke* skal hit. Og når oppgaven likevel havner hos skribenten,
står det i instruksen hennes hvem hun skal peke videre til.

At skribenten har en IKKE-linje og utviklingsagentene ikke har det, er ikke et valg jeg har
tatt. Jeg vet ikke hvorfor det ble sånn. Jeg la merke til forskjellen først da jeg satte filene ved
siden av hverandre til dette innlegget.

Jeg vet heller ikke hvor mye en slik IKKE-setning endrer rutingen, sammenlignet med en presis
«Bruk for»-liste alene. Jeg har ikke testet det. Det jeg kan si, er at den gjør grensen synlig
for den som leser filen. Uten den må overlappene finnes ved å sammenligne lister, slik jeg gjorde
over.

## Verktøy er også en grense

Det finnes en grense til, og den er strengere enn tekst: feltet `tools`. Utelater du det, arver
agenten alle verktøyene som er tilgjengelige for subagenter. Setter du `tools: Read, Grep, Glob`,
kan agenten lese og søke, men ikke endre noe.

Dokumentasjonen anbefaler å begrense verktøyene til det agenten faktisk trenger. Ingen av mine
fem utviklingsagenter gjør det. Arkitekten kan i dag skrive kode like fritt som backend-agenten,
selv om instruksen hans handler om å veie alternativer og foreslå ADR-er. En arkitekt som bare kan
lese, ville vært en tydeligere rolle enn en arkitekt som får beskjed om å la være.

Heller ikke dette er et bevisst valg. Feltet ble aldri fylt ut, og da får agenten alt. Om
arkitekten bør kunne skrive filer, for eksempel ADR-er, er et reelt spørsmål. Men det er et
spørsmål jeg aldri har stilt. Et tomt `tools`-felt bestemmer også hva agenten kan gjøre, men da
er det ingen som har vurdert det.

## Når du vil velge selv

Automatisk ruting er ikke det eneste alternativet. Skriver du «bruk arkitekt-agenten til å vurdere
dette» i prompten, er det et sterkt hint, men Claude avgjør fortsatt. Nevner du agenten med `@`,
på samme måte som du nevner en fil, kjører den agenten garantert.

Selv har jeg latt Claude velge, og jeg visste ikke før jeg leste dokumentasjonen til dette
innlegget at `@` garanterer agenten. Det har gått bra uten. Men med roller som overlapper, er `@`
den enkleste måten å bestemme selv når det faktisk betyr noe hvem som gjør jobben.

## Sjekkliste for én rolle

Dette er lista jeg endte med etter å ha gått gjennom mine egne filer:

- **Beskrivelsen sier når.** «Bruk for» etterfulgt av ordene du selv bruker når du ber om noe.
- **Beskrivelsen er kort.** Detaljene hører i instruksen, som bare lastes når agenten kjører.
- **Lista overlapper ikke.** Les «Bruk for»-listene til alle agentene etter hverandre. Står samme
  type oppgave hos to, bestem hvem som eier den.
- **Grensen står skrevet.** Hva er utenfor, og hvem tar det i stedet?
- **Verktøyene passer rollen.** En agent som skal vurdere, trenger ikke skrive.
- **Instruksen gjentar ikke `CLAUDE.md`.** Det som gjelder prosjektet, står der allerede.

Mine egne filer består ikke alle punktene, som du har sett. De bryter med tre av dem: listene
overlapper, grensene står ikke skrevet, og verktøyene er ikke valgt. Ingenting av det har gitt
meg feil jeg har merket. Men jo flere roller som kommer til, jo mer hviler rutingen på tolkning, og
overlappene er lettest å se når man leser beskrivelsene samlet.

Hvordan nye roller blir til hos meg, med en egen agent som skriver instruksen og sjekker mot de
som finnes, har jeg beskrevet i
[innlegget om KI-kunnskapsbasen](/blogg/personlig-ki-kunnskapsbase-med-agenter). Dette innlegget
handler om hva som står i filen når den er skrevet.
