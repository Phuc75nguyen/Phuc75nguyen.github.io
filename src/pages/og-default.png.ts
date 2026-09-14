import { AUTHOR } from '../site.config';
import { generateOgImage } from '../lib/og';

// Fallback OG image for pages without their own content (home, /papers
// listing, /tags, etc.) - fills the role BLUEPRINT Muc 3.4 assigns to a
// static public/og-default.png, generated the same way as per-post images
// instead of a hand-made binary, so it never drifts from site.config.ts.
export async function GET() {
  const buffer = await generateOgImage({
    title: AUTHOR.name,
    label: AUTHOR.role,
    accent: '#38BDF8',
    footer: AUTHOR.tagline,
  });
  return new Response(new Uint8Array(buffer), {
    headers: { 'Content-Type': 'image/png' },
  });
}
