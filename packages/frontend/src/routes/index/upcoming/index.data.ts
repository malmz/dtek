import type { RouteDataFunc } from 'solid-app-router';
import { createResource } from 'solid-js';
import { fetchNews } from '../../../lib/api';

export const UpcomingData: RouteDataFunc = () => {
  const [news] = createResource(fetchNews);
  return {
    news,
  };
};
