import { createTheme, type PaletteMode } from '@mui/material';

export const theme = createTheme();

export const getAppTheme = (mode: PaletteMode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'dark'
        ? {
            background: { default: '#0f172a', paper: '#1e293b' },
          }
        : {
            background: { default: '#f8fafc', paper: '#ffffff' },
          }),
    },
  });
