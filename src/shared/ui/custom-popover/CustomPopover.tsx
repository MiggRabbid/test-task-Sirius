import clsx from 'clsx';
import { Popover } from '@mui/material';

import type { CustomPopoverProps } from './CustomPopover.types';

const CustomPopover = ({
  anchorEl,
  children,
  className,
  onClose,
  open,
}: CustomPopoverProps) => {
  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      slotProps={{
        paper: {
          className: clsx('mt-2 rounded-md! p-4! shadow-lg!', className),
        },
      }}
    >
      {children}
    </Popover>
  );
};

export default CustomPopover;
