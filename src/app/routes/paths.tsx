// import { Layout } from '@/shared/components';
import { Navigate, type RouteObject } from 'react-router-dom';

import { MainPage } from '../pages';

export const routes: RouteObject[] = [
  {
    element: '#',
    children: [
      {
        path: '/',
        element: <MainPage/>,
      },
      {
        path: '/:article',
        element: '#',
      },
      {
        path: '/:article/:wbId',
        element: '#',
      },
      {
        path: '/admin/:tabId',
        element: '#',
      },
      {
        path: '*',
        element: <Navigate to="/" />,
      },
    ],
  },
];
