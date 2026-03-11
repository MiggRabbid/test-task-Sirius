import type { MouseEvent, ReactNode } from 'react';

export enum ChipsStatus {
  // eslint-disable-next-line no-unused-vars
  default = 'default',
  // eslint-disable-next-line no-unused-vars
  info = 'info',
  // eslint-disable-next-line no-unused-vars
  success = 'success',
  // eslint-disable-next-line no-unused-vars
  error = 'error',
  // eslint-disable-next-line no-unused-vars
  warning = 'warning',
}

export type TChipVariant = 'filled' | 'outlined';

export interface ICustomChipProps {
  className?: string;
  clickable?: boolean;
  disabled?: boolean;
  label: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  selected?: boolean;
  status?: ChipsStatus;
  variant?: TChipVariant;
}
