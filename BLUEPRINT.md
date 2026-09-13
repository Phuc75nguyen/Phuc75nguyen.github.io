 BLUEPRINT — Personal Blog & AI Knowledge Library

> **Tài liệu kỹ thuật chính thức của dự án.**
> Đây là nguồn chân lý duy nhất (single source of truth). Mọi quyết định code phải truy vết được về một mục trong tài liệu này. Nếu một yêu cầu không có trong đây → **hỏi lại, không tự bịa.**

- **Chủ sở hữu:** Nguyễn Tấn Phúc (`@Phuc75nguyen`) — Data Scientist / MLOps Engineer
- **Phiên bản:** 1.0
- **Ngày:** 2026-09-12
- **Repo đích:** `Phuc75nguyen.github.io`
- **URL production:** `https://phuc75nguyen.github.io`

---

## 0. TL;DR cho Claude Code

Xây một static site bằng **Astro 5 + TypeScript + Tailwind CSS 4**, deploy lên GitHub Pages qua GitHub Actions. Site có **4 loại nội dung** (papers / notes / essays / poems) và **2 "chế độ" thị giác** (Lab — kỹ thuật, tối, lạnh; Hiên — văn chương, ấm, serif). Toàn bộ nội dung là file Markdown/MDX trong `src/content/`. Toàn bộ thông tin cá nhân nằm trong **một file** `src/site.config.ts`.

Làm theo đúng thứ tự 7 phase ở **Mục 10**. Mỗi phase phải pass **Acceptance Criteria** trước khi sang phase sau. Không nhảy cóc. Không tự thêm dependency.

---

## 1. Bối cảnh & Mục tiêu

### 1.1 Người viết là ai

Phúc làm Data Scientist / MLOps tại một ngân hàng, xây feature store trên Databricks, serve model ra production. Đã có repo `AI-Knowledge-Library` chứa paper AI/ML phân theo domain (Agentic AI, Computer Vision, LLM/VLLM/OCR, ML & MLOps, AI Application, Uni Thesis). Ngoài ra còn sáng tác **thơ Việt Nam** và viết về **văn hóa, chiêm nghiệm lẽ sống**.

### 1.2 Site này phải làm được 4 việc

| # | Mục tiêu | Đo bằng gì |
|---|----------|-----------|
| **G1** | **Thư viện phân tích paper** — mỗi paper là một bài mổ xẻ sâu, không phải bản tóm tắt | Có template phân tích bắt buộc, có phần "Phản biện" và "Ứng dụng thực tế" |
| **G2** | **Showcase cho nhà tuyển dụng** — chứng minh chiều sâu tư duy, không chỉ chiều rộng repo | Trang chủ + `/about` dẫn được vào 3 bài phân tích tốt nhất trong 2 cú click |
| **G3** | **Không gian cá nhân** — thơ, văn hóa, chiêm nghiệm sống chung một mái nhà nhưng không lấn nhau | Có 2 chế độ thị giác tách bạch (Mục 5) |
| **G4** | **Tự tay maintain được** — thêm bài mới chỉ cần viết Markdown, không đụng code | Thêm 1 bài = tạo 1 file `.mdx` + `git push`. Hết. |

### 1.3 Ràng buộc bất di bất dịch

- **Miễn phí, host trên GitHub Pages.** Không server, không database, không backend.
- **Không vendor lock-in.** Nội dung là Markdown thuần — bỏ Astro lúc nào cũng mang bài đi được.
- **Tiếng Việt là ngôn ngữ chính.** Font, typography, dấu tiếng Việt phải chuẩn. Thuật ngữ kỹ thuật giữ tiếng Anh.
- **Phúc phải hiểu được 100% codebase.** Không magic, không abstraction thừa.

---

## 2. Ba nguồn cảm hứng — lấy gì, bỏ gì

Đây là mục quan trọng nhất để **tránh code lung tung**. Ta không clone bất kỳ repo nào — ta chắt lọc.

### 2.1 `tiepvupsu.github.io` → machinelearningcoban.com (Jekyll)

**Lấy:**
- **Triết lý nội dung:** bài dài, đi sâu, có toán, có code, có hình — không "listicle".
- **Series đánh số** (thầy có chuỗi 37+ bài). Ta dùng làm `series` cho chuỗi paper cùng chủ đề.
- **Sidebar hữu ích:** Latest posts, sách/khoá học gợi ý, tài nguyên liên quan.
- **Nav phân loại đa chiều:** Index / Tags / Categories / Archive / Math / Search.
- **Render LaTeX nghiêm túc** — bắt buộc, vì paper AI không có công thức thì vô nghĩa.
- **Trang `/math`** — bảng ký hiệu toán dùng chung toàn site. Ý này rất hay, giữ lại.

**Bỏ:**
- Stack Jekyll/Ruby (Gemfile, bundler, plugin Ruby). Nặng khi setup local, chậm khi build lớn.
- Giao diện sáng, mật độ chữ dày đặc, cảm giác 2016.

### 2.2 `codewithsadee/vcard-personal-portfolio` (HTML/CSS/JS thuần, 8.1k★)

