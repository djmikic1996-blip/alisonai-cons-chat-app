export const generateUserId = (): string =>
  `user-${Math.random().toString(36).substring(2, 11)}`;

export const getUserInitials = (name: string, maxInitials = 2): string =>
  name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, maxInitials);

export const generateSourceName = (userId: string): string => {
  const suffix = userId.slice(-6);
  return `tab-${suffix}`;
};

export const generateDefaultUsername = (userId: string): string => {
  const suffix = userId.slice(-6);
  return `User-${suffix}`;
};
