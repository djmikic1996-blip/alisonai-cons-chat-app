import React, { useEffect, useRef } from 'react';
import { Box, Typography, IconButton, Stack, Paper } from '@mui/material';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card/Card';
import { MessageSquare, Trash2, Clock } from 'lucide-react';
import type { Message, User } from '@/types/collaboration';
import { isOwnMessage, formatTime, getExpirationCountdown } from '@/shared/utils';
import { useCurrentTime } from '@/hooks/useCurrentTime/useCurrentTime';
import { MESSAGE_MAX_WIDTH_PERCENTAGE } from '@/shared';

interface ChatBoxProps {
  messages: Message[];
  currentUser: User;
  typingUsers: User[];
  onDeleteMessage: (messageId: string) => void;
}

export const ChatBox: React.FC<ChatBoxProps> = ({
  messages,
  currentUser,
  typingUsers,
  onDeleteMessage,
}) => {
  const currentTime = useCurrentTime();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      // Scroll on bottom when new message is sent or received
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
      });
    }
  }, [messages]);

  return (
    <Card className="flex flex-col h-full w-full">
      <CardHeader>
        <CardTitle>
          <Stack direction="row" alignItems="center" spacing={2}>
            <MessageSquare size={20} />
            <Typography>Chat Messages</Typography>
          </Stack>
        </CardTitle>
      </CardHeader>

      <CardContent>
        <Box
          sx={{
            height: '100%',
            flex: 1,
            overflowY: 'auto',
          }}
        >
          <Stack
            height={{ xs: '33vh', md: '55vh' }}
            spacing={2}
            overflow="auto"
            ref={scrollRef}
          >
            {messages.length === 0 ? (
              <Stack
                height={160}
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <Typography color="text.secondary">
                  No messages yet. Start the conversation!
                </Typography>
              </Stack>
            ) : (
              messages.map(message => {
                const isOwn = isOwnMessage(message.userId, currentUser.id);

                return (
                  <Stack
                    key={message.id}
                    direction="row"
                    justifyContent={isOwn ? 'flex-end' : 'flex-start'}
                  >
                    <Stack
                      maxWidth={`${MESSAGE_MAX_WIDTH_PERCENTAGE}%`}
                      alignItems={isOwn ? 'flex-end' : 'flex-start'}
                      spacing={0.5}
                    >
                      {!isOwn && (
                        <Typography
                          variant="caption"
                          sx={{ fontWeight: 500, px: 1, color: 'text.secondary' }}
                        >
                          {message.username}
                        </Typography>
                      )}

                      <Paper
                        elevation={0}
                        sx={{
                          px: 2,
                          py: 1,
                          borderRadius: 2,
                          bgcolor: isOwn ? 'primary.main' : 'action.hover',
                          color: isOwn ? 'primary.contrastText' : 'text.primary',
                        }}
                      >
                        <Typography sx={{ wordBreak: 'break-word' }}>
                          {message.content}
                        </Typography>
                      </Paper>

                      <Stack direction="row" alignItems="center" px={1} spacing={1}>
                        <Typography variant="caption" color="text.secondary">
                          {formatTime(message.timestamp)}
                        </Typography>

                        {message.expiresAt && (
                          <Stack
                            direction="row"
                            alignItems="center"
                            spacing={0.5}
                            color="warning.main"
                          >
                            <Clock size={12} />
                            <Typography variant="caption">
                              {getExpirationCountdown(message.expiresAt, currentTime)}
                            </Typography>
                          </Stack>
                        )}

                        {isOwn && (
                          <IconButton
                            size="small"
                            onClick={() => onDeleteMessage(message.id)}
                            sx={{ padding: 0, '&:hover': { color: 'error.main' } }}
                          >
                            <Trash2 size={12} />
                          </IconButton>
                        )}
                      </Stack>
                    </Stack>
                  </Stack>
                );
              })
            )}

            {typingUsers.length > 0 && (
              <Stack direction="row" justifyContent="flex-start">
                <Stack px={2} py={1} bgcolor="action.hover" borderRadius={2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Stack direction="row" spacing={0.5}>
                      {[0, 1, 2].map(i => (
                        <Box
                          key={i}
                          sx={{
                            width: 6,
                            height: 6,
                            bgcolor: 'text.disabled',
                            borderRadius: '50%',
                            animation: 'bounce 1s infinite',
                            animationDelay: `${i * 0.15}s`,
                            '@keyframes bounce': {
                              '0%, 100%': { transform: 'translateY(0)' },
                              '50%': { transform: 'translateY(-4px)' },
                            },
                          }}
                        />
                      ))}
                    </Stack>
                    <Typography variant="caption" color="text.secondary">
                      {typingUsers.length === 1
                        ? `${typingUsers[0].name} is typing...`
                        : `${typingUsers.length} users are typing...`}
                    </Typography>
                  </Stack>
                </Stack>
              </Stack>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};