**Lấy (thuần về hình):**
- **Sidebar card trái sticky:** avatar, tên, chức danh, "Show contacts" xổ ra email/location/social. Đây chính là "đầy đủ thông tin trên sidebar" mà Phúc muốn.
- **Card có viền hairline + nền nâng (elevated surface)** trên nền tối → cảm giác hi-tech.
- **Filter chips** cho danh mục (All / Web design / Applications…) → ta dùng để lọc paper theo domain.
- **Icon gradient trong box bo góc**, section heading có gạch chân accent ngắn.
- **Bố cục lưới card** cho portfolio/blog.

**Bỏ (tuyệt đối):**
- **Toàn bộ kiến trúc.** Nó là **single-page HTML thuần** — 1 file `index.html` chứa mọi thứ, chuyển "trang" bằng JS ẩn/hiện `<article>`. Không có routing thật, không SEO từng bài, không scale nổi khi có 100+ bài. **Không được bắt chước điểm này.**
- Skill progress bar (80%, 90%) — sến và vô nghĩa với engineer thật.
- Testimonial giả, Google Maps nhúng, form liên hệ không backend.
- Màu cam-vàng mặc định của nó.

### 2.3 Ý tưởng gốc của Phúc → phần cốt lõi

- Thư viện paper có phân tích chuyên sâu, public cho cộng đồng.
- Mảng thơ / văn hóa / chiêm nghiệm cập nhật thường xuyên.
- Giao diện hiện đại, hi-tech, sidebar đầy đủ thông tin.

### 2.4 Công thức tổng hợp

```
Chiều sâu nội dung & series của thầy Tiệp
  + Ngôn ngữ thị giác (sidebar card, dark hi-tech, filter chips) của vCard
  + Thư viện paper có phản biện + mảng văn chương của Phúc
  + Kiến trúc Astro content-collection (thứ cả hai repo kia đều không có)
  ─────────────────────────────────────────────────────────────
  = Một "digital garden" kỹ thuật, đẹp như portfolio, viết như blog học thuật
```

---

## 3. Kiến trúc & Tech Stack

### 3.1 Chốt stack

| Hạng mục | Lựa chọn | Lý do (không được đổi nếu không hỏi) |
|---|---|---|
| Framework | **Astro 5.x** | Markdown-first như Jekyll nhưng hiện đại; zero-JS mặc định → Lighthouse 100; Content Collections type-safe |
| Ngôn ngữ | **TypeScript** (strict) | Bắt lỗi frontmatter ngay lúc build |
| CSS | **Tailwind CSS 4** (`@tailwindcss/vite`) | Sửa giao diện ngay trong markup, không phải nhảy file CSS |
| Nội dung | **MDX** (`@astrojs/mdx`) | Markdown + chèn được component (biểu đồ, callout, so sánh) |
| Toán | **remark-math + rehype-katex** | KaTeX render lúc build → không tốn JS runtime, nhanh hơn MathJax của thầy |
| Code block | **Expressive Code** (`astro-expressive-code`) | Highlight, line numbers, tiêu đề file, diff, copy button — sẵn |
| Search | **Pagefind** | Full-text search tĩnh, chạy hoàn toàn client, không cần API/Algolia |
| Icon | **astro-icon** + bộ `lucide` | Icon dạng SVG inline, không tải icon font |
| Sơ đồ | **Mermaid** (render lúc build qua rehype plugin) | Vẽ kiến trúc model/pipeline bằng text |
| Hình ảnh | **`astro:assets`** (built-in) | Tự resize + WebP + lazy |
| Ảnh OG | **satori + sharp** | Sinh ảnh social preview lúc build, không cần dịch vụ ngoài |
| Sitemap | **`@astrojs/sitemap`** | Chuẩn chính thức |
| Deploy | **GitHub Actions → GitHub Pages** | Chuẩn, miễn phí, tự động |
| Dev tooling | **prettier + prettier-plugin-astro + husky + lint-staged** | Định dạng nhất quán, chặn commit lỗi |

> **Quy tắc dependency:** Ngoài danh sách trên, **không được cài thêm package nào** mà không nêu lý do và chờ Phúc duyệt. Mỗi package thừa là một khoản nợ bảo trì.

### 3.2 Vì sao Astro chứ không phải Jekyll (như thầy) hay HTML thuần (như vCard)

- So với **Jekyll**: không cần Ruby/bundler; build nhanh hơn nhiều lần; frontmatter được **validate bằng Zod** — gõ sai `domain: "Compter Vision"` là build fail ngay với thông báo rõ ràng, thay vì âm thầm render sai.
- So với **HTML thuần**: có routing thật (mỗi bài một URL riêng → SEO, chia sẻ link được), có layout tái sử dụng, có pagination/tag/series tự sinh.
- Workflow viết bài thì **giống hệt Jekyll**: tạo file `.mdx`, viết frontmatter, viết Markdown, `git push`. Phúc không phải học gì mới để viết.

### 3.3 Chiến lược repo — QUAN TRỌNG

**Hai repo tách biệt:**

