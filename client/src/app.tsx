import { RouterProvider } from 'react-router-dom';
import { setupRouter } from './router/setup-router';
import { AuthStatus } from './utils/const';

function App() {
  const router = setupRouter(AuthStatus.Auth);
  return (
    <RouterProvider router={router} />
  );
}

export { App };
