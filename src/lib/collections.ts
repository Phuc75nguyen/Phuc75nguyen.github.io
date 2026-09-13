import { getCollection, type CollectionEntry } from 'astro:content';

export type ContentType = 'papers' | 'notes' | 'essays' | 'poems';

const TYPE_PATH: Record<ContentType, string> = {
  papers: '/papers',
  notes: '/notes',
  essays: '/essays',
  poems: '/poems',
};

/** Non-draft entries, newest first. The one query every listing page starts from. */
export async function getPublished<T extends ContentType>(
  collection: T,
): Promise<CollectionEntry<T>[]> {
  const entries = await getCollection(collection, ({ data }) => !data.draft);
  return entries.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

export interface RecentItem {
  title: string;
  href: string;
  type: ContentType;
  publishDate: Date;
}

/** Most recent entries across all 4 collections, for the sidebar "Bai moi nhat" block. */
export async function getRecentAcrossCollections(limit: number): Promise<RecentItem[]> {
  const types: ContentType[] = ['papers', 'notes', 'essays', 'poems'];
  const perType = await Promise.all(
    types.map(async (type) => {
      const entries = await getPublished(type);
      return entries.map(
        (entry): RecentItem => ({
          title: entry.data.title,
          href: `${TYPE_PATH[type]}/${entry.id}`,
          type,
          publishDate: entry.data.publishDate,
        }),
      );
    }),
  );
  return perType
    .flat()
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .slice(0, limit);
}

export interface SiteStats {
  papers: number;
  notes: number;
  essays: number;
  poems: number;
}

/** Counts for the sidebar "Chi so dong" block. */
export async function getSiteStats(): Promise<SiteStats> {
  const [papers, notes, essays, poems] = await Promise.all([
    getPublished('papers'),
    getPublished('notes'),
    getPublished('essays'),
    getPublished('poems'),
  ]);
  return { papers: papers.length, notes: notes.length, essays: essays.length, poems: poems.length };
}

/** Tag frequency across entries that have a `tags` field (papers/notes/essays — poems has none). */
export function getTopTags(entries: { data: { tags?: string[] } }[], limit: number): string[] {
  const counts = new Map<string, number>();
  for (const entry of entries) {
    for (const tag of entry.data.tags ?? []) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}