| Repo | Vai trò | Ghi chú |
|---|---|---|
| `Phuc75nguyen.github.io` | **Website** — code + bài viết (`.mdx`) + ảnh nhẹ | Repo mới, tạo ở Phase 0 |
| `AI-Knowledge-Library` | **Kho lưu trữ** — file PDF gốc, tài liệu thô | Giữ nguyên như hiện tại |

**Lý do:** PDF paper rất nặng, nhét vào repo website sẽ làm git history phình to và build chậm dần theo thời gian. Website **deep-link** sang PDF trên `AI-Knowledge-Library` qua URL raw GitHub.

Trong `site.config.ts`:
```ts
export const KNOWLEDGE_LIBRARY = {
  repo: 'https://github.com/Phuc75nguyen/AI-Knowledge-Library',
  raw:  'https://raw.githubusercontent.com/Phuc75nguyen/AI-Knowledge-Library/main',
}
```
Frontmatter của paper chỉ cần: `localPdf: "Computer Vision/yolov9.pdf"` → helper tự ghép thành link đầy đủ.

> Không dùng git submodule ở v1. Phức tạp, dễ hỏng, lợi ích không đáng.

### 3.4 Cấu trúc thư mục (Claude Code phải tạo đúng cấu trúc này)

```
Phuc75nguyen.github.io/
├── .github/workflows/deploy.yml      # CI/CD
├── astro.config.mjs
├── tsconfig.json
├── package.json
├── CLAUDE.md                          # Quy tắc cho AI (file riêng)
├── README.md
├── public/
│   ├── favicon.svg
│   ├── og-default.png
│   └── fonts/                         # font self-host (.woff2)
├── scripts/
│   └── new.mjs                        # scaffold bài mới: npm run new
└── src/
    ├── site.config.ts                 # ⭐ MỌI THÔNG TIN CÁ NHÂN Ở ĐÂY
    ├── content.config.ts              # Zod schema cho 4 collection
    ├── content/
    │   ├── papers/                    # phân tích paper  → /papers/[slug]
    │   ├── notes/                     # ghi chép kỹ thuật → /notes/[slug]
    │   ├── essays/                    # chiêm nghiệm, văn hóa → /essays/[slug]
    │   └── poems/                     # thơ → /poems/[slug]
    ├── components/
    │   ├── layout/   Sidebar.astro  Header.astro  Footer.astro  MobileDrawer.astro
    │   ├── ui/       Card.astro  Chip.astro  Tag.astro  Badge.astro  Prose.astro
    │   ├── content/  PaperMeta.astro  Callout.astro  Figure.astro  SeriesNav.astro
    │   │             TableOfContents.astro  ReadingProgress.astro
    │   └── home/     Hero.astro  FeaturedGrid.astro  RecentList.astro  StatStrip.astro
    ├── layouts/
    │   ├── BaseLayout.astro           # <html>, head, SEO, sidebar shell
    │   ├── PaperLayout.astro
    │   ├── ArticleLayout.astro        # dùng cho notes
    │   ├── EssayLayout.astro          # chế độ Hiên
    │   └── PoemLayout.astro           # typography riêng cho thơ
    ├── pages/
    │   ├── index.astro
    │   ├── papers/index.astro  papers/[...slug].astro
    │   ├── notes/index.astro   notes/[...slug].astro
    │   ├── essays/index.astro  essays/[...slug].astro
    │   ├── poems/index.astro   poems/[...slug].astro
    │   ├── series/[series].astro
    │   ├── tags/index.astro    tags/[tag].astro
    │   ├── archive.astro
    │   ├── math.astro                 # bảng ký hiệu toán (mượn ý thầy Tiệp)
    │   ├── about.astro
    │   ├── search.astro
    │   ├── 404.astro
    │   └── rss.xml.ts
    ├── lib/
    │   ├── collections.ts             # query + sort + filter dùng chung
    │   ├── reading-time.ts
    │   └── og.ts                      # sinh ảnh Open Graph
    └── styles/
        ├── global.css                 # @theme tokens của Tailwind 4
        └── prose.css                  # typography cho nội dung dài
```

---

## 4. Mô hình nội dung (Content Model)

Đây là **trái tim** của dự án. Định nghĩa trong `src/content.config.ts` bằng Zod.

### 4.1 Collection `papers` — Thư viện phân tích paper ⭐

