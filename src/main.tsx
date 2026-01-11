import { createRoot } from 'react-dom/client';
import { ThemeProvider } from '@mui/material';

import './index.css';
import { App } from './App.tsx';
import { theme } from './Theme.ts';
import { ThemeWrapper } from './ThemeWrapper.tsx';

createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <ThemeWrapper>
      <App />
    </ThemeWrapper>
  </ThemeProvider>
);
