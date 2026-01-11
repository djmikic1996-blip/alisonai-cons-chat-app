import { useState, useMemo, type PropsWithChildren } from 'react';
import { ThemeProvider, CssBaseline, Button, Box } from '@mui/material';
import { Sun, Moon } from 'lucide-react';

import { getAppTheme } from './Theme';

export const ThemeWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  const theme = useMemo(() => getAppTheme(mode), [mode]);

  const toggleTheme = () => {
    setMode(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Box sx={{ position: 'absolute', top: 16, right: 16, zIndex: 1000 }}>
        <Button
          variant="contained"
          onClick={toggleTheme}
          startIcon={mode === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          sx={{
            backgroundColor:
              mode === 'dark' ? theme.palette.common.white : theme.palette.primary.main,
          }}
        >
          {mode === 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
      </Box>

      {children}
    </ThemeProvider>
  );
};