```ts
const papers = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/papers' }),
  schema: ({ image }) => z.object({
    // — Định danh —
    title:      z.string(),                       // tiêu đề bài phân tích (tiếng Việt)
    paperTitle: z.string(),                       // tên gốc của paper (tiếng Anh)
    authors:    z.array(z.string()),
    venue:      z.string().optional(),            // NeurIPS 2024, arXiv, ICLR...
    year:       z.number().int().min(1990).max(2100),
    arxivId:    z.string().optional(),            // "2401.12345"
    doi:        z.string().optional(),
    paperUrl:   z.string().url().optional(),
    codeUrl:    z.string().url().optional(),
    localPdf:   z.string().optional(),            // đường dẫn trong AI-Knowledge-Library

    // — Phân loại —
    domain: z.enum([
      'LLM & VLM', 'Computer Vision', 'Agentic AI',
      'ML & MLOps', 'OCR & Document AI', 'Applied AI',
    ]),
    tags:   z.array(z.string()).default([]),
    series: z.string().optional(),
    order:  z.number().optional(),                // thứ tự trong series

    // — Đánh giá của Phúc (đây là thứ tạo ra giá trị) —
    tldr:       z.string().max(280),              // 1–2 câu: paper này giải quyết gì
    verdict:    z.string().max(400),              // nhận định riêng: đáng đọc không, vì sao
    difficulty: z.number().int().min(1).max(5),   // 1 dễ → 5 rất khó
    impact:     z.number().int().min(1).max(5),   // mức ảnh hưởng thực tế
    status:     z.enum(['reading', 'analyzed', 'applied']).default('analyzed'),
    relatedPapers: z.array(z.string()).default([]), // slug của paper liên quan

    // — Metadata —
    publishDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    cover:       image().optional(),
    featured:    z.boolean().default(false),
    draft:       z.boolean().default(false),
  }),
})
```

**Cấu trúc bài phân tích bắt buộc** (tạo thành file `src/content/papers/_TEMPLATE.mdx`):

| # | Section | Nội dung |
|---|---------|----------|
| 1 | **Bối cảnh** | Trước paper này, người ta làm thế nào? Nghẽn ở đâu? |
| 2 | **Vấn đề** | Phát biểu bài toán, nêu rõ giả thiết |
| 3 | **Ý tưởng cốt lõi** | Giải thích trong 3 câu, không công thức. Nếu không làm được → chưa hiểu paper |
| 4 | **Phương pháp** | Kiến trúc, công thức (KaTeX), sơ đồ (Mermaid), pseudo-code |
| 5 | **Thực nghiệm & kết quả** | Bảng số liệu chính, ablation quan trọng |
| 6 | **Phản biện** ⭐ | Điểm yếu, giả định đáng ngờ, thứ paper cố tình không nói. **Bắt buộc, không được bỏ trống.** |
| 7 | **Ứng dụng thực tế** ⭐ | Áp dụng vào hệ thống production được không? Chi phí? Rào cản? Ở quy mô doanh nghiệp thì sao? |
| 8 | **Liên hệ** | Nối với các paper khác qua `relatedPapers` |
| 9 | **Tài nguyên** | Link paper gốc, code, PDF local, bài blog liên quan |

> Mục 6 và 7 là thứ khiến trang này khác mọi blog "tóm tắt paper" khác, và là thứ nhà tuyển dụng thực sự đọc. Layout phải làm nổi bật hai mục này bằng khối màu riêng.

### 4.2 Collection `notes` — Ghi chép kỹ thuật

```ts
{
  title, description,
  publishDate, updatedDate?,
  category: z.enum(['MLOps', 'Data Engineering', 'Deep Learning',
                    'System Design', 'Tooling', 'Career']),
  tags: string[], series?, order?,
  cover?, featured: boolean, draft: boolean,
}
```
Dành cho: kinh nghiệm production, debug story, so sánh công cụ, hướng dẫn.

### 4.3 Collection `essays` — Chiêm nghiệm & Văn hóa

```ts
{
  title, subtitle?, publishDate,
  theme: z.enum(['Chiêm nghiệm', 'Văn hóa', 'Sách', 'Hành trình']),
  tags: string[], mood?: string,   // gợi ý sắc thái cho ảnh bìa
  draft: boolean,
}
```

### 4.4 Collection `poems` — Thơ

```ts
{
  title, publishDate,
  form: z.enum(['Lục bát', 'Thất ngôn bát cú', 'Song thất lục bát',
                'Tự do', 'Haiku', 'Ngũ ngôn', 'Khác']),
  collection?: string,     // tên tập thơ
  note?: string,           // lời dẫn ngắn
  draft: boolean,
}
```

**Yêu cầu riêng cho thơ (đừng xem nhẹ):**
- Xuống dòng phải **giữ nguyên tuyệt đối** — mỗi dòng thơ là một dòng, không được reflow. Dùng `white-space: pre-wrap` trong `PoemLayout`.
- Căn giữa khối thơ, căn trái nội bộ từng dòng.
- Font serif, `line-height: 2`, cỡ chữ lớn hơn bài thường (~1.15rem).
- Không hiện "reading time", không hiện TOC — phá vỡ không khí.
- Thẻ `form` hiển thị như một badge nhã nhặn, không phải chip công nghệ.

---

## 5. Hệ thống thiết kế — "Hai căn phòng, một mái nhà"

Đây là **ý tưởng sáng tạo trung tâm**, giải bài toán khó nhất: làm sao paper AI và thơ lục bát cùng sống trên một site mà không lạc quẻ.

**Giải pháp:** một identity thống nhất (layout, sidebar, nav, spacing y hệt nhau), nhưng **đổi accent + typography theo khu vực**. Người đọc cảm nhận được sự chuyển phòng mà không thấy như đổi website.

