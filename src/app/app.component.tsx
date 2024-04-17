import './app.scss';

import { StyledEngineProvider, ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import ru from 'date-fns/locale/ru';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes/router';
import { theme } from './theme';

export const App: FC<AppProps> = observer((props) => {
  const {} = props;

  // const { enqueueSnackbar } = useSnackbar();

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ru}>
        <StyledEngineProvider injectFirst>
          <RouterProvider router={router} />
        </StyledEngineProvider>
      </LocalizationProvider>
    </ThemeProvider>
  );
});

export interface AppProps {}
