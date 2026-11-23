import type { ActivityModule, ResultSummary } from '../../core/types';
import { calculateQuizScore, summarizeTags } from './grading';
import { quizDataSchema, type QuizData, type QuizResult } from './schema';
import { quizPrompt } from './prompt';
import { quizSamples } from './samples';
import Player from './Player';
import Editor from './Editor';
import './questions';

function summarize(result: QuizResult): ResultSummary {
  const { score, maxScore, percent } = calculateQuizScore(result.answers);
  return {
    activityId: '',
    kind: 'quiz',
    score,
    maxScore,
    percent,
    durationMs: result.durationMs,
    completedAt: new Date().toISOString(),
    details: summarizeTags(result.answers),
  };
}

export const quizModule: ActivityModule<QuizData, QuizResult> = {
  kind: 'quiz',
  version: '1.0',
  meta: {
    name: { vi: 'Quiz', en: 'Quiz' },
    description: { vi: 'Trả lời các câu hỏi tương tác.', en: 'Answer interactive questions.' },
    icon: '❓',
    tags: ['assessment', 'questions'],
  },
  dataSchema: quizDataSchema,
  Player,
  Editor,
  summarize,
  samples: quizSamples,
  aiPrompt: quizPrompt,
};

export default quizModule;
export * from './schema';
export * from './grading';
export * from './shuffle';
