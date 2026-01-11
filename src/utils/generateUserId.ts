export const generateUserId = (): string =>
  `user-${Math.random().toString(36).substring(2, 11)}`;
