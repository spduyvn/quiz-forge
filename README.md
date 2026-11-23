# QuizForge

QuizForge là nền tảng web tĩnh để tạo và chơi các hoạt động học tập tương tác từ JSON. Không có backend, admin hay đăng nhập; nội dung và dữ liệu người học chạy trong trình duyệt, phù hợp deploy trên GitHub Pages.

## Tính năng

- Content envelope có thể chứa nhiều activity và bỏ qua activity `kind` chưa hỗ trợ mà không làm hỏng cả file.
- Plugin activity tự đăng ký qua `import.meta.glob`; core không import activity cụ thể.
- Các plugin hiện có: `quiz`, `flashcard`, `memory-match`, `sorting-game`, `word-scramble`, `speed-quiz`.
- Quiz có question registry riêng: `single_choice`, `multiple_choice`, `true_false`, `fill_blank`, `matching`.
- Validate bằng Zod, lỗi có đường dẫn cụ thể; prompt AI và JSON Schema sinh tự động từ registry.
- Chia sẻ bằng JSON nén trong URL hash, lưu lịch sử cục bộ, theme sáng/tối, PWA offline cơ bản.

## Content envelope

```json
{
  "schema": "quizforge.content",
  "version": "1.0",
  "meta": {
    "title": "Bài học mẫu",
    "description": "Mô tả tùy chọn",
    "language": "vi",
    "author": "Tên tác giả",
    "tags": ["toán", "lớp 6"]
  },
  "activities": [
    {
      "id": "quiz-1",
      "kind": "quiz",
      "config": { "mode": "practice" },
      "data": { "title": "...", "questions": [] }
    }
  ]
}
```

`meta.language` là `vi` hoặc `en`. Mỗi activity có `id`, `kind`, `data`; `config` tùy plugin. Xem file mẫu tại `public/samples/lesson-vi.json` và `public/samples/lesson-en.json`.

## Tạo JSON bằng AI

Mở **Tạo prompt AI**, chọn activity, chủ đề, số lượng và độ khó, rồi copy prompt sang ChatGPT/Claude hoặc công cụ AI khác. QuizForge không gọi API AI. Dán JSON kết quả vào trang **Mở nội dung** để validate.

## Chạy local

Yêu cầu Node.js 22 trở lên:

```bash
npm install
npm run dev
```

Các lệnh kiểm tra:

```bash
npm run lint
npm run typecheck
npm run test -- --run
npm run build
```

## Thêm activity

```bash
npm run new:activity -- timeline
```

Sau đó hoàn thiện schema, Player, Editor, sample, prompt, summarize và contract test. Registry tự phát hiện `src/activities/timeline/index.ts`; không cần sửa phần lõi. Hướng dẫn đầy đủ ở [docs/ADDING_AN_ACTIVITY.md](docs/ADDING_AN_ACTIVITY.md).

## Deploy GitHub Pages

1. Push code lên nhánh `main` của repository.
2. Vào **Settings → Pages → Source: GitHub Actions**.
3. Workflow `.github/workflows/deploy.yml` sẽ lint, typecheck, test, build và deploy.
4. `VITE_BASE` được workflow đặt tự động theo tên repository. Khi chạy local hoặc deploy thủ công, đặt `VITE_BASE=/ten-repo/` nếu ứng dụng nằm dưới subpath.

Ứng dụng dùng `HashRouter`, vì vậy các route hoạt động trên GitHub Pages mà không cần rewrite server.

## Quyết định đơn giản hóa

- Chọn `word-scramble` thay cho hangman để minh họa word game với ít state hơn.
- SM-2 trong flashcard là phiên bản tối giản lưu local; không có đồng bộ server.
- Plugin chưa có editor chuyên biệt có thể dùng JSON editor fallback ở lớp UI editor.
