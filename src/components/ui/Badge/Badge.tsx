import * as React from 'react';
import { Chip as MuiChip } from '@mui/material';
import type { ChipProps as MuiChipProps } from '@mui/material';
import { cn } from '@/utils';

export interface BadgeProps extends Omit<MuiChipProps, 'variant' | 'children'> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  children?: React.ReactNode;
}

export const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => {
  const getMuiProps = () => {
    switch (variant) {
      case 'secondary':
        return { color: 'secondary' as const, variant: 'filled' as const };
      case 'destructive':
        return { color: 'error' as const, variant: 'filled' as const };
      case 'outline':
        return { color: 'default' as const, variant: 'outlined' as const };
      default:
        return { color: 'primary' as const, variant: 'filled' as const };
    }
  };

  const muiProps = getMuiProps();

  return (
    <MuiChip
      {...muiProps}
      {...props}
      size="small"
      className={cn('font-semibold h-auto py-1 px-0', className)}
      label={props.children}
    />
  );
};
