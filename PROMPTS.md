# PROMPTS.md — Câu lệnh mồi cho Claude Code (VS Code)

Dán từng prompt theo đúng thứ tự. **Hết mỗi phase, xem kết quả rồi mới dán prompt tiếp theo.**

---

## Bước 0 — Chuẩn bị (Phúc làm tay, 5 phút)

1. Trên GitHub, tạo repo mới **public** tên chính xác: `Phuc75nguyen.github.io`
   *(không có mô tả gì thêm, không tick "Add README")*
2. Clone về máy, mở bằng VS Code:
   ```bash
   git clone https://github.com/Phuc75nguyen/Phuc75nguyen.github.io.git
   cd Phuc75nguyen.github.io
   code .
   ```
3. Copy **`BLUEPRINT.md`** và **`CLAUDE.md`** vào thư mục gốc của repo.
4. Vào repo trên GitHub → **Settings → Pages → Source** → chọn **GitHub Actions**.
5. Mở Claude Code trong VS Code, bắt đầu từ Prompt 1.

---

## Prompt 1 — Nạp ngữ cảnh (dán đầu tiên, luôn luôn)

```
Đọc kỹ hai file CLAUDE.md và BLUEPRINT.md trong thư mục gốc của repo này.

BLUEPRINT.md là đặc tả đầy đủ cho dự án website blog cá nhân + thư viện phân
tích paper AI/ML của tôi. CLAUDE.md là quy tắc làm việc bắt buộc.

Sau khi đọc xong, đừng viết code vội. Hãy trả lời tôi 3 việc:

1. Tóm tắt lại bằng 5 gạch đầu dòng: dự án này xây cái gì, cho ai, và điều
   gì làm nó khác một portfolio thông thường.
2. Liệt kê mọi điểm trong BLUEPRINT mà bạn thấy mơ hồ, mâu thuẫn, hoặc bất
   khả thi về mặt kỹ thuật. Nếu không có thì nói rõ là không có.
3. Xác nhận bạn sẽ làm tuần tự theo 7 phase ở Mục 10 và dừng lại chờ tôi
   xác nhận sau mỗi phase.

Đừng tạo file nào ở bước này.
```

---

## Prompt 2 — Phase 0: Nền móng & deploy

```
Bắt đầu PHASE 0 (Mục 10, BLUEPRINT.md): Nền móng & đường ống deploy.

Làm đúng những việc sau, không hơn:
- Khởi tạo dự án Astro 5 + TypeScript strict + Tailwind CSS 4 (@tailwindcss/vite)
  + @astrojs/mdx, cài vào chính thư mục hiện tại
- astro.config.mjs với site: 'https://phuc75nguyen.github.io' (KHÔNG đặt base)
- src/site.config.ts bản đầu tiên, đầy đủ các trường ở Mục 8.2 BLUEPRINT,
  điền sẵn thông tin của tôi: Nguyễn Tấn Phúc, Data Scientist / MLOps Engineer,
  GitHub @Phuc75nguyen, ở Việt Nam
- .github/workflows/deploy.yml đúng như Mục 9 BLUEPRINT
- .gitignore chuẩn cho Astro
- Một src/pages/index.astro tối giản: chỉ tên tôi + một dòng "Đang xây dựng",
  đã dùng token màu nền tối. Chưa làm layout, chưa làm sidebar.

Xong thì:
1. Chạy `npm run build` để chắc chắn build sạch
2. Commit với message conventional commit
3. Báo tôi lệnh cần chạy để push, và kiểm tra đủ Acceptance Criteria của
   Phase 0 chưa

Chưa làm gì của Phase 1.
```

---

## Prompt 3 — Phase 1: Design system & layout

```
Phase 0 đã chạy, site đã live. Bắt đầu PHASE 1: Design system & khung layout.

Theo Mục 5 BLUEPRINT:
- src/styles/global.css với @theme tokens đầy đủ, gồm cả override cho
  [data-room='hien']
- Self-host font vào public/fonts/ dạng .woff2: Be Vietnam Pro (sans),
  Source Serif 4 (serif), JetBrains Mono (mono). Nhớ subset có Vietnamese.
  Khai báo @font-face với font-display: swap
- BaseLayout.astro: <html lang="vi">, head SEO cơ bản, skip-link, khung
  grid sidebar + main
- Sidebar.astro đủ 7 khối theo Mục 5.3. Khối "Chỉ số động" và "Bài mới nhất"
  tạm để hàm rỗng có TODO, vì content collection làm ở Phase 2
- MobileDrawer.astro cho breakpoint < 1024px (mở bằng hamburger, đóng bằng
  Esc và click overlay, khoá scroll khi mở)
- Footer.astro
- Component UI: Card, Chip, Tag, Badge trong src/components/ui/
- Trang index.astro tạm dùng layout mới để tôi nhìn được kết quả

Trước khi báo xong, tự kiểm đủ checklist trong CLAUDE.md, đặc biệt:
- Dấu tiếng Việt: Ữ Ự Ỡ Ỵ ế ộ ằ ữ ỹ đ Đ hiển thị đúng ở cả 3 font
- Tương phản đạt WCAG AA ở cả data-room="lab" và data-room="hien"
- 375px không bị tràn ngang

Chụp lại cho tôi cấu trúc file đã tạo, rồi dừng.
```

