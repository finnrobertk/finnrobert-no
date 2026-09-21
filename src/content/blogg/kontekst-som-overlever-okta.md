---
tittel: "Kontekst som overlever økta"
ingress: "Alt du forklarer i en prompt er borte når økta er over. Det som avgjør om arbeidet kan fortsettes neste uke, er hva som ligger i filer verktøyet leser neste gang: beslutningene, og dokumentasjonen av hva som er bygd og hvorfor."
dato: 2026-09-29
tags: [context-engineering, ki, claude-code, dokumentasjon, adr]
pilar: context-engineering
utkast: true
---

Du har jobbet en kveld med et KI-verktøy (kunstig intelligens) i et prosjekt. Dere har diskutert
to måter å løse noe på, valgt den ene, forkastet den andre av en god grunn, og kommet halvveis.
Neste morgen starter du verktøyet igjen. Det vet ingenting om kvelden før. Ikke valget, ikke
grunnen, ikke hvor dere slapp.

Det er ikke en feil ved verktøyet. Modellen husker ikke noe mellom samtaler, det skrev jeg om i
[Hva er context engineering, forklart enkelt](/blogg/hva-er-context-engineering). Den vet
nøyaktig like mye som første gang, pluss det som står i filene den får lese. Så spørsmålet er ikke
hvor god prompten din var i går. Spørsmålet er hvor mye av det du forklarte i går som ligger et
sted verktøyet finner det i dag.

Jeg har skrevet om den ene enden av dette før: det som er konstant i et prosjekt hører i en
instruksfil som leses hver gang, se [CLAUDE.md: å gi et KI-verktøy stående kontekst](/blogg/claude-md-staaende-kontekst).
Men det innlegget sa også at ting som endrer seg ikke skal i den filen. Jeg sa ikke hvor de skal.
Dette innlegget handler om det.

## Hvor lenge må dette huskes?

Det er spørsmålet jeg stiller om hver bit kontekst nå. Ikke om den er god eller relevant, det er
et annet spørsmål som jeg tok i [Context engineering i praksis](/blogg/context-engineering-i-praksis).
Bare: hvor lenge må dette huskes? Svaret bestemmer hvor det hører hjemme.

**Alltid.** Hvordan prosjektet er bygd opp, kommandoene, grensene, konvensjonene. Dette er
stående kontekst og hører i instruksfilen. Ferdig dekket i de to innleggene om
[CLAUDE.md](/blogg/claude-md-staaende-kontekst) og
[hvordan filen bør se ut](/blogg/context-filen-struktur-sprak-rekkefolge).

**Til noen bestemmer noe annet.** Beslutninger som ble tatt underveis, og grunnen til at de ble
tatt. Hvordan en del av løsningen faktisk virker. Hva den er til. Dette gjelder ikke alltid, for
det kan endres, og det gjelder ikke bare nå, for neste økt trenger det også. Det hører i filer i
repoet som verktøyet leser når det trenger dem.

**Bare nå.** Akkurat denne oppgaven, akkurat denne feilen, akkurat dette utdraget. Det hører i
prompten, og det er greit at det forsvinner når økta er over.

Det midterste laget er det som oftest mangler. Ikke fordi folk ikke vet at det finnes, men fordi
det er lettest å hoppe over. Instruksfilen skriver du én gang. Prompten skriver du uansett. Laget
imellom krever at du stopper opp når noe er bestemt, og skriver det ned et sted som ikke er
chatten.

## Hva som hører i det midterste laget

Tre ting, i praksis.

**Beslutninger, med begrunnelse.** Ikke bare hva som ble valgt, men hvorfor, og hva som ble
forkastet. Det siste er det som sparer mest tid, for det hindrer at den forkastede løsningen blir
foreslått på nytt i neste økt, av en modell som ikke vet at dere allerede har vært der. Formatet
kan være så enkelt som en liste med dato og to setninger per punkt. I kodeprosjektene mine ligger
de som korte filer i en mappe som heter `docs/adr`, ett vedtak per fil, med kontekst, beslutning
og konsekvenser. I notatlageret mitt er det en seksjon nederst i hvert prosjektnotat.

