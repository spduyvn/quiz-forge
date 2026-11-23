import { describe, expect, it } from 'vitest';
import { gradeQuiz, calculateQuizScore } from '../grading';
import { quizSamples } from '../samples';
import { shuffleQuestionOptions } from '../shuffle';

describe('quiz grading', () => {
  const data = quizSamples[0].data;

  it('grades all supported question types', () => {
    const answers = {
      q1: 'a',
      q2: ['a', 'c'],
      q3: true,
      q4: 'ampe',
      q5: { 'Quang hợp': 'Sinh học', 'Phản ứng oxy hóa': 'Hóa học', 'Lực hấp dẫn': 'Vật lý' },
    };
    const result = gradeQuiz(data, answers);
    expect(result.every((answer) => answer.correct)).toBe(true);
    expect(calculateQuizScore(result).percent).toBe(100);
  });

  it('does not accept an incomplete matching answer', () => {
    const answers = { q5: { 'Quang hợp': 'Sinh học' } };
    expect(gradeQuiz(data, answers).find((answer) => answer.questionId === 'q5')?.correct).toBe(false);
  });

  it('keeps the correct option id after shuffling', () => {
    const question = data.questions[0];
    const shuffled = shuffleQuestionOptions(question, 0.7);
    expect(shuffled.type).toBe('single_choice');
    if (shuffled.type === 'single_choice') {
      expect(shuffled.options.some((option) => option.id === shuffled.correctOptionId)).toBe(true);
    }
  });
});
