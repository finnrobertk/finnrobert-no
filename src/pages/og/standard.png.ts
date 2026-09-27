// Standard delebilde for forsiden og øvrige sider: /og/standard.png
import type { APIRoute } from 'astro';
import { lagOgBilde, pngRespons } from '../../lib/og';

export const GET: APIRoute = async () =>
  pngRespons(
    await lagOgBilde({
      tittel: 'KI og context engineering — forklart på norsk, vist i praksis.',
      undertekst: 'Løsningsarkitekt og senior utvikler',
    }),
  );
