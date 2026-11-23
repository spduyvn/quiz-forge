import { z } from 'zod';

export const flashcardDataSchema = z.object({
  title: z.string().min(1),
  cards: z.array(z.object({
    id: z.string().min(1),
    front: z.string().min(1),
    back: z.string().min(1),
    tags: z.array(z.string()).optional(),
  })).min(1),
});

export type FlashcardData = z.infer<typeof flashcardDataSchema>;
export type FlashcardRating = 'known' | 'unknown';
export interface FlashcardResult { known: number; total: number; durationMs: number; }

export function updateSm2(card: { interval: number; repetitions: number; easeFactor: number }, rating: FlashcardRating) {
  if (rating === 'unknown') return { interval: 1, repetitions: 0, easeFactor: Math.max(1.3, card.easeFactor - 0.2) };
  const repetitions = card.repetitions + 1;
  const interval = repetitions === 1 ? 1 : repetitions === 2 ? 6 : Math.round(card.interval * card.easeFactor);
  return { interval, repetitions, easeFactor: card.easeFactor + 0.1 };
}
