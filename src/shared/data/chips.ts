// Логика
import { ChipsStatus } from '@/shared/ui/custom-chip';
// Типизация
import type { IChipsData } from '@/app/types';

export const chips: IChipsData[] = [
  { id: 1, text: 'Чипс 1', status: ChipsStatus.default },
  { id: 2, text: 'Чипс 2', status: ChipsStatus.info },
  { id: 3, text: 'Чипс 3', status: ChipsStatus.success },
  { id: 4, text: 'Чипс 4', status: ChipsStatus.warning },
  { id: 5, text: 'Чипс длинный 5', status: ChipsStatus.error },
  { id: 6, text: 'Чипс длинный 6', status: ChipsStatus.default },
  { id: 7, text: '7', status: ChipsStatus.info },
  { id: 8, text: '8', status: ChipsStatus.success },
  { id: 9, text: 'Чипс 9', status: ChipsStatus.warning },
  { id: 10, text: 'Чипс 10', status: ChipsStatus.error },
  { id: 11, text: 'Чипс 11', status: ChipsStatus.default },
  { id: 12, text: 'Чипс 12', status: ChipsStatus.info },
  { id: 13, text: 'Чипс 13', status: ChipsStatus.success },
  { id: 14, text: 'Чипс 14', status: ChipsStatus.default },
  { id: 15, text: 'Чипс 15', status: ChipsStatus.default },
];
