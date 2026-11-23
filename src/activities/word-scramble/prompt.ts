import type { AiPrompt } from '../../core/types';
import type { WordScrambleData } from './schema';
export const wordScramblePrompt: AiPrompt<WordScrambleData> = { instructions: 'Tạo danh sách từ cần sắp xếp lại, mỗi từ có id và gợi ý ngắn.', example: { title: 'Sắp xếp chữ', words: [{ id: 'w1', word: 'planet', hint: 'Hành tinh' }] } };
