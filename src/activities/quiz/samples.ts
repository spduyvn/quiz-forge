import type { SampleData } from '../../core/types';
import type { QuizData } from './schema';

export const quizSamples: SampleData<QuizData>[] = [
  {
    name: 'Khoa học cơ bản',
    data: {
      title: 'Khoa học cơ bản',
      description: 'Ôn tập các khái niệm khoa học phổ thông.',
      questions: [
        {
          id: 'q1',
          type: 'single_choice',
          prompt: 'Hành tinh nào gần Mặt Trời nhất?',
          options: [
            { id: 'a', text: 'Sao Thủy' },
            { id: 'b', text: 'Sao Kim' },
            { id: 'c', text: 'Trái Đất' },
            { id: 'd', text: 'Sao Hỏa' },
          ],
          correctOptionId: 'a',
          explanation: 'Sao Thủy là hành tinh gần Mặt Trời nhất.',
          difficulty: 'easy',
          tags: ['thiên văn'],
        },
        {
          id: 'q2',
          type: 'multiple_choice',
          prompt: 'Những chất nào sau đây là kim loại?',
          options: [
            { id: 'a', text: 'Sắt' },
            { id: 'b', text: 'Oxy' },
            { id: 'c', text: 'Đồng' },
            { id: 'd', text: 'Hidro' },
          ],
          correctOptionIds: ['a', 'c'],
          tags: ['hóa học'],
        },
        {
          id: 'q3',
          type: 'true_false',
          prompt: 'Nước sôi ở 100°C tại áp suất tiêu chuẩn.',
          correct: true,
          tags: ['vật lý'],
        },
        {
          id: 'q4',
          type: 'fill_blank',
          prompt: 'Đơn vị đo cường độ dòng điện là ______.',
          acceptedAnswers: ['Ampe', 'A'],
          tags: ['vật lý'],
        },
        {
          id: 'q5',
          type: 'matching',
          prompt: 'Ghép hiện tượng với lĩnh vực nghiên cứu.',
          pairs: [
            { left: 'Quang hợp', right: 'Sinh học' },
            { left: 'Phản ứng oxy hóa', right: 'Hóa học' },
            { left: 'Lực hấp dẫn', right: 'Vật lý' },
          ],
          tags: ['khoa học'],
        },
      ],
    },
  },
];
