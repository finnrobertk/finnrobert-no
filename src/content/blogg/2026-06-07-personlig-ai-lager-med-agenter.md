---
tittel: "Slik har jeg satt opp et personlig AI-lager med agenter"
ingress: "Et ekte oppsett: et tekstbasert kunnskapslager der spesialiserte AI-agenter hjelper meg på ulike livsområder — og det jeg har lært om å få dem til å bli faktisk nyttige."
dato: 2026-06-07
tags: [agenter, claude-code, oppsett, para, context-engineering]
pilar: agent-bruk
utkast: false
---

Jeg snakker mye om agenter. Så jeg synes det er rimelig at jeg viser hvordan jeg faktisk bruker
dem — ikke et tenkt eksempel, men oppsettet jeg jobber i til daglig. Dette er ikke ferdig, og jeg
lærer fortsatt mens jeg bygger. Men det fungerer godt nok til at jeg vil dele det.

Kort fortalt: jeg har et personlig kunnskaps- og assistentlager — et «lager» — der notatene mine
bor sammen med et knippe AI-agenter som hjelper meg på hvert sitt område. Alt er ren tekst. Og hele
poenget med strukturen er ikke å holde orden for ordens skyld, men å gi agentene riktig kontekst.

## Lageret: ren tekst, organisert etter PARA

Grunnmuren er kjedelig, og det er med vilje. Det er en mappe med markdown-filer, organisert
PARA-inspirert — en metode for å sortere informasjon etter hvor *aktiv* den er, ikke etter tema:

- **Inbox** — friksjonsfri fangst. Alt nytt lander her først, uten at jeg tenker på hvor det hører
  hjemme. Terskelen for å skrive ned en idé skal være null.
- **Prosjekter** — aktivt arbeid med et mål og en slutt. Denne bloggen er et prosjekt.
- **Områder** — løpende ansvar uten sluttdato. Helse, privatøkonomi, den slags.
- **Ressurser** — referanse jeg vil ha for hånden: artikler, lenker, research.
- **Arkiv** — ferdig eller inaktivt. Flyttes hit, slettes ikke.

Det fine med ren tekst er at det overlever alt. Ingen leverandør eier det, det er søkbart med
hvilket som helst verktøy, og — viktigst her — en AI kan lese det direkte uten integrasjoner.

## Frontmatteren er det som gjør det maskinlesbart

Hver fil starter med en liten blokk med metadata på toppen — det som kalles YAML-frontmatter:

```yaml
---
tittel: Hva jeg lærte om context-vinduer
type: notat
status: aktiv
tags: [llm, kontekst]
opprettet: 2026-06-07
område: intello
---
```

Dette ser trivielt ut, men det er selve nøkkelen. To grunner:

For det første finner jeg ting igjen. Når jeg leter, søker jeg på tvers av både frontmatter og
innhold — så «vis meg alt jeg har tagget med privatøkonomi fra i vår» blir et reelt søk, ikke en
manuell graving gjennom mapper.

For det andre, og det er her det blir interessant: **frontmatteren gir AI-en kontekst gratis**. Når
en agent skal hjelpe meg, vet den allerede hva slags notat dette er, hvilket område det hører til,
om det er aktivt eller arkivert. Den slipper å gjette. Strukturen jeg lagde for min egen del, viser
seg å være akkurat det modellen trenger for å gi presise svar. Det er ikke tilfeldig — det er hele
[context engineering](/blogg/2026-06-07-hva-er-context-engineering) i miniatyr.

## Agentene: skarpe roller, ikke én alt-mulig-assistent

Her gjorde jeg en feil i starten som jeg tror mange gjør: jeg prøvde å lage én god, allsidig
assistent. Resultatet ble en agent som var middels til alt og god til ingenting. Den manglet retning.

Så jeg snudde på det. Nå har jeg flere spesialiserte agenter, hver med et **skarpt mandat og
tydelige grenser**. Et par eksempler:

- En **bibliotekar** som fanger, organiserer og finner igjen notater. Den eier ikke råd om innhold —
  den eier *strukturen*.
- **Coacher** for ulike livsområder, som hver holder seg til sitt felt og sine notater.
- En **forretnings-mentor** som tenker på idéer og bi-inntekt, og som ikke blander seg inn i
  fagskriving eller økonomi.

