import { useState, type SetStateAction } from 'react';
import { Card, CardContent } from '@/components/ui/Card/Card';
import { Button } from '@/components/ui/Button/Button';
import { Textarea } from '@/components/ui/Textarea/Textarea';
import { Input } from '@/components/ui/Input/Input';
import { Select } from '@/components/ui/Select/Select';
import { Send } from 'lucide-react';
import { useTypingIndicator } from '@/hooks/useTypingIndicator/useTypingIndicator';
import { convertToMilliseconds } from '@/shared/utils';
import {
  DEFAULT_EXPIRATION_UNIT,
  DEFAULT_EXPIRATION_VALUE,
  type TimeUnit,
} from '@/shared';
import { Checkbox, FormControlLabel, Stack } from '@mui/material';

interface MessageInputProps {
  onSendMessage: (content: string, expiresIn?: number) => void;
  onTypingChange: (isTyping: boolean) => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  onTypingChange,
}) => {
  const [message, setMessage] = useState('');
  const [expirationValue, setExpirationValue] = useState(DEFAULT_EXPIRATION_VALUE);
  const [expirationUnit, setExpirationUnit] = useState<TimeUnit>(DEFAULT_EXPIRATION_UNIT);
  const [enableExpiration, setEnableExpiration] = useState(false);

  const { triggerTyping, stopTyping } = useTypingIndicator({ onTypingChange });

  const handleMessageChange = (value: string) => {
    setMessage(value);
    if (value.trim().length > 0) {
      triggerTyping();
    } else {
      stopTyping();
    }
  };

  const handleSend = () => {
    const trimmedMessage = message.trim();
    if (!trimmedMessage) return;

    const expiresIn = enableExpiration
      ? convertToMilliseconds(expirationValue, expirationUnit)
      : undefined;

    onSendMessage(trimmedMessage, expiresIn);

    setMessage('');
    stopTyping();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack py={2}>
          <Stack direction="row" justifyContent="space-between">
            <Textarea
              placeholder="Type your message... (Shift+Enter for new line)"
              value={message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                handleMessageChange(e.target.value)
              }
              onKeyDown={handleKeyDown}
              rows={3}
              className="resize-none w-full"
            />

            <Button onClick={handleSend} disabled={!message.trim()} variant="outline">
              <Send />
            </Button>
          </Stack>

          <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={2} mt={2}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={enableExpiration}
                  onChange={e => setEnableExpiration(e.target.checked)}
                />
              }
              label="Auto-delete message after"
            />

            <Input
              type="number"
              value={expirationValue}
              onChange={(e: { target: { value: SetStateAction<string> } }) =>
                setExpirationValue(e.target.value)
              }
              placeholder="30"
              className="w-24 flex-shrink-0 max-w-[6rem]"
              disabled={!enableExpiration}
              style={{
                visibility: enableExpiration ? 'visible' : 'hidden',
              }}
            />
            <div
              className="w-32 flex-shrink-0 max-w-[8rem]"
              style={{
                visibility: enableExpiration ? 'visible' : 'hidden',
              }}
            >
              <Select
                value={expirationUnit}
                handleChange={(value: TimeUnit) => setExpirationUnit(value as TimeUnit)}
                disabled={!enableExpiration}
                options={[
                  { value: 'seconds', label: 'Seconds' },
                  { value: 'minutes', label: 'Minutes' },
                  { value: 'hours', label: 'Hours' },
                ]}
              />
            </div>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};
