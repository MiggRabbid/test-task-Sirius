import { useEffect, useState } from 'react';
import type {
  UseCustomPopoverParams,
  UseCustomPopoverResult,
} from './CustomPopover.types';

export const useCustomPopover = <T extends HTMLElement>({
  isEnabled = true,
}: UseCustomPopoverParams = {}): UseCustomPopoverResult<T> => {
  const [anchorEl, setAnchorEl] = useState<T | null>(null);

  useEffect(() => {
    if (!isEnabled) {
      setAnchorEl(null);
    }
  }, [isEnabled]);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (element: T | null) => {
    setAnchorEl((prevAnchorElement) => (prevAnchorElement ? null : element));
  };

  return {
    anchorEl,
    isOpen: Boolean(anchorEl) && isEnabled,
    handleClose,
    handleToggle,
  };
};
