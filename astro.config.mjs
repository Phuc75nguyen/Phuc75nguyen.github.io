// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';
import sitemap from '@astrojs/sitemap';
import expressiveCode from 'astro-expressive-code';
import tailwindcss from '@tailwindcss/vite';
import { unified } from '@astrojs/markdown-remark';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeMermaid from 'rehype-mermaid';

// Mermaid diagrams render to static SVG at build time (BLUEPRINT Muc 3.1),
// so give them a fixed dark theme matching the Lab room tokens in
// src/styles/global.css instead of the light default - there is no
// runtime CSS to react to a room/theme switch once the SVG is baked in.
const MERMAID_DARK_THEME = {
  theme: 'dark',
  themeVariables: {
    background: '#141a22', // --color-surface
    primaryColor: '#1b232d', // --color-surface-2
    primaryTextColor: '#e6eaf0', // --color-text
    primaryBorderColor: '#38bdf8', // --color-accent
    lineColor: '#9ba6b4', // --color-text-dim
    secondaryColor: '#141a22',
    tertiaryColor: '#0a0d12',
    fontFamily: 'JetBrains Mono, monospace',
  },
};

// https://astro.build/config
export default defineConfig({
  site: 'https://phuc75nguyen.github.io',
  integrations: [expressiveCode({ themes: ['github-dark'] }), mdx(), icon(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    // Astro 7 defaults to the Satteri processor; switch back to the
    // classic remark/rehype (unified) pipeline so remark-math/rehype-katex
    // and rehype-mermaid - both unified plugins - keep working.
    processor: unified({
      remarkPlugins: [remarkMath],
      rehypePlugins: [
        rehypeKatex,
        [
          rehypeMermaid,
          {
            strategy: 'inline-svg',
            colorScheme: 'dark',
            mermaidConfig: MERMAID_DARK_THEME,
            launchOptions: { args: ['--no-sandbox'] },
          },
        ],
      ],
    }),
  },
});
