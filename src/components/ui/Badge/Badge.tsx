import { Chip } from '@mui/material';
import { cn } from '@/utils';

export interface BadgeProps {
  label: string;
  variant?: 'default' | 'secondary' | 'destructive' | 'outline';
  className?: string;
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
    <Chip
      {...props}
      {...muiProps}
      size="small"
      className={cn('font-semibold h-auto py-1 px-0', className)}
    />
  );
};
