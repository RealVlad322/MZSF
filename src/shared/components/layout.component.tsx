
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

import $ from './layout.module.scss';

export const Layout: FC<LayoutProps> = observer((props) => {
  const {} = props;

  return (
    <>
      <div className={$.main}>
        <Outlet />
      </div>
      <div className={$.footer}>
        Created by{' '}
        <Link target="_blank" href="https://t.me/therealyou322">
          @therealyou322{' '}
        </Link>{' '}
        &{' '}
        <Link target="_blank" href="https://t.me/Dieze0375">
          @Dieze0375{' '}
        </Link>{' '}
        <br />
        <Typography variant="caption">Будем благодарны, если поможете с оплатой сервера</Typography>
      </div>
    </>
  );
});

export interface LayoutProps {}
