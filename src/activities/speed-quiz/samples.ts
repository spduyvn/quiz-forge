import type { SampleData } from '../../core/types';
import type { SpeedQuizData } from './schema';
export const speedQuizSamples: SampleData<SpeedQuizData>[] = [{ name: 'Toán nhanh', data: { title: 'Toán nhanh', timeLimitSec: 30, lives: 3, questions: [{ id: 's1', prompt: '2 + 2 = ?', choices: ['3', '4', '5'], correctIndex: 1 }, { id: 's2', prompt: '3 × 3 = ?', choices: ['6', '9', '12'], correctIndex: 1 }] } }];
