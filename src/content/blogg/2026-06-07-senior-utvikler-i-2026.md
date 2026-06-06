---
tittel: "Senior utvikler i 2026: slik jobber jeg med KI"
ingress: "Rollen min har endret seg det siste året — ikke fordi KI tar over, men fordi den flytter tyngdepunktet i hva jeg faktisk bruker tiden på. Her er hva som ble viktigere, hva som ble mindre viktig, og hvordan arbeidsdagen ser ut nå."
dato: 2026-06-07
tags: [senior, ki, arbeidsmåte, utvikler]
pilar: senior-til-ki
utkast: false
---

Jeg har skrevet kode profesjonelt i nærmere tjue år. Det siste året har jobben min endret seg
mer enn de fem foregående til sammen — men ikke på den måten overskriftene vil ha det til.

KI har ikke gjort meg overflødig, og den har ikke gjort meg «10x». Den har flyttet på hva jeg
bruker dagen til. Mindre tid på å skrive ut det jeg allerede vet hvordan ser ut. Mer tid på de
tingene som er vanskelige å delegere til en modell. Dette innlegget er for deg som er i samme
pivot: erfaren utvikler som merker at arbeidsmåten er i ferd med å skifte, og som lurer på hva
det egentlig betyr.

Jeg skal være konkret om hva som har endret seg hos meg. Ikke spådommer — bare det jeg faktisk
gjør nå.

## Det jeg ikke savner

La meg starte med det enkle. En god del av det en senior utvikler gjør på en vanlig dag er
mekanisk: skrive en CRUD-endepunkt til, sette opp testoppsettet for en ny modul, oversette et
mønster fra ett språk til et annet, skrive den fjerde varianten av samme valideringslogikk.
Jeg *kan* alt dette. Det er bare ikke der verdien min ligger.

Det er den typen arbeid en agent gjør bra nå — forutsatt at den får skikkelig kontekst. Og det
er greit. Jeg savner ikke å skrive boilerplate, like lite som jeg savner å slå opp metodenavn i
en API-doc fra papir. Håndverket mitt sitter ikke i fingrene som taster. Det har det egentlig
aldri gjort.

Det som *blir* mindre viktig er altså den rene produksjonshastigheten på kode jeg allerede har
i hodet. Den var lenge en stor del av hva «senior» betydde i praksis. Den teller mindre nå.

## Det som ble viktigere

Når den konkrete kodingen flyttes nærmere en knapp, blir alt rundt koden mer avgjørende. Fire
ting har vokst tydelig hos meg:

**Vurdering.** En modell kan produsere noe som ser riktig ut, kompilerer, og passerer testene
— og likevel er feil løsning på problemet. Å se *at* det er feil, hvorfor det blir dyrt om et
halvt år, hvilken antagelse som ikke holder — det er erfaring. Det er ikke noe du prompter deg
til. Jeg bruker mer tid på å lese kode kritisk enn på å skrive den, og det er den dyreste delen
av dagen min nå.

**Arkitektur og grenser.** En agent er god på å fylle ut en form, men den setter ikke formen.
Hvor går grensene mellom moduler? Hva skal være eksplisitt og hva skal være konvensjon? Hvilke
beslutninger er dyre å reversere? Dette er senior-arbeid i sin reneste form, og det blir bare
viktigere når selve utfyllingen går fortere. Jo raskere noe kan bygges, jo dyrere er det å bygge
feil ting godt.

**Å gi god kontekst.** Dette er den ferdigheten som overrasket meg mest. Forskjellen på en agent
som leverer noe brukbart og en som roter, er nesten alltid hva den fikk vite — ikke hvor «smart»
modellen er. Å formulere problemet presist, peke på de riktige filene, si hva som er fast og hva
som er fritt, beskrive grensene den ikke skal trå over: det er en egen disiplin. Jeg har skrevet
mer om den i [Hva er context engineering, forklart enkelt](/blogg/2026-06-07-hva-er-context-engineering),
fordi det fortjener sitt eget innlegg.

