// Типизация
import type { PopoverProps } from '@mui/material';
import type { PropsWithChildren } from 'react';

export interface ICustomPopoverProps
  extends PropsWithChildren,
    Pick<PopoverProps, 'anchorEl' | 'open'> {
  className?: string;
  onClose: () => void;
}

export interface IUseCustomPopoverParams {
  isEnabled?: boolean;
}

export interface IUseCustomPopoverResult<T extends HTMLElement> {
  anchorEl: T | null;
  isOpen: boolean;
  handleClose: () => void;
  // eslint-disable-next-line no-unused-vars
  handleToggle: (element: T | null) => void;
}
