import { useRoutes } from 'solid-app-router';
import { Component, Suspense } from 'solid-js';
import { Navbar } from './Navbar';
import { routes } from './routes';


export const App: Component = () => {
  const Routes = useRoutes(routes);
  return (
    <>
      <Navbar></Navbar>
      <Suspense>
        <Routes></Routes>
      </Suspense>
    </>
  );
}