| | 🔬 **LAB** (`/papers`, `/notes`) | 🌿 **HIÊN** (`/essays`, `/poems`) |
|---|---|---|
| Nền | `#0A0D12` | `#12100E` (ám nâu ấm) |
| Surface | `#141A22` | `#1C1815` |
| Accent | `#38BDF8` → `#22D3EE` (cyan) | `#E0A458` → `#C97B5A` (hổ phách) |
| Chữ thân bài | Sans (Inter / Be Vietnam Pro) | Serif (Source Serif 4 / Lora) |
| Metadata | JetBrains Mono, uppercase, letter-spacing | Không mono, viết thường, nhẹ nhàng |
| Mật độ | Chặt, nhiều thông tin | Thoáng, `max-width` hẹp hơn (62ch) |
| Chi tiết | Viền hairline, badge, số liệu | Không viền, phân cách bằng khoảng trắng |

Thực hiện bằng CSS custom properties: `<body data-room="lab">` / `data-room="hien">`, tokens khai báo trong `@theme` của Tailwind 4 và override theo attribute. **Không được tạo hai bộ component riêng** — chỉ một bộ, đổi token.

### 5.1 Token nền tảng (`src/styles/global.css`)

```css
@theme {
  --color-bg:        #0A0D12;
  --color-surface:   #141A22;
  --color-surface-2: #1B232D;
  --color-border:    rgb(255 255 255 / 0.08);
  --color-text:      #E6EAF0;
  --color-text-dim:  #9BA6B4;
  --color-accent:    #38BDF8;
  --color-accent-2:  #22D3EE;

  --font-sans:  'Be Vietnam Pro', system-ui, sans-serif;
  --font-serif: 'Source Serif 4', Georgia, serif;
  --font-mono:  'JetBrains Mono', monospace;

  --radius-card: 14px;
}
[data-room='hien'] {
  --color-bg: #12100E;  --color-surface: #1C1815;
  --color-accent: #E0A458; --color-accent-2: #C97B5A;
}
```

### 5.2 Typography

- **Font bắt buộc self-host** trong `public/fonts/` (`.woff2`, `font-display: swap`). Không gọi Google Fonts CDN → nhanh hơn, riêng tư hơn, không phụ thuộc mạng ngoài.
- **Bắt buộc kiểm tra dấu tiếng Việt.** Be Vietnam Pro và Source Serif 4 đều hỗ trợ đầy đủ. Test bằng chuỗi: `Ữ Ự Ỡ Ỵ ế ộ ằ ữ ỹ đ Đ` — không được thấy ô vuông hay dấu bị lệch.
- Thang cỡ chữ: `12 / 14 / 16 / 18 / 20 / 24 / 30 / 38 / 48px`. Không dùng cỡ ngoài thang.
- Thân bài: `--max-w-prose: 68ch` (Lab) / `62ch` (Hiên).

### 5.3 Sidebar — "đầy đủ thông tin" (yêu cầu #1 của Phúc)

Cột trái, rộng `280px`, `position: sticky`, tự cuộn. Từ trên xuống:

1. **Profile card**: avatar bo tròn (ảnh từ GitHub), tên `NGUYỄN TẤN PHÚC`, chức danh `Data Scientist · MLOps Engineer`, một dòng tagline.
2. **Nút "Thông tin liên hệ"** — bấm xổ ra (accordion, mượn ý vCard): email, vị trí, GitHub, LinkedIn, Facebook.
3. **Điều hướng chính**: Trang chủ · Papers · Notes · Essays · Thơ · About. Mục đang active có thanh accent bên trái.
4. **Chỉ số động**: số paper đã phân tích, số bài viết, ngày cập nhật gần nhất — **tính lúc build từ content collection**, không hardcode.
5. **Bài mới nhất**: 3 bài gần đây (ý từ sidebar của thầy Tiệp).
6. **Tag nổi bật**: 8 tag dùng nhiều nhất.
7. **Footer sidebar**: nút chuyển sáng/tối, RSS, link source repo.

**Responsive:** `< 1024px` sidebar biến thành drawer trượt từ trái, mở bằng nút hamburger ở header, đóng bằng `Esc` / click overlay. Trên mobile **không được** để sidebar chiếm chỗ nội dung.

### 5.4 Chuyển động

Tiết chế. Chỉ dùng: fade-up 12px khi vào viewport (`IntersectionObserver`, chỉ một lần), hover nâng card 2px, thanh tiến độ đọc ở đầu trang bài viết. **Bắt buộc tôn trọng `prefers-reduced-motion: reduce` → tắt sạch.** Không parallax, không particle, không cursor tùy biến, không typing effect.

---

## 6. Đặc tả từng trang

### 6.1 `/` — Trang chủ
- **Hero:** tên + một câu định vị (VD: *"Tôi đọc paper, dựng hệ thống, và thỉnh thoảng làm thơ."*) + 2 nút: `Vào thư viện Papers` / `Đọc chiêm nghiệm`.
- **Stat strip:** `N papers phân tích` · `N notes` · `N essays` · `N bài thơ` (tính lúc build).
- **Featured Papers:** 3 card `featured: true`, hiện `domain`, `year`, `tldr`, `difficulty` (chấm tròn).
- **Gần đây:** 5 mục mới nhất trộn từ cả 4 collection, mỗi mục có nhãn loại.
- **Hai lối vào:** hai khối lớn — *Lab* (cyan) và *Hiên* (hổ phách) — nói rõ bên trong có gì.

