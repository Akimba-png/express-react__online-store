import { RouterProvider } from 'react-router-dom';
import { setupRouter } from './router/setup-router';
import { useContext } from 'react';
import { StoreContext } from './main';
import { observer } from 'mobx-react-lite';

function AppComponent() {
  const store = useContext(StoreContext);
  const { user } = store;
  const router = setupRouter(user.authStatus);
  return (
    <RouterProvider router={router} />
  );
}

export const App = observer(AppComponent);
