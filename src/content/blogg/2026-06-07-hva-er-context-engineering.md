---
tittel: "Hva er context engineering, forklart enkelt"
ingress: "Forskjellen på en KI som imponerer i en demo og en som holder i reelt arbeid ligger sjelden i modellen — den ligger i konteksten du gir den."
dato: 2026-06-07
tags: [context-engineering, ki, grunnleggende]
pilar: context-engineering
utkast: false
---

De fleste som har prøvd en KI-modell har hatt to opplevelser. Den første: du stiller et spørsmål,
og svaret er forbløffende bra. Den andre: du gir den en ekte oppgave fra jobben din, og svaret er
selvsikkert, velformulert og helt på siden.

Forskjellen mellom de to handler nesten aldri om hvor «smart» modellen er. Den handler om hva
modellen visste da den svarte. Og akkurat det — å bestemme hva modellen får vite, og når — er det
context engineering handler om.

## Den nye kollegaen

Tenk deg at du får en ny kollega på laget. Hun er skarp, lærer fort og har lest utrolig mye. Men
hun er helt fersk hos *dere*. Hun kjenner ikke kundene deres, vet ikke hvordan dere pleier å løse
ting, har aldri sett kodebasen, og aner ikke hva som ble bestemt på møtet forrige uke.

Du gir henne en oppgave. To ting kan skje.

Enten slenger du oppgaven over skulderen — «fiks innloggingen» — og går videre. Hun gjør sitt beste
ut fra det lille hun har, og leverer noe som ser riktig ut, men som bommer på hvordan *dere* gjør
det. Ikke fordi hun er dum, men fordi hun manglet det dere tar for gitt.

Eller du bruker fem minutter: du forteller hva som er galt, viser henne den relevante delen av
koden, nevner at dere har en egen måte å håndtere feilmeldinger på, og sier hvem hun kan spørre
hvis hun står fast. Nå leverer hun noe du kan bruke.

Modellen er den samme kollegaen i begge tilfeller. Det eneste som endret seg var konteksten hun
fikk. Det er hele poenget.

## Prompt engineering var bare halve historien

For et par år siden snakket alle om *prompt engineering* — kunsten å formulere det perfekte
spørsmålet. Det var nyttig, men det var også et litt for snevert bilde. Det handlet om den ene
setningen du skrev i tekstboksen.

Context engineering er det større ordet for hele bildet: alt modellen har tilgjengelig når den
jobber. Det inkluderer spørsmålet ditt, men også:

- **Bakgrunnen** — dokumentene, dataene, koden eller notatene den får se.
- **Reglene** — hvordan dere gjør ting hos dere, hva den skal og ikke skal gjøre.
- **Historikken** — hva som har blitt sagt og gjort tidligere i oppgaven.
- **Verktøyene** — hva den faktisk kan slå opp eller utføre selv, i stedet for å gjette.

En moderne KI-modell har et begrenset «arbeidsminne» — den ser bare det du legger foran den i
øyeblikket. Den husker ikke organisasjonen din mellom samtaler, og den vet ingenting om det du ikke
har fortalt den. Context engineering er disiplinen med å fylle det arbeidsminnet med riktig stoff —
og bare det riktige.

## Hvorfor «bare det riktige» er vanskelig

Her er det som gjør dette til et fag og ikke bare en sjekkliste: mer kontekst er ikke automatisk
bedre.

Det er fristende å tenke at man bare kan dytte *alt* inn — hele wikien, alle e-postene, hele
kodebasen — og la modellen finne ut av det. Men det fungerer dårlig, av samme grunn som det ville
vært en dårlig idé å be den nye kollegaen lese hele intranettet før hun svarer på et enkelt
spørsmål. Det viktige drukner i det uviktige. Modellen blir distrahert av det som er nesten
relevant, og mister tråden i det som faktisk betydde noe.

God context engineering handler derfor like mye om hva du *holder ute* som hva du tar med. Du vil
gi modellen den ene riktige siden, ikke hele permen. Det er et redaktørarbeid: velge ut, kutte ned,
sortere — slik at det som betyr noe er det som er nærmest.

## Derfor imponerer demoen, men svikter hverdagen

En KI-demo er nesten alltid satt opp med perfekt kontekst. Oppgaven er ren, dataene er ryddige, og
den som lager demoen vet akkurat hva som skal mates inn. Selvsagt ser det imponerende ut.

Ekte arbeid er rotete. Konteksten ligger spredt — litt i et dokument, litt i en e-post, litt i
hodet på en kollega, litt i et system ingen har dokumentert. Når en KI-satsing skuffer, er det
sjelden fordi modellen var for svak. Det er nesten alltid fordi den jobbet med mangelfull eller
rotete kontekst — den fikk «fiks innloggingen» uten resten.

Det er en god nyhet, egentlig. Det betyr at den viktigste innsatsen ikke ligger i å vente på en
sterkere modell, men i noe du kan begynne med nå: bli flink til å gi den du allerede har riktig
kontekst.

## Hva dette betyr i praksis

Du trenger ikke være tekniker for å ta dette på alvor. Hvis du eksperimenterer med KI i arbeidet
ditt, er det noen vaner som flytter mer enn de fleste «triks»:

- **Gi den bakgrunnen du selv ville trengt.** Før du forventer et godt svar, spør deg: ville et
  *menneske* som ikke jobber hos oss klart denne oppgaven med bare det jeg ga? Hvis ikke, mangler
  modellen det samme.
- **Vis, ikke bare fortell.** Et konkret eksempel på hvordan et godt svar ser ut hos dere, er ofte
  verdt mer enn et avsnitt med instruksjoner.
- **Hold konteksten ren.** Ikke dump alt inn av gammel vane. Det relevante, presist — ikke alt, for
  sikkerhets skyld.
- **Tenk på det som et oppsett, ikke et engangsspørsmål.** Den virkelige verdien kommer når du
  bygger en gjenbrukbar måte å mate modellen riktig kontekst på, slik at du ikke starter på null
  hver gang.

Det siste punktet er der det blir morsomt — og der mye av jobben min ligger om dagen. Det går an å
sette opp et fast «lager» av kontekst og spesialiserte KI-agenter som allerede kjenner forholdene
sine, slik at du slipper å forklare alt på nytt hver gang. Hvordan jeg har gjort det selv, skriver
jeg om i [Slik har jeg satt opp et personlig KI-lager med agenter](/blogg/2026-06-07-personlig-ki-lager-med-agenter)
— og hvordan dette endrer arbeidsmåten min som utvikler, i [Senior utvikler i 2026: slik jobber jeg
med KI](/blogg/2026-06-07-senior-utvikler-i-2026).

## Kort oppsummert

Context engineering høres avansert ut, men handler i bunn om én ting: gi modellen riktig kontekst
til riktig tid. Ikke mer, ikke mindre.

Modellene blir bedre nesten av seg selv. Det du har kontroll over — og det som faktisk avgjør om KI
holder i reelt arbeid — er konteksten du gir den. Det er ikke magi. Det er håndverk. Og det er
fullt mulig å bli god til det.