---

## Prompt 4 — Phase 2: Content collections & Thư viện Papers ⭐

```
Bắt đầu PHASE 2 — phase quan trọng nhất: Content collections & Thư viện Papers.

1. src/content.config.ts: đủ 4 collection (papers, notes, essays, poems)
   với Zod schema CHÍNH XÁC như Mục 4 BLUEPRINT. Không thêm bớt trường.

2. Cấu hình pipeline markdown trong astro.config.mjs:
   - remark-math + rehype-katex (nhớ import CSS của KaTeX)
   - astro-expressive-code
   - Mermaid render lúc build

3. src/content/papers/_TEMPLATE.mdx với đủ 9 section bắt buộc ở Mục 4.1,
   mỗi section có sẵn gợi ý viết gì.

4. Component: PaperMeta, Callout, Figure, TableOfContents, ReadingProgress.

5. Trang /papers (Mục 6.2): filter chips theo domain, sync URL query,
   sort dropdown, toggle giữa chế độ card và chế độ bảng, có noscript
   fallback. Lọc bằng vanilla JS, không framework.

6. Trang /papers/[...slug] (Mục 6.3): PaperLayout với TOC dính bên phải,
   thanh tiến độ đọc, và hai khối nổi bật "Phản biện" + "Ứng dụng thực tế"
   có style riêng biệt rõ ràng.

7. Cập nhật Sidebar: khối "Chỉ số động" và "Bài mới nhất" giờ lấy số liệu
   thật từ collection.

8. Viết 2 bài phân tích mẫu ĐẦY ĐỦ, dùng paper thật, mỗi bài đi hết 9 section:
   - "Attention Is All You Need" (domain: LLM & VLM)
   - Một paper về MLOps/feature store tuỳ bạn chọn (domain: ML & MLOps)
   Phần "Phản biện" và "Ứng dụng thực tế" phải viết có chiều sâu thật,
   đừng viết chung chung. Đánh dấu draft: false để tôi xem được.
   Nếu có chỗ cần số liệu tôi mới biết (VD quy mô hệ thống của tôi) thì
   để <!-- PHÚC ĐIỀN --> kèm gợi ý.

Sau đó test: cố tình sửa sai một trường frontmatter và xác nhận build fail
với thông báo rõ ràng. Báo lại cho tôi kết quả test đó.
```

---

## Prompt 5 — Phase 3: Notes, series, tags, archive

```
Bắt đầu PHASE 3 theo Mục 10 BLUEPRINT.

- /notes + /notes/[...slug] dùng ArticleLayout, lọc theo category, phân trang
  12 bài/trang
- /series/[series] + component SeriesNav (hiện "Bài 2/5", prev/next trong series)
- /tags (tag cloud cỡ chữ theo tần suất) + /tags/[tag]
- /archive: nhóm theo năm → tháng, danh sách gọn, không card
- /math: bảng ký hiệu toán dùng chung theo Mục 6.5. Điền sẵn các ký hiệu
  phổ biến trong ML (vector, ma trận, kỳ vọng, loss, gradient, phân phối...)
  kèm mô tả tiếng Việt
- Viết 1 bài note mẫu thật: "Debug 75 Spark job bị đơ trên Databricks feature
  store" — dựng khung bài và nội dung kỹ thuật hợp lý, chỗ nào cần chi tiết
  cụ thể của hệ thống tôi thì để <!-- PHÚC ĐIỀN -->

Đảm bảo không có tag nào trỏ tới trang 404.
```

---

## Prompt 6 — Phase 4: Hiên (Essays & Thơ)

```
Bắt đầu PHASE 4: khu vực "Hiên" — chiêm nghiệm và thơ. Đây là phần đòi hỏi
sự tinh tế, đọc lại Mục 5 và Mục 4.4 BLUEPRINT thật kỹ.

- /essays + EssayLayout: data-room="hien", font serif, max-width 62ch,
  danh sách dạng dòng thoáng (không card, không thumbnail)
- /poems + PoemLayout: ĐẶC BIỆT CHÚ Ý — thơ phải giữ nguyên tuyệt đối cách
  xuống dòng. Dùng white-space: pre-wrap. Khối thơ căn giữa trang nhưng từng
  dòng căn trái. line-height 2. KHÔNG hiện reading time, KHÔNG hiện TOC.
- Chuyển đổi data-room khi điều hướng giữa Lab và Hiên phải mượt, không nháy
- Viết 1 essay mẫu ngắn và 2 bài thơ mẫu (1 lục bát, 1 tự do) để tôi test
  layout. Đánh draft: true và ghi rõ <!-- PLACEHOLDER — Phúc sẽ thay bằng
  bài của mình -->

Test kỹ: mở bài lục bát ở 375px, xác nhận không có dòng thơ nào bị wrap sai
hoặc bị co lại. Đây là lỗi hay gặp nhất, đừng bỏ qua.
```

---

## Prompt 7 — Phase 5: Search, RSS, SEO

