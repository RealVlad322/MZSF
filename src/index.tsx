import './preload';
import '@abraham/reflection';

import { App } from '@/app/app.component';
import { ThemeProvider } from '@emotion/react';
import { StyledEngineProvider } from '@mui/styled-engine-sc';
import { createRoot } from 'react-dom/client';

import { theme } from './app/theme';

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('root')!;
  const root = createRoot(rootEl);
  root.render(
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </ThemeProvider>,
  );
});
