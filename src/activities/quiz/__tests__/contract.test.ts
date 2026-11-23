import { describe, expect, it } from 'vitest';
import { quizDataSchema } from '../schema';
import { quizSamples } from '../samples';
import { quizPrompt } from '../prompt';
import { quizModule } from '../index';

describe('quiz activity contract', () => {
  it('validates every sample and prompt example', () => {
    for (const sample of quizSamples) expect(quizDataSchema.safeParse(sample.data).success).toBe(true);
    expect(quizDataSchema.safeParse(quizPrompt.example).success).toBe(true);
  });

  it('returns a normalized result summary', () => {
    const summary = quizModule.summarize({
      answers: [{ questionId: 'q1', value: 'a', correct: true, score: 1, maxScore: 1, tags: ['tag'] }],
      durationMs: 100,
    });
    expect(summary.kind).toBe('quiz');
    expect(summary.percent).toBe(100);
    expect(summary.details[0]).toEqual({ tag: 'tag', correct: 1, total: 1 });
  });
});
