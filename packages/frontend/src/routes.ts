import type { RouteDefinition } from 'solid-app-router';
import { lazy } from 'solid-js';
import { UpcomingData } from './routes/index/upcoming/index.data';

export const routes: RouteDefinition[] = [
  { path: '/login', component: lazy(() => import('./routes/login')) },
  { path: '/register', component: lazy(() => import('./routes/register')) },
  {
    path: '/',
    component: lazy(() => import('./routes/index')),
    children: [
      { path: '/', component: lazy(() => import('./routes/index/index')) },
      {
        path: '/upcoming',
        children: [
          {
            path: '/',
            component: lazy(() => import('./routes/index/upcoming')),
            data: UpcomingData,
          },
          {
            path: '/create',
            component: lazy(() => import('./routes/index/upcoming/create')),
          },
        ],
      },
      { path: '/lunch', component: lazy(() => import('./routes/index/lunch')) },
      {
        path: '/profile',
        component: lazy(() => import('./routes/index/profile')),
      },
    ],
  },
  { path: '/*404', component: lazy(() => import('./routes/[...404]')) },
];
