// Типизация
import type { ChipsStatus } from '@/shared/ui/custom-chip';

export interface IChipsData {
  id: number;
  text: string;
  status: ChipsStatus;
}
