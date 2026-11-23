import type { AiPrompt } from '../../core/types';
import type { MemoryMatchData } from './schema';
export const memoryMatchPrompt: AiPrompt<MemoryMatchData> = { instructions: 'Tạo các cặp khái niệm và định nghĩa ngắn gọn, mỗi cặp có id duy nhất.', example: { title: 'Sinh học', pairs: [{ id: 'p1', concept: 'Tế bào', definition: 'Đơn vị cơ bản của sự sống' }, { id: 'p2', concept: 'ADN', definition: 'Vật chất di truyền' }] } };
