import React from 'react';
import { TextField } from '@mui/material';
import type { TextFieldProps } from '@mui/material';
import { cn } from '@/utils';

export interface TextareaProps extends Omit<TextFieldProps, 'variant' | 'onKeyDown'> {
  variant?: 'outlined' | 'filled' | 'standard';
  onKeyDown?: (e: unknown) => void;
}

export const Textarea = React.forwardRef<HTMLDivElement, TextareaProps>(
  ({ className, variant = 'outlined', onKeyDown, ...props }, ref) => {
    return (
      <TextField
        ref={ref}
        variant={variant}
        multiline
        fullWidth
        className={cn('bg-background', className)}
        {...props}
        slotProps={{}}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '0.375rem',
          },
          ...props.sx,
        }}
        onKeyDown={onKeyDown}
      />
    );
  }
);

Textarea.displayName = 'Textarea';
