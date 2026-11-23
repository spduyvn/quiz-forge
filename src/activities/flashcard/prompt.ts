import type { AiPrompt } from '../../core/types';
import type { FlashcardData } from './schema';
export const flashcardPrompt: AiPrompt<FlashcardData> = { instructions: 'Tạo bộ flashcard gồm các cặp front/back rõ ràng, có id duy nhất và tags.', example: { title: 'Từ vựng', cards: [{ id: 'c1', front: 'water', back: 'nước', tags: ['nature'] }] } };
