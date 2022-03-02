import { useRoutes } from 'solid-app-router';
import type { Component } from 'solid-js';
import { Suspense } from 'solid-js';
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
};
