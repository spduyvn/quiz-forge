import type { ActivityModule, ResultSummary } from '../../core/types';
import { flashcardDataSchema, type FlashcardData, type FlashcardResult } from './schema';
import Player from './Player';
import Editor from './Editor';
import { flashcardSamples } from './samples';
import { flashcardPrompt } from './prompt';

export const flashcardModule: ActivityModule<FlashcardData, FlashcardResult> = { kind: 'flashcard', version: '1.0', meta: { name: { vi: 'Flashcard', en: 'Flashcards' }, description: { vi: 'Ôn tập bằng thẻ ghi nhớ.', en: 'Review with memory cards.' }, icon: '🗂️', tags: ['study', 'spaced-repetition'] }, dataSchema: flashcardDataSchema, Player, Editor, summarize: (result): ResultSummary => ({ activityId: '', kind: 'flashcard', score: result.known, maxScore: result.total, percent: result.total ? Math.round(result.known / result.total * 100) : 0, durationMs: result.durationMs, completedAt: new Date().toISOString(), details: [] }), samples: flashcardSamples, aiPrompt: flashcardPrompt };
export default flashcardModule;
