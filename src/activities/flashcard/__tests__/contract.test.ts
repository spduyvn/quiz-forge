import { describe, expect, it } from 'vitest';
import { flashcardDataSchema, updateSm2 } from '../schema';
import { flashcardModule } from '../index';
import { flashcardSamples } from '../samples';
import { flashcardPrompt } from '../prompt';
describe('flashcard contract', () => { it('validates samples and prompt', () => { expect(flashcardSamples.every((s) => flashcardDataSchema.safeParse(s.data).success)).toBe(true); expect(flashcardDataSchema.safeParse(flashcardPrompt.example).success).toBe(true); }); it('updates SM-2 state', () => { expect(updateSm2({ interval: 1, repetitions: 0, easeFactor: 2.5 }, 'known').interval).toBe(1); expect(updateSm2({ interval: 1, repetitions: 1, easeFactor: 2.5 }, 'known').interval).toBe(6); }); it('summarizes', () => { expect(flashcardModule.summarize({ known: 1, total: 2, durationMs: 2 }).percent).toBe(50); }); });
