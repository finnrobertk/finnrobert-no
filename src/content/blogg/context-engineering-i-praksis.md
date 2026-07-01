---
tittel: "Context engineering i praksis: grepene jeg faktisk bruker"
ingress: "Introen forklarte hva context engineering er og hvorfor det avgjør. Her er det konkrete håndverket — hvordan jeg trimmer, strukturer og verifiserer kontekst i hverdagen, inkludert det jeg fortsatt ikke har funnet ut av."
dato: 2026-07-02
tags: [context-engineering, ki, claude-code, oppsett]
pilar: context-engineering
utkast: false
---

I [Hva er context engineering, forklart enkelt](/blogg/hva-er-context-engineering)
forklarte jeg *hva* det er og *hvorfor* det avgjør om en KI-modell (kunstig intelligens) holder i
reelt arbeid. Kort sagt: forskjellen ligger sjelden i modellen, men i konteksten du gir den.

Dette innlegget hopper over den forklaringen og går rett på *hvordan*. Hvilke grep bruker jeg
faktisk når jeg jobber? Ikke prinsipper — håndfaste vaner. Jeg skal være ærlig med en gang: dette
er ting jeg fortsatt finjusterer. Noe av det har satt seg, annet endrer jeg på fra uke til uke. Men
det er det jeg gjør i dag, og det fungerer godt nok til at det er verdt å dele.

## Redaktørarbeidet: å bestemme hva som skal holdes ute

Det vanskeligste med kontekst er ikke å finne nok av den. Det er å la være å ta med for mye.

Da jeg begynte, gjorde jeg den klassiske feilen: jeg dyttet inn alt jeg kom over. Hele filen, ikke
den relevante delen. Tre eksempler «for sikkerhets skyld» der ett holdt. Bakgrunn modellen ikke
trengte for *denne* oppgaven. Resultatet var sjelden feil, men det var ulnt — modellen plukket opp
detaljer som var nesten relevante, og bommet på det som faktisk betydde noe.

Nå tenker jeg på det som redaktørarbeid. Før jeg gir modellen noe, stiller jeg ett spørsmål:
**trenger den dette for å løse akkurat denne oppgaven?** Hvis svaret er «kanskje, det skader vel
ikke» — så er svaret nei. Det skader. Hver ekstra bit konkurrerer om oppmerksomheten til det som
faktisk teller.

Konkret betyr det at jeg heller limer inn én funksjon enn hele fila, og skriver «her er
feilhåndteringen vår, følg samme mønster» i stedet for å håpe modellen finner mønsteret selv i 800
linjer. Det er mer jobb i øyeblikket. Men det er den jobben som skiller et brukbart svar fra et jeg
må skrive om.

## Stående kontekst: det modellen skal vite hver gang

Noe kontekst er engangs — denne oppgaven, denne fila. Men mye av det jeg ellers ville gjentatt i
hver eneste samtale, er *stående*: ting som er sant uansett hva jeg spør om.

Det legger jeg i en instruksfil. I Claude Code heter den `CLAUDE.md`, og den leses automatisk når
verktøyet starter. Der ligger ting som hvordan prosjektet er bygd opp, hvilke konvensjoner jeg
følger, og — minst like viktig — hva som er *utenfor*. Et lite utdrag fra min egen kunnskapsbase:

```markdown
## Grenser (viktig)
- Ekte kodeprosjekter er egne repoer med egen historikk. Denne kunnskapsbasen
  holder hub-notatet for hvert prosjekt og peker til kode-repoet.
- Privat økonomi ≠ firma-regnskap. Aldri bland de to.
```

Poenget er ikke filformatet. Poenget er at jeg slipper å forklare det samme på nytt hver gang, og at
modellen aldri starter blank på det som er konstant. Det er stående kontekst — skrevet én gang,
lest hver gang.

Akkurat denne fila fortjener et eget dypdykk — hva som bør stå i en `CLAUDE.md`, hva som *ikke* bør,
og fellene jeg selv har gått i. Det kommer i et eget innlegg snart.
<!-- TODO 14.07: gjør «et eget innlegg» til lenke → /blogg/claude-md-staaende-kontekst når dypdykket er live -->


Den samme tankegangen gjelder metadata. I kunnskapsbasen min starter hver notatfil med en liten
YAML-blokk på toppen: type, område, status, tags. Det er kontekst maskinen kan lese uten å gjette —
en agent vet med en gang at *dette* er et aktivt prosjektnotat innen privatøkonomi, ikke et arkivert
ressursnotat. Jeg skrev mer om det oppsettet i
[Slik har jeg satt opp en personlig KI-kunnskapsbase med agenter](/blogg/personlig-ki-kunnskapsbase-med-agenter).

## Skarpt avgrensede roller framfor én alt-mulig-agent

