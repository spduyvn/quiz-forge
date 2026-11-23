import type { AiPrompt } from '../../core/types';
import type { QuizData } from './schema';

export const quizPrompt: AiPrompt<QuizData> = {
  instructions:
    'Tạo một quiz JSON gồm nhiều câu hỏi. Mỗi câu có type là one of: single_choice, multiple_choice, true_false, fill_blank, matching. Bao gồm prompt, đáp án đúng, explanation ngắn gọn, difficulty (easy/medium/hard) và tags. Chỉ trả về JSON đúng schema, không thêm markdown fence.',
  example: {
    title: 'Quiz mẫu',
    questions: [
      {
        id: 'q1',
        type: 'single_choice',
        prompt: 'Thủ đô của Việt Nam là gì?',
        options: [
          { id: 'a', text: 'Hà Nội' },
          { id: 'b', text: 'Đà Nẵng' },
        ],
        correctOptionId: 'a',
        difficulty: 'easy',
        tags: ['địa lý'],
      },
    ],
  },
};
