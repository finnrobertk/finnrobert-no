---
tittel: "Å verifisere det KI lager"
ingress: "Et KI-verktøy hever taket for hva du kan lage, raskere enn det hever taket for hva du kan vurdere. Før fulgte de to hverandre. Nå må vurderingen læres for seg."
dato: 2026-10-06
tags: [senior, ki, verifisering, testing, kodegjennomgang]
pilar: senior-til-ki
utkast: true
---

I august skrev jeg om [hvor en norsk bedrift bør begynne med KI](/blogg/ki-i-norsk-bedrift-hvor-du-begynner).
Ett av rådene var at den første oppgaven må være en man kan vurdere kvaliteten på, og i en parentes
lovet jeg å komme tilbake til den ferdigheten i et eget innlegg. Dette er det innlegget.

Kort fortalt: et kraftig verktøy hever taket for hva du kan produsere raskere enn det hever taket
for hva du kan vurdere. Det gjelder kunstig intelligens (KI) mer enn noe annet verktøy jeg har
brukt, og det gjør verifisering til en egen ferdighet. Den må læres med vilje, fordi den ikke
lenger følger med på kjøpet.

## Hvorfor vurderingen før kom gratis

Lenge vokste evnen til å lage noe og evnen til å bedømme det sammen. For å skrive en løsning måtte
du forstå den, og mens du forsto den, lærte du også hvor den kunne svikte. Du kjente igjen feilene
fordi du hadde laget dem selv, mange ganger.

Et KI-verktøy bryter den koblingen. Du kan få ut en fungerende løsning på et problem du ikke har
løst før, i et rammeverk du ikke kjenner, uten å ha gått veien som ellers ville lært deg hvor
svakhetene pleier å ligge. Verktøyet flytter grensen for hva du klarer å lage. Grensen for hva du
klarer å bedømme, står der den sto.

Dette handler ikke om hvem som bruker verktøyet. Det gjelder på alle erfaringsnivåer, så snart du
ber om noe utenfor det du kan godt.

## «Det virker» er ikke det samme som «det er riktig»

Det en agent leverer, ser som regel ferdig ut. Koden kjører, testene som finnes er grønne, og
endringen er ryddig og godt beskrevet. Alt dette sier at noe *virker*. Ingen av delene sier om det
er *riktig*: om det løser det egentlige problemet, om det tåler data som ser annerledes ut enn i
testene, og om det passer inn i resten av systemet.

Avstanden mellom de to er usynlig for den som ikke har sett nok systemer til å vite hvor den pleier
å ligge. Og en agent leverer plausibel kode raskt og i mengder. I
[Senior utvikler i 2026](/blogg/senior-utvikler-i-2026) skrev jeg at plausibelt ikke er det samme
som riktig. Her vil jeg være mer konkret om hva verifiseringen består av.

## Hva jeg ser etter først

Dette er delen der erfaringen gjør jobben.

> ✍️ **F-R:** Når du åpner en diff en agent har laget — hva ser du på først, og i hvilken
> rekkefølge? Stikkord holder; jeg skriver det ut.

> ✍️ **F-R:** Hvilke feil forventer du å finne? Er det typer som går igjen så ofte at du leter etter
> dem uten å tenke over det?

> ✍️ **F-R:** Hvor er du mest skeptisk? Hvilke deler av en endring stoler du minst på, og hvilke lar
> du passere etter et raskt blikk?

En liste leseren kan kopiere, gjør mer enn en forklaring.

> ✍️ **F-R:** Har du en sjekkliste — skrevet ned eller i hodet — som du går gjennom før du godtar en
> endring fra en agent? Gi den som den er, gjerne 5–8 punkter. Finnes den ikke, dropper vi utdraget
> heller enn å konstruere en.

## Et eksempel: det så ferdig ut

> ✍️ **F-R:** Ett konkret tilfelle der noe en agent laget så ferdig ut, men ikke var riktig. Hva var
> oppgaven, hva så riktig ut, hva avslørte feilen, og ville testene ha fanget den? Det må komme fra
> et eget prosjekt, ikke fra et oppdrag. Et kort før/etter-utdrag av koden eller diffen er best.

## Tre måter å verifisere på

### Å lese koden

Å sjekke inn noe du ikke har lest, er å ta ansvar for noe du ikke kjenner. Det gjelder uansett hvem
eller hva som skrev det. At en agent skrev koden, endrer ikke hvem som må svare for den når den
feiler.

Lesing er heller ikke det samme som skumming. Å se at koden ser ryddig ut, er noe annet enn å forstå
hva den gjør med input du ikke hadde tenkt på.

### Å kjøre det selv

Den enkleste verifiseringen er å bruke det du akkurat lagde. Start applikasjonen, gå gjennom flyten,
prøv verdiene som ikke burde fungere. Det tar noen minutter, og det hoppes over oftere enn man
skulle tro, gjerne fordi testene er grønne og det føles som om jobben er gjort.

### Tester er verifisering, ikke rituale

En automatisk test er verdt det den faktisk sjekker. Når samme agent skriver både koden og testene,
kan de dele samme misforståelse. Testen bekrefter da det koden gjør, og ikke nødvendigvis det den
skulle gjøre. Grønt betyr i så fall bare at de to er enige med hverandre.

Spørsmålet mange sitter med, er når det holder med automatiske tester og når man bør teste selv.
Det har ikke et opplagt svar for den som ikke har gjort det mange ganger, og det blir sjelden sagt
høyt.

> ✍️ **F-R:** Når stoler du på de automatiske testene, og når tester du selv? Har du en
> tommelfingerregel — for eksempel knyttet til hva som står på spill, hvem som skrev testene, eller
> hvor godt du kjenner koden fra før?

## Å øve på vurderingen for seg

Hvis vurderingen før kom som en bieffekt av å produsere, må den nå øves direkte. Noen grep følger av
mekanismen over:

- Les før du kjører. Da må du danne deg en forventning, og det er forventningen som gjør avvik
  synlige.
- Spør hva som ville fått løsningen til å feile, før du spør om den virker.
- Be agenten forklare valgene sine, og sjekk forklaringen mot koden. Der de to ikke stemmer, er det
  verdt å se nærmere.
- Les testene før du leser koden. Da ser du hva som faktisk er sjekket, før koden har overbevist
  deg.

> ✍️ **F-R:** Står du for disse fire grepene? Stryk det du ikke bruker eller ikke ville anbefalt, og
> legg til det som mangler. Hvordan lærte du selv å vurdere kode du ikke hadde skrevet?

## Hva jeg ikke har svar på

Jeg vet ikke om vurdering kan læres fullt ut uten å ha produsert selv. Mye av det en erfaren
utvikler ser i en diff, er bygget ved å skrive og feile. Når den veien blir kortere for alle, må noe
annet gi den samme treningen, og jeg er ikke sikker på at gjennomlesing alene gjør det.

## Den som sier «dette stemmer»

Verktøyene blir bedre til å lage ting. Om de blir like mye bedre til å vise deg hva som er feil, vet
jeg ikke. Noen må uansett kunne si at resultatet holder, og den ferdigheten kommer ikke av seg selv
lenger. Den må øves, slik vi en gang øvde oss på å skrive koden.
