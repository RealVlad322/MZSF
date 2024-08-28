
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
      <div className={$.footer}>Created by <Link target="_blank" href="https://t.me/therealyou322">@therealyou322</Link> <Typography variant="caption">Пишитие по всем вопросам</Typography></div>
    </>
  );
});

export interface LayoutProps {}
