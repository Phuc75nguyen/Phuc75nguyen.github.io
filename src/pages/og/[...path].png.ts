import { getPublished } from '../../lib/collections';
import { generateOgImage } from '../../lib/og';

const LAB_ACCENT = '#38BDF8';
const HIEN_ACCENT = '#E0A458';

interface OgPathEntry {
  path: string;
  title: string;
  label: string;
  accent: string;
}

export async function getStaticPaths() {
  const [papers, notes, essays, poems] = await Promise.all([
    getPublished('papers'),
    getPublished('notes'),
    getPublished('essays'),
    getPublished('poems'),
  ]);

  const entries: OgPathEntry[] = [
    ...papers.map((entry): OgPathEntry => ({
      path: `papers/${entry.id}`,
      title: entry.data.title,
      label: entry.data.domain,
      accent: LAB_ACCENT,
    })),
    ...notes.map((entry): OgPathEntry => ({
      path: `notes/${entry.id}`,
      title: entry.data.title,
      label: entry.data.category,
      accent: LAB_ACCENT,
    })),
    ...essays.map((entry): OgPathEntry => ({
      path: `essays/${entry.id}`,
      title: entry.data.title,
      label: entry.data.theme,
      accent: HIEN_ACCENT,
    })),
    ...poems.map((entry): OgPathEntry => ({
      path: `poems/${entry.id}`,
      title: entry.data.title,
      label: entry.data.form,
      accent: HIEN_ACCENT,
    })),
  ];

  return entries.map((entry) => ({
    params: { path: entry.path },
    props: entry,
  }));
}

export async function GET({ props }: { props: OgPathEntry }) {
  const buffer = await generateOgImage(props);
  return new Response(new Uint8Array(buffer), {
    headers: { 'Content-Type': 'image/png' },
  });
}