Et grep som flyttet mer enn jeg ventet: å gi en agent *ett* mandat i stedet for å be én assistent
om å være god til alt.

En bred «hjelp meg med hva som helst»-agent har et grunnproblem. Konteksten dens må dekke alt, og da
dekker den ingenting godt. Den vet litt om økonomi, litt om skriving, litt om kode — og blander
gjerne sammen tonen og reglene fra de tre.

En smal agent slipper det. Fag-skribenten som skriver disse innleggene leser posisjoneringen og
brand-guiden for stemmen, og har tydelig beskjed om hva hun *ikke* skal røre: den visuelle
merkevaren, inntektsstrategi, firmaøkonomi. Det er ikke begrensninger for begrensningens skyld. Det
er hva som holder konteksten hennes ren og fokusert, slik at svarene treffer. Grensene *er*
context engineering — de bestemmer hva som er innenfor og utenfor synsfeltet. Jeg gikk grundigere
inn i den rolledelingen i
[innlegget om KI-kunnskapsbasen](/blogg/personlig-ki-kunnskapsbase-med-agenter).

## Når man bør starte med blanke ark

Dette tok meg lengst tid å lære, og det er nesten det motsatte av alt over: noen ganger er det beste
grepet å kaste konteksten, ikke bygge mer.

En lang samtale samler opp rot. Du prøvde en retning som ikke førte fram, modellen misforsto noe
tidlig og dro det med seg, dere gikk på en sidesti og kom tilbake. Alt dette ligger fortsatt i
arbeidsminnet og påvirker hvert nye svar. På et tidspunkt drar du på en sekk med utdaterte antakelser
uten å merke det.

Tegnet jeg ser etter: når jeg begynner å *korrigere* modellen om og om igjen — «nei, ikke sånn, husk
at vi bestemte X» — er det som regel et signal om at konteksten er blitt grumsete. Da er det ofte
raskere å starte friskt: ny samtale, og bare det som faktisk gjelder nå, presist formulert. Mye av
forvirringen forsvinner rett og slett fordi rotet ikke ble med over. En frisk start med riktig
kontekst slår en lang samtale full av blindspor.

## Verifiser — kontekst gjør feil mindre sannsynlig, ikke umulig

Et grep som hører med, og som er lett å hoppe over når svarene begynner å bli gode: jeg sjekker dem.

God kontekst hever treffsikkerheten betydelig. Men den fjerner ikke muligheten for at modellen tar
feil — den sier ting like selvsikkert når den bommer som når den treffer. Jo bedre konteksten blir,
jo mer fristende er det å slutte å lese nøye. Det er nettopp da en feil sklir gjennom.

Så jeg leser output som om en dyktig, men fersk kollega leverte det: sannsynligvis bra, verdt en
gjennomlesning før jeg stoler på det. For kode betyr det å faktisk kjøre den. For en påstand betyr
det å sjekke kilden. Det tar et minutt, og det er den billigste forsikringen jeg kjenner. Kontekst
gjør den nye kollegaen god — den gjør henne ikke ufeilbarlig.

## Slik gjør jeg det, steg for steg

Når jeg setter opp en ny oppgave, går jeg løst gjennom dette:

1. **Hva er konstant?** Det som er sant uansett oppgave, legger jeg i en stående instruksfil — skrives
   én gang, leses hver gang.
2. **Hva er spesifikt for *denne* oppgaven?** Bare det relevante, og helst det presise utdraget, ikke
   hele kilden.
3. **Hvem skal gjøre det?** Riktig avgrenset rolle, med tydelige grenser for hva som er utenfor.
4. **Er konteksten fortsatt ren?** Hvis jeg har korrigert tre ganger, starter jeg friskt heller enn å
   dra rotet videre.
5. **Stemmer det?** Jeg leser og verifiserer før jeg stoler på svaret.

## Noen tommelfingerregler til slutt

- Det presise utdraget slår hele kilden. Nesten alltid.
- «Skader vel ikke» betyr som regel at det skader. Kutt det.
- Skriv det konstante ned én gang, framfor å gjenta det i hver samtale.
- Én rolle, ett mandat. Bredt blir middels.
- Når du korrigerer i ett sett, start på nytt i stedet.
- Les output før du stoler på det — selv når det ser riktig ut.

Ingen av disse er ferdige sannheter. Det er arbeidsregler jeg justerer mens jeg bruker dem, og noen
kommer jeg sikkert til å skrive om senere. Men hvis du skal ta med deg én ting: context engineering
i praksis er mest av alt redaktørarbeid. Det handler like mye om hva du holder ute som hva du tar med —
og det er en ferdighet du blir bedre i ved å gjøre det, ikke ved å vente på en sterkere modell.
