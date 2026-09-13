# CLAUDE.md — Quy tắc làm việc trong repo này

> Đọc file này trước mọi phiên làm việc. Tài liệu đặc tả đầy đủ nằm ở **`BLUEPRINT.md`** — đọc hết nó trước khi viết dòng code đầu tiên.

## Dự án

Blog cá nhân + thư viện phân tích paper AI/ML của Nguyễn Tấn Phúc (`@Phuc75nguyen`).
Deploy: GitHub Pages → `https://phuc75nguyen.github.io`

**Stack (đã chốt, không đổi):** Astro 5 · TypeScript strict · Tailwind CSS 4 · MDX · KaTeX · Expressive Code · Pagefind · astro-icon.

## Nguyên tắc bắt buộc

1. **`BLUEPRINT.md` là hợp đồng.** Yêu cầu nào không có trong đó → hỏi, không tự quyết.
2. **Làm tuần tự theo 7 phase (Mục 10 của BLUEPRINT).** Hết mỗi phase: commit → báo cáo ngắn gọn đã làm gì → **dừng lại chờ xác nhận**. Không gộp phase, không chạy trước.
3. **Không thêm dependency** ngoài danh sách ở Mục 3.1 BLUEPRINT mà chưa được duyệt. Muốn thêm → nêu tên package, lý do, kích thước, phương án thay thế.
4. **Không hardcode chuỗi hiển thị** trong component. Mọi thông tin cá nhân, nav, social đọc từ `src/site.config.ts`.
5. **Content-first.** Thêm/sửa nội dung chỉ được đụng vào `src/content/**` hoặc `site.config.ts`. Nếu một thay đổi nội dung buộc phải sửa component → thiết kế sai, sửa lại thiết kế.
6. **Đọc kỹ Mục 11 "Ranh giới"** trong BLUEPRINT trước khi có ý tưởng sáng tạo nào.

## Quy ước code

- Astro component thuần. **Không React/Vue/Svelte.**
- TypeScript `strict: true`. Không `any`. Không `@ts-ignore`.
- Tailwind utilities là chính; `@apply` chỉ cho pattern lặp ≥ 3 lần, đặt trong `src/styles/`.
- Màu/font/spacing **luôn** qua CSS variable đã khai báo trong `@theme`. Không viết `#38BDF8` rải rác trong markup.
- Tên file: component `PascalCase.astro`, util `kebab-case.ts`, nội dung `kebab-case.mdx` (slug không dấu).
- Mọi component có prop phải khai báo `interface Props`.
- Comment giải thích **tại sao**, không giải thích cái gì.

## Ngôn ngữ

- **Giao diện và nội dung: tiếng Việt.** Thuật ngữ kỹ thuật giữ tiếng Anh (embedding, fine-tune, feature store…), không dịch gượng.
- **Code, tên biến, commit message: tiếng Anh.**
- **Trao đổi với Phúc: tiếng Việt.**
- Slug URL luôn không dấu, không khoảng trắng: `Chiều quê` → `chieu-que`.

## Kiểm thử trước khi báo "xong"

Mỗi phase, tự chạy đủ checklist rồi mới báo cáo:

```bash
npm run dev            # không lỗi, không warning đỏ
npm run build          # build sạch
npx astro check        # 0 error
```

Và kiểm bằng mắt:
- [ ] 4 breakpoint: 1440 / 1024 / 768 / **375px**
- [ ] Console trình duyệt sạch
- [ ] Tab được qua toàn bộ link, focus ring nhìn rõ
- [ ] Dấu tiếng Việt chuẩn: `Ữ Ự Ỡ Ỵ ế ộ ằ ữ ỹ đ Đ`
- [ ] Cả hai chế độ `data-room="lab"` và `"hien"` đều đúng
- [ ] Không có nội dung placeholder nào bị lọt vào production (`draft: true` + `<!-- PLACEHOLDER -->`)

## Commit

Conventional Commits, tiếng Anh, một commit một việc:

```
feat(papers): add paper library page with domain filtering
fix(sidebar): prevent drawer from trapping scroll on iOS
style(tokens): adjust hien room accent for AA contrast
docs(readme): document how to add a new poem
chore(deps): add astro-expressive-code
```

Không commit `node_modules/`, `dist/`, `.astro/`, `.env`.

## Khi gặp mơ hồ

Không đoán. Hỏi theo mẫu:

> **Chưa rõ ở [Mục X, BLUEPRINT]:** [vấn đề cụ thể].
> Phương án A: … (ưu/nhược)
> Phương án B: … (ưu/nhược)
> Tôi đề xuất A vì …. Anh chọn phương án nào?

## Nhắc lại điều quan trọng nhất

Phúc phải **tự maintain được site này sau 6 tháng không đụng tới**. Code đơn giản, dễ đoán, có chú thích chỗ khó, quan trọng hơn code "thông minh". Nếu phải chọn giữa một giải pháp gọn gàng mà khó hiểu và một giải pháp dài dòng mà rõ ràng — **chọn cái rõ ràng.**
