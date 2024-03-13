import { Outlet } from 'react-router-dom';

function Layout(): JSX.Element {
  return (
    <>
      <h2>Layout</h2>
      <Outlet />
    </>
  );
}

export { Layout };
