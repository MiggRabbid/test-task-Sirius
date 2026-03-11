import type { TChipVariant } from '@/shared/ui/custom-chip';

export type TCustomChipSwitcherValue = TChipVariant | boolean;

export interface IOptionSwitcherOption<T extends TCustomChipSwitcherValue> {
  label: string;
  value: T;
}

export interface IOptionSwitcherProps<T extends TCustomChipSwitcherValue> {
  // eslint-disable-next-line no-unused-vars
  onChange: (value: T) => void;
  options: readonly IOptionSwitcherOption<T>[];
  value: T;
}
