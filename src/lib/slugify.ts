/**
 * Vietnamese-aware slugify, shared by Tag.astro, /tags pages (Phase 3) and
 * scripts/new.mjs (Phase 6) so every URL is built the same way.
 * "Chieu que" already has no diacritics; "Chiều quê" -> "chieu-que",
 * "Duong ve" -> "duong-ve" ("d" from "đ" has no NFD decomposition, so it
 * needs its own replace before the generic combining-mark strip below).
 */
export function slugify(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
