import type { RouteDefinition } from 'solid-app-router';
import { lazy } from 'solid-js';
import { PageWrapper } from './components/PageWrapper';
import { NewsData } from './pages/News.data';

export const routes: RouteDefinition[] = [
  { path: '/signin', component: lazy(() => import('./pages/Signin')) },
  { path: '/signup', component: lazy(() => import('./pages/Signup')) },
  {
    path: '/',
    component: PageWrapper,
    children: [
      { path: '/', component: lazy(() => import('./pages/Main')) },
      {
        path: '/upcoming',
        component: lazy(() => import('./pages/Upcoming')),
        data: NewsData,
      },
      { path: '/lunch', component: lazy(() => import('./pages/Lunch')) },
      { path: '/profile', component: lazy(() => import('./pages/Profile')) },
      { path: '/*all', component: lazy(() => import('./pages/NotFound')) },
    ],
  },
];