### 6.2 `/papers` — Thư viện ⭐ (trang quan trọng nhất)
- Header: tiêu đề + 1 đoạn nói rõ triết lý ("mỗi bài là một lần mổ xẻ, kèm phản biện và đánh giá khả năng ứng dụng").
- **Thanh lọc**: chips theo `domain` (All + 6 domain) — lọc client-side, cập nhật URL query `?domain=...` để chia sẻ được link.
- **Sắp xếp**: Mới nhất / Năm paper / Độ khó / Mức ảnh hưởng.
- **Card paper** hiển thị: cover (hoặc pattern sinh từ domain), `paperTitle` + `venue year`, tiêu đề phân tích, `tldr`, chip domain, `difficulty` (5 chấm), badge `status`.
- **Chế độ xem bảng** (toggle) — dày đặc dữ liệu, rất "engineer": cột Paper · Domain · Year · Difficulty · Impact · Status.
- Có `<noscript>` fallback: hiện toàn bộ danh sách không lọc.

### 6.3 `/papers/[slug]` — Trang phân tích
- Khối metadata trên cùng (component `PaperMeta`): authors, venue/year, và các nút `arXiv` · `Code` · `PDF (local)`.
- **TOC dính bên phải** (desktop ≥1280px), highlight mục đang đọc.
- Thanh tiến độ đọc ở mép trên.
- **Khối "Phản biện"** — nền `--color-surface-2`, viền trái accent, icon cảnh báo.
- **Khối "Ứng dụng thực tế"** — nền khác biệt, icon bánh răng.
- Cuối bài: `verdict` trong khối trích dẫn lớn + danh sách paper liên quan + điều hướng series (nếu có) + prev/next.

### 6.4 `/notes`, `/essays`, `/poems`
- `/notes`: danh sách + lọc theo `category`, phân trang 12/trang.
- `/essays`: `data-room="hien"`. Danh sách dạng dòng thoáng: tiêu đề serif lớn, phụ đề, ngày. Không card, không thumbnail.
- `/poems`: `data-room="hien"`. Lưới 2 cột, mỗi ô hiện tiêu đề + 2 dòng thơ đầu + `form`. Có thể nhóm theo `collection`.

### 6.5 Trang phụ
- `/series/[series]`: các bài trong series, đánh số, có thanh tiến độ đọc chuỗi.
- `/tags` và `/tags/[tag]`: tag cloud cỡ chữ theo tần suất.
- `/archive`: toàn bộ nội dung nhóm theo năm → tháng, dạng danh sách gọn.
- `/math`: bảng ký hiệu toán dùng chung ($\mathbf{x}$ vector, $\mathbf{X}$ ma trận, $\mathcal{L}$ loss…). Mọi paper đều trỏ về đây → viết một lần, dùng mãi.
- `/about`: tiểu sử, hành trình nghề, mảng quan tâm, link GitHub/LinkedIn, dẫn tới 3 bài tâm đắc nhất. **Đây là trang nhà tuyển dụng đọc — viết cẩn thận.**
- `/search`: Pagefind UI, lọc được theo loại nội dung.
- `/404`: ngắn, có lối quay về, giữ đúng tông.
- `/rss.xml`: gộp cả 4 collection, có `<category>` phân biệt.

---

## 7. SEO, hiệu năng, khả năng truy cập

**SEO**
- Mỗi trang: `<title>`, `meta description`, canonical, Open Graph, Twitter Card.
- **Ảnh OG sinh tự động** lúc build bằng `satori` + `sharp`: nền tối, tiêu đề bài, nhãn domain, tên tác giả.
- JSON-LD: `ScholarlyArticle` cho papers, `BlogPosting` cho notes/essays, `Person` cho `/about`.
- `sitemap.xml` qua `@astrojs/sitemap`.
- `lang="vi"` trên `<html>`.

**Hiệu năng (Definition of Done)**
- Lighthouse ≥ **95** cả 4 hạng mục trên mobile.
- JS gửi xuống trang bài viết ≤ **30KB** (chỉ TOC + progress bar + theme toggle).
- LCP < 2.0s, CLS < 0.05.
- Ảnh qua `astro:assets`, có `width`/`height`, lazy trừ ảnh hero.

**Accessibility**
- Tương phản ≥ 4.5:1 cho chữ thường (kiểm tra cả hai "phòng").
- Điều hướng được hoàn toàn bằng bàn phím, focus ring nhìn rõ.
- Có link "Bỏ qua, vào nội dung chính".
- Mọi ảnh có `alt`; icon trang trí `aria-hidden="true"`.
- Tôn trọng `prefers-reduced-motion`.

---

## 8. Trải nghiệm bảo trì (yêu cầu #4 của Phúc — đối xử như một tính năng)

### 8.1 Quy tắc vàng
> **Mọi thay đổi nội dung = sửa Markdown hoặc `site.config.ts`. Không bao giờ phải sửa component.**

