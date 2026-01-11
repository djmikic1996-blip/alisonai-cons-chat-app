import * as React from 'react';

import { cn } from '@/utils';

interface InputProps {
  type?: string;
  className?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  placeholder?: string;
  disabled?: boolean;
  style?: { [x: string]: string | number };
}

export const Input: React.FC<InputProps> = ({
  className,
  type,
  value,
  onChange,
  onKeyDown,
  autoFocus,
  placeholder,
  disabled,
  style,
  ...rest
}: InputProps) => (
  <input
    type={type}
    className={cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
      className
    )}
    value={value}
    onChange={onChange}
    onKeyDown={onKeyDown}
    placeholder={placeholder}
    disabled={disabled}
    autoFocus={autoFocus}
    {...rest}
    style={style}
  />
);
Input.displayName = 'Input';
