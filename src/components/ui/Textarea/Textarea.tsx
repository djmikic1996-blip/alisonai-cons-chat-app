import { cn } from '@/utils';
import { TextField } from '@mui/material';
import React from 'react';

export interface TextareaProps {
  variant?: 'outlined' | 'filled' | 'standard';
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  className?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

export const Textarea: React.FC<TextareaProps> = ({
  className,
  variant = 'outlined',
  onKeyDown,
  placeholder,
  value,
  onChange,
  rows,
  ...props
}) => (
  <TextField
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
    }}
    onKeyDown={onKeyDown}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    rows={rows}
  />
);

Textarea.displayName = 'Textarea';