### 8.2 `src/site.config.ts` chứa tất cả
Tên, chức danh, tagline, avatar, email, social links, nav items, số bài mỗi trang, config Knowledge Library, mặc định SEO. Component **import từ đây**, tuyệt đối không hardcode chuỗi.

### 8.3 Script scaffold
```bash
npm run new -- paper "YOLOv9: Programmable Gradient Information"
npm run new -- note  "Debug 75 Spark job bị đơ trên Databricks"
npm run new -- essay "Về sự chậm rãi"
npm run new -- poem  "Chiều quê"
```
Script `scripts/new.mjs` hỏi vài câu (domain, year, tags…) rồi sinh file `.mdx` với frontmatter đầy đủ và khung section bắt buộc. Slug tự sinh từ tiêu đề, **bỏ dấu tiếng Việt đúng cách** (`Chiều quê` → `chieu-que`, không phải `chia-u-qua-`).

### 8.4 Bảo vệ khỏi lỗi
- Zod schema → gõ sai frontmatter là build fail với thông báo tiếng người.
- `draft: true` → không build ra production, nhưng vẫn xem được ở local.
- Pre-commit (husky + lint-staged): prettier + `astro check`. Nhẹ thôi, đừng làm phiền.
- `npm run dev` phải hot-reload khi sửa `.mdx`.

### 8.5 Tài liệu
`README.md` phải có: cách chạy local, cách thêm từng loại bài, bảng giải thích mọi trường frontmatter, cách deploy, và **sơ đồ cấu trúc thư mục kèm chú thích từng folder làm gì**.

---

## 9. Deploy

`.github/workflows/deploy.yml`:
```yaml
name: Deploy to GitHub Pages
on:
  push: { branches: [main] }
  workflow_dispatch:
permissions: { contents: read, pages: write, id-token: write }
concurrency: { group: pages, cancel-in-progress: false }
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run build          # build + npx pagefind
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./dist }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: { name: github-pages, url: '${{ steps.deployment.outputs.page_url }}' }
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

`astro.config.mjs`: `site: 'https://phuc75nguyen.github.io'`, **không cần `base`** vì đây là repo `<username>.github.io` (site phục vụ ở gốc domain).

Trong Settings → Pages của repo: **Source = GitHub Actions** (không phải "Deploy from a branch").

Sau này muốn domain riêng: thêm file `public/CNAME` + trỏ DNS. Chưa làm ở v1.

---

## 10. Kế hoạch triển khai — 7 Phase

> **Luật:** làm tuần tự. Hết mỗi phase → `git commit` với message rõ ràng → báo cáo → chờ Phúc xác nhận rồi mới sang phase tiếp. Không gộp phase.

### Phase 0 — Nền móng & đường ống deploy
Khởi tạo Astro + TS + Tailwind 4 + MDX; `astro.config.mjs`; `site.config.ts` bản đầu; GitHub Actions; một trang `index.astro` tối giản.

✅ **Xong khi:** `npm run dev` chạy được; push lên `main` → `https://phuc75nguyen.github.io` hiện trang thật trong vòng 3 phút.

> *Mục tiêu tâm lý: có site sống ngay ngày đầu.*

### Phase 1 — Design system & khung layout
Tokens trong `global.css`; self-host font + kiểm tra dấu tiếng Việt; `BaseLayout`; `Sidebar` đủ 7 khối; `MobileDrawer`; `Footer`; cơ chế `data-room`; các component UI cơ bản (`Card`, `Chip`, `Tag`, `Badge`).

✅ **Xong khi:** sidebar hiển thị đúng ở 1440 / 1024 / 768 / 375px; chuyển giữa `data-room="lab"` và `"hien"` thấy rõ khác biệt; điều hướng bằng bàn phím trọn vẹn; tương phản đạt AA.

### Phase 2 — Content collections & Thư viện Papers ⭐
`content.config.ts` đủ 4 schema; `_TEMPLATE.mdx`; KaTeX + Expressive Code + Mermaid; `/papers` (lọc + sắp xếp + toggle bảng); `/papers/[slug]` + `PaperMeta` + TOC + khối Phản biện/Ứng dụng; **viết đầy đủ 2 bài phân tích mẫu thật** từ `AI-Knowledge-Library`.

✅ **Xong khi:** công thức LaTeX render đúng; lọc domain cập nhật URL và chia sẻ link được; 2 bài mẫu đọc trên mobile thoải mái; build fail nếu cố tình gõ sai frontmatter.

### Phase 3 — Notes, series, tags, archive
`/notes` + chi tiết; `/series/[series]` + `SeriesNav`; `/tags` + `/tags/[tag]`; `/archive`; phân trang; `/math`.

✅ **Xong khi:** một bài thuộc series hiện đúng "Bài 2/5" và điều hướng được; mọi tag đều có trang riêng và không tag nào 404.

### Phase 4 — Hiên: Essays & Thơ
`/essays` + `EssayLayout`; `/poems` + `PoemLayout` (giữ nguyên xuống dòng!); chuyển `data-room` mượt; viết 1 essay mẫu + 2 bài thơ mẫu (Phúc cấp nội dung, hoặc dùng placeholder ghi rõ là placeholder).

