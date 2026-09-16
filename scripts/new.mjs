#!/usr/bin/env node
// Scaffold a new content file: npm run new -- paper|note|essay|poem "Tieu de"
//
// Not written in TypeScript on purpose: this runs via plain `node`, outside
// Astro/Vite's build pipeline, so it can't rely on their TS transform.
// slugify() below is intentionally a standalone copy of src/lib/slugify.ts
// rather than an import - a .ts file isn't reliably importable from plain
// Node across versions, and the function is small and stable enough that
// duplication is cheaper than a fragile cross-runtime import.

import { writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import readline from 'node:readline/promises';

function slugify(input) {
  return input
    .normalize('NFD')
    .replace(/\p{Diacritic}/gu, '')
    .replace(/[đĐ]/g, 'd')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const TYPES = {
  paper: { dir: 'papers' },
  note: { dir: 'notes' },
  essay: { dir: 'essays' },
  poem: { dir: 'poems' },
};

const [type, title] = process.argv.slice(2);

if (!TYPES[type] || !title) {
  console.error('Dùng: npm run new -- paper|note|essay|poem "Tiêu đề"');
  process.exit(1);
}

const slug = slugify(title);
if (!slug) {
  console.error('Không tạo được slug từ tiêu đề này.');
  process.exit(1);
}

const dir = path.join('src', 'content', TYPES[type].dir);
const filePath = path.join(dir, `${slug}.mdx`);

try {
  await access(filePath);
  console.error(`File đã tồn tại: ${filePath}`);
  process.exit(1);
} catch {
  // does not exist yet - good, continue
}

const today = new Date().toISOString().slice(0, 10);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

async function ask(question, fallback = '') {
  const suffix = fallback ? ` [${fallback}]` : '';
  const answer = (await rl.question(`${question}${suffix}: `)).trim();
  return answer || fallback;
}

async function askFromList(question, options, fallback) {
  while (true) {
    const answer = await ask(`${question} (${options.join(' / ')})`, fallback);
    if (options.includes(answer)) return answer;
    console.log(`  -> phải là một trong: ${options.join(', ')}`);
  }
}

function yamlList(commaSeparated) {
  const items = commaSeparated
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
  return `[${items.map((s) => `'${s.replace(/'/g, "''")}'`).join(', ')}]`;
}

function yamlString(value) {
  return `'${value.replace(/'/g, "''")}'`;
}

async function buildPaper() {
  const paperTitle = await ask('Tên gốc của paper (tiếng Anh)', title);
  const authors = await ask('Tác giả (phân cách bằng dấu phẩy)', 'Tên tác giả');
  const year = await ask('Năm paper', String(new Date().getFullYear()));
  const domain = await askFromList(
    'Domain',
    ['LLM & VLM', 'Computer Vision', 'Agentic AI', 'ML & MLOps', 'OCR & Document AI', 'Applied AI'],
    'ML & MLOps',
  );
  const tags = await ask('Tags (phân cách bằng dấu phẩy)', '');
  const tldr = await ask('TL;DR (tối đa 280 ký tự)', '');
  const difficulty = await ask('Độ khó (1-5)', '3');
  const impact = await ask('Mức ảnh hưởng (1-5)', '3');

  return `---
title: ${yamlString(title)}
paperTitle: ${yamlString(paperTitle)}
authors: ${yamlList(authors)}
# venue: 'NeurIPS 2024' # tuy chon
year: ${year}
# arxivId: '2401.12345' # tuy chon
# paperUrl: 'https://arxiv.org/abs/2401.12345' # tuy chon
# codeUrl: 'https://github.com/tac-gia/repo' # tuy chon
# localPdf: 'Ten Domain Trong AI-Knowledge-Library/ten-file.pdf' # tuy chon

domain: ${yamlString(domain)}
tags: ${yamlList(tags)}
# series: 'Ten chuoi bai' # tuy chon
# order: 1 # tuy chon

tldr: ${yamlString(tldr)}
verdict: ''
difficulty: ${difficulty}
impact: ${impact}
status: 'analyzed'
relatedPapers: []

publishDate: ${today}
featured: false
draft: true
---

import Callout from '../../components/content/Callout.astro';

## Bối cảnh

## Vấn đề

## Ý tưởng cốt lõi

## Phương pháp

## Thực nghiệm & kết quả

## Phản biện

<Callout type="critique">
{/* Bắt buộc: ít nhất 3 điểm yếu thật, có lập luận. */}
</Callout>

## Ứng dụng thực tế

<Callout type="application">
{/* Bắt buộc: góc nhìn triển khai production - chi phí, độ trễ, rào cản dữ liệu. */}
</Callout>

## Liên hệ

## Tài nguyên
`;
}

