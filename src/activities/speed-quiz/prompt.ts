import type { AiPrompt } from '../../core/types';
import type { SpeedQuizData } from './schema';
export const speedQuizPrompt: AiPrompt<SpeedQuizData> = { instructions: 'Tạo quiz tốc độ với câu hỏi ngắn, 2-4 lựa chọn, correctIndex hợp lệ và timeLimitSec/lives hợp lý.', example: { title: 'Tốc độ', timeLimitSec: 30, lives: 3, questions: [{ id: 's1', prompt: '1 + 1?', choices: ['1', '2'], correctIndex: 1 }] } };
