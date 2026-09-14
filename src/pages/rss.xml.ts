import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { SITE } from '../site.config';
import { getPublished } from '../lib/collections';

interface FeedItem {
  title: string;
  pubDate: Date;
  description: string;
  link: string;
  categories: string[];
}

export async function GET(context: APIContext) {
  const [papers, notes, essays, poems] = await Promise.all([
    getPublished('papers'),
    getPublished('notes'),
    getPublished('essays'),
    getPublished('poems'),
  ]);

  const items: FeedItem[] = [
    ...papers.map(
      (entry): FeedItem => ({
        title: entry.data.title,
        pubDate: entry.data.publishDate,
        description: entry.data.tldr,
        link: `/papers/${entry.id}`,
        categories: ['Paper', entry.data.domain],
      }),
    ),
    ...notes.map(
      (entry): FeedItem => ({
        title: entry.data.title,
        pubDate: entry.data.publishDate,
        description: entry.data.description,
        link: `/notes/${entry.id}`,
        categories: ['Note', entry.data.category],
      }),
    ),
    ...essays.map(
      (entry): FeedItem => ({
        title: entry.data.title,
        pubDate: entry.data.publishDate,
        description: entry.data.subtitle ?? entry.data.title,
        link: `/essays/${entry.id}`,
        categories: ['Essay', entry.data.theme],
      }),
    ),
    ...poems.map(
      (entry): FeedItem => ({
        title: entry.data.title,
        pubDate: entry.data.publishDate,
        description: entry.data.note ?? entry.data.title,
        link: `/poems/${entry.id}`,
        categories: ['Thơ', entry.data.form],
      }),
    ),
  ].sort((a, b) => b.pubDate.valueOf() - a.pubDate.valueOf());

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site ?? SITE.url,
    items,
    customData: '<language>vi</language>',
  });
}
