import type { UseCollaborativeSession } from '@/types/collaboration';
import {
  useCurrentUser,
  useCollaborativeUsers,
  useCollaborativeMessages,
  useCollaborativeCounter,
} from '@/hooks';

export const useCollaborativeSession = (): UseCollaborativeSession => {
  const { currentUser, userId, sourceName, updateUsername, setTyping } = useCurrentUser();

  const { users, postTypingStatus } = useCollaborativeUsers({ sourceName });

  const { messages, sendMessage, deleteMessage } = useCollaborativeMessages({
    sourceName,
    userId,
    username: currentUser.name,
  });

  const { counter, incrementCounter, decrementCounter } = useCollaborativeCounter({
    sourceName,
  });

  const markTyping = (isTyping: boolean) => {
    setTyping(isTyping);
    postTypingStatus(userId, isTyping);
  };

  const currentDate = new Date();

  return {
    currentUser,
    users,
    messages,
    counter: {
      value: counter,
      timestamp: currentDate.getTime(),
      lastActionBy: currentUser.name,
      lastActionTimestamp: currentDate.getTime(),
    },
    isInitialized: true,
    updateUsername,
    sendMessage,
    deleteMessage,
    incrementCounter,
    decrementCounter,
    markTyping,
  };
};