**Å verifisere.** Tilliten flytter seg. Før stolte jeg implisitt på koden jeg selv skrev, fordi
jeg satt med hver linje mens den ble til. Nå må jeg verifisere bevisst — lese diffen ordentlig,
kjøre det, teste antagelsene, ikke nikke fordi det ser plausibelt ut. Plausibelt er ikke det
samme som riktig, og en agent produserer plausibelt på løpende bånd. Det å være den siste som
sier «dette stemmer faktisk» er blitt en kjernedel av jobben.

Ser du mønsteret? Alle fire er ting erfaringen min allerede var god for. De var bare lavere
prioritert da jeg brukte halve dagen på å skrive ut koden selv.

## Slik ser arbeidsdagen ut nå

Konkret, uten å pynte på det.

Jeg jobber mye gjennom en agent i terminalen — Claude Code — på et oppsett der modellen har
tilgang til prosjektet, konvensjonene og de notatene den trenger. En typisk oppgave starter
ikke med at jeg skriver kode. Den starter med at jeg beskriver hva jeg vil ha, peker på hvor i
kodebasen det hører hjemme, og sier hva som er viktig å ikke ødelegge. Så leser jeg det som kommer
tilbake — kritisk — og dytter det dit jeg vil.

Noen ganger er det raskere enn å skrive selv. Noen ganger er det ikke det, og da skriver jeg det
selv. Jeg har sluttet å tvinge alt gjennom en agent for prinsippets skyld; det er et verktøy, ikke
en religion. Tommelfingerregelen min: jo mer veldefinert og mønstertungt arbeidet er, jo mer
lønner det seg å delegere. Jo mer det krever en avgjørelse om *hva* som er riktig, jo mer sitter
jeg i førersetet.

Den andre store endringen er at jeg har bygget opp kontekst som varer. Jeg har et personlig
oppsett der prosjektnotater, beslutninger og arbeidsmåter ligger strukturert, slik at agentene
mine starter med å vite ting i stedet for å gjette. Det har jeg beskrevet i
[Slik har jeg satt opp et personlig KI-lager med agenter](/blogg/2026-06-07-personlig-ki-lager-med-agenter).
Poenget her er bare: tiden jeg før brukte på å skrive kode, bruker jeg nå delvis på å bygge og
vedlikeholde *konteksten* som gjør at koden blir riktig. Det er en reell forskyvning i hva
arbeidet består av.

Og så bruker jeg mer tid på å lese. Differ, agentens resonnement, det den valgte *bort*. Jeg er
blitt en grundigere kodeleser enn jeg var som ren skribent, rett og slett fordi jeg må være det.

## Hva jeg fortsatt er usikker på

Jeg later ikke som dette er ferdig tenkt. Et par ting jeg ikke har landet:

Jeg vet ikke helt hva dette gjør med juniorer. Mye av det jeg lener meg på nå er erfaring jeg
bygget ved å skrive tusenvis av linjer selv, inkludert de kjedelige. Hvis den veien forsvinner,
hvordan bygger neste generasjon den samme dømmekraften? Jeg har ikke svaret, og jeg er skeptisk
til alle som sier de har det.

Jeg er også oppmerksom på at det er lett å bli en passiv godkjenner. Når noe ser bra ut og du har
det travelt, er fristelsen å trykke ja. Det er der erfaringen din enten gjør en forskjell eller
ikke — og det krever at du faktisk bruker den, hver gang, ikke bare har den.

## Landingen: erfaring teller mer, ikke mindre

Hvis jeg skal koke det ned til én ting: erfaringen min er blitt mer verdt det siste året, ikke
mindre. Men den brukes annerledes.

Den sitter ikke lenger primært i å produsere kode raskt. Den sitter i å vite hva som er verdt å
bygge, å sette de riktige grensene, å gi en agent akkurat den konteksten den trenger, og å være
den som faktisk verifiserer at resultatet holder. Det er senior-arbeid. Det har det alltid vært —
KI har bare skrelt bort en del av det rundt det, og latt kjernen stå tydeligere fram.

Så nei, jeg tror ikke KI tar jobben din. Men jeg tror den endrer hvilken del av jobben som er
*jobben*. Og for oss som har gått veien, er det ganske gode nyheter.
