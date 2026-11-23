import type { AiPrompt } from '../../core/types';
import type { SortingGameData } from './schema';
export const sortingGamePrompt: AiPrompt<SortingGameData> = { instructions: 'Tạo bài phân loại với 2-4 nhóm và các mục cần kéo vào đúng nhóm.', example: { title: 'Phân loại', groups: [{ id: 'g1', name: 'Nhóm A' }, { id: 'g2', name: 'Nhóm B' }], items: [{ id: 'i1', text: 'Mục 1', groupId: 'g1' }] } };
