import type { RouteDefinition } from 'solid-app-router';
import { lazy } from 'solid-js';
import { NewsData } from './pages/News.data';

export const routes: RouteDefinition[] = [
  { path: '/', component: lazy(() => import('./pages/Main')) },
  // { path: '/', component: Main },
  {
    path: '/news',
    component: lazy(() => import('./pages/News')),
    data: NewsData,
  },
  { path: '/lunch', component: lazy(() => import('./pages/Lunch')) },
  { path: '/profile', component: lazy(() => import('./pages/Profile')) },
  { path: '/signin', component: lazy(() => import('./pages/Signin')) },
  { path: '/signup', component: lazy(() => import('./pages/Signup')) },
];
