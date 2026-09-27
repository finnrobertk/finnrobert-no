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
brukt. Selve ferdigheten, å vurdere kode, er den samme som i vanlig kodegjennomgang. Det nye er at
den må læres med vilje, fordi den ikke lenger følger med på kjøpet.

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

Jeg begynner med testene. Før jeg leser selve koden, vil jeg se hvilken logikk som er endret, og
testene viser det raskere enn implementasjonen gjør.

Feilen jeg forventer å finne, er sjelden en syntaksfeil eller et bibliotek brukt feil. Det er en
forretningsregel som er blitt feil fordi regelen ikke var beskrevet, verken i prompten eller i
konteksten agenten hadde. Agenten fyller hullet med noe som virker rimelig, og rimelig er ikke alltid
riktig.

Det er også der jeg er mest skeptisk: er forretningslogikken forstått riktig, er den beskrevet
riktig, og er den implementert riktig? Det er tre ulike spørsmål, og svikt i ett av dem gir kode som
virker, men er feil.

Jeg har ingen sjekkliste. Det er den samme gjennomgangen som om en utvikler hadde levert endringen.
Jeg må forstå hva som er endret, og være sikker på at det er riktig. Når noe er feil, er årsaken som
regel den samme enten koden kom fra en agent eller et menneske: noe var ikke godt nok beskrevet, av
meg eller i prompten, eller det manglet i konteksten.

Det gjør verifisering og [context engineering](/blogg/hva-er-context-engineering) til to sider av
samme sak. En feil i gjennomgangen peker ofte tilbake på en regel som burde stått i konteksten, og
da er det ikke nok å rette koden. Regelen må også skrives ned et sted agenten finner den neste gang,
for eksempel i [kontekstfilen](/blogg/context-filen-struktur-sprak-rekkefolge). Det gjør jeg fast:
forretningsreglene står beskrevet, og beskrivelsen holdes oppdatert når reglene endres.

## Et eksempel: det så ferdig ut

Eksempelet er fra et sideprosjekt, en app for å regne på fakturering og lønn. Koden er i hovedsak
skrevet sammen med agenter. På innstillingssiden setter du en standard provisjon, og kalkulatorene
bruker den til å anslå netto lønn.

Hver del fungerte for seg. Innstillingssiden lagret verdien, kalkulatorene regnet riktig, og
enhetstestene var grønne. Feilen lå mellom dem. Innstillingssiden lagret provisjonen som prosent,
altså 70. Kalkulatorene forventet en brøk, 0.7, slik standardverdien i koden var skrevet
(`DEFAULT_COMMISSION_PCT = 0.6`). Profilen sendte tallet rett videre:

```ts
defaultCommissionPct: data.default_commission_pct,
```

Og kalkulatoren gjorde det den skulle med tallet den fikk:

```ts
const commissionLabel = `${Math.round(commissionPct * 100)} % provisjon`;
```

På skjermen stod det «Estimert netto lønn @ 7000 % provisjon», og netto lønn ble regnet 100 ganger
for høyt.

Testene brukte brøk, fordi det var det kalkulatoren var skrevet for. De sjekket det de ble skrevet
for. Ingen test sjekket at det innstillingssiden lagrer, er det samme som kalkulatoren leser.

Feilen følger mønsteret fra forrige del. At provisjonen skulle lagres som brøk, var en regel som
ikke sto noe sted. Standardverdien i koden antydet den, men innstillingssiden hadde ingen grunn til å
kjenne til den.

Feilen ble funnet i juli, mens en annen endring i appen ble verifisert. Den gangen gjorde jeg
verifiseringen med Claude Code, innlogget mot appen mens den kjørte. Claude Code så teksten, fant
årsaken og skrev en sak på det. Det var altså ikke en test som fanget feilen, men at appen ble brukt
med ekte innstillinger.

Også rettelsen må vurderes. Saken foreslo én enhet i hele løsningen, migrering av den lagrede
verdien og en regel i databasen som bare tillater tall mellom 0 og 1. Det som ble gjort, var
enklere: verdier over 1 tolkes som prosent og deles på 100 når de leses.

```ts
defaultCommissionPct:
  data.default_commission_pct === null
    ? null
    : normalizeCommissionPct(data.default_commission_pct),
```

Det fjerner symptomet, men de to delene bruker fortsatt hver sin enhet. Å godta en rettelse er samme vurdering som å godta den opprinnelige koden: løser
den problemet, eller bare den delen av det du så?

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
skulle tro, gjerne fordi testene er grønne og det føles som om jobben er gjort. Provisjonsfeilen over
ble funnet nettopp slik.

### Tester er verifisering, ikke rituale

En automatisk test er verdt det den faktisk sjekker. Når samme agent skriver både koden og testene,
kan de dele samme misforståelse. Testen bekrefter da det koden gjør, og ikke nødvendigvis det den
skulle gjøre. Grønt betyr i så fall bare at de to er enige med hverandre.

En annen svakhet er grensene. Testene i provisjonseksempelet var riktige for hver del, men ingen
av dem dekket overgangen mellom delene, og det var der feilen lå.

Spørsmålet mange sitter med, er når det holder med automatiske tester og når man bør teste selv.
Mitt kriterium er hva testene dekker. Jeg stoler på dem når brukstilfellene og
akseptansekriteriene de bygger på er riktige, og når de også sjekker negative tilfeller: det som
ikke skal gå, verdier som skal avvises, tilstander som ikke skal oppstå. Tester som bare bekrefter
at riktig input gir riktig svar, sier lite om resten.

I provisjonseksempelet fantes det ikke noe kriterium for hva som skal skje når innstillingene og
kalkulatoren møtes, og da fantes det heller ingen test for det.

## Å øve på vurderingen for seg

Ferdigheten er ikke ny. Å vurdere kode fra en agent er kodegjennomgang, slik det har vært hele
tiden: forstå endringene, og vær sikker på at de er riktige. Det som har endret seg, er veien dit.
Før lærte du å vurdere andres kode fordi du hadde skrevet mye selv. Nå kan du stå med en endring til
gjennomgang uten å ha skrevet noe tilsvarende først, og da må gjennomgangen øves for seg.

Noen grep følger av det over:

- Les testene før koden. De viser hvilken logikk som er endret, og hva som faktisk er sjekket.
- Se etter forretningsreglene. Der ligger feilene oftest, og der har agenten minst å gå på når
  regelen ikke er beskrevet.
- Sjekk at testene bygger på riktige akseptansekriterier, og at de også dekker negative tilfeller.
- Når du finner en feil, spør om den skyldes noe som manglet i prompten eller konteksten. Da må
  den rettes der også, ikke bare i koden.

## Hva jeg ikke har svar på

Jeg vet ikke om vurdering kan læres fullt ut uten å ha produsert selv. Mye av det en erfaren
utvikler ser i en diff, er bygget ved å skrive og feile. Når den veien blir kortere for alle, må noe
annet gi den samme treningen, og jeg er ikke sikker på at gjennomlesing alene gjør det.

## Den som sier «dette stemmer»

Verktøyene blir bedre til å lage ting. Om de blir like mye bedre til å vise deg hva som er feil, vet
jeg ikke. Noen må uansett kunne si at resultatet holder, og den ferdigheten kommer ikke av seg selv
lenger. Den må øves, slik vi en gang øvde oss på å skrive koden.
