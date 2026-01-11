import { Avatar, styled } from '@mui/material';

export const StyledAvatar = styled(Avatar)`
  height: 40px;
  width: 40px;
  font-size: 0.875rem;
  background-color: ${({ theme }) => theme.palette.grey[200]};
  color: ${({ theme }) => theme.palette.text.secondary};
  border: 1px solid ${({ theme }) => theme.palette.common.black};
`;
