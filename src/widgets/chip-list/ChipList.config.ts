import type { TChipVariant } from '@/shared/ui/custom-chip';

export const DEFAULT_GAP = 12;

export const CHIP_VARIANT_OPTIONS = [
  { label: 'filled', value: 'filled' },
  { label: 'outlined', value: 'outlined' },
] as const satisfies ReadonlyArray<{ label: string; value: TChipVariant }>;

export const CHIP_CLICKABLE_OPTIONS = [
  { label: 'clickable', value: true },
  { label: 'static', value: false },
] as const;