```
Bắt đầu PHASE 5 theo Mục 10 và Mục 7 BLUEPRINT.

- Pagefind: thêm vào script build (`astro build && pagefind --site dist`),
  trang /search dùng Pagefind UI, có filter theo loại nội dung
- /rss.xml gộp cả 4 collection, mỗi item có <category> phân biệt loại
- @astrojs/sitemap
- JSON-LD: ScholarlyArticle cho papers, BlogPosting cho notes/essays,
  Person cho /about
- Sinh ảnh Open Graph tự động lúc build bằng satori + sharp: nền tối,
  tiêu đề bài, nhãn domain, tên tôi. Mỗi bài một ảnh.
- favicon.svg

Test: build xong, tìm "attention" trên /search phải ra bài mẫu kèm đoạn trích.
Kiểm tra RSS bằng validator. Báo lại kết quả.
```

---

## Prompt 8 — Phase 6: Hoàn thiện & bàn giao

```
Phase cuối. Theo Mục 10 BLUEPRINT:

- /404 ngắn gọn, đúng tông, có lối quay về
- /about viết tử tế: tiểu sử, hành trình từ AI/ML sang MLOps ngân hàng,
  mảng quan tâm, và dẫn tới 3 bài tâm đắc nhất. Để <!-- PHÚC ĐIỀN --> ở
  chỗ cần chi tiết cá nhân. Nhớ đây là trang nhà tuyển dụng sẽ đọc.
- Hiệu ứng fade-up 12px khi vào viewport (IntersectionObserver, chạy 1 lần),
  hover nâng card 2px. Bắt buộc tôn trọng prefers-reduced-motion.
- Nút chuyển theme trong sidebar
- scripts/new.mjs: `npm run new -- paper|note|essay|poem "Tiêu đề"` sinh file
  .mdx với frontmatter đầy đủ + khung section. Hàm slugify phải xử lý dấu
  tiếng Việt đúng: "Chiều quê" → "chieu-que", "Đường về" → "duong-ve"
- husky + lint-staged: prettier + astro check
- README.md đầy đủ theo Mục 8.5: cách chạy local, cách thêm từng loại bài,
  BẢNG giải thích mọi trường frontmatter, cách deploy, sơ đồ thư mục có chú thích

Cuối cùng chạy Lighthouse trên trang chủ và một trang paper (chế độ mobile),
báo điểm từng hạng mục. Nếu chưa đạt ≥95 thì sửa cho đạt rồi mới báo xong.
```

---

## Prompt bảo trì (dùng về sau)

**Thêm bài mới:**
```
npm run new -- paper "Tên paper"
```
Rồi tự viết vào file `.mdx` được sinh ra. Không cần Claude Code.

**Khi cần Claude Code giúp phân tích một paper:**
```
Tôi muốn thêm một bài phân tích paper mới vào thư viện.

Paper: [tên + link arXiv]
File PDF local: [đường dẫn trong AI-Knowledge-Library]

Hãy đọc paper này và soạn bài phân tích theo đúng 9 section của
src/content/papers/_TEMPLATE.mdx. Yêu cầu riêng:

- Section "Ý tưởng cốt lõi" phải giải thích được trong 3 câu, không công thức
- Section "Phản biện" phải nêu ít nhất 3 điểm yếu thật, có lập luận, không
  phải kiểu "cần thêm nghiên cứu"
- Section "Ứng dụng thực tế" viết từ góc nhìn một MLOps engineer ở ngân hàng:
  chi phí inference, độ trễ, rào cản dữ liệu, tuân thủ quy định
- Điền đúng difficulty và impact, giải thích ngắn vì sao chấm điểm đó

Viết xong, tạo file và cho tôi biết chỗ nào bạn không chắc để tôi rà lại.
```

**Khi muốn đổi giao diện:**
```
Đọc lại Mục 5 BLUEPRINT.md. Tôi muốn đổi [mô tả cụ thể].
Chỉ được sửa token màu trong src/styles/global.css, không sửa component.
Nếu bắt buộc phải sửa component thì giải thích vì sao trước khi làm.
```

---

## Lưu ý khi làm việc với Claude Code

1. **Đừng dán cả BLUEPRINT vào chat.** Cứ bảo nó `đọc BLUEPRINT.md` — đọc file tốn ít context hơn và chính xác hơn.
2. **Sau mỗi phase, tự mở `npm run dev` xem bằng mắt** trước khi cho sang phase sau. AI báo "xong" không có nghĩa là đẹp.
3. **Nếu nó đi lạc**, kéo về bằng một câu: *"Dừng lại. Việc này không có trong BLUEPRINT. Đọc lại Mục 11 — Ranh giới."*
4. **Commit sau mỗi phase.** Có chuyện gì thì `git revert` một phase, không mất cả tuần.
5. **Context dài dễ trôi.** Sang phase mới nên `/clear` rồi dán lại Prompt 1 để nạp ngữ cảnh sạch.
6. Đặt Claude Code ở chế độ **plan mode** cho Phase 2 và Phase 4 — hai phase nhiều quyết định thiết kế nhất, xem plan trước khi cho code sẽ đỡ phải sửa.
