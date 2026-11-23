import { describe, expect, it } from 'vitest';
import { loadFromText } from '../index';

describe('content loader', () => {
  it('loads valid envelope and warns for unsupported kinds', () => {
    const result = loadFromText(JSON.stringify({
      schema: 'quizforge.content',
      version: '1.0',
      meta: { title: 'Bài học', language: 'vi' },
      activities: [
        { id: 'quiz-1', kind: 'quiz', data: { title: 'T', questions: [{ id: 'q', type: 'true_false', prompt: 'P', correct: true }] } },
        { id: 'future-1', kind: 'future-game', data: {} },
      ],
    }));
    expect(result.activities).toHaveLength(1);
    expect(result.issues[0]?.severity).toBe('warning');
  });

  it('reports nested activity data paths', () => {
    expect(() => loadFromText(JSON.stringify({
      schema: 'quizforge.content',
      version: '1.0',
      meta: { title: 'Bài học', language: 'vi' },
      activities: [{ id: 'quiz-1', kind: 'quiz', data: { title: '', questions: [] } }],
    }))).not.toThrow();
    const result = loadFromText(JSON.stringify({
      schema: 'quizforge.content',
      version: '1.0',
      meta: { title: 'Bài học', language: 'vi' },
      activities: [{ id: 'quiz-1', kind: 'quiz', data: { title: '', questions: [] } }],
    }));
    expect(result.issues[0]?.message).toContain('activities[0].data');
  });
});
