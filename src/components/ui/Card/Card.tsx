import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import type { PaperProps } from '@mui/material';
import { cn } from '@/utils';

export const Card = React.forwardRef<HTMLDivElement, PaperProps>(
  ({ className, ...props }, ref) => (
    <Paper
      ref={ref}
      variant="outlined"
      className={cn(
        'rounded-lg bg-card text-card-foreground shadow-sm overflow-hidden',
        className
      )}
      {...props}
    />
  )
);
Card.displayName = 'Card';

export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Box ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

export const CardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Typography
    ref={ref}
    variant="h6"
    component="div"
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
CardTitle.displayName = 'CardTitle';

export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <Box ref={ref} className={cn('p-6 pt-0', className)} {...props} />
));
CardContent.displayName = 'CardContent';
