import type { SampleData } from '../../core/types';
import type { FlashcardData } from './schema';
export const flashcardSamples: SampleData<FlashcardData>[] = [{ name: 'Từ vựng', data: { title: 'Từ vựng tiếng Anh', cards: [{ id: 'c1', front: 'apple', back: 'quả táo', tags: ['food'] }, { id: 'c2', front: 'book', back: 'quyển sách', tags: ['school'] }] } }];