**Teknisk dokumentasjon av hvordan det virker.** Koden ligger i git og er der neste gang. Det
koden ikke sier, er hvorfor den ser sånn ut, og hvordan delene henger sammen når du ser dem fra
utsiden. Det trenger ikke være langt. En side per modul som sier hva den gjør og hva den forventer
av de andre, er nok til at en agent slipper å lese seg til det gjennom tjue filer.

**Funksjonell dokumentasjon av hva det er til.** Hvilke begreper domenet har, hvilke regler som
gjelder, hva brukeren skal oppleve. Dette er den delen jeg tror er mest undervurdert. Koden viser
hvordan noe er bygd. Den viser ikke om det var det riktige som ble bygd, og en agent som bare har
koden, kan lage noe teknisk korrekt som løser feil problem. Det fortjener et eget innlegg, og det
kommer.

Det som er felles for alle tre: de er ikke prompten, og de er ikke instruksfilen. De er filer i
repoet, versjonert sammen med koden, skrevet for å bli lest igjen. Oppgavebeskrivelsen du gir i
en prompt er kortlevd, den kastes når oppgaven er gjort. Det oppgaven førte til, er langlivet.

## «Skal vi sjekke inn promptene, da?»

Det er spørsmålet jeg får oftest når jeg forklarer dette, og jeg tror svaret er nei.

Tanken bak er logisk nok. Samtalen forsvinner, og hvis det er problemet, så ta vare på samtalen.
Men en promptlogg er en transkripsjon av *hvordan* dere kom fram til noe, ikke av hva dere kom
fram til. Den inneholder blindveiene, omformuleringene og de tre forsøkene før det fjerde virket.
Alt sammen var nyttig i øyeblikket, og er støy etterpå.

Og den gjør det egentlige problemet verre. Hele poenget med det midterste laget er at noe skal
være lett å finne igjen. Femti økter med logg gir dårligere kontekst enn fem beslutningsnotiser,
fordi noen må lete fram signalet først. Og «noen» er enten deg en
travel morgen, eller en agent som bruker halve konteksten sin på å lese seg gjennom det.

Ett unntak: når prompten selv er en del av det dere lager — en fast instruks som styrer hvordan en
tjeneste oppfører seg — er den kode, og hører i git som annen kode. Men det er et annet spørsmål
enn det folk vanligvis mener når de spør.

Det jeg har lest meg opp på og landet på selv, er å skrive ett eller flere dokumenter per løsning
som til sammen svarer på fire spørsmål:

- **Hva gjør systemet?** Hva tjenesten er til, hvilke begreper domenet har, hvilke regler som
  gjelder.
- **Hva er bestemt, og hvorfor?** Arkitekturbeslutninger som ADR-er, og de funksjonelle
  avklaringene ved siden av — de som ikke handler om teknologi, men om hva løsningen skal gjøre.
- **Hva er innenfor og utenfor scope?** Like viktig er det siste. En agent som ikke vet hva
  løsningen *ikke* skal gjøre, foreslår det gjerne.
- **Hva er neste steg?** Én linje om hvor dere slapp.

De to første er det jeg allerede har vært inne på. De to siste er de som oftest mangler, og de er
billigst å skrive: scope er som regel noe dere ble enige om muntlig for lenge siden, og neste steg
tar tretti sekunder på slutten av en økt.

Ingenting av dette er skrevet for KI-verktøyets skyld. Det er dokumentasjon et
team burde hatt uansett. Forskjellen er at det før var lett å utsette, fordi den som manglet den
var en kollega som kunne komme bort og spørre. Nå er det også en agent som ikke kan spørre, og som
gjetter i stedet. Det er den samme jobben, men den har blitt vanskeligere å skyve på — og det
tror jeg er en god ting.

Målet er at en utvikler som er ny på løsningen, og en agent som starter blank, kan plukke opp
tråden fra samme sted.

## Et ekte eksempel

Jeg holder prosjektnotatene mine i et notatlager der KI-agenter jobber sammen med meg. Hvert
prosjekt har et hub-notat, og i frontmatteren til det notatet ligger et felt som heter
`neste_steg`. Det er én linje som sier hva som skal skje neste gang noen åpner prosjektet, og den
skrives på slutten av en økt, av meg eller av agenten. Her er den for bloggen du leser nå, litt
forkortet:

