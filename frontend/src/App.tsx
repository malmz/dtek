import { useRoutes } from 'solid-app-router';
import type { Component } from 'solid-js';
import { Suspense } from 'solid-js';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { routes } from './routes';

export const App: Component = () => {
  const Routes = useRoutes(routes);
  return (
    <div class='flex min-h-screen flex-col'>
      <Navbar></Navbar>
      <Suspense>
        <Routes></Routes>
      </Suspense>
      <Footer></Footer>
    </div>
  );
};