async function buildNote() {
  const description = await ask('Mô tả ngắn', '');
  const category = await askFromList(
    'Category',
    ['MLOps', 'Data Engineering', 'Deep Learning', 'System Design', 'Tooling', 'Career'],
    'MLOps',
  );
  const tags = await ask('Tags (phân cách bằng dấu phẩy)', '');

  return `---
title: ${yamlString(title)}
description: ${yamlString(description)}
publishDate: ${today}
category: ${yamlString(category)}
tags: ${yamlList(tags)}
# series: 'Ten chuoi bai' # tuy chon
# order: 1 # tuy chon
featured: false
draft: true
---

`;
}

async function buildEssay() {
  const subtitle = await ask('Phụ đề (tuỳ chọn)', '');
  const theme = await askFromList(
    'Theme',
    ['Chiêm nghiệm', 'Văn hóa', 'Sách', 'Hành trình'],
    'Chiêm nghiệm',
  );
  const tags = await ask('Tags (phân cách bằng dấu phẩy)', '');

  return `---
title: ${yamlString(title)}
${subtitle ? `subtitle: ${yamlString(subtitle)}\n` : "# subtitle: '' # tuy chon\n"}publishDate: ${today}
theme: ${yamlString(theme)}
tags: ${yamlList(tags)}
# mood: '' # tuy chon - goi y sac thai cho anh bia
draft: true
---

`;
}

async function buildPoem() {
  const form = await askFromList(
    'Thể thơ',
    ['Lục bát', 'Thất ngôn bát cú', 'Song thất lục bát', 'Tự do', 'Haiku', 'Ngũ ngôn', 'Khác'],
    'Tự do',
  );
  const collection = await ask('Tên tập thơ (tuỳ chọn)', '');
  const note = await ask('Lời dẫn ngắn (tuỳ chọn)', '');

  return `---
title: ${yamlString(title)}
publishDate: ${today}
form: ${yamlString(form)}
${collection ? `collection: ${yamlString(collection)}\n` : ''}${note ? `note: ${yamlString(note)}\n` : ''}draft: true
---

import Poem from '../../components/content/Poem.astro';

{/*
  QUAN TRỌNG: viết nội dung thơ vào biến JS bên dưới, KHÔNG viết trực tiếp
  vào thân bài markdown - Markdown sẽ diễn giải lại dấu _.._, *..*, #, danh
  sách số... làm hỏng bài thơ. Xem src/components/content/Poem.astro.
*/}

export const poemText = \`Dòng thơ thứ nhất
Dòng thơ thứ hai\`;

<Poem text={poemText} />
`;
}

const BUILDERS = { paper: buildPaper, note: buildNote, essay: buildEssay, poem: buildPoem };
const content = await BUILDERS[type]();
rl.close();

await mkdir(dir, { recursive: true });
await writeFile(filePath, content, 'utf-8');
console.log(`\nĐã tạo: ${filePath}`);
console.log(
  'Mở file lên viết tiếp. draft: true nên chưa lên production - đổi thành false khi xong.',
);
