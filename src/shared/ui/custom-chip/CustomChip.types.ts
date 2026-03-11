import type {
  ComponentPropsWithoutRef,
  ElementType,
  ForwardedRef,
  MouseEvent,
  ReactElement,
  ReactNode,
} from 'react';

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

export type ChipVariant = 'filled' | 'outlined';

export type CustomChipSwitcherValue = ChipVariant | boolean;

export interface CustomChipSwitcherOption<T extends CustomChipSwitcherValue> {
  label: string;
  value: T;
}

export interface CustomChipVariantSwitcherProps<T extends CustomChipSwitcherValue> {
  // eslint-disable-next-line no-unused-vars
  onChange: (value: T) => void;
  options: readonly CustomChipSwitcherOption<T>[];
  value: T;
}

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

export type CustomChipComponent = <C extends ElementType = 'button'>(
  // eslint-disable-next-line no-unused-vars
  props: CustomChipProps<C> & { ref?: ForwardedRef<Element> },
) => ReactElement | null;
