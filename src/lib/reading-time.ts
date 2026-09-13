const WORDS_PER_MINUTE = 200;

/** Rough estimate from raw MDX body text — good enough for a "~N phút đọc" label. */
export function estimateReadingTime(body: string): number {
  const wordCount = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(wordCount / WORDS_PER_MINUTE));
}
