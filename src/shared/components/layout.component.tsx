
import { observer } from 'mobx-react-lite';
import { type FC } from 'react';
import { Outlet } from 'react-router-dom';

import $ from './layout.module.scss';

export const Layout: FC<LayoutProps> = observer((props) => {
  const {} = props;

  return (
    <div className={$.main}>
      <Outlet />
    </div>
  );
});

export interface LayoutProps {}
