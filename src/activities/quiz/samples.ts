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
  {
    name: 'English basics',
    data: {
      title: 'English Basics',
      description: 'Practice everyday English vocabulary and grammar.',
      questions: [
        {
          id: 'en-q1',
          type: 'single_choice',
          prompt: 'Which word means the opposite of “hot”?',
          options: [
            { id: 'a', text: 'Cold' },
            { id: 'b', text: 'Warm' },
            { id: 'c', text: 'Bright' },
            { id: 'd', text: 'Fast' },
          ],
          correctOptionId: 'a',
          explanation: '“Cold” is the opposite of “hot”.',
          difficulty: 'easy',
          tags: ['vocabulary'],
        },
        {
          id: 'en-q2',
          type: 'single_choice',
          prompt: 'Choose the correct sentence.',
          options: [
            { id: 'a', text: 'She go to school every day.' },
            { id: 'b', text: 'She goes to school every day.' },
            { id: 'c', text: 'She going to school every day.' },
            { id: 'd', text: 'She gone to school every day.' },
          ],
          correctOptionId: 'b',
          explanation: 'Use “goes” with the third-person singular subject “she”.',
          difficulty: 'easy',
          tags: ['grammar'],
        },
        {
          id: 'en-q3',
          type: 'true_false',
          prompt: '“Beautiful” is an adjective.',
          correct: true,
          explanation: '“Beautiful” describes a person, place, or thing, so it is an adjective.',
          difficulty: 'easy',
          tags: ['grammar'],
        },
        {
          id: 'en-q4',
          type: 'fill_blank',
          prompt: 'Complete the sentence: I ___ a student.',
          acceptedAnswers: ['am'],
          explanation: 'The correct form of “to be” with “I” is “am”.',
          difficulty: 'easy',
          tags: ['grammar'],
        },
        {
          id: 'en-q5',
          type: 'matching',
          prompt: 'Match each word with its meaning.',
          pairs: [
            { left: 'Begin', right: 'Start' },
            { left: 'Quick', right: 'Fast' },
          ],
          explanation: '“Begin” means “start”, and “quick” means “fast”.',
          difficulty: 'easy',
          tags: ['vocabulary'],
        },
      ],
    },
  },
];
