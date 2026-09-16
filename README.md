# Phuc75nguyen.github.io

Blog cá nhân + thư viện phân tích paper AI/ML của Nguyễn Tấn Phúc.
Đặc tả gốc: [`BLUEPRINT.md`](./BLUEPRINT.md). Quy tắc làm việc với AI: [`CLAUDE.md`](./CLAUDE.md).

Site tĩnh, build bằng [Astro](https://astro.build), deploy tự động lên GitHub Pages qua GitHub
Actions mỗi khi push lên `main`. Không server, không database — mọi nội dung là file `.mdx` trong
`src/content/`.

## Chạy local

Cần Node.js 22+.

```bash
npm install
npm run dev        # http://localhost:4321, hot-reload khi sửa .mdx
```

Trước khi commit, tự kiểm:

```bash
npm run check       # astro check — 0 error mới coi là qua
npm run build        # build production đầy đủ, gồm cả Pagefind index
npm run preview      # xem thử bản build production tại localhost
```

`npm run build` mất lâu hơn `dev` một chút vì còn render sơ đồ Mermaid bằng Playwright/Chromium và
sinh ảnh Open Graph — lần build đầu tiên máy sẽ tự tải Chromium (`npx playwright install chromium`
nếu build báo thiếu browser).

## Thêm bài mới

```bash
npm run new -- paper "Attention Is All You Need"
npm run new -- note  "Debug 75 Spark job bị đơ trên Databricks"
npm run new -- essay "Về sự chậm rãi"
npm run new -- poem  "Chiều quê"
```

Script hỏi vài câu (domain, category, theme, thể thơ...) rồi tự sinh file `.mdx` trong đúng thư mục
`src/content/<loại>/`, tên file (slug) tự bỏ dấu tiếng Việt: `"Chiều quê"` → `chieu-que.mdx`,
`"Đường về"` → `duong-ve.mdx`.

File sinh ra luôn có `draft: true` — site sẽ **không** build bài đó ra production, nhưng vẫn xem được
khi chạy `npm run dev` ở máy mình. Viết xong, đọc lại, ưng ý thì đổi `draft: true` thành `draft: false`
rồi commit + push.

**Viết thơ cần chú ý một điều quan trọng:** không gõ trực tiếp các dòng thơ vào thân bài markdown như
văn xuôi bình thường — Markdown sẽ tự động diễn giải lại dấu `_` `*` `#` và làm hỏng cách xuống dòng.
File `poem` do `npm run new` sinh ra đã có sẵn khung đúng:

```mdx
export const poemText = `Dòng thơ thứ nhất
Dòng thơ thứ hai`;

<Poem text={poemText} />
```

Chỉ cần sửa nội dung bên trong dấu backtick (`` ` ``) — giữ nguyên định dạng này.

### Nếu không muốn dùng script

Copy một file `.mdx` có sẵn cùng loại, đổi tên file, sửa lại frontmatter theo bảng bên dưới. Astro sẽ
báo lỗi rõ ràng ngay lúc build nếu điền sai kiểu dữ liệu hay thiếu trường bắt buộc.

## Bảng frontmatter

Định nghĩa gốc: [`src/content.config.ts`](./src/content.config.ts). Mọi trường **in đậm** là bắt buộc.

### `papers` (`src/content/papers/*.mdx`)

| Trường            | Kiểu                | Ghi chú                                                                                                                                                                  |
| ----------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`title`**       | string              | Tiêu đề bài phân tích, tiếng Việt                                                                                                                                        |
| **`paperTitle`**  | string              | Tên gốc paper, tiếng Anh, giữ nguyên văn                                                                                                                                 |
| **`authors`**     | string[]            | Danh sách tác giả                                                                                                                                                        |
| `venue`           | string              | VD `"NeurIPS 2024"` — bỏ trống nếu không có                                                                                                                              |
| **`year`**        | number              | 1990–2100                                                                                                                                                                |
| `arxivId`         | string              | VD `"2401.12345"`                                                                                                                                                        |
| `doi`             | string              |                                                                                                                                                                          |
| `paperUrl`        | URL                 |                                                                                                                                                                          |
| `codeUrl`         | URL                 |                                                                                                                                                                          |
| `localPdf`        | string              | Đường dẫn trong repo `AI-Knowledge-Library`, ví dụ `"LLM VLLM OCR/ten-file.pdf"` — trang sẽ tự ghép thành link raw GitHub qua `KNOWLEDGE_LIBRARY` trong `site.config.ts` |
| **`domain`**      | enum                | `'LLM & VLM'` \| `'Computer Vision'` \| `'Agentic AI'` \| `'ML & MLOps'` \| `'OCR & Document AI'` \| `'Applied AI'` — đúng chính tả, sai là build fail                   |
| `tags`            | string[]            | mặc định `[]`                                                                                                                                                            |
| `series`          | string              | Tên chuỗi bài, nếu có                                                                                                                                                    |
| `order`           | number              | Thứ tự trong chuỗi                                                                                                                                                       |
| **`tldr`**        | string (≤280 ký tự) | 1–2 câu: paper giải quyết gì                                                                                                                                             |
| **`verdict`**     | string (≤400 ký tự) | Nhận định riêng — hiện thành khối trích dẫn cuối bài                                                                                                                     |
| **`difficulty`**  | number 1–5          | Độ khó                                                                                                                                                                   |
| **`impact`**      | number 1–5          | Mức ảnh hưởng thực tế                                                                                                                                                    |
| `status`          | enum                | `'reading'` \| `'analyzed'` \| `'applied'` — mặc định `'analyzed'`                                                                                                       |
| `relatedPapers`   | string[]            | Slug (tên file không đuôi) của paper liên quan                                                                                                                           |
| **`publishDate`** | date                | `YYYY-MM-DD`                                                                                                                                                             |
| `updatedDate`     | date                |                                                                                                                                                                          |
| `cover`           | image               | Ảnh bìa tuỳ chọn, qua `astro:assets`                                                                                                                                     |
| `featured`        | boolean             | mặc định `false` — `true` để lên trang chủ                                                                                                                               |
| `draft`           | boolean             | mặc định `false`                                                                                                                                                         |

Thân bài bắt buộc đủ 9 mục (xem `src/content/papers/_TEMPLATE.mdx`): Bối cảnh, Vấn đề, Ý tưởng cốt
lõi, Phương pháp, Thực nghiệm & kết quả, **Phản biện**, **Ứng dụng thực tế**, Liên hệ, Tài nguyên. Hai
mục in đậm bọc trong `<Callout type="critique">` / `<Callout type="application">`.

### `notes` (`src/content/notes/*.mdx`)

| Trường               | Kiểu            | Ghi chú                                                                                                  |
| -------------------- | --------------- | -------------------------------------------------------------------------------------------------------- |
| **`title`**          | string          |                                                                                                          |
| **`description`**    | string          |                                                                                                          |
| **`publishDate`**    | date            |                                                                                                          |
| `updatedDate`        | date            |                                                                                                          |
| **`category`**       | enum            | `'MLOps'` \| `'Data Engineering'` \| `'Deep Learning'` \| `'System Design'` \| `'Tooling'` \| `'Career'` |
| `tags`               | string[]        | mặc định `[]`                                                                                            |
| `series` / `order`   | string / number | Như papers                                                                                               |
| `cover`              | image           |                                                                                                          |
| `featured` / `draft` | boolean         | mặc định `false`                                                                                         |

### `essays` (`src/content/essays/*.mdx`)

| Trường            | Kiểu     | Ghi chú                                                       |
| ----------------- | -------- | ------------------------------------------------------------- |
| **`title`**       | string   |                                                               |
| `subtitle`        | string   |                                                               |
| **`publishDate`** | date     |                                                               |
| **`theme`**       | enum     | `'Chiêm nghiệm'` \| `'Văn hóa'` \| `'Sách'` \| `'Hành trình'` |
| `tags`            | string[] | mặc định `[]`                                                 |
| `mood`            | string   | Gợi ý sắc thái, chưa dùng để sinh ảnh bìa tự động             |
| `draft`           | boolean  | mặc định `false`                                              |

### `poems` (`src/content/poems/*.mdx`)

| Trường            | Kiểu    | Ghi chú                                                                                                            |
| ----------------- | ------- | ------------------------------------------------------------------------------------------------------------------ |
| **`title`**       | string  |                                                                                                                    |
| **`publishDate`** | date    |                                                                                                                    |
| **`form`**        | enum    | `'Lục bát'` \| `'Thất ngôn bát cú'` \| `'Song thất lục bát'` \| `'Tự do'` \| `'Haiku'` \| `'Ngũ ngôn'` \| `'Khác'` |
| `collection`      | string  | Tên tập thơ — các bài cùng tên sẽ nhóm chung ở `/poems`                                                            |
| `note`            | string  | Lời dẫn ngắn, hiện phía trên bài thơ                                                                               |
| `draft`           | boolean | mặc định `false`                                                                                                   |

Poems **không có** trường `tags` — không xuất hiện trong `/tags`.

## Deploy

Push lên `main` là xong — `.github/workflows/deploy.yml` tự chạy `npm ci` → `npx playwright install
chromium` → `npm run build` → deploy `dist/` lên GitHub Pages. Theo dõi tiến độ ở tab **Actions** của
repo. Site chạy ở <https://phuc75nguyen.github.io>, thường cập nhật trong 2–3 phút sau khi push.

Repo Settings → Pages → Source phải là **GitHub Actions** (không phải "Deploy from a branch").

## Cấu trúc thư mục

```
├── .github/workflows/deploy.yml   # CI/CD — build + deploy lên GitHub Pages
├── .husky/pre-commit              # chạy lint-staged (prettier) + astro check trước mỗi commit
├── scripts/new.mjs                # npm run new -- scaffold bài mới
├── public/
│   ├── favicon.svg
│   └── fonts/                     # font self-host .woff2 (Be Vietnam Pro, Source Serif 4, JetBrains Mono)
└── src/
    ├── site.config.ts             # ⭐ MỌI THÔNG TIN CÁ NHÂN — tên, nav, social, Knowledge Library
    ├── content.config.ts          # Zod schema cho 4 collection — hợp đồng frontmatter
    ├── assets/og-fonts/           # TTF chỉ dùng lúc build để sinh ảnh OG (satori không đọc woff2)
    ├── content/
    │   ├── papers/                 # → /papers/[slug]
    │   ├── notes/                  # → /notes/[slug]
    │   ├── essays/                 # → /essays/[slug] (chế độ "Hiên")
    │   └── poems/                  # → /poems/[slug]  (chế độ "Hiên")
    ├── components/
    │   ├── layout/    Sidebar, Header, Footer, MobileDrawer
    │   ├── ui/         Card, Chip, Tag, Badge, DotRating — nguyên liệu dùng chung mọi trang
    │   ├── content/    PaperMeta, Callout, Figure, Poem, TableOfContents, ReadingProgress, SeriesNav
    │   └── home/       Hero, StatStrip, FeaturedGrid, RecentList
    ├── layouts/
    │   ├── BaseLayout.astro         # <html>, SEO, sidebar, theme + fade-up bootstrap
    │   ├── PaperLayout.astro
    │   ├── ArticleLayout.astro      # dùng cho notes
    │   ├── EssayLayout.astro        # chế độ Hiên
    │   └── PoemLayout.astro         # chế độ Hiên, giữ nguyên xuống dòng
    ├── pages/                       # mỗi file = 1 route, xem astro.build/en/basics/astro-pages
    ├── lib/
    │   ├── collections.ts           # query/sort/lọc draft dùng chung
    │   ├── slugify.ts               # bỏ dấu tiếng Việt cho URL
    │   ├── reading-time.ts
    │   ├── poem-preview.ts          # trích 2 dòng đầu cho lưới /poems
    │   ├── og.ts                    # sinh ảnh Open Graph (satori + sharp)
    │   └── json-ld.ts               # schema.org (ScholarlyArticle/BlogPosting/Person)
    └── styles/
        ├── global.css               # @theme tokens — MỌI màu/font đều khai báo ở đây
        ├── fonts.css                 # @font-face
        └── prose.css                 # typography cho nội dung dài
```

## Hệ thống thiết kế — "hai căn phòng, một mái nhà"

Một bộ component duy nhất, đổi giao diện qua 2 thuộc tính độc lập trên thẻ `<html>`:

- `data-room="lab"` (mặc định, papers/notes) hoặc `data-room="hien"` (essays/poems) — đổi màu accent
  và font.
- `data-theme="light"` (tuỳ chọn, bật qua nút trong sidebar, nhớ qua `localStorage`) — mặc định là tối.

Muốn đổi màu/font: sửa token trong `src/styles/global.css`, **không** sửa component. Nếu một thay đổi
giao diện buộc phải sửa component thay vì chỉ sửa token — dừng lại, đó là dấu hiệu thiết kế token chưa
đủ, không phải việc cần "vá" trong component.

## Khi gặp lỗi build

Zod báo lỗi ngay tên trường + file nếu frontmatter sai kiểu hoặc sai enum — đọc thông báo lỗi, thường
đủ rõ để tự sửa. `npx astro check` báo lỗi TypeScript trong component.
