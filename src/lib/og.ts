// Genererer delebilder (Open Graph, 1200×630 PNG) ved byggetid med Satori → SVG → resvg → PNG.
// Én mal for alle innlegg + et standardbilde for øvrige sider. Farger = brand-tokens (lys modus).
// Fontene leses lokalt fra @fontsource-pakkene (woff; Satori støtter ikke woff2) — ingen nettkall i bygg.
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

export const OG_BREDDE = 1200;
export const OG_HOYDE = 630;

const farge = {
  bg: '#FBFAF8',
  tekst: '#1C1A17',
  dempet: '#5B564E',
  primaer: '#0F766E',
  aksent: '#C2410C',
  kant: '#E5E1DA',
};

const require = createRequire(import.meta.url);
const fontfil = (pakke: string, fil: string) => readFile(require.resolve(`${pakke}/files/${fil}`));

let fonterCache: Promise<Parameters<typeof satori>[1]['fonts']> | undefined;
function fonter() {
  fonterCache ??= Promise.all([
    fontfil('@fontsource/fraunces', 'fraunces-latin-500-normal.woff'),
    fontfil('@fontsource/fraunces', 'fraunces-latin-600-normal.woff'),
    fontfil('@fontsource/inter', 'inter-latin-400-normal.woff'),
    fontfil('@fontsource/inter', 'inter-latin-500-normal.woff'),
  ]).then(([f500, f600, i400, i500]) => [
    { name: 'Fraunces', data: f500, weight: 500, style: 'normal' },
    { name: 'Fraunces', data: f600, weight: 600, style: 'normal' },
    { name: 'Inter', data: i400, weight: 400, style: 'normal' },
    { name: 'Inter', data: i500, weight: 500, style: 'normal' },
  ]);
  return fonterCache;
}

// Minimal hyperscript så vi slipper React som avhengighet. Satori tar imot { type, props }-trær.
type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, ...children: (Node | string)[]): Node => ({
  type,
  props: { style: { display: 'flex', ...style }, children: children.length <= 1 ? children[0] : children },
});

const TEKSTBREDDE = 1200 - 96 - 88; // venstre (inkl. stripe) + høyre marg

// Velg største skriftstørrelse der tittelen anslagsvis får plass på maks 3 linjer.
// Fraunces har gjennomsnittlig tegnbredde på ~0,5 em; vi bryter ord for ord for å anslå linjetall.
function tittelStorrelse(tittel: string): number {
  const ord = tittel.split(/\s+/);
  for (const str of [80, 72, 64, 58, 52]) {
    const tegnPerLinje = TEKSTBREDDE / (str * 0.5);
    let linjer = 1;
    let len = 0;
    for (const o of ord) {
      const ny = len === 0 ? o.length : len + 1 + o.length;
      if (ny > tegnPerLinje && len > 0) {
        linjer++;
        len = o.length;
      } else len = ny;
    }
    if (linjer <= 3) return str;
  }
  return 48;
}

interface OgValg {
  tittel: string;
  /** Liten linje under ordmerket, f.eks. dato eller posisjonering. */
  undertekst?: string;
}

// Egen ombryting: hvert ord blir et uknekkelig span i en flex-wrap-beholder, så ord med bindestrek
// («KI-verktøy») aldri brytes ved streken — uten å være avhengig av en U+2011-glyf i fonten.
// De to siste ordene holdes samlet når det siste er kort, så det ikke blir stående alene.
function tittelOrd(t: string): string[] {
  const ord = t.trim().split(/\s+/);
  if (ord.length > 2 && ord[ord.length - 1].length <= 8) {
    const siste = ord.pop()!;
    ord[ord.length - 1] += `\u00A0${siste}`;
  }
  return ord;
}

function mal({ tittel, undertekst }: OgValg): Node {
  const str = tittelStorrelse(tittel);
  const ordbit = tittelOrd(tittel).map((o) =>
    h('span', { whiteSpace: 'nowrap', marginRight: '0.26em' }, o),
  );
  return h(
    'div',
    {
      width: OG_BREDDE,
      height: OG_HOYDE,
      display: 'flex',
      background: farge.bg,
    },
    // Teal-stripe langs venstre kant
    h('div', { width: 16, height: '100%', background: farge.primaer }),
    h(
      'div',
      {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px 88px 64px 80px',
      },
      // Topp: ordmerket
      h(
        'div',
        { display: 'flex', fontFamily: 'Fraunces', fontWeight: 600, fontSize: 36, color: farge.primaer },
        h('span', {}, 'finnrobert'),
        h('span', { color: farge.dempet }, '.no'),
      ),
      // Midten: tittel med én liten rav-markering over
      h(
        'div',
        { display: 'flex', flexDirection: 'column' },
        h('div', { width: 56, height: 6, background: farge.aksent, marginBottom: 28 }),
        h(
          'div',
          {
            fontFamily: 'Fraunces',
            fontWeight: 500,
            fontSize: str,
            lineHeight: 1.12,
            letterSpacing: '-0.01em',
            color: farge.tekst,
            flexWrap: 'wrap',
            maxHeight: str * 1.12 * 4,
            overflow: 'hidden',
          },
          ...ordbit,
        ),
      ),
      // Bunn: navn + undertekst, skilt med tynn kantlinje
      h(
        'div',
        {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderTop: `2px solid ${farge.kant}`,
          paddingTop: 24,
          fontFamily: 'Inter',
          fontSize: 26,
          color: farge.dempet,
        },
        h('span', { fontWeight: 500, color: farge.tekst }, 'Finn-Robert Kristensen'),
        h('span', { fontWeight: 400 }, undertekst ?? ''),
      ),
    ),
  );
}

export async function lagOgBilde(valg: OgValg): Promise<Uint8Array> {
  const svg = await satori(mal(valg) as unknown as Parameters<typeof satori>[0], {
    width: OG_BREDDE,
    height: OG_HOYDE,
    fonts: await fonter(),
  });
  return new Uint8Array(new Resvg(svg, { fitTo: { mode: 'width', value: OG_BREDDE } }).render().asPng());
}

export const pngRespons = (png: Uint8Array) =>
  new Response(png as unknown as BodyInit, { headers: { 'Content-Type': 'image/png' } });