✅ **Xong khi:** thơ lục bát giữ đúng từng dòng ở mọi khổ màn hình kể cả 375px; không có reading time/TOC trong trang thơ; chuyển từ `/papers` sang `/poems` thấy rõ đổi không khí mà vẫn cùng một site.

### Phase 5 — Search, RSS, SEO
Pagefind tích hợp vào build; `/search` lọc theo loại; `rss.xml`; sitemap; JSON-LD; sinh ảnh OG tự động; favicon.

✅ **Xong khi:** tìm "attention" ra kết quả kèm đoạn trích; RSS validate sạch; dán link bài lên Facebook/LinkedIn hiện đúng ảnh OG.

### Phase 6 — Hoàn thiện & bàn giao
`/404`; `/about` viết tử tế; hiệu ứng fade-up; nút theme; script `npm run new`; pre-commit hooks; `README.md` đầy đủ; đo Lighthouse; test trên Chrome/Firefox/Safari iOS.

✅ **Xong khi:** Lighthouse ≥95 × 4; console sạch lỗi; `npm run new -- poem "Chiều quê"` sinh đúng file; README đủ để 6 tháng sau quay lại vẫn dùng được.

---

## 11. Ranh giới — Claude Code KHÔNG được làm

1. ❌ Không copy code từ `vcard-personal-portfolio` — chỉ tham khảo **cảm quan thị giác**. Kiến trúc single-page của nó là thứ ta cố tình tránh.
2. ❌ Không dùng React/Vue/Svelte. Astro component thuần là đủ. (Ngoại lệ duy nhất: nếu về sau có widget thực sự phức tạp thì đề xuất trước, chờ duyệt.)
3. ❌ Không thêm dependency ngoài Mục 3.1 mà không hỏi.
4. ❌ Không CSS-in-JS, không styled-components, không CSS module. Tailwind utilities + `@apply` cho vài class lặp nhiều.
5. ❌ Không dùng analytics, tracker, hay script bên thứ ba. (Muốn thống kê thì dùng GitHub Insights.)
6. ❌ Không tạo file nội dung giả rồi bảo là bài thật. Placeholder phải ghi rõ `draft: true` và chú thích `<!-- PLACEHOLDER -->`.
7. ❌ Không sửa `site.config.ts` để "sửa bug layout" — nếu layout hỏng thì sửa component.
8. ❌ Không hardcode chuỗi hiển thị trong component; lấy từ `site.config.ts` hoặc content.
9. ❌ Không animation quá 300ms, không tự động phát bất cứ thứ gì.
10. ❌ Không commit `node_modules`, `dist`, `.astro`, hay file `.env`.
11. ❌ Không đổi quyết định kiến trúc ở Mục 3 giữa chừng mà không báo.
12. ❌ Không "cải tiến" cấu trúc nội dung ở Mục 4 — đó là hợp đồng, mọi bài viết sẽ dựa vào nó.

---

## 12. Sau v1 (ghi nhận, chưa làm)

- Song ngữ VI/EN (`i18n` của Astro) — quyết định sau khi có ~15 bài.
- Bình luận bằng `giscus` (dùng GitHub Discussions, miễn phí, không tracker).
- Đồ thị tri thức nối các paper qua `relatedPapers` (D3 force graph).
- Trang `/now` — đang đọc gì, đang làm gì.
- Domain riêng.
- Newsletter (Buttondown).
- Trang `/reading-list` đồng bộ từ `AI-Knowledge-Library`.

---

## 13. Rủi ro & cách xử

| Rủi ro | Xác suất | Cách xử |
|---|---|---|
| **Site đẹp nhưng bỏ hoang sau 3 bài** | Cao | Script `npm run new` giảm ma sát tối đa; template có sẵn khung; đặt nhịp cam kết: 1 paper + 1 essay mỗi tháng |
| Giao diện Lab/Hiên thành hai site rời rạc | Trung bình | Layout, sidebar, nav, spacing giữ **y hệt** — chỉ đổi màu và font |
| KaTeX không render vài macro lạ | Trung bình | Khai báo macro dùng chung trong `astro.config.mjs`; `/math` là nơi chuẩn hoá ký hiệu |
| Repo phình to vì ảnh | Trung bình | Ảnh > 300KB phải nén trước; PDF luôn nằm ở `AI-Knowledge-Library` |
| Claude Code tự ý "nâng cấp" ngoài spec | Cao | Mục 11 + `CLAUDE.md` + xác nhận sau mỗi phase |
| Dấu tiếng Việt vỡ font | Thấp | Kiểm tra chuỗi `Ữ Ự Ỡ Ỵ ế ộ ằ ữ ỹ` ngay Phase 1 |

---

## 14. Một câu để ghi nhớ

> Đây không phải "một cái portfolio nữa". Đây là **hồ sơ tư duy công khai** của một kỹ sư — nơi mỗi paper được mổ xẻ đến tận giả định, và cũng là nơi người kỹ sư ấy làm thơ. Chính sự kết hợp đó, chứ không phải hiệu ứng CSS, mới là thứ khiến người ta nhớ.

---

*Hết BLUEPRINT v1.0*
