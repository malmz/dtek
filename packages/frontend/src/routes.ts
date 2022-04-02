import type { RouteDefinition } from 'solid-app-router';
import { lazy } from 'solid-js';
import Main from './pages/Main';
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
  { path: '/auth', component: lazy(() => import('./pages/Auth')) },
  { path: '/login', component: lazy(() => import('./pages/Login')) },
];
