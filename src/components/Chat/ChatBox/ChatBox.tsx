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
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth', // Optional: adds a smooth transition
      });
    }
  }, [messages]);

  return (
    <Card
      sx={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}
    >
      <CardHeader>
        <CardTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MessageSquare size={20} />
            Chat Messages
          </Box>
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
          <Stack height="55vh" spacing={2} sx={{ overflowY: 'auto' }} ref={scrollRef}>
            {messages.length === 0 ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyCenter: 'center',
                  height: 160,
                }}
              >
                <Typography color="text.secondary">
                  No messages yet. Start the conversation!
                </Typography>
              </Box>
            ) : (
              messages.map(message => {
                const isOwn = isOwnMessage(message.userId, currentUser.id);

                return (
                  <Box
                    key={message.id}
                    sx={{
                      display: 'flex',
                      justifyContent: isOwn ? 'flex-end' : 'flex-start',
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: `${MESSAGE_MAX_WIDTH_PERCENTAGE}%`,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: isOwn ? 'flex-end' : 'flex-start',
                        gap: 0.5,
                      }}
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

                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1 }}>
                        <Typography variant="caption" color="text.secondary">
                          {formatTime(message.timestamp)}
                        </Typography>

                        {message.expiresAt && (
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: 0.5,
                              color: 'warning.main',
                            }}
                          >
                            <Clock size={12} />
                            <Typography variant="caption">
                              {getExpirationCountdown(message.expiresAt, currentTime)}
                            </Typography>
                          </Box>
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
                      </Box>
                    </Box>
                  </Box>
                );
              })
            )}

            {typingUsers.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                <Box sx={{ bgcolor: 'action.hover', borderRadius: 2, px: 2, py: 1 }}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
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
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                      {typingUsers.length === 1
                        ? `${typingUsers[0].name} is typing...`
                        : `${typingUsers.length} users are typing...`}
                    </Typography>
                  </Stack>
                </Box>
              </Box>
            )}
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
};
