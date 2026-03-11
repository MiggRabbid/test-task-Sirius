import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export interface ICustomButtonProps
  extends PropsWithChildren,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  isActive?: boolean;
}
