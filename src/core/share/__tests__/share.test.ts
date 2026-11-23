import { describe, expect, it } from 'vitest';
import { decodeShare, encodeShare } from '../index';

describe('share encoding', () => {
  it('round trips a content envelope', () => {
    const envelope = {
      schema: 'quizforge.content',
      version: '1.0',
      meta: { title: 'Test', language: 'vi' as const },
      activities: [],
    };
    expect(decodeShare(encodeShare(envelope))).toEqual(envelope);
  });
});
