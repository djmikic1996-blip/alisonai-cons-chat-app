export const isOwnMessage = ({
  currentUserId,
  messageUserId,
}: {
  messageUserId: string;
  currentUserId: string;
}): boolean => {
  return messageUserId === currentUserId;
};
