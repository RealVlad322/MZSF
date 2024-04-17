// import { Layout } from '@/shared/components';
import { Navigate, type RouteObject } from 'react-router-dom';

import { SignInPage } from '../pages';

// import {
//   AdminPage,
//   ApprovePage,
//   CampaignPage,
//   ChangePasswordPage,
//   EmailApprovePage,
//   ProductPage,
//   ProductsPage,
//   ResetPasswordPage,
//   SigninPage,
//   SignupPage,
// } from '../pages';

export const routes: RouteObject[] = [
  {
    element: '#',
    children: [
      {
        path: '/',
        element: '#',
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
  {
    path: '/auth',
    children: [
      {
        path: '',
        element: <Navigate to="signin" />,
      },
      {
        path: 'signin',
        element: <SignInPage />,
      },
    ],
  },
];