Hver agent har en systemprompt som beskriver rollen, tonen og — like viktig — hva den *ikke* skal
gjøre. Grensene er ikke pynt. De er det som gjør at jeg kan rute en forespørsel til riktig agent og
stole på at den holder seg i sitt spor. To agenter som overlapper, er to agenter jeg må velge
mellom hver gang, og som begge svarer litt utenfor sin kjerne.

Verktøyet jeg kjører alt dette i, er Claude Code, startet fra rota av lageret. Det betyr at
agentene har hele lageret som arbeidskatalog — de kan lese notatene mine, søke i dem og skrive nye
filer der de hører hjemme.

## Personalsjefen som ansetter nye agenter

Dette er delen jeg er mest fornøyd med, og som jeg fortsatt finpusser.

Når et nytt, varig behov dukker opp, lager jeg ikke bare en ny agent på sparket. Jeg har en
**personalsjef-agent** hvis eneste jobb er å «ansette» nye agenter. Den skriver
«stillingsinstruksen» — altså systemprompten — for den nye rollen, og den passer på én ting jeg lett
roter til selv: at roller ikke overlapper. Når personalsjefen vurderer en ny agent, sjekker den mot
de eksisterende og spør om dette egentlig er en ny rolle, eller om det hører hjemme hos noen som
allerede finnes. Slik holder rutingen seg presis etter hvert som flokken vokser.

Et konkret eksempel, som passer her: **dette innlegget er skrevet av en slik ansatt agent.** Jeg
trengte en fast fag-skribent for bloggen, så personalsjefen skrev mandatet hennes — tone, grenser,
hvilke kilder hun skal lese før hun skriver, og hva hun *ikke* skal røre (den visuelle merkevaren,
inntektsstrategi, firmaøkonomi). Det er hun som har ført pennen her. Jeg sa hva innlegget skulle
handle om; resten er hennes mandat i praksis.

Jeg legger ikke skjul på at det er et litt selvrefererende oppsett. Men det er også det ærligste
eksemplet jeg kan gi på at det fungerer.

## Det jeg egentlig har lært

Hvis jeg skal koke det ned til én ting: **agentene ble nyttige da konteksten ble god — ikke da
promptene ble smarte.**

Jeg brukte for lang tid på å finpusse formuleringer i systemprompter, i troen på at den perfekte
instruksen var det som skilte en god agent fra en dårlig. Den virkelige forskjellen kom da lageret
ble ryddig og frontmatteren konsekvent. Da fikk agentene noe konkret å jobbe med: mine faktiske
notater, riktig merket, lett å finne. En middelmådig prompt med god kontekst slår en glimrende
prompt uten. Jeg går grundigere inn i hvorfor i innlegget om
[context engineering](/blogg/2026-06-07-hva-er-context-engineering).

Den andre lærdommen er at **smale roller slår brede.** Det føles kontraintuitivt — man vil jo ha en
assistent som kan alt. Men en agent med ett tydelig ansvar gir bedre svar, er lettere å rute til, og
er lettere å forbedre, fordi du vet nøyaktig hva den skal være god til. Det er for øvrig samme
prinsipp jeg lener meg på når jeg jobber med AI som
[senior utvikler](/blogg/2026-06-07-senior-utvikler-i-2026): små, veldefinerte oppgaver med riktig
kontekst, ikke én stor vag bestilling.

## Hva jeg fortsatt ikke har løst

For å være ærlig: dette er under utvikling, og det er biter jeg famler med.

Jeg er ikke ferdig med hvordan jeg holder grensene mellom agentene helt rene over tid — det er lett
at to roller siger mot hverandre når begge er nyttige. Jeg har ikke en god rutine for å «pensjonere»
agenter jeg ikke lenger bruker. Og jeg vurderer fortsatt hvor mye struktur som er riktig før
strukturen i seg selv blir friksjon — for mye merking, og fangsten slutter å være friksjonsfri,
som var hele poenget med inboxen.

Men det er sånn det skal være. Dette er ikke et ferdig system jeg selger deg. Det er et oppsett jeg
bygger mens jeg bruker det, og deler underveis. Vil du prøve noe lignende, trenger du ikke kopiere
mitt — start med en mappe, ren tekst, litt metadata på toppen, og én agent med en skarp jobb. Resten
vokser frem når du ser hva du faktisk trenger.
