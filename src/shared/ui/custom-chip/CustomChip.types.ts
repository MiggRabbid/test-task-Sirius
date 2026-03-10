import type { ComponentPropsWithoutRef, ElementType, MouseEvent, ReactNode } from 'react';

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

type ChipVariant = 'filled' | 'outlined';

type CustomChipOwnProps<C extends ElementType> = {
  className?: string;
  clickable?: boolean;
  component?: C;
  disabled?: boolean;
  label: ReactNode;
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: MouseEvent<Element>) => void;
  selected?: boolean;
  status?: ChipsStatus;
  variant?: ChipVariant;
};

export type CustomChipProps<C extends ElementType = 'button'> = CustomChipOwnProps<C> &
  Omit<ComponentPropsWithoutRef<C>, keyof CustomChipOwnProps<C>>;
