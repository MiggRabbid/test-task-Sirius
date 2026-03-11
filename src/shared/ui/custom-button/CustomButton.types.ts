import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

export interface CustomButtonProps
  extends PropsWithChildren,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> {
  isActive?: boolean;
}
