import type { SampleData } from '../../core/types';
import type { SortingGameData } from './schema';
export const sortingGameSamples: SampleData<SortingGameData>[] = [{ name: 'Phân loại động vật', data: { title: 'Phân loại động vật', groups: [{ id: 'mammal', name: 'Thú' }, { id: 'bird', name: 'Chim' }], items: [{ id: 'i1', text: 'Mèo', groupId: 'mammal' }, { id: 'i2', text: 'Đại bàng', groupId: 'bird' }] } }];
