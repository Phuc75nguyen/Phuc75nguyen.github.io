import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// BLUEPRINT.md Muc 4 is the contract for these 4 schemas. Do not add or
// remove fields without updating the blueprint first (CLAUDE.md rule #1).

const papers = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/papers' }),
  schema: ({ image }) =>
    z.object({
      // Dinh danh
      title: z.string(),
      paperTitle: z.string(),
      authors: z.array(z.string()),
      venue: z.string().optional(),
      year: z.number().int().min(1990).max(2100),
      arxivId: z.string().optional(),
      doi: z.string().optional(),
      paperUrl: z.string().url().optional(),
      codeUrl: z.string().url().optional(),
      localPdf: z.string().optional(),

      // Phan loai
      domain: z.enum([
        'LLM & VLM',
        'Computer Vision',
        'Agentic AI',
        'ML & MLOps',
        'OCR & Document AI',
        'Applied AI',
      ]),
      tags: z.array(z.string()).default([]),
      series: z.string().optional(),
      order: z.number().optional(),

      // Danh gia cua Phuc
      tldr: z.string().max(280),
      verdict: z.string().max(400),
      difficulty: z.number().int().min(1).max(5),
      impact: z.number().int().min(1).max(5),
      status: z.enum(['reading', 'analyzed', 'applied']).default('analyzed'),
      relatedPapers: z.array(z.string()).default([]),

      // Metadata
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      cover: image().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/notes' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      category: z.enum([
        'MLOps',
        'Data Engineering',
        'Deep Learning',
        'System Design',
        'Tooling',
        'Career',
      ]),
      tags: z.array(z.string()).default([]),
      series: z.string().optional(),
      order: z.number().optional(),
      cover: image().optional(),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

const essays = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    publishDate: z.coerce.date(),
    theme: z.enum(['Chiêm nghiệm', 'Văn hóa', 'Sách', 'Hành trình']),
    tags: z.array(z.string()).default([]),
    mood: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

const poems = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/poems' }),
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    form: z.enum([
      'Lục bát',
      'Thất ngôn bát cú',
      'Song thất lục bát',
      'Tự do',
      'Haiku',
      'Ngũ ngôn',
      'Khác',
    ]),
    collection: z.string().optional(),
    note: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { papers, notes, essays, poems };
