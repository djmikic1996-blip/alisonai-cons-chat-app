import React from 'react';
import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps } from '@mui/material';
import { cn } from '@/utils';

export interface ButtonProps extends Omit<MuiButtonProps, 'variant' | 'size'> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', ...props }, ref) => {
    const getMuiProps = () => {
      switch (variant) {
        case 'destructive':
          return { color: 'error' as const, variant: 'contained' as const };
        case 'outline':
          return { color: 'primary' as const, variant: 'outlined' as const };
        case 'secondary':
          return { color: 'secondary' as const, variant: 'contained' as const };
        case 'ghost':
          return { color: 'primary' as const, variant: 'text' as const };
        case 'link':
          return {
            color: 'primary' as const,
            variant: 'text' as const,
            sx: { textDecoration: 'underline' },
          };
        default:
          return { color: 'primary' as const, variant: 'contained' as const };
      }
    };

    const getMuiSize = () => {
      if (size === 'sm') return 'small';
      if (size === 'lg') return 'large';
      return 'medium';
    };

    const muiProps = getMuiProps();

    return (
      <MuiButton
        ref={ref}
        color={muiProps.color}
        variant={muiProps.variant}
        size={getMuiSize()}
        disableElevation
        {...props}
        className={cn(
          'capitalize font-medium',
          size === 'icon' && 'min-w-0 w-10 h-10 p-0',
          className
        )}
        sx={{
          ...muiProps.sx,
          ...(variant === 'destructive' && {
            backgroundColor: 'destructive.main',
          }),
        }}
      />
    );
  }
);

Button.displayName = 'Button';
