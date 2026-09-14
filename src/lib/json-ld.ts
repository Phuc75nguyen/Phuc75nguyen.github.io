import { SITE, AUTHOR, SOCIAL_LINKS } from '../site.config';

function absoluteUrl(pathOrUrl: string): string {
  return new URL(pathOrUrl, SITE.url).toString();
}

export interface ScholarlyArticleInput {
  title: string;
  description: string;
  authors: string[];
  publishDate: Date;
  updatedDate?: Date;
  url: string;
  image: string;
  keywords?: string[];
}

/** JSON-LD for /papers/[slug] - BLUEPRINT Muc 7. */
export function buildScholarlyArticle(input: ScholarlyArticleInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ScholarlyArticle',
    headline: input.title,
    description: input.description,
    author: input.authors.map((name) => ({ '@type': 'Person', name })),
    datePublished: input.publishDate.toISOString(),
    ...(input.updatedDate ? { dateModified: input.updatedDate.toISOString() } : {}),
    url: absoluteUrl(input.url),
    image: absoluteUrl(input.image),
    ...(input.keywords && input.keywords.length > 0
      ? { keywords: input.keywords.join(', ') }
      : {}),
    publisher: { '@type': 'Person', name: AUTHOR.name },
  };
}

export interface BlogPostingInput {
  title: string;
  description: string;
  publishDate: Date;
  updatedDate?: Date;
  url: string;
  image: string;
}

/** JSON-LD for /notes/[slug] and /essays/[slug] - BLUEPRINT Muc 7. */
export function buildBlogPosting(input: BlogPostingInput) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: input.title,
    description: input.description,
    author: { '@type': 'Person', name: AUTHOR.name },
    datePublished: input.publishDate.toISOString(),
    ...(input.updatedDate ? { dateModified: input.updatedDate.toISOString() } : {}),
    url: absoluteUrl(input.url),
    image: absoluteUrl(input.image),
  };
}

/** JSON-LD for /about - BLUEPRINT Muc 7. Built now, wired into the page in Phase 6. */
export function buildPerson() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: AUTHOR.name,
    jobTitle: AUTHOR.role,
    url: SITE.url,
    sameAs: SOCIAL_LINKS.map((link) => link.href),
  };
}
