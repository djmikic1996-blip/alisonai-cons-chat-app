import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/Card';
import type { CounterState } from '@/types/collaboration';
import { Plus, Minus, Activity } from 'lucide-react';
import { getRelativeTime } from '@/shared/utils';
import { useCurrentTime } from '@/hooks/useCurrentTime/useCurrentTime';
import { IconButton, Stack, Typography } from '@mui/material';

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
          Shared Counter
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Stack height="10vh" direction="row" justifyContent="space-between">
          <Typography>
            Counter: {counter.value} - Clicked by {counter.lastActionBy} -
            {getRelativeTime(currentTime, counter.lastActionTimestamp)} ago
          </Typography>

          <Stack direction="row" spacing={2}>
            <IconButton
              variant="outline"
              onClick={onDecrement}
              color="error"
              sx={{
                height: 33,
                width: 33,
                display: 'flex',
                placeItems: 'center',
              }}
            >
              <Minus />
            </IconButton>
            <IconButton
              onClick={onIncrement}
              color="primary"
              sx={{
                height: 33,
                width: 33,
                display: 'flex',
                placeItems: 'center',
              }}
            >
              <Plus />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
