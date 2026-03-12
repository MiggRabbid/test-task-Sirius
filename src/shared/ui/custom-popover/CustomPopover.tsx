// Библиотеки
import { Popover } from '@mui/material';
import clsx from 'clsx';
// Типизация
import type { ICustomPopoverProps } from './CustomPopover.types';

const CustomPopover = ({
  anchorEl,
  children,
  className,
  onClose,
  open,
}: ICustomPopoverProps) => {
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
      sx={{
        '& .MuiPopover-paper': {
          marginTop: '10px !important',
          marginLeft: '10px !important',
        },
      }}
    >
      {children}
    </Popover>
  );
};

export default CustomPopover;
