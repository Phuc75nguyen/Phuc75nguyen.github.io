/**
 * Best-effort preview for the /poems grid ("2 dong tho dau" - BLUEPRINT
 * Muc 6.4). The actual poem text lives inside the MDX body as a JS
 * template literal passed to <Poem text={...} /> (see components/content/
 * Poem.astro for why - markdown would otherwise reinterpret poem lines).
 * That means it is not reachable through the normal rendered-Content path
 * for a lightweight index card, so this parses the raw MDX source
 * (entry.body) for the `export const poemText = \`...\`;` block. Coupled
 * to that authoring convention on purpose - every poem BLUEPRINT scaffolds
 * (this file's samples, scripts/new.mjs in Phase 6) follows it exactly.
 * Returns [] rather than throwing if a poem was authored differently.
 */
const POEM_TEXT_PATTERN = /export\s+const\s+poemText\s*=\s*`([\s\S]*?)`;/;

export function extractPoemPreviewLines(body: string, count = 2): string[] {
  const match = POEM_TEXT_PATTERN.exec(body);
  if (!match) return [];
  return match[1]
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
    .slice(0, count);
}
