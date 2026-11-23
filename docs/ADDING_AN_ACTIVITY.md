# Thêm một activity mới

1. Chạy `npm run new:activity -- <kind>` (kind dạng kebab-case, ví dụ `timeline`).
2. Hoàn thiện `schema.ts`: đây là nguồn sự thật cho validation, JSON Schema sinh cho prompt AI và kiểu dữ liệu.
3. Viết `Player.tsx` với props `PlayerProps<TData, TResult>`. Không import trực tiếp activity khác; dùng các helper trong `src/core`.
4. Thêm `Editor.tsx` nếu muốn form chỉnh sửa; nếu không, để trống và trình sửa JSON fallback sẽ được dùng.
5. Cập nhật `samples.ts` và `prompt.ts`. `aiPrompt.example` phải khớp `dataSchema`.
6. Đăng ký module trong `index.ts`: export default một `ActivityModule`. Registry tự phát hiện file nên không cần sửa core.
7. Viết test `__tests__/contract.test.ts`: validate sample, validate prompt example, kiểm tra `summarize` và Player render với sample.
8. Chạy `npm run lint`, `npm run typecheck`, `npm run test -- --run`, `npm run build`.

## Quiz question types

Quiz có registry câu hỏi riêng tại `src/activities/quiz/questions/`. Thêm loại mới bằng cách tạo module `QuestionModule` (schema, Renderer, grade, isAnswered) và import nó trong `questions/index.ts`. Không cần sửa Player hoặc logic chấm điểm tổng quát.
