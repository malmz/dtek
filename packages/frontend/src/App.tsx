import { useRoutes } from 'solid-app-router';
import { Component, ErrorBoundary } from 'solid-js';
import { routes } from './routes';

export const App: Component = () => {
  const Routes = useRoutes(routes);
  return (
    <div class='flex min-h-screen flex-col'>
      <ErrorBoundary fallback={<span>Something went wrong...</span>}>
        <Routes></Routes>
      </ErrorBoundary>
    </div>
  );
};
