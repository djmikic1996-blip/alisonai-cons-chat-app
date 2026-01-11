export const isOwnMessage = (messageUserId: string, currentUserId: string): boolean =>
  messageUserId === currentUserId;

export const generateMessageId = (): string =>
  `msg-${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;

export const isMessageExpired = (
  expiresAt: number | undefined,
  currentTime = Date.now()
): boolean => {
  if (!expiresAt) return false;
  return currentTime >= expiresAt;
};
