---
tittel: "Skarpe agentroller: én jobb, tydelige grenser"
ingress: "En agentrolle i Claude Code er en kort fil med to felt som betyr noe: beskrivelsen som avgjør når den brukes, og instruksen den får når den kjører. Her er fem ekte roller fra mitt oppsett, og hvor grensene mellom dem holder og hvor de ikke gjør det."
dato: 2026-10-13
tags: [agenter, sub-agenter, claude-code, oppsett, agent-bruk]
pilar: agent-bruk
utkast: true
---

To ganger har jeg skrevet at smale agentroller slår brede: i
[innlegget om KI-kunnskapsbasen min](/blogg/personlig-ki-kunnskapsbase-med-agenter) og i
[Context engineering i praksis](/blogg/context-engineering-i-praksis). Begge gangene sa jeg *hvorfor*,
men ingen av dem viste hvordan en slik rolle faktisk ser ut. Det gjør jeg her, med filene jeg bruker.

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

Ordene i «Bruk for»-lista er ordene jeg selv bruker når jeg ber om noe. Sier jeg «teststrategi»,
er det ikke tvil om hvor det hører hjemme.

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

Testen jeg bruker på en ny rolle: kan «Bruk for»-lista skrives uten at den overlapper en agent som
finnes fra før? Hvis ikke, er det ikke en ny rolle. Det er en utvidelse av en gammel, eller to
roller som burde vært én.

> ✍️ **F-R:** Har du en konkret gang der en for bred agent ga deg dårligere svar enn en smal ville
> gjort? Hva ba du om, og hva gikk galt? Ett eksempel holder.

> ✍️ **F-R:** Har du noen gang delt én rolle i to, eller slått to sammen? Hva var det som fikk deg
> til å gjøre det?

## Grensene: der to roller møtes

Å skrive hva en agent skal gjøre, er den enkle delen. Grensene er vanskeligere, og da jeg leste
gjennom mine egne filer til dette innlegget, fant jeg to steder der de ikke er så skarpe som
tittelen lover.

Frontend-agenten skal brukes for «komponentdesign». Designsystem-agenten skal brukes for
«komponentbibliotek». Spør jeg om en ny knappekomponent, passer begge. UX-agenten skal gjøre
«funksjoner enkle å bruke», mens frontend-agenten har «tilgjengelighet». Det er beslektet nok til
at en forespørsel om et skjema kan gå begge veier.

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

Jeg vet ikke sikkert hvor mye en slik IKKE-setning endrer rutingen, sammenlignet med en presis
«Bruk for»-liste alene. Jeg har ikke testet det systematisk. Det jeg kan si, er at den gjør
grensen lesbar for meg når jeg går gjennom filene, og at det er der jeg oppdager overlappene.

> ✍️ **F-R:** Har Claude noen gang sendt en oppgave til feil agent hos deg, for eksempel frontend
> i stedet for designsystem? Og i så fall: hva gjorde du med det, endret du beskrivelsen eller
> ber du om agenten ved navn?

> ✍️ **F-R:** Skribenten har en IKKE-linje, utviklingsagentene har det ikke. Er det et bevisst
> valg, eller bare at de ble skrevet på forskjellige tidspunkt? Vil du legge til grenser på
> Frida og Stella etter dette?

## Verktøy er også en grense

Det finnes en grense til, og den er strengere enn tekst: feltet `tools`. Utelater du det, arver
agenten alle verktøyene som er tilgjengelige for subagenter. Setter du `tools: Read, Grep, Glob`,
kan agenten lese og søke, men ikke endre noe.

Dokumentasjonen anbefaler å begrense verktøyene til det agenten faktisk trenger. Ingen av mine
fem utviklingsagenter gjør det. Arkitekten kan i dag skrive kode like fritt som backend-agenten,
selv om instruksen hans handler om å veie alternativer og foreslå ADR-er. En arkitekt som bare kan
lese, ville vært en tydeligere rolle enn en arkitekt som får beskjed om å la være.

> ✍️ **F-R:** Er det et bevisst valg at utviklingsagentene har full verktøytilgang? Vil du at
> arkitekten skal kunne skrive filer, for eksempel ADR-er selv, eller bør han være lesende?

## Når du vil velge selv

Automatisk ruting er ikke det eneste alternativet. Skriver du «bruk arkitekt-agenten til å vurdere
dette» i prompten, er det et sterkt hint, men Claude avgjør fortsatt. Nevner du agenten med `@`,
på samme måte som du nevner en fil, kjører den agenten garantert.

Det er et nyttig skille. Automatisk ruting er for oppgaver du ikke vil tenke på. `@` er for når du
vet hvem som skal gjøre jobben, og ikke vil risikere at en overlappende beskrivelse vinner.

> ✍️ **F-R:** Hvordan velger du i praksis: lar du Claude rute, nevner du agenten ved navn i
> prompten, eller bruker du `@`? Hvis du har en vane her, er den verdt en setning.

## Sjekkliste for én rolle

Når jeg skriver en ny agent eller går gjennom en gammel, er det dette jeg ser etter:

- **Beskrivelsen sier når.** «Bruk for» etterfulgt av ordene du selv bruker når du ber om noe.
- **Beskrivelsen er kort.** Detaljene hører i instruksen, som bare lastes når agenten kjører.
- **Lista overlapper ikke.** Les «Bruk for»-listene til alle agentene etter hverandre. Står samme
  type oppgave hos to, bestem hvem som eier den.
- **Grensen står skrevet.** Hva er utenfor, og hvem tar det i stedet?
- **Verktøyene passer rollen.** En agent som skal vurdere, trenger ikke skrive.
- **Instruksen gjentar ikke `CLAUDE.md`.** Det som gjelder prosjektet, står der allerede.

Mine egne filer består ikke alle punktene ennå, som du har sett. Det er grunnen til at jeg skriver
dem ned. Når flere roller kommer til, er det overlappene som gjør at rutingen blir upresis, og de
er lettest å se når man leser beskrivelsene samlet.

Hvordan nye roller blir til hos meg, med en egen agent som skriver instruksen og sjekker mot de
som finnes, har jeg beskrevet i
[innlegget om KI-kunnskapsbasen](/blogg/personlig-ki-kunnskapsbase-med-agenter). Dette innlegget
handler om hva som står i filen når den er skrevet.
