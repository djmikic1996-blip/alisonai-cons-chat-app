import { Avatar as MuiAvatar, styled } from '@mui/material';

export const StyledAvatar = styled(MuiAvatar)(({ theme }) => ({
  width: 40,
  height: 40,
  fontSize: '0.875rem',
  backgroundColor: theme.palette.grey[200],
  color: theme.palette.text.secondary,
  border: `1px solid ${theme.palette.common.black}`,
}));
