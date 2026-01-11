import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/Card';
import type { CounterState } from '@/types/collaboration';
import { Plus, Minus, Activity } from 'lucide-react';
import { getRelativeTime } from '@/shared/utils';
import { useCurrentTime } from '@/hooks/useCurrentTime/useCurrentTime';
import { Stack, Typography } from '@mui/material';
import { CounterButton } from './Counter.style';

interface CounterProps {
  counter: CounterState;
  onIncrement: VoidFunction;
  onDecrement: VoidFunction;
}

export const Counter: React.FC<CounterProps> = ({
  counter,
  onIncrement,
  onDecrement,
}) => {
  const currentTime = useCurrentTime();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Counter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Stack height="10vh" direction="row" justifyContent="space-between">
          <Typography>
            Counter: <span data-testId="timesClicked">{counter.value}</span> - Clicked by{' '}
            <span data-testId="actionBy">{counter.lastActionBy}</span> -
            {getRelativeTime(currentTime, counter.lastActionTimestamp)} ago
          </Typography>

          <Stack direction="row" spacing={2}>
            <CounterButton onClick={onDecrement} color="error" data-testId="Decrement">
              <Minus />
            </CounterButton>
            <CounterButton onClick={onIncrement} color="primary" data-testId="Increment">
              <Plus />
            </CounterButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
