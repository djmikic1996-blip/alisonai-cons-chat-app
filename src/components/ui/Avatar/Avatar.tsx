import React, { type PropsWithChildren } from 'react';

import { StyledAvatar } from './Avatar.styled';

export interface AvatarProps extends PropsWithChildren {
  src?: string;
  alt?: string;
  fallback?: string;
  className?: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, alt, fallback, children, ...props }, ref) => (
    <StyledAvatar ref={ref} src={src} alt={alt} {...props}>
      {children || fallback || (alt ? alt.charAt(0).toUpperCase() : '?')}
    </StyledAvatar>
  )
);

Avatar.displayName = 'Avatar';
