import satori from 'satori';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { AUTHOR } from '../site.config';

// Satori needs TTF/OTF/WOFF - it does not support the woff2 files we
// self-host for the site itself (BLUEPRINT Muc 5.2 picked woff2 for actual
// page weight). These TTFs live outside public/ on purpose: build-time-only
// tool input, never served to a visitor.
//
// Resolved from process.cwd() (the project root astro build runs from),
// NOT import.meta.url - Astro bundles this module into dist/.prerender/
// before running it, so a relative-to-this-file URL would point at a
// location the TTFs were never copied to.
const FONT_DIR = path.join(process.cwd(), 'src/assets/og-fonts');

let fontsPromise: Promise<{ regular: Buffer; bold: Buffer }> | null = null;

function loadFonts() {
  if (!fontsPromise) {
    fontsPromise = Promise.all([
      readFile(path.join(FONT_DIR, 'BeVietnamPro-Regular.ttf')),
      readFile(path.join(FONT_DIR, 'BeVietnamPro-Bold.ttf')),
    ]).then(([regular, bold]) => ({ regular, bold }));
  }
  return fontsPromise;
}

const MAX_TITLE_LENGTH = 90;

function truncateTitle(title: string): string {
  return title.length > MAX_TITLE_LENGTH ? `${title.slice(0, MAX_TITLE_LENGTH - 1)}…` : title;
}

export interface OgImageOptions {
  title: string;
  label: string;
  /** Lab accent (#38BDF8) or Hien accent (#E0A458) - BLUEPRINT Muc 5.1. */
  accent: string;
  /** Bottom line - defaults to the author's name. */
  footer?: string;
}

/** Renders a 1200x630 PNG (dark bg, label, title, author) via satori -> sharp, at build time. */
export async function generateOgImage({
  title,
  label,
  accent,
  footer = AUTHOR.name,
}: OgImageOptions): Promise<Buffer> {
  const fonts = await loadFonts();

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          width: '1200px',
          height: '630px',
          padding: '72px',
          backgroundColor: '#0A0D12',
          fontFamily: 'Be Vietnam Pro',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                color: accent,
                fontSize: 28,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '2px',
              },
              children: label,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: 56,
                fontWeight: 700,
                color: '#E6EAF0',
                lineHeight: 1.3,
              },
              children: truncateTitle(title),
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontSize: 28,
                color: '#9BA6B4',
              },
              children: footer,
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Be Vietnam Pro', data: fonts.regular, weight: 400, style: 'normal' },
        { name: 'Be Vietnam Pro', data: fonts.bold, weight: 700, style: 'normal' },
      ],
    },
  );

  return sharp(Buffer.from(svg)).png().toBuffer();
}
