import { useCollaborativeSession } from '@/hooks/useCollaborativeSession/useCollaborativeSession';
import { UserPresence } from '@/components/UserPresence/UserPresence';
import { Counter } from '@/components/Counter/Counter';
import { ChatBox, MessageInput } from '@/components/Chat';
import { useMemo } from 'react';
import { Box, CircularProgress, Stack, Typography } from '@mui/material';

export const App = () => {
  const {
    currentUser,
    users,
    messages,
    counter,
    isInitialized,
    updateUsername,
    sendMessage,
    deleteMessage,
    incrementCounter,
    decrementCounter,
    markTyping,
  } = useCollaborativeSession();

  const otherUsers = useMemo(
    () => users.filter(user => user.id !== currentUser.id),
    [users, currentUser.id]
  );

  const typingUsers = useMemo(
    () => users.filter(user => user.id !== currentUser.id).filter(user => user.isTyping),
    [users, currentUser.id]
  );

  if (!isInitialized) {
    return (
      <Stack>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Stack>
    );
  }

  return (
    <Stack
      height="100vh"
      width="100%"
      alignItems="center"
      justifyContent="flex-start"
      flexWrap="wrap"
      direction="column"
      p={{ xs: 2, md: 0 }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        overflow={{ xs: 'auto', md: 'hidden' }}
        width={{ xs: '100%', md: '75%' }}
        height="100%"
        justifyContent={{ xs: 'center', md: 'space-between' }}
      >
        <Box
          sx={{
            maxHeight: { xs: '25vh', md: '100%' },
            width: { xs: '100%', md: '320px' },
            flexShrink: 0,
            overflowY: 'auto',
          }}
        >
          <UserPresence
            currentUser={currentUser}
            users={otherUsers}
            onUpdateUsername={updateUsername}
          />
        </Box>
        <Stack height={{ xs: '75vh', md: '100%' }} width={{ xs: '100%', md: '75%' }}>
          <Counter
            counter={counter}
            onIncrement={incrementCounter}
            onDecrement={decrementCounter}
          />
          <ChatBox
            messages={messages}
            currentUser={currentUser}
            typingUsers={typingUsers}
            onDeleteMessage={deleteMessage}
          />
          <Stack height="35%">
            <MessageInput onSendMessage={sendMessage} onTypingChange={markTyping} />
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