```yaml
neste_steg: "Neste innlegg 15.09: ferdig utkast i banken, les det friskt før publisering.
  Skribent-agenten: splitt idénotatet om kontekst på disk i flere innlegg, og spiss
  forklaringen av hvorfor det ikke holder at alt ligger i prompten."
```

Den linja er grunnen til at dette innlegget finnes. Den ble skrevet i én økt og lest i en annen,
dagen etter, av en agent som ikke hadde sett noe av det som ble sagt i den første. Alt annet fra
den økta, resonnementet, alternativene vi diskuterte, formuleringene som ble prøvd, er borte. Den
ene linja var det som overlevde, fordi den ble skrevet til fil.

Lenger ned i samme notat ligger en seksjon som heter «Beslutninger». Den ser slik ut:

```markdown
## Beslutninger (ADR-lite)

- **Personlig merkevare, ikke firma.** Autoritet bygges på det personlige domenet.
- **Én blogg.** Alt fagstoff ett sted. Firmabloggen røres ikke, ingen migrering nå.
- **Norsk først.** KI forklart på norsk for norske lesere er underdekket.
```

Ingen av disse gjelder alltid i den forstand at de hører i instruksfilen. De kan endres. Men de
gjelder til de endres, og hver gang en agent skal gjøre noe for bloggen, leser den dem og slipper
å foreslå det jeg allerede har valgt bort. Tre linjer, skrevet én gang i juni. De har spart meg for
den samme forklaringen i hver økt siden.

## Hvorfor jeg tror mange bommer på dette

Dette er en hypotese, ikke noe jeg har målt.

De fleste av oss lærte KI gjennom chat. Der bor alt i samtalen. Du forklarer, du får svar, du
forklarer litt til, og når du er fornøyd lukker du vinduet. Det virker, fordi oppgaven er ferdig
når samtalen er ferdig.

Så tar vi den vanen med inn i kodeagentene. Forklar i prompten, få resultat, lukk vinduet. Og det
virker fortsatt, for én oppgave. Det slutter å virke den dagen arbeidet varer i uker, eller skal
deles med en kollega, eller skal tas opp igjen om tre måneder. Da starter hver økt fra null, og
det oppleves som at modellen er upålitelig. Den er ikke det. Den mangler bare det ingen skrev ned.

Jeg tror det er derfor så mange sier at context engineering ikke gir dem noe. De har gjort prompten
bedre, og den var aldri problemet.

## Vanen som løser det

Én ting, og den er liten: når noe blir bestemt i en økt, skriv det til fil før økta lukkes.

Du trenger ikke gjøre det selv. Be verktøyet om det. «Skriv en kort beslutningsnotis om det vi
nettopp valgte: hva, hvorfor, og hva vi valgte bort.» Modellen er god til akkurat det, og den har
hele resonnementet ferskt. Fem linjer i en fil i repoet, committet sammen med koden. Neste økt
starter med å lese den.

Det samme gjelder på slutten av en økt som ikke ble ferdig. Én linje om hvor dere slapp og hva som
er neste steg. Det er det `neste_steg`-feltet mitt er. Det tar tretti sekunder å skrive og sparer
et kvarter med rekonstruksjon neste morgen, for deg og for verktøyet.

Og la prompten være prompten. Ikke prøv å få den til å bære det som skal vare. Den er riktig sted
for det som gjelder nå, og det er greit at den forsvinner.

## Kort oppsummert

Modellen starter blank hver gang. Det du kan gjøre noe med, er hva den finner når den starter.

Spør om hver bit kontekst: hvor lenge må dette huskes? Alltid, så inn i instruksfilen. Til noen
bestemmer noe annet, så inn i en fil i repoet: beslutningen, hvordan det virker, hva det er til,
hva som er utenfor scope, og hvor dere slapp. Bare nå, så inn i prompten — og bare der.

Det midterste laget er det som gjør at arbeidet kan fortsettes. Det er også det som krever at du
stopper opp et øyeblikk og skriver. Det er ikke mye. Men det er forskjellen på et verktøy som
hjelper deg i kveld, og et som fortsatt vet hva dere ble enige om når du kommer tilbake.
