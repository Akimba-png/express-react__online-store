import { type RouteObject, createBrowserRouter } from 'react-router-dom';
import { AppRoute, AuthStatus } from '../utils/const';
import { AdminPage } from '../pages/admin-page/admin-page';
import { AuthPage } from '../pages/auth-page/auth-page';
import { ItemPage } from '../pages/item-page/item-page';
import { StorePage } from '../pages/store-page/store-page';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { Layout } from '../pages/layout/layout';

const authRoutes: RouteObject[] = [
  {
    path: AppRoute.Admin,
    element: <AdminPage />,
  },
];

const publicRoutes: RouteObject[] = [
  {
    path: AppRoute.Signup,
    element: <AuthPage />,
  },
  {
    path: AppRoute.Login,
    element: <AuthPage />,
  },
  {
    path: AppRoute.Store,
    element: <StorePage />,
  },
  {
    path: AppRoute.Item,
    element: <ItemPage />,
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
];

export const setupRouter = (authStatus: AuthStatus) => {
  const routes: RouteObject[] = [
    {
      element: <Layout />,
      children:
        authStatus === AuthStatus.Auth
          ? publicRoutes.concat(authRoutes)
          : publicRoutes,
    },
  ];

  const router = createBrowserRouter(routes);
  return router;
};
